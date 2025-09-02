"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { categories, products } from "@/lib/data";
import { Search, Filter, X } from "lucide-react";

export default function CataloguePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = !selectedCategory || product.categoryId === selectedCategory;
      const matchesSearch = !searchQuery || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.region.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      return matchesCategory && matchesSearch && matchesPrice;
    });
  }, [selectedCategory, searchQuery, priceRange]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-champagne/5">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-wine-700 to-wine-900 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Notre Catalogue</h1>
          <p className="text-xl text-wine-300">
            Plus de 250 références soigneusement sélectionnées
          </p>
        </div>
      </section>

      {/* Search Bar */}
      <section className="sticky top-20 z-40 bg-white shadow-md py-4">
        <div className="container mx-auto px-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un vin, une région, un cépage..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-wine-500"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden px-4 py-3 bg-wine-700 text-white rounded-lg flex items-center gap-2"
            >
              <Filter className="h-5 w-5" />
              Filtres
            </button>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className={`${showFilters ? 'fixed inset-0 z-50 bg-black/50 md:relative md:inset-auto md:bg-transparent' : 'hidden md:block'} md:w-64`}>
            <div className={`${showFilters ? 'fixed right-0 top-0 h-full w-80 bg-white p-6 overflow-y-auto' : ''} md:sticky md:top-32`}>
              {/* Mobile Close Button */}
              {showFilters && (
                <button
                  onClick={() => setShowFilters(false)}
                  className="md:hidden absolute right-4 top-4 p-2"
                >
                  <X className="h-6 w-6" />
                </button>
              )}
              
              <h2 className="text-xl font-bold mb-6">Filtres</h2>
              
              {/* Categories */}
              <div className="mb-8">
                <h3 className="font-semibold mb-4">Catégories</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory("")}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      !selectedCategory ? 'bg-wine-700 text-white' : 'hover:bg-wine-300/20'
                    }`}
                  >
                    Tous les produits ({products.length})
                  </button>
                  {categories.map((category) => {
                    const count = products.filter(p => p.categoryId === category.id).length;
                    return (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                          selectedCategory === category.id ? 'bg-wine-700 text-white' : 'hover:bg-wine-300/20'
                        }`}
                      >
                        {category.name} ({count})
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-8">
                <h3 className="font-semibold mb-4">Prix</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-600">Prix min: {priceRange[0]}€</label>
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Prix max: {priceRange[1]}€</label>
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Reset Filters */}
              <button
                onClick={() => {
                  setSelectedCategory("");
                  setSearchQuery("");
                  setPriceRange([0, 1000]);
                }}
                className="w-full px-4 py-2 border border-wine-700 text-wine-700 rounded-lg hover:bg-wine-700 hover:text-white transition-colors"
              >
                Réinitialiser les filtres
              </button>
            </div>
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}
              </p>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-xl text-gray-500 mb-4">Aucun produit ne correspond à votre recherche</p>
                <button
                  onClick={() => {
                    setSelectedCategory("");
                    setSearchQuery("");
                    setPriceRange([0, 1000]);
                  }}
                  className="px-6 py-3 bg-wine-700 text-white rounded-lg hover:bg-wine-900 transition-colors"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => {
                  const category = categories.find(c => c.id === product.categoryId);
                  return (
                    <Link
                      key={product.id}
                      href={`/produit/${product.slug}`}
                      className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden"
                    >
                      <div className="aspect-[3/4] bg-gradient-to-b from-champagne/10 to-white p-6 flex items-center justify-center relative">
                        <div className="w-24 h-32 bg-wine-700/5 rounded-lg" />
                        {product.featured && (
                          <span className="absolute top-4 right-4 px-3 py-1 bg-wine-700 text-white text-xs rounded-full">
                            Coup de cœur
                          </span>
                        )}
                      </div>
                      
                      <div className="p-5">
                        <div className="flex items-center gap-2 mb-2">
                          <span 
                            className="px-2 py-1 text-xs rounded-full text-white"
                            style={{ backgroundColor: category?.color }}
                          >
                            {category?.name}
                          </span>
                          {product.year && (
                            <span className="text-xs text-gray-500">{product.year}</span>
                          )}
                        </div>
                        
                        <h3 className="font-bold text-lg mb-1 text-wine-900 group-hover:text-wine-700 transition-colors line-clamp-1">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-1">{product.region}</p>
                        <p className="text-xs text-gray-500 mb-3 line-clamp-2">{product.description}</p>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-xl font-bold text-wine-700">{product.price.toFixed(2)}€</span>
                          {product.stock < 10 && (
                            <span className="text-xs text-orange-600">Stock limité</span>
                          )}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}