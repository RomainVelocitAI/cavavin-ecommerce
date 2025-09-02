'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Wine } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function AgeVerificationPage() {
  const [birthDate, setBirthDate] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const birth = new Date(birthDate)
    const today = new Date()
    const age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()
    
    const isAdult = age > 18 || (age === 18 && monthDiff >= 0)
    
    if (isAdult) {
      // Stocker la vérification dans le localStorage
      localStorage.setItem('ageVerified', 'true')
      localStorage.setItem('ageVerificationDate', new Date().toISOString())
      router.push('/')
    } else {
      setError('Vous devez avoir 18 ans ou plus pour accéder à ce site.')
    }
  }
  
  const handleConfirm = () => {
    localStorage.setItem('ageVerified', 'true')
    localStorage.setItem('ageVerificationDate', new Date().toISOString())
    router.push('/')
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 to-red-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-8">
        <div className="text-center mb-8">
          <Wine className="h-16 w-16 text-red-900 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Vérification d'âge
          </h1>
          <p className="text-gray-600">
            L'accès à ce site est réservé aux personnes majeures
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-2">
              Date de naissance
            </label>
            <input
              type="date"
              id="birthDate"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
            />
          </div>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
              {error}
            </div>
          )}
          
          <Button type="submit" className="w-full bg-red-900 hover:bg-red-800">
            Vérifier mon âge
          </Button>
        </form>
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-center text-sm text-gray-600 mb-4">
            En accédant à ce site, vous certifiez avoir plus de 18 ans
          </p>
          <Button 
            onClick={handleConfirm}
            variant="outline"
            className="w-full"
          >
            J'ai plus de 18 ans
          </Button>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            L'abus d'alcool est dangereux pour la santé. À consommer avec modération.
          </p>
        </div>
      </div>
    </div>
  )
}