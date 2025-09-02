'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ShoppingCart, Menu, X, Wine, MapPin, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getSessionId } from '@/lib/utils/cart'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  
  useEffect(() => {
    // Récupérer le nombre d'items dans le panier
    fetchCartCount()
  }, [])
  
  const fetchCartCount = async () => {
    try {
      const sessionId = getSessionId()
      const response = await fetch('/api/cart', {
        headers: {
          'x-session-id': sessionId
        }
      })
      if (response.ok) {
        const cart = await response.json()
        const count = cart.items?.reduce((sum: number, item: any) => sum + item.quantity, 0) || 0
        setCartCount(count)
      }
    } catch (error) {
      console.error('Error fetching cart:', error)
    }
  }
  
  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      {/* Top bar */}
      <div className="bg-primary text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Phone className="h-4 w-4" />
              0262 XX XX XX
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              2 boutiques à La Réunion
            </span>
          </div>
          <div>
            Livraison gratuite dès 100€ d'achat
          </div>
        </div>
      </div>
      
      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Wine className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-primary">Cavavin</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/products" className="hover:text-primary transition">
              Nos Vins
            </Link>
            <Link href="/products?category=spiritueux" className="hover:text-primary transition">
              Spiritueux
            </Link>
            <Link href="/about" className="hover:text-primary transition">
              À Propos
            </Link>
            <Link href="/stores" className="hover:text-primary transition">
              Nos Boutiques
            </Link>
          </nav>
          
          {/* Actions */}
          <div className="flex items-center gap-4">
            <Link href="/cart">
              <Button variant="outline" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
            
            {/* Mobile menu button */}
            <Button
              variant="outline"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t pt-4">
            <div className="flex flex-col gap-3">
              <Link 
                href="/products" 
                className="hover:text-primary transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Nos Vins
              </Link>
              <Link 
                href="/products?category=spiritueux" 
                className="hover:text-primary transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Spiritueux
              </Link>
              <Link 
                href="/about" 
                className="hover:text-primary transition"
                onClick={() => setIsMenuOpen(false)}
              >
                À Propos
              </Link>
              <Link 
                href="/stores" 
                className="hover:text-primary transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Nos Boutiques
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}