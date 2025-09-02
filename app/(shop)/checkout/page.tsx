'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { checkoutSchema, type CheckoutFormData } from '@/lib/validators/checkout'
import { Button } from '@/components/ui/button'
import { formatPrice, getSessionId, calculateCartTotal } from '@/lib/utils/cart'
import { Loader2, AlertCircle } from 'lucide-react'

const stores = [
  {
    id: '1',
    name: 'Cavavin Saint-Denis',
    address: '123 Rue du Commerce',
    city: 'Saint-Denis',
    postalCode: '97400',
  },
  {
    id: '2',
    name: 'Cavavin Saint-Pierre',
    address: '456 Avenue des Vins',
    city: 'Saint-Pierre',
    postalCode: '97410',
  },
]

interface CartItem {
  id: string
  quantity: number
  product: {
    id: string
    name: string
    price: number
    images?: string[]
  }
}

interface Cart {
  id: string
  items: CartItem[]
}

export default function CheckoutPage() {
  const router = useRouter()
  const [cart, setCart] = useState<Cart | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [showAgeModal, setShowAgeModal] = useState(true)
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      deliveryType: 'DELIVERY',
      ageVerified: false,
    },
  })
  
  const deliveryType = watch('deliveryType')
  
  useEffect(() => {
    fetchCart()
  }, [])
  
  const fetchCart = async () => {
    try {
      const sessionId = getSessionId()
      const response = await fetch('/api/cart', {
        headers: {
          'x-session-id': sessionId,
        },
      })
      const data = await response.json()
      setCart(data)
    } catch (error) {
      console.error('Error fetching cart:', error)
    } finally {
      setLoading(false)
    }
  }
  
  const onSubmit = async (data: CheckoutFormData) => {
    setSubmitting(true)
    try {
      const sessionId = getSessionId()
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-session-id': sessionId,
        },
        body: JSON.stringify(data),
      })
      
      if (response.ok) {
        const result = await response.json()
        // Redirect to Stripe checkout or success page
        if (result.stripeUrl) {
          window.location.href = result.stripeUrl
        } else {
          router.push('/checkout/success')
        }
      }
    } catch (error) {
      console.error('Error submitting order:', error)
      alert('Erreur lors de la validation de la commande')
    } finally {
      setSubmitting(false)
    }
  }
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Chargement...</div>
      </div>
    )
  }
  
  const items = cart?.items || []
  const totals = calculateCartTotal(items)
  
  if (items.length === 0) {
    router.push('/cart')
    return null
  }
  
  return (
    <>
      {/* Age Verification Modal */}
      {showAgeModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4 text-red-600">
              <AlertCircle className="h-6 w-6" />
              <h2 className="text-xl font-semibold">Vérification d&apos;âge</h2>
            </div>
            <p className="mb-6 text-gray-700">
              La vente d&apos;alcool est interdite aux mineurs. 
              En continuant, vous certifiez avoir plus de 18 ans.
            </p>
            <div className="flex gap-3">
              <Button
                onClick={() => router.push('/cart')}
                variant="outline"
                className="flex-1"
              >
                J&apos;ai moins de 18 ans
              </Button>
              <Button
                onClick={() => setShowAgeModal(false)}
                className="flex-1 bg-red-900 hover:bg-red-800"
              >
                J&apos;ai plus de 18 ans
              </Button>
            </div>
          </div>
        </div>
      )}
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Finaliser ma commande</h1>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact Information */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Informations de contact</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Prénom *
                    </label>
                    <input
                      {...register('firstName')}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-900"
                    />
                    {errors.firstName && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Nom *
                    </label>
                    <input
                      {...register('lastName')}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-900"
                    />
                    {errors.lastName && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Email *
                    </label>
                    <input
                      {...register('email')}
                      type="email"
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-900"
                    />
                    {errors.email && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Téléphone *
                    </label>
                    <input
                      {...register('phone')}
                      type="tel"
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-900"
                    />
                    {errors.phone && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Delivery Method */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Mode de livraison</h2>
                
                <div className="space-y-3">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      {...register('deliveryType')}
                      type="radio"
                      value="DELIVERY"
                      className="mt-1"
                    />
                    <div>
                      <p className="font-medium">Livraison à domicile</p>
                      <p className="text-sm text-gray-600">
                        Livraison sur toute l&apos;île de La Réunion
                      </p>
                    </div>
                  </label>
                  
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      {...register('deliveryType')}
                      type="radio"
                      value="CLICK_COLLECT"
                      className="mt-1"
                    />
                    <div>
                      <p className="font-medium">Click & Collect</p>
                      <p className="text-sm text-gray-600">
                        Retrait gratuit en boutique sous 2h
                      </p>
                    </div>
                  </label>
                </div>
              </div>
              
              {/* Delivery Address */}
              {deliveryType === 'DELIVERY' && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-4">Adresse de livraison</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Adresse *
                      </label>
                      <input
                        {...register('address')}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-900"
                      />
                      {errors.address && (
                        <p className="text-red-600 text-sm mt-1">
                          {errors.address.message}
                        </p>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Ville *
                        </label>
                        <input
                          {...register('city')}
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-900"
                        />
                        {errors.city && (
                          <p className="text-red-600 text-sm mt-1">
                            {errors.city.message}
                          </p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Code postal *
                        </label>
                        <input
                          {...register('postalCode')}
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-900"
                        />
                        {errors.postalCode && (
                          <p className="text-red-600 text-sm mt-1">
                            {errors.postalCode.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Store Selection */}
              {deliveryType === 'CLICK_COLLECT' && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-4">Choisir une boutique</h2>
                  
                  <div className="space-y-3">
                    {stores.map((store) => (
                      <label
                        key={store.id}
                        className="flex items-start gap-3 cursor-pointer border rounded-lg p-4 hover:bg-gray-50"
                      >
                        <input
                          {...register('storeId')}
                          type="radio"
                          value={store.id}
                          className="mt-1"
                        />
                        <div>
                          <p className="font-medium">{store.name}</p>
                          <p className="text-sm text-gray-600">
                            {store.address}, {store.postalCode} {store.city}
                          </p>
                        </div>
                      </label>
                    ))}
                  </div>
                  {errors.storeId && (
                    <p className="text-red-600 text-sm mt-2">
                      {errors.storeId.message}
                    </p>
                  )}
                  
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Date de retrait *
                      </label>
                      <input
                        {...register('pickupDate')}
                        type="date"
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-900"
                      />
                      {errors.pickupDate && (
                        <p className="text-red-600 text-sm mt-1">
                          {errors.pickupDate.message}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Heure de retrait *
                      </label>
                      <select
                        {...register('pickupTime')}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-900"
                      >
                        <option value="">Sélectionner</option>
                        <option value="09:00">09:00</option>
                        <option value="10:00">10:00</option>
                        <option value="11:00">11:00</option>
                        <option value="14:00">14:00</option>
                        <option value="15:00">15:00</option>
                        <option value="16:00">16:00</option>
                        <option value="17:00">17:00</option>
                        <option value="18:00">18:00</option>
                      </select>
                      {errors.pickupTime && (
                        <p className="text-red-600 text-sm mt-1">
                          {errors.pickupTime.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Age Verification */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    {...register('ageVerified')}
                    type="checkbox"
                    className="mt-1"
                  />
                  <div>
                    <p className="font-medium">
                      Je certifie avoir plus de 18 ans *
                    </p>
                    <p className="text-sm text-gray-600">
                      La vente d&apos;alcool est interdite aux mineurs
                    </p>
                  </div>
                </label>
                {errors.ageVerified && (
                  <p className="text-red-600 text-sm mt-2">
                    {errors.ageVerified.message}
                  </p>
                )}
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
                <h2 className="text-xl font-semibold mb-4">Récapitulatif</h2>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span>Sous-total</span>
                    <span>{formatPrice(totals.subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Livraison</span>
                    <span>
                      {deliveryType === 'CLICK_COLLECT' 
                        ? 'Gratuite'
                        : totals.deliveryFee === 0 
                        ? 'Gratuite' 
                        : formatPrice(totals.deliveryFee)}
                    </span>
                  </div>
                </div>
                
                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span className="text-red-900">
                      {formatPrice(
                        deliveryType === 'CLICK_COLLECT' 
                          ? totals.subtotal 
                          : totals.total
                      )}
                    </span>
                  </div>
                </div>
                
                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full gap-2 bg-red-900 hover:bg-red-800"
                  size="lg"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Traitement...
                    </>
                  ) : (
                    'Payer la commande'
                  )}
                </Button>
                
                <p className="text-xs text-gray-600 mt-4 text-center">
                  Paiement sécurisé par Stripe
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}