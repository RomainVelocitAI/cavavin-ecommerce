import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
})

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const sessionId = request.headers.get('x-session-id')
    
    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID requis' },
        { status: 400 }
      )
    }
    
    // Récupérer le panier
    const cart = await prisma.cart.findUnique({
      where: { sessionId },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    })
    
    if (!cart || cart.items.length === 0) {
      return NextResponse.json(
        { error: 'Panier vide' },
        { status: 400 }
      )
    }
    
    // Calculer les totaux
    const subtotal = cart.items.reduce((sum, item) => {
      return sum + (item.product.price * item.quantity)
    }, 0)
    
    const deliveryFee = data.deliveryType === 'CLICK_COLLECT' 
      ? 0 
      : subtotal >= 100 ? 0 : 10
    
    const total = subtotal + deliveryFee
    
    // Générer un numéro de commande unique
    const orderNumber = `CMD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    
    // Créer la commande dans la base de données
    const order = await prisma.order.create({
      data: {
        orderNumber,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        deliveryType: data.deliveryType,
        address: data.address || null,
        city: data.city || null,
        postalCode: data.postalCode || null,
        storeId: data.storeId || null,
        pickupDate: data.pickupDate ? new Date(data.pickupDate) : null,
        pickupTime: data.pickupTime || null,
        subtotal,
        deliveryFee,
        total,
        ageVerified: data.ageVerified,
        items: {
          create: cart.items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price
          }))
        }
      }
    })
    
    // Créer une session Stripe
    const lineItems = cart.items.map(item => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.product.name,
          description: item.product.description,
        },
        unit_amount: Math.round(item.product.price * 100), // Stripe utilise les centimes
      },
      quantity: item.quantity,
    }))
    
    // Ajouter les frais de livraison si applicable
    if (deliveryFee > 0) {
      lineItems.push({
        price_data: {
          currency: 'eur',
          product_data: {
            name: 'Frais de livraison',
            description: 'Livraison sur La Réunion',
          },
          unit_amount: Math.round(deliveryFee * 100),
        },
        quantity: 1,
      })
    }
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout`,
      metadata: {
        orderId: order.id,
        orderNumber: order.orderNumber,
      },
      customer_email: data.email,
    })
    
    // Mettre à jour la commande avec l'ID de session Stripe
    await prisma.order.update({
      where: { id: order.id },
      data: { paymentIntentId: session.id }
    })
    
    // Vider le panier
    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id }
    })
    
    return NextResponse.json({
      orderId: order.id,
      orderNumber: order.orderNumber,
      stripeUrl: session.url
    })
  } catch (error) {
    console.error('Error creating checkout:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la création de la commande' },
      { status: 500 }
    )
  }
}