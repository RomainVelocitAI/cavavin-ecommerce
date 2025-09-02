import Cookies from 'js-cookie'
import { v4 as uuidv4 } from 'uuid'

const CART_SESSION_KEY = 'cavavin_session'

export function getSessionId(): string {
  let sessionId = Cookies.get(CART_SESSION_KEY)
  
  if (!sessionId) {
    sessionId = uuidv4()
    Cookies.set(CART_SESSION_KEY, sessionId, { expires: 30 }) // 30 jours
  }
  
  return sessionId
}

export function clearSession(): void {
  Cookies.remove(CART_SESSION_KEY)
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(price)
}

export function calculateCartTotal(items: any[]): {
  subtotal: number
  deliveryFee: number
  total: number
} {
  const subtotal = items.reduce((sum, item) => {
    return sum + (item.product.price * item.quantity)
  }, 0)
  
  const deliveryFee = subtotal >= 100 ? 0 : 10 // Livraison gratuite > 100€
  const total = subtotal + deliveryFee
  
  return { subtotal, deliveryFee, total }
}