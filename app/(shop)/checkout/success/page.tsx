import Link from 'next/link'
import { CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function CheckoutSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto text-center">
        <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
        
        <h1 className="text-3xl font-bold mb-4">
          Commande confirmée !
        </h1>
        
        <p className="text-gray-700 mb-8">
          Merci pour votre commande. Vous recevrez un email de confirmation 
          avec tous les détails de votre commande.
        </p>
        
        <div className="space-y-3">
          <Link href="/products">
            <Button className="w-full bg-red-900 hover:bg-red-800">
              Continuer mes achats
            </Button>
          </Link>
          
          <Link href="/">
            <Button variant="outline" className="w-full">
              Retour à l'accueil
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}