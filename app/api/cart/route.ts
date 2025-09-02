import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'

// GET: Récupérer le panier
export async function GET(request: NextRequest) {
  try {
    const sessionId = request.headers.get('x-session-id')
    
    if (!sessionId) {
      return NextResponse.json({ items: [] })
    }
    
    const cart = await prisma.cart.findUnique({
      where: { sessionId },
      include: {
        items: {
          include: {
            product: {
              include: {
                category: true
              }
            }
          }
        }
      }
    })
    
    if (!cart) {
      return NextResponse.json({ items: [] })
    }
    
    // Formater les images
    const formattedCart = {
      ...cart,
      items: cart.items.map(item => ({
        ...item,
        product: {
          ...item.product,
          images: JSON.parse(item.product.images)
        }
      }))
    }
    
    return NextResponse.json(formattedCart)
  } catch (error) {
    console.error('Error fetching cart:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération du panier' },
      { status: 500 }
    )
  }
}

// POST: Ajouter au panier
export async function POST(request: NextRequest) {
  try {
    const { productId, quantity = 1 } = await request.json()
    const sessionId = request.headers.get('x-session-id')
    
    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID requis' },
        { status: 400 }
      )
    }
    
    // Vérifier que le produit existe
    const product = await prisma.product.findUnique({
      where: { id: productId }
    })
    
    if (!product) {
      return NextResponse.json(
        { error: 'Produit non trouvé' },
        { status: 404 }
      )
    }
    
    // Créer ou récupérer le panier
    let cart = await prisma.cart.findUnique({
      where: { sessionId }
    })
    
    if (!cart) {
      cart = await prisma.cart.create({
        data: { sessionId }
      })
    }
    
    // Vérifier si le produit est déjà dans le panier
    const existingItem = await prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId
        }
      }
    })
    
    if (existingItem) {
      // Mettre à jour la quantité
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity }
      })
    } else {
      // Ajouter le nouvel item
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity
        }
      })
    }
    
    // Retourner le panier mis à jour
    const updatedCart = await prisma.cart.findUnique({
      where: { id: cart.id },
      include: {
        items: {
          include: {
            product: {
              include: {
                category: true
              }
            }
          }
        }
      }
    })
    
    return NextResponse.json(updatedCart)
  } catch (error) {
    console.error('Error adding to cart:', error)
    return NextResponse.json(
      { error: 'Erreur lors de l\'ajout au panier' },
      { status: 500 }
    )
  }
}

// PUT: Mettre à jour la quantité
export async function PUT(request: NextRequest) {
  try {
    const { itemId, quantity } = await request.json()
    const sessionId = request.headers.get('x-session-id')
    
    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID requis' },
        { status: 400 }
      )
    }
    
    if (quantity === 0) {
      // Supprimer l'item si quantité = 0
      await prisma.cartItem.delete({
        where: { id: itemId }
      })
    } else {
      // Mettre à jour la quantité
      await prisma.cartItem.update({
        where: { id: itemId },
        data: { quantity }
      })
    }
    
    // Retourner le panier mis à jour
    const cart = await prisma.cart.findUnique({
      where: { sessionId },
      include: {
        items: {
          include: {
            product: {
              include: {
                category: true
              }
            }
          }
        }
      }
    })
    
    return NextResponse.json(cart)
  } catch (error) {
    console.error('Error updating cart:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour du panier' },
      { status: 500 }
    )
  }
}

// DELETE: Supprimer un item du panier
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const itemId = searchParams.get('itemId')
    const sessionId = request.headers.get('x-session-id')
    
    if (!sessionId || !itemId) {
      return NextResponse.json(
        { error: 'Session ID et Item ID requis' },
        { status: 400 }
      )
    }
    
    await prisma.cartItem.delete({
      where: { id: itemId }
    })
    
    // Retourner le panier mis à jour
    const cart = await prisma.cart.findUnique({
      where: { sessionId },
      include: {
        items: {
          include: {
            product: {
              include: {
                category: true
              }
            }
          }
        }
      }
    })
    
    return NextResponse.json(cart)
  } catch (error) {
    console.error('Error deleting from cart:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la suppression du panier' },
      { status: 500 }
    )
  }
}