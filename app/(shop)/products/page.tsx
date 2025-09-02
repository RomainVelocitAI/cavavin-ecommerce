'use client'

import { useState, useEffect } from 'react'
import { ProductCard } from '@/components/product/ProductCard'
import { ProductFilters } from '@/components/product/ProductFilters'
import { getSessionId } from '@/lib/utils/cart'
import { getProducts as fetchProducts, getCategories } from '@/lib/supabase/client'
import { Loader2 } from 'lucide-react'

interface Product {
  id: string
  name: string
  price: number
  slug: string
  description?: string
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


export default function ProductsPage() {
  const [categories, setCategories] = useState<any[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    category: '',
    sort: 'newest',
  })
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    loadCategories()
  }, [])

  useEffect(() => {
    loadProducts()
  }, [filters, page])

  const loadCategories = async () => {
    try {
      const cats = await getCategories()
      setCategories(cats || [])
    } catch (error) {
      console.error('Error loading categories:', error)
    }
  }

  const loadProducts = async () => {
    setLoading(true)
    try {
      const { products: data, pagination } = await fetchProducts({
        page,
        limit: 12,
        category: filters.category || undefined,
        sort: filters.sort,
      })
      
      setProducts(data || [])
      setTotalPages(pagination?.totalPages || 1)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = async (productId: string) => {
    try {
      const sessionId = getSessionId()
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-session-id': sessionId,
        },
        body: JSON.stringify({ productId, quantity: 1 }),
      })
      
      if (response.ok) {
        // Optionally show a success message
        alert('Produit ajouté au panier!')
        // Refresh cart count in header
        window.dispatchEvent(new Event('cart-updated'))
      }
    } catch (error) {
      console.error('Error adding to cart:', error)
      alert('Erreur lors de l&apos;ajout au panier')
    }
  }

  const handleFilterChange = (newFilters: { category?: string; sort?: string; priceRange?: [number, number] }) => {
    setFilters({
      category: newFilters.category || '',
      sort: newFilters.sort || 'newest'
    })
    setPage(1) // Reset to first page when filters change
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Nos Produits</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters */}
        <div className="lg:col-span-1">
          <ProductFilters
            categories={categories}
            onFilterChange={handleFilterChange}
          />
        </div>
        
        {/* Products Grid */}
        <div className="lg:col-span-3">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
            </div>
          ) : products.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8 flex justify-center gap-2">
                  <button
                    onClick={() => setPage(Math.max(1, page - 1))}
                    disabled={page === 1}
                    className="px-4 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Précédent
                  </button>
                  <span className="px-4 py-2">
                    Page {page} sur {totalPages}
                  </span>
                  <button
                    onClick={() => setPage(Math.min(totalPages, page + 1))}
                    disabled={page === totalPages}
                    className="px-4 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Suivant
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12 text-gray-500">
              Aucun produit trouvé
            </div>
          )}
        </div>
      </div>
    </div>
  )
}