'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { formatPrice } from '@/lib/utils/cart'
import { useCart } from '@/contexts/CartContext'
import { useState } from 'react'
import { Toast } from '@/components/ui/toast'

interface ProductCardProps {
  product: {
    id: string
    name: string
    slug: string
    price: number
    images: string[]
    category: {
      name: string
    }
    vintage?: number | null
    region?: string | null
    inStock: boolean
  }
  onAddToCart?: (productId: string) => void
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const imageUrl = product.images?.[0] || '/images/wine-placeholder.jpg'
  const { addToCart } = useCart()
  const [showToast, setShowToast] = useState(false)
  
  const handleAddToCart = () => {
    if (onAddToCart) {
      // If parent provided a handler, use it (for compatibility)
      onAddToCart(product.id)
    } else {
      // Otherwise use CartContext directly
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images?.[0] || null,
        quantity: 1
      })
      setShowToast(true)
    }
  }
  
  return (
    <div className="group relative">
      <Link href={`/produit/${product.slug}`}>
        <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-semibold">Rupture de stock</span>
            </div>
          )}
        </div>
      </Link>
      
      <div className="mt-4 space-y-2">
        <div>
          <p className="text-sm text-gray-500">{product.category.name}</p>
          <Link href={`/produit/${product.slug}`}>
            <h3 className="text-base font-semibold text-gray-900 hover:text-primary">
              {product.name}
            </h3>
          </Link>
          <div className="text-sm text-gray-600">
            {product.vintage && <span>{product.vintage} • </span>}
            {product.region && <span>{product.region}</span>}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold text-primary">
            {formatPrice(product.price)}
          </p>
          {product.inStock && (
            <Button
              size="sm"
              variant="outline"
              onClick={(e) => {
                e.preventDefault()
                handleAddToCart()
              }}
              className="gap-2"
            >
              <ShoppingCart className="h-4 w-4" />
              Ajouter
            </Button>
          )}
        </div>
      </div>
      
      {/* Success Toast if no parent handler */}
      {showToast && !onAddToCart && (
        <Toast
          message="Produit ajouté au panier avec succès!"
          type="success"
          duration={3000}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  )
}