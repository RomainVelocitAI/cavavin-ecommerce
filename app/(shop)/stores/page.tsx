import { MapPin, Phone, Clock, Mail } from 'lucide-react'

export default function StoresPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Nos Boutiques</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="h-64 bg-gray-200 relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3763.0!2d55.45!3d-20.88!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjDCsDUyJzQ4LjAiUyA1NcKwMjcnMDAuMCJF!5e0!3m2!1sfr!2sfr!4v1620000000000!5m2!1sfr!2sfr"
              className="w-full h-full"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Cavavin Saint-Denis</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-red-900 mt-1" />
                <p>123 Rue Maréchal Leclerc<br />97400 Saint-Denis</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-red-900" />
                <p>0262 12 34 56</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-red-900" />
                <p>saintdenis@cavavin-reunion.re</p>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-red-900 mt-1" />
                <div>
                  <p className="font-semibold">Horaires d'ouverture:</p>
                  <p>Lundi-Samedi: 9h30-19h30</p>
                  <p>Dimanche: 9h30-12h30</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="h-64 bg-gray-200 relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3763.0!2d55.45!3d-21.25!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDE1JzAwLjAiUyA1NcKwMjcnMDAuMCJF!5e0!3m2!1sfr!2sfr!4v1620000000000!5m2!1sfr!2sfr"
              className="w-full h-full"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Cavavin Saint-Pierre</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-red-900 mt-1" />
                <p>456 Avenue des Indes<br />97410 Saint-Pierre</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-red-900" />
                <p>0262 78 90 12</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-red-900" />
                <p>saintpierre@cavavin-reunion.re</p>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-red-900 mt-1" />
                <div>
                  <p className="font-semibold">Horaires d'ouverture:</p>
                  <p>Lundi-Samedi: 9h30-19h30</p>
                  <p>Dimanche: Fermé</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}