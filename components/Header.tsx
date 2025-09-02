"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ShoppingCart, User, Wine } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount] = useState(0);

  const navigation = [
    { name: "Accueil", href: "/" },
    { name: "Catalogue", href: "/catalogue" },
    { name: "Nos Boutiques", href: "/boutiques" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-wine-300/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Wine className="h-8 w-8 text-wine-700" />
            <span className="text-2xl font-bold text-wine-900">Cavavin</span>
            <span className="hidden md:inline text-sm text-wine-500">La Réunion</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-wine-700 hover:text-wine-900 transition-colors font-medium"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-wine-300/10 rounded-full transition-colors">
              <User className="h-5 w-5 text-wine-700" />
            </button>
            
            <Link href="/panier" className="relative p-2 hover:bg-wine-300/10 rounded-full transition-colors">
              <ShoppingCart className="h-5 w-5 text-wine-700" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-wine-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-wine-300/10 rounded-full transition-colors"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-wine-700" />
              ) : (
                <Menu className="h-6 w-6 text-wine-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-wine-300/20">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block py-3 px-4 text-wine-700 hover:bg-wine-300/10 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}