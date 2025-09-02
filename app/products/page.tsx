'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Wine, Filter, Grid, List } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getProducts, getCategories } from '@/lib/supabase/client'
import { formatPrice } from '@/lib/utils/cart'

interface Product {
  id: string
  name: string
  slug: string
  description: string | null
  price: number
  images: string[]
  category: {
    id: string
    name: string
    slug: string
  }
  vintage?: number | null
  region?: string | null
  inStock: boolean
}

interface Category {
  id: string
  name: string
  slug: string
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'name'>('name')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  useEffect(() => {
    // Get category from URL params
    const params = new URLSearchParams(window.location.search)
    const categoryParam = params.get('category')
    if (categoryParam) {
      setSelectedCategory(categoryParam)
    }
    
    fetchData()
  }, [])

  useEffect(() => {
    fetchProducts()
  }, [selectedCategory, sortBy])

  const fetchData = async () => {
    try {
      const [productsData, categoriesData] = await Promise.all([
        getProducts(),
        getCategories()
      ])
      
      setProducts(productsData.products || [])
      setCategories(categoriesData || [])
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const data = await getProducts({ 
        category: selectedCategory || undefined 
      })
      
      let sortedProducts = [...(data.products || [])]
      
      // Apply sorting
      switch (sortBy) {
        case 'price-asc':
          sortedProducts.sort((a, b) => a.price - b.price)
          break
        case 'price-desc':
          sortedProducts.sort((a, b) => b.price - a.price)
          break
        case 'name':
          sortedProducts.sort((a, b) => a.name.localeCompare(b.name))
          break
      }
      
      setProducts(sortedProducts)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading && products.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-10 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="h-96 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Notre Catalogue</h1>
          <p className="text-gray-600">
            Découvrez notre sélection de vins et spiritueux d&apos;exception
          </p>
        </div>

        {/* Filters and Controls */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-900"
              >
                <option value="">Toutes les catégories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.slug}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Trier par:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-900"
              >
                <option value="name">Nom</option>
                <option value="price-asc">Prix croissant</option>
                <option value="price-desc">Prix décroissant</option>
              </select>
            </div>

            {/* View Mode */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${
                  viewMode === 'grid' 
                    ? 'bg-red-900 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${
                  viewMode === 'list' 
                    ? 'bg-red-900 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 text-gray-600">
          {products.length} produit{products.length > 1 ? 's' : ''} trouvé{products.length > 1 ? 's' : ''}
        </div>

        {/* Products Grid/List */}
        {products.length > 0 ? (
          <div className={
            viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6'
              : 'space-y-4'
          }>
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/produit/${product.slug}`}
                className={
                  viewMode === 'grid'
                    ? 'group'
                    : 'block'
                }
              >
                <div className={`bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow ${
                  viewMode === 'list' ? 'flex' : ''
                }`}>
                  <div className={`relative bg-gray-100 ${
                    viewMode === 'grid' ? 'h-64' : 'w-48 h-48'
                  }`}>
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
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <span className="text-white font-semibold">Rupture de stock</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4 flex-1">
                    <p className="text-sm text-gray-600 mb-1">{product.category.name}</p>
                    <h3 className="font-semibold text-lg mb-2">
                      {product.name}
                    </h3>
                    {product.region && (
                      <p className="text-sm text-gray-600 mb-2">{product.region}</p>
                    )}
                    {viewMode === 'list' && product.description && (
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {product.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-red-900">
                        {formatPrice(product.price)}
                      </span>
                      {product.vintage && (
                        <span className="text-sm text-gray-600">
                          Millésime {product.vintage}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Wine className="h-24 w-24 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-600 mb-2">
              Aucun produit trouvé
            </h2>
            <p className="text-gray-500">
              Essayez de modifier vos filtres ou revenez plus tard
            </p>
          </div>
        )}
      </div>
    </div>
  )
}