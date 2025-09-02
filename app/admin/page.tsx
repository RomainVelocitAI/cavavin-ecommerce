'use client'

import { useState, useEffect } from 'react'
import { 
  Search, 
  Edit2, 
  Save, 
  X, 
  Star, 
  StarOff,
  Filter,
  ChevronUp,
  ChevronDown,
  Package
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase/client'
import { formatPrice } from '@/lib/utils/cart'
import { Toast } from '@/components/ui/toast'

interface Product {
  id: string
  name: string
  slug: string
  description: string | null
  price: number
  images: string | null
  categoryId: string
  vintage: number | null
  region: string | null
  grapeVariety: string | null
  alcoholContent: number | null
  servingTemp: string | null
  tastingNotes: string | null
  foodPairing: string | null
  inStock: boolean
  stockQuantity: number
  featured: boolean
  createdAt: string
  updatedAt: string
  category?: {
    id: string
    name: string
    slug: string
  }
}

interface EditingPrice {
  id: string
  value: string
}

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [editingPrice, setEditingPrice] = useState<EditingPrice | null>(null)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState<'success' | 'error'>('success')
  const [filterFeatured, setFilterFeatured] = useState<'all' | 'featured' | 'not-featured'>('all')
  const [filterStock, setFilterStock] = useState<'all' | 'in-stock' | 'out-of-stock'>('all')
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'stock' | 'updated'>('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    filterAndSortProducts()
  }, [products, searchTerm, filterFeatured, filterStock, sortBy, sortOrder])

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('Product')
        .select(`
          *,
          category:Category(id, name, slug)
        `)
        .order('name')

      if (error) throw error
      setProducts(data || [])
    } catch (error) {
      console.error('Error fetching products:', error)
      showNotification('Erreur lors du chargement des produits', 'error')
    } finally {
      setLoading(false)
    }
  }

  const filterAndSortProducts = () => {
    let filtered = [...products]

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.region?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category?.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Featured filter
    if (filterFeatured === 'featured') {
      filtered = filtered.filter(product => product.featured)
    } else if (filterFeatured === 'not-featured') {
      filtered = filtered.filter(product => !product.featured)
    }

    // Stock filter
    if (filterStock === 'in-stock') {
      filtered = filtered.filter(product => product.inStock && product.stockQuantity > 0)
    } else if (filterStock === 'out-of-stock') {
      filtered = filtered.filter(product => !product.inStock || product.stockQuantity === 0)
    }

    // Sorting
    filtered.sort((a, b) => {
      let comparison = 0
      
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name)
          break
        case 'price':
          comparison = a.price - b.price
          break
        case 'stock':
          comparison = a.stockQuantity - b.stockQuantity
          break
        case 'updated':
          comparison = new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
          break
      }

      return sortOrder === 'asc' ? comparison : -comparison
    })

    setFilteredProducts(filtered)
  }

  const showNotification = (message: string, type: 'success' | 'error') => {
    setToastMessage(message)
    setToastType(type)
    setShowToast(true)
  }

  const handlePriceEdit = (product: Product) => {
    setEditingPrice({
      id: product.id,
      value: product.price.toString()
    })
  }

  const handlePriceSave = async () => {
    if (!editingPrice) return

    const newPrice = parseFloat(editingPrice.value)
    if (isNaN(newPrice) || newPrice < 0) {
      showNotification('Prix invalide', 'error')
      return
    }

    try {
      const { error } = await supabase
        .from('Product')
        .update({ 
          price: newPrice,
          updatedAt: new Date().toISOString()
        })
        .eq('id', editingPrice.id)

      if (error) throw error

      setProducts(products.map(p => 
        p.id === editingPrice.id 
          ? { ...p, price: newPrice, updatedAt: new Date().toISOString() }
          : p
      ))
      
      setEditingPrice(null)
      showNotification('Prix mis à jour avec succès', 'success')
    } catch (error) {
      console.error('Error updating price:', error)
      showNotification('Erreur lors de la mise à jour du prix', 'error')
    }
  }

  const toggleFeatured = async (product: Product) => {
    try {
      const newFeatured = !product.featured
      
      const { error } = await supabase
        .from('Product')
        .update({ 
          featured: newFeatured,
          updatedAt: new Date().toISOString()
        })
        .eq('id', product.id)

      if (error) throw error

      setProducts(products.map(p => 
        p.id === product.id 
          ? { ...p, featured: newFeatured, updatedAt: new Date().toISOString() }
          : p
      ))
      
      showNotification(
        newFeatured 
          ? 'Produit ajouté aux produits vedettes' 
          : 'Produit retiré des produits vedettes',
        'success'
      )
    } catch (error) {
      console.error('Error updating featured status:', error)
      showNotification('Erreur lors de la mise à jour', 'error')
    }
  }

  const toggleStock = async (product: Product) => {
    try {
      const newInStock = !product.inStock
      
      const { error } = await supabase
        .from('Product')
        .update({ 
          inStock: newInStock,
          updatedAt: new Date().toISOString()
        })
        .eq('id', product.id)

      if (error) throw error

      setProducts(products.map(p => 
        p.id === product.id 
          ? { ...p, inStock: newInStock, updatedAt: new Date().toISOString() }
          : p
      ))
      
      showNotification(
        newInStock 
          ? 'Produit marqué comme disponible' 
          : 'Produit marqué comme indisponible',
        'success'
      )
    } catch (error) {
      console.error('Error updating stock status:', error)
      showNotification('Erreur lors de la mise à jour du stock', 'error')
    }
  }

  const updateStockQuantity = async (productId: string, quantity: number) => {
    if (quantity < 0) return

    try {
      const { error } = await supabase
        .from('Product')
        .update({ 
          stockQuantity: quantity,
          inStock: quantity > 0,
          updatedAt: new Date().toISOString()
        })
        .eq('id', productId)

      if (error) throw error

      setProducts(products.map(p => 
        p.id === productId 
          ? { ...p, stockQuantity: quantity, inStock: quantity > 0, updatedAt: new Date().toISOString() }
          : p
      ))
      
      showNotification('Stock mis à jour', 'success')
    } catch (error) {
      console.error('Error updating stock quantity:', error)
      showNotification('Erreur lors de la mise à jour du stock', 'error')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Chargement des produits...</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Gestion des Produits</h1>
        <p className="text-gray-600">
          Gérez vos produits, modifiez les prix et sélectionnez les produits vedettes
        </p>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Search */}
          <div className="lg:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un produit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-wine-700"
              />
            </div>
          </div>

          {/* Featured Filter */}
          <select
            value={filterFeatured}
            onChange={(e) => setFilterFeatured(e.target.value as typeof filterFeatured)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-wine-700"
          >
            <option value="all">Tous les produits</option>
            <option value="featured">Produits vedettes</option>
            <option value="not-featured">Non vedettes</option>
          </select>

          {/* Stock Filter */}
          <select
            value={filterStock}
            onChange={(e) => setFilterStock(e.target.value as typeof filterStock)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-wine-700"
          >
            <option value="all">Tout stock</option>
            <option value="in-stock">En stock</option>
            <option value="out-of-stock">Rupture</option>
          </select>

          {/* Sort */}
          <select
            value={`${sortBy}-${sortOrder}`}
            onChange={(e) => {
              const [newSortBy, newSortOrder] = e.target.value.split('-')
              setSortBy(newSortBy as typeof sortBy)
              setSortOrder(newSortOrder as typeof sortOrder)
            }}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-wine-700"
          >
            <option value="name-asc">Nom (A-Z)</option>
            <option value="name-desc">Nom (Z-A)</option>
            <option value="price-asc">Prix croissant</option>
            <option value="price-desc">Prix décroissant</option>
            <option value="stock-asc">Stock croissant</option>
            <option value="stock-desc">Stock décroissant</option>
            <option value="updated-desc">Récemment modifié</option>
          </select>
        </div>

        {/* Results count */}
        <div className="mt-4 text-sm text-gray-600">
          {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}
          {filterFeatured === 'featured' && ` (${filteredProducts.length} vedette${filteredProducts.length > 1 ? 's' : ''})`}
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Produit
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Catégorie
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Prix
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vedette
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Disponible
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {product.name}
                      </div>
                      {product.region && (
                        <div className="text-sm text-gray-500">{product.region}</div>
                      )}
                      {product.vintage && (
                        <div className="text-xs text-gray-400">Millésime {product.vintage}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">
                      {product.category?.name || 'Non catégorisé'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {editingPrice?.id === product.id ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={editingPrice.value}
                          onChange={(e) => setEditingPrice({
                            ...editingPrice,
                            value: e.target.value
                          })}
                          className="w-24 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-wine-700"
                          step="0.01"
                          min="0"
                        />
                        <button
                          onClick={handlePriceSave}
                          className="p-1 text-green-600 hover:bg-green-50 rounded"
                        >
                          <Save className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setEditingPrice(null)}
                          className="p-1 text-red-600 hover:bg-red-50 rounded"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold">
                          {formatPrice(product.price)}
                        </span>
                        <button
                          onClick={() => handlePriceEdit(product)}
                          className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={product.stockQuantity}
                        onChange={(e) => updateStockQuantity(product.id, parseInt(e.target.value))}
                        className="w-20 px-2 py-1 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-wine-700"
                        min="0"
                      />
                      <span className="text-xs text-gray-500">unités</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => toggleFeatured(product)}
                      className={`p-2 rounded-lg transition ${
                        product.featured
                          ? 'text-yellow-600 bg-yellow-50 hover:bg-yellow-100'
                          : 'text-gray-400 hover:text-yellow-600 hover:bg-yellow-50'
                      }`}
                    >
                      {product.featured ? (
                        <Star className="h-5 w-5 fill-current" />
                      ) : (
                        <StarOff className="h-5 w-5" />
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => toggleStock(product)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                        product.inStock
                          ? 'bg-green-100 text-green-800 hover:bg-green-200'
                          : 'bg-red-100 text-red-800 hover:bg-red-200'
                      }`}
                    >
                      {product.inStock ? 'En stock' : 'Rupture'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Aucun produit trouvé</p>
            </div>
          )}
        </div>
      </div>

      {/* Statistics */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <p className="text-sm text-gray-600 mb-1">Total produits</p>
          <p className="text-2xl font-bold">{products.length}</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <p className="text-sm text-gray-600 mb-1">Produits vedettes</p>
          <p className="text-2xl font-bold text-yellow-600">
            {products.filter(p => p.featured).length}
          </p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <p className="text-sm text-gray-600 mb-1">En stock</p>
          <p className="text-2xl font-bold text-green-600">
            {products.filter(p => p.inStock && p.stockQuantity > 0).length}
          </p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <p className="text-sm text-gray-600 mb-1">Rupture de stock</p>
          <p className="text-2xl font-bold text-red-600">
            {products.filter(p => !p.inStock || p.stockQuantity === 0).length}
          </p>
        </div>
      </div>

      {/* Toast */}
      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          duration={3000}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  )
}