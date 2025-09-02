import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Contactez-nous</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Boutique Saint-Denis</h2>
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
                <p>Lun-Sam: 9h30-19h30</p>
                <p>Dim: 9h30-12h30</p>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-4">Boutique Saint-Pierre</h2>
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
                <p>Lun-Sam: 9h30-19h30</p>
                <p>Dim: Fermé</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-12 p-6 bg-gray-50 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Nous écrire</h2>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Nom" className="px-4 py-2 border rounded-md" />
            <input type="email" placeholder="Email" className="px-4 py-2 border rounded-md" />
          </div>
          <input type="text" placeholder="Objet" className="w-full px-4 py-2 border rounded-md" />
          <textarea placeholder="Message" rows={6} className="w-full px-4 py-2 border rounded-md"></textarea>
          <button type="submit" className="bg-red-900 text-white px-6 py-2 rounded-md hover:bg-red-800">
            Envoyer
          </button>
        </form>
      </div>
    </div>
  )
}