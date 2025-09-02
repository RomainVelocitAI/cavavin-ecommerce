import Link from "next/link";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-wine-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* À propos */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-champagne">Cavavin La Réunion</h3>
            <p className="text-wine-300 mb-4">
              Votre caviste de référence depuis 1985. Une sélection exceptionnelle de vins et spiritueux du monde entier.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-champagne transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-champagne transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Boutique Saint-Denis */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-champagne">Boutique Saint-Denis</h3>
            <div className="space-y-2 text-wine-300">
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                <span className="text-sm">123 Rue Maréchal Leclerc, 97400 Saint-Denis</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span className="text-sm">0262 12 34 56</span>
              </div>
              <div className="flex items-start space-x-2">
                <Clock className="h-4 w-4 mt-1" />
                <div className="text-sm">
                  <p>Lun-Sam: 9h30-19h30</p>
                  <p>Dim: 9h30-12h30</p>
                </div>
              </div>
            </div>
          </div>

          {/* Boutique Saint-Pierre */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-champagne">Boutique Saint-Pierre</h3>
            <div className="space-y-2 text-wine-300">
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                <span className="text-sm">456 Avenue des Indes, 97410 Saint-Pierre</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span className="text-sm">0262 78 90 12</span>
              </div>
              <div className="flex items-start space-x-2">
                <Clock className="h-4 w-4 mt-1" />
                <div className="text-sm">
                  <p>Lun-Sam: 9h30-19h30</p>
                  <p>Dim: Fermé</p>
                </div>
              </div>
            </div>
          </div>

          {/* Liens utiles */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-champagne">Informations</h3>
            <ul className="space-y-2 text-wine-300">
              <li>
                <Link href="/livraison" className="hover:text-champagne transition-colors text-sm">
                  Livraison & Retours
                </Link>
              </li>
              <li>
                <Link href="/cgv" className="hover:text-champagne transition-colors text-sm">
                  Conditions Générales
                </Link>
              </li>
              <li>
                <Link href="/mentions-legales" className="hover:text-champagne transition-colors text-sm">
                  Mentions Légales
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-champagne transition-colors text-sm">
                  Nous Contacter
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-champagne transition-colors text-sm">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-wine-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-wine-300 text-sm">
              © 2024 Cavavin La Réunion. Tous droits réservés.
            </p>
            <div className="flex items-center space-x-4">
              <p className="text-wine-300 text-xs">
                L&apos;abus d&apos;alcool est dangereux pour la santé, à consommer avec modération.
              </p>
              <span className="inline-flex items-center justify-center w-8 h-8 bg-wine-700 text-champagne font-bold rounded-full text-xs">
                18+
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}