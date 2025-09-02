import Link from 'next/link'
import { Wine, MapPin, Phone, Mail, Clock } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* À propos */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Wine className="h-6 w-6" />
              <span className="text-xl font-bold">Cavavin La Réunion</span>
            </div>
            <p className="text-gray-400 text-sm">
              Votre caviste de référence à La Réunion. 
              Plus de 250 références de vins et spiritueux sélectionnés avec passion.
            </p>
          </div>
          
          {/* Liens rapides */}
          <div>
            <h3 className="font-semibold mb-4">Liens Rapides</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/products" className="hover:text-white transition">
                  Nos Produits
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition">
                  À Propos
                </Link>
              </li>
              <li>
                <Link href="/stores" className="hover:text-white transition">
                  Nos Boutiques
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Informations légales */}
          <div>
            <h3 className="font-semibold mb-4">Informations</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/cgv" className="hover:text-white transition">
                  CGV
                </Link>
              </li>
              <li>
                <Link href="/mentions-legales" className="hover:text-white transition">
                  Mentions Légales
                </Link>
              </li>
              <li>
                <Link href="/livraison" className="hover:text-white transition">
                  Livraison
                </Link>
              </li>
              <li>
                <Link href="/age-verification" className="hover:text-white transition">
                  Vérification d'âge
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>0262 XX XX XX</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>contact@cavavin-reunion.re</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Lun-Sam: 9h-19h</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Saint-Denis & Saint-Pierre</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>© 2024 Cavavin La Réunion. Tous droits réservés.</p>
          <p className="mt-2">
            L'abus d'alcool est dangereux pour la santé. À consommer avec modération.
          </p>
        </div>
      </div>
    </footer>
  )
}