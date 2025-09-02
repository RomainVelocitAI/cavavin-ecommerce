'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Wine } from 'lucide-react'
import { formatPrice } from '@/lib/utils/cart'
import { getApiUrl, API_CONFIG } from '@/lib/config/api'

interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  images: string[]
  category: {
    name: string
  }
  vintage?: number
  region?: string
}

export default function FeaturedProductsSlider() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [isPaused, setIsPaused] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)
  const scrollSpeed = 1 // Pixels per frame

  useEffect(() => {
    fetchFeaturedProducts()
  }, [])

  useEffect(() => {
    if (products.length > 0 && !isPaused) {
      startAnimation()
    } else {
      stopAnimation()
    }
    
    return () => {
      stopAnimation()
    }
  }, [products, isPaused])

  const fetchFeaturedProducts = async () => {
    try {
      // Utilise l'API Render au lieu de l'API locale
      const response = await fetch(`${getApiUrl(API_CONFIG.endpoints.products)}?featured=true&limit=10`)
      const data = await response.json()
      // Dupliquer les produits pour créer un effet de boucle infinie
      if (data.products && data.products.length > 0) {
        setProducts([...data.products, ...data.products])
      }
    } catch (error) {
      console.error('Error fetching featured products:', error)
    } finally {
      setLoading(false)
    }
  }

  const startAnimation = () => {
    const animate = () => {
      if (scrollContainerRef.current && !isPaused) {
        const container = scrollContainerRef.current
        const maxScroll = container.scrollWidth / 2 // Moitié car on a dupliqué les produits
        
        // Si on a atteint la fin du premier set de produits
        if (container.scrollLeft >= maxScroll) {
          // Reset instantané pour créer une boucle parfaite
          container.scrollLeft = 0
        } else {
          // Continuer le défilement fluide
          container.scrollLeft += scrollSpeed
        }
      }
      animationRef.current = requestAnimationFrame(animate)
    }
    animationRef.current = requestAnimationFrame(animate)
  }

  const stopAnimation = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = null
    }
  }

  if (loading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Nos Produits Vedettes</h2>
          <div className="flex gap-4 overflow-hidden">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="min-w-[300px] h-[400px] bg-gray-200 animate-pulse rounded-lg" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (products.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-center">Nos Produits Vedettes</h2>
          <p className="text-gray-600 mt-2 text-center">Découvrez notre sélection exclusive</p>
        </div>

        <div 
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-hidden pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {products.map((product, index) => (
              <Link
                key={`${product.id}-${index}`}
                href={`/products/${product.slug}`}
                className="min-w-[300px] flex-shrink-0 group"
              >
                <div className="bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-64 bg-gray-100">
                    {product.images && product.images[0] ? (
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Wine className="h-16 w-16 text-gray-400" />
                      </div>
                    )}
                    {product.vintage && (
                      <span className="absolute top-2 right-2 bg-red-900 text-white px-2 py-1 rounded text-sm">
                        {product.vintage}
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-gray-600 mb-1">{product.category.name}</p>
                    <h3 className="font-semibold text-lg mb-1 line-clamp-1">
                      {product.name}
                    </h3>
                    {product.region && (
                      <p className="text-sm text-gray-600 mb-2">{product.region}</p>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-red-900">
                        {formatPrice(product.price)}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}