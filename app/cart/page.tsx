'use client'

import { useCart } from '@/contexts/CartContext'
import Link from 'next/link'
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h1 className="text-3xl font-bold mb-4">Votre panier est vide</h1>
            <p className="text-gray-600 mb-8">
              Découvrez notre sélection de vins et spiritueux d&apos;exception
            </p>
            <Link href="/products">
              <Button className="bg-wine-700 hover:bg-wine-900">
                Découvrir nos produits
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link 
              href="/products"
              className="inline-flex items-center gap-2 text-wine-700 hover:text-wine-900 mb-4"
            >
              <ArrowLeft className="h-5 w-5" />
              Continuer mes achats
            </Link>
            <h1 className="text-3xl font-bold">Mon panier</h1>
          </div>

          {/* Cart Items */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-4 py-4 border-b last:border-0">
                {/* Product Image */}
                <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                  {item.image ? (
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-contain rounded-lg"
                    />
                  ) : (
                    <ShoppingBag className="h-8 w-8 text-gray-400" />
                  )}
                </div>

                {/* Product Info */}
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-wine-700 font-medium">{item.price.toFixed(2)}€</p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 rounded-md border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-12 text-center font-medium">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 rounded-md border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                {/* Subtotal */}
                <div className="text-right">
                  <p className="font-semibold">{(item.price * item.quantity).toFixed(2)}€</p>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-semibold">Total</span>
              <span className="text-2xl font-bold text-wine-700">{totalPrice.toFixed(2)}€</span>
            </div>
            
            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={clearCart}
                className="flex-1"
              >
                Vider le panier
              </Button>
              <Button 
                className="flex-1 bg-wine-700 hover:bg-wine-900"
                onClick={() => alert('Fonctionnalité de paiement à venir')}
              >
                Passer commande
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}