'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight, Wine } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { formatPrice, getSessionId, calculateCartTotal } from '@/lib/utils/cart'

interface CartItem {
  id: string
  quantity: number
  product: {
    id: string
    name: string
    slug: string
    price: number
    images?: string[]
    vintage?: number
    region?: string
    grapeVariety?: string
    category: {
      id: string
      name: string
      slug: string
    }
  }
}

interface Cart {
  id: string
  items: CartItem[]
}

export default function CartPage() {
  const [cart, setCart] = useState<Cart | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCart()
  }, [])

  const fetchCart = async () => {
    try {
      const sessionId = getSessionId()
      const response = await fetch('/api/cart', {
        headers: {
          'x-session-id': sessionId,
        },
      })
      const data = await response.json()
      setCart(data)
    } catch (error) {
      console.error('Error fetching cart:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateQuantity = async (itemId: string, quantity: number) => {
    try {
      const sessionId = getSessionId()
      const response = await fetch('/api/cart', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-session-id': sessionId,
        },
        body: JSON.stringify({ itemId, quantity }),
      })
      
      if (response.ok) {
        const updatedCart = await response.json()
        setCart(updatedCart)
        window.dispatchEvent(new Event('cart-updated'))
      }
    } catch (error) {
      console.error('Error updating cart:', error)
    }
  }

  const removeItem = async (itemId: string) => {
    try {
      const sessionId = getSessionId()
      const response = await fetch(`/api/cart?itemId=${itemId}`, {
        method: 'DELETE',
        headers: {
          'x-session-id': sessionId,
        },
      })
      
      if (response.ok) {
        const updatedCart = await response.json()
        setCart(updatedCart)
        window.dispatchEvent(new Event('cart-updated'))
      }
    } catch (error) {
      console.error('Error removing item:', error)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Chargement du panier...</div>
      </div>
    )
  }

  const items = cart?.items || []
  const totals = calculateCartTotal(items)

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">Votre panier est vide</h1>
          <p className="text-gray-600 mb-8">
            Découvrez notre sélection de vins et spiritueux
          </p>
          <Link href="/products">
            <Button className="gap-2 bg-red-900 hover:bg-red-800">
              Continuer mes achats
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Mon Panier</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm">
            {items.map((item: CartItem) => (
              <div
                key={item.id}
                className="flex gap-4 p-4 border-b last:border-b-0"
              >
                {/* Product Image */}
                <div className="w-24 h-24 relative bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                  {item.product.images?.[0] ? (
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Wine className="h-8 w-8 text-gray-400" />
                    </div>
                  )}
                </div>
                
                {/* Product Info */}
                <div className="flex-1">
                  <Link
                    href={`/products/${item.product.slug}`}
                    className="font-semibold hover:text-red-900"
                  >
                    {item.product.name}
                  </Link>
                  <p className="text-sm text-gray-600">
                    {item.product.category.name}
                  </p>
                  <p className="text-lg font-semibold text-red-900 mt-1">
                    {formatPrice(item.product.price)}
                  </p>
                </div>
                
                {/* Quantity & Actions */}
                <div className="flex flex-col items-end gap-2">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-gray-400 hover:text-red-600"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity === 1}
                      className="w-8 h-8 rounded-md border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-8 text-center font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-md border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Récapitulatif</h2>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Sous-total</span>
                <span>{formatPrice(totals.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Livraison</span>
                <span>
                  {totals.deliveryFee === 0 
                    ? 'Gratuite' 
                    : formatPrice(totals.deliveryFee)}
                </span>
              </div>
              {totals.deliveryFee > 0 && (
                <p className="text-sm text-gray-600">
                  Livraison gratuite dès 100€ d&apos;achat
                </p>
              )}
            </div>
            
            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span className="text-red-900">{formatPrice(totals.total)}</span>
              </div>
            </div>
            
            <Link href="/checkout">
              <Button className="w-full gap-2 bg-red-900 hover:bg-red-800" size="lg">
                Passer la commande
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            
            <Link href="/products">
              <Button variant="outline" className="w-full mt-3">
                Continuer mes achats
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}