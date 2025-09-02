'use client'

// Cavavin E-commerce - Version 0.1.2
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Truck, Store, Shield, Wine } from 'lucide-react'
import { Button } from '@/components/ui/button'
import FeaturedProductsSlider from '@/components/featured-products-slider'
import { ImageTrail } from '@/components/ui/image-trail'
import { useRef } from 'react'

export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null)
  
  // Images de vins pour le trail
  const wineImages = [
    '/images/products/red-wine-bordeaux.webp',
    '/images/products/white-wine-sauvignon.webp',
    '/images/products/rose-wine-provence.webp',
    '/images/products/champagne-luxury.webp',
    '/images/products/whisky-premium.webp',
    '/images/products/rum-aged.webp',
  ]

  return (
    <div>
      {/* Hero Section */}
      <section ref={heroRef} className="relative bg-gradient-to-r from-red-900 to-red-800 text-white py-24 overflow-hidden">
        <ImageTrail 
          containerRef={heroRef}
          interval={200}
          rotationRange={25}
        >
          {wineImages.map((src, index) => (
            <div key={index} className="w-20 h-20 rounded-lg overflow-hidden shadow-xl">
              <Image
                src={src}
                alt={`Wine ${index + 1}`}
                width={80}
                height={80}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </ImageTrail>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">
              Bienvenue chez Cavavin La Réunion
            </h1>
            <p className="text-xl mb-8 text-white/90">
              Découvrez notre sélection exceptionnelle de plus de 250 vins et spiritueux. 
              Livraison sur toute l&apos;île ou retrait en boutique.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/products">
                <Button size="lg" className="bg-white text-red-900 hover:bg-gray-100 gap-2">
                  Découvrir nos vins
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/stores">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-red-900">
                  Nos boutiques
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <FeaturedProductsSlider />

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-red-900" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Livraison sur toute l&apos;île</h3>
              <p className="text-gray-600">
                Livraison gratuite dès 100€ d&apos;achat. Service rapide et soigné.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Store className="h-8 w-8 text-red-900" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Click & Collect</h3>
              <p className="text-gray-600">
                Commandez en ligne et récupérez vos achats dans l&apos;une de nos 2 boutiques.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-red-900" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Paiement sécurisé</h3>
              <p className="text-gray-600">
                Transactions 100% sécurisées avec vérification d&apos;âge obligatoire.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Nos Catégories</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { name: 'Vins Rouges', slug: 'vins-rouges', color: '#722F37' },
              { name: 'Vins Blancs', slug: 'vins-blancs', color: '#F4E5C2' },
              { name: 'Vins Rosés', slug: 'vins-roses', color: '#F8C3CD' },
              { name: 'Spiritueux', slug: 'spiritueux', color: '#8B4513' },
            ].map((category) => (
              <Link
                key={category.slug}
                href={`/products?category=${category.slug}`}
                className="group relative overflow-hidden rounded-lg aspect-square"
              >
                <div 
                  className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity"
                  style={{ backgroundColor: category.color }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                  <h3 className="text-white text-xl font-semibold">{category.name}</h3>
                </div>
                <div className="w-full h-full bg-gray-200 group-hover:scale-105 transition-transform duration-300">
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
                    <Wine className="h-16 w-16 text-gray-400" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-red-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Prêt à découvrir nos produits ?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Plus de 250 références sélectionnées avec passion pour vous
          </p>
          <Link href="/products">
            <Button size="lg" className="bg-white text-red-900 hover:bg-gray-100 gap-2">
              Explorer notre catalogue
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Age Warning */}
      <section className="py-8 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            La vente d&apos;alcool est interdite aux mineurs. L&apos;abus d&apos;alcool est dangereux pour la santé. 
            À consommer avec modération.
          </p>
        </div>
      </section>
    </div>
  )
}