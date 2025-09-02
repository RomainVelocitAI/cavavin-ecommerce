import { Truck, Clock, CreditCard } from 'lucide-react'

export default function LivraisonPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Livraison & Retours</h1>
      
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Truck className="h-6 w-6 text-red-900" />
            Modes de Livraison
          </h2>
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-bold mb-3">Livraison à domicile</h3>
            <ul className="space-y-2 list-disc pl-6">
              <li>Livraison gratuite dès 100€ d&apos;achat</li>
              <li>Tarifs selon la zone de livraison:</li>
              <ul className="ml-6 mt-2 space-y-1">
                <li>Zone Nord (Saint-Denis, Sainte-Marie): 5€</li>
                <li>Zone Sud (Saint-Pierre, Le Tampon, Saint-Louis): 5€</li>
                <li>Zone Ouest (Saint-Paul, La Possession, Le Port): 7€</li>
                <li>Zone Est (Saint-André, Saint-Benoît): 7€</li>
              </ul>
              <li>Commande minimum: 30€ (zones Nord/Sud) ou 40€ (zones Ouest/Est)</li>
            </ul>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6 mt-4">
            <h3 className="font-bold mb-3">Click & Collect</h3>
            <p>Commandez en ligne et récupérez gratuitement votre commande dans l&apos;une de nos 2 boutiques:</p>
            <ul className="mt-3 space-y-1 list-disc pl-6">
              <li>Saint-Denis: 123 Rue Maréchal Leclerc</li>
              <li>Saint-Pierre: 456 Avenue des Indes</li>
            </ul>
            <p className="mt-3 text-sm text-gray-600">Commande prête en 2h pendant les heures d&apos;ouverture</p>
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Clock className="h-6 w-6 text-red-900" />
            Délais de Livraison
          </h2>
          <div className="bg-gray-50 rounded-lg p-6">
            <ul className="space-y-2 list-disc pl-6">
              <li>Commande passée avant 14h: livraison le jour même (selon disponibilité)</li>
              <li>Commande passée après 14h: livraison le lendemain</li>
              <li>Pas de livraison le dimanche et jours fériés</li>
              <li>Créneaux de livraison: 9h-12h ou 14h-18h</li>
            </ul>
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <CreditCard className="h-6 w-6 text-red-900" />
            Paiement
          </h2>
          <div className="bg-gray-50 rounded-lg p-6">
            <p className="mb-3">Moyens de paiement acceptés:</p>
            <ul className="space-y-2 list-disc pl-6">
              <li>Carte bancaire (Visa, Mastercard, CB)</li>
              <li>Paiement sécurisé via Stripe</li>
              <li>Paiement à la livraison (espèces ou CB mobile)</li>
            </ul>
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4">Politique de Retour</h2>
          <div className="bg-gray-50 rounded-lg p-6">
            <p className="mb-3">Conformément à la législation sur la vente d&apos;alcool:</p>
            <ul className="space-y-2 list-disc pl-6">
              <li>Les bouteilles ouvertes ne peuvent pas être retournées</li>
              <li>Retour possible sous 14 jours pour les bouteilles non ouvertes</li>
              <li>Le produit doit être dans son état d&apos;origine</li>
              <li>Frais de retour à la charge du client</li>
              <li>Remboursement sous 14 jours après réception du retour</li>
            </ul>
          </div>
        </section>
        
        <div className="bg-yellow-50 border border-yellow-400 rounded-lg p-4">
          <p className="text-sm">
            <strong>Important:</strong> La vente d&apos;alcool est interdite aux mineurs. 
            Une pièce d&apos;identité sera demandée lors de la livraison. 
            L&apos;abus d&apos;alcool est dangereux pour la santé, à consommer avec modération.
          </p>
        </div>
      </div>
    </div>
  )
}