'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Wine, Plus, Minus, ShoppingCart, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { formatPrice, getSessionId } from '@/lib/utils/cart'

interface ProductDetailProps {
  product: {
    id: string
    name: string
    slug: string
    description: string
    price: number
    images: string[]
    category: {
      name: string
      slug: string
    }
    vintage?: number | null
    region?: string | null
    grapeVariety?: string | null
    alcoholContent?: number | null
    servingTemp?: string | null
    tastingNotes?: string | null
    foodPairing?: string | null
    inStock: boolean
    stockQuantity: number
  }
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [loading, setLoading] = useState(false)

  const handleAddToCart = () => {
    // Utilisation du contexte panier à implémenter
    alert('✅ Produit ajouté au panier!')
    
    // Pour l'instant on utilise juste une alerte
    // Le CartContext doit être intégré ici
  }

  const imageUrl = product.images?.[selectedImage] || '/images/wine-placeholder.jpg'

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link 
          href="/products"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour aux produits
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Images */}
        <div>
          <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-100 mb-4">
            {product.images && product.images.length > 0 ? (
              <Image
                src={imageUrl}
                alt={product.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Wine className="h-24 w-24 text-gray-400" />
              </div>
            )}
          </div>
          
          {/* Thumbnails */}
          {product.images && product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square relative overflow-hidden rounded-md border-2 ${
                    selectedImage === index ? 'border-red-900' : 'border-gray-200'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <div className="mb-4">
            <Link 
              href={`/products?category=${product.category.slug}`}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              {product.category.name}
            </Link>
          </div>
          
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          
          <div className="text-3xl font-bold text-red-900 mb-6">
            {formatPrice(product.price)}
          </div>

          <p className="text-gray-700 mb-6">{product.description}</p>

          {/* Wine Details */}
          <div className="border-t border-b py-6 mb-6 space-y-3">
            {product.vintage && (
              <div className="flex justify-between">
                <span className="text-gray-600">Millésime:</span>
                <span className="font-medium">{product.vintage}</span>
              </div>
            )}
            {product.region && (
              <div className="flex justify-between">
                <span className="text-gray-600">Région:</span>
                <span className="font-medium">{product.region}</span>
              </div>
            )}
            {product.grapeVariety && (
              <div className="flex justify-between">
                <span className="text-gray-600">Cépage:</span>
                <span className="font-medium">{product.grapeVariety}</span>
              </div>
            )}
            {product.alcoholContent && (
              <div className="flex justify-between">
                <span className="text-gray-600">Degré d&apos;alcool:</span>
                <span className="font-medium">{product.alcoholContent}%</span>
              </div>
            )}
            {product.servingTemp && (
              <div className="flex justify-between">
                <span className="text-gray-600">Température de service:</span>
                <span className="font-medium">{product.servingTemp}</span>
              </div>
            )}
          </div>

          {/* Tasting Notes */}
          {product.tastingNotes && (
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Notes de dégustation</h3>
              <p className="text-gray-700">{product.tastingNotes}</p>
            </div>
          )}

          {/* Food Pairing */}
          {product.foodPairing && (
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Accords mets et vins</h3>
              <p className="text-gray-700">{product.foodPairing}</p>
            </div>
          )}

          {/* Add to Cart */}
          {product.inStock ? (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-gray-600">Quantité:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-md border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}
                    className="w-10 h-10 rounded-md border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <Button
                onClick={handleAddToCart}
                disabled={loading}
                className="w-full gap-2 bg-red-900 hover:bg-red-800"
                size="lg"
              >
                <ShoppingCart className="h-5 w-5" />
                {loading ? 'Ajout en cours...' : 'Ajouter au panier'}
              </Button>
              
              <p className="text-sm text-gray-500">
                Stock disponible: {product.stockQuantity} unités
              </p>
            </div>
          ) : (
            <div className="bg-gray-100 rounded-md p-4 text-center">
              <p className="text-gray-600">Produit actuellement indisponible</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}