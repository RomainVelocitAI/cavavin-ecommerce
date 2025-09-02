import { Wine, Users, Award, Truck } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">À Propos de Cavavin La Réunion</h1>
      
      <div className="prose max-w-none">
        <p className="text-lg mb-6">
          Depuis 1985, Cavavin La Réunion est votre caviste de référence sur l&apos;île. 
          Avec plus de 35 ans d&apos;expérience, nous proposons une sélection exceptionnelle 
          de plus de 250 vins et spiritueux du monde entier.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-12">
          <div className="text-center">
            <Wine className="h-12 w-12 text-red-900 mx-auto mb-3" />
            <h3 className="font-bold mb-2">250+ Références</h3>
            <p className="text-sm text-gray-600">Une sélection rigoureuse de vins et spiritueux</p>
          </div>
          <div className="text-center">
            <Users className="h-12 w-12 text-red-900 mx-auto mb-3" />
            <h3 className="font-bold mb-2">Conseils Experts</h3>
            <p className="text-sm text-gray-600">Une équipe passionnée à votre service</p>
          </div>
          <div className="text-center">
            <Award className="h-12 w-12 text-red-900 mx-auto mb-3" />
            <h3 className="font-bold mb-2">Qualité Garantie</h3>
            <p className="text-sm text-gray-600">Des produits sélectionnés avec soin</p>
          </div>
          <div className="text-center">
            <Truck className="h-12 w-12 text-red-900 mx-auto mb-3" />
            <h3 className="font-bold mb-2">Livraison Île</h3>
            <p className="text-sm text-gray-600">Service de livraison sur toute La Réunion</p>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Notre Histoire</h2>
        <p className="mb-4">
          Fondée en 1985, Cavavin La Réunion a commencé comme une petite cave à Saint-Denis. 
          Au fil des années, nous avons développé notre expertise et élargi notre sélection 
          pour devenir l&apos;une des références incontournables de l&apos;île en matière de vins et spiritueux.
        </p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Notre Engagement</h2>
        <p className="mb-4">
          Nous nous engageons à vous proposer les meilleurs produits au meilleur prix, 
          avec un service client irréprochable. Notre équipe de passionnés est là pour 
          vous conseiller et vous guider dans vos choix, que vous soyez amateur ou connaisseur.
        </p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Nos Services</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Conseils personnalisés en boutique</li>
          <li>Livraison sur toute l&apos;île (gratuite dès 100€)</li>
          <li>Click & Collect dans nos 2 boutiques</li>
          <li>Organisation de dégustations</li>
          <li>Commandes spéciales sur demande</li>
          <li>Coffrets cadeaux personnalisés</li>
        </ul>
      </div>
    </div>
  )
}