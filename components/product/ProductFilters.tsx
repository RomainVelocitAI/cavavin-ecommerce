'use client'

import { useState } from 'react'
import { ChevronDown, Filter } from 'lucide-react'

interface ProductFiltersProps {
  categories: Array<{
    id: string
    name: string
    slug: string
  }>
  onFilterChange: (filters: {
    category?: string
    sort?: string
    priceRange?: [number, number]
  }) => void
}

export function ProductFilters({ categories, onFilterChange }: ProductFiltersProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedSort, setSelectedSort] = useState<string>('newest')
  
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    onFilterChange({ category, sort: selectedSort })
  }
  
  const handleSortChange = (sort: string) => {
    setSelectedSort(sort)
    onFilterChange({ category: selectedCategory, sort })
  }
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="h-5 w-5 text-gray-600" />
        <h3 className="font-semibold">Filtres</h3>
      </div>
      
      {/* Catégories */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Catégories</h4>
        <div className="space-y-2">
          <button
            onClick={() => handleCategoryChange('')}
            className={`block w-full text-left px-3 py-2 rounded-md transition ${
              selectedCategory === '' 
                ? 'bg-primary text-white' 
                : 'hover:bg-gray-100'
            }`}
          >
            Tous les produits
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.slug)}
              className={`block w-full text-left px-3 py-2 rounded-md transition ${
                selectedCategory === category.slug 
                  ? 'bg-primary text-white' 
                  : 'hover:bg-gray-100'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
      
      {/* Tri */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Trier par</h4>
        <select
          value={selectedSort}
          onChange={(e) => handleSortChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="newest">Plus récents</option>
          <option value="name">Nom (A-Z)</option>
          <option value="price-asc">Prix croissant</option>
          <option value="price-desc">Prix décroissant</option>
        </select>
      </div>
    </div>
  )
}