export interface Product {
  id: string
  name: string
  slug: string
  description: string
  categoryId: string
  price: number
  images: string[]
  inStock: boolean
  stockQuantity: number
  vintage?: number | null
  region?: string | null
  grapeVariety?: string | null
  alcoholContent?: number | null
  servingTemp?: string | null
  tastingNotes?: string | null
  foodPairing?: string | null
  featured: boolean
  category: Category
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string | null
  image?: string | null
}

export interface CartItem {
  id: string
  productId: string
  quantity: number
  product: Product
}

export interface Cart {
  id: string
  sessionId: string
  items: CartItem[]
}

export interface CheckoutFormData {
  email: string
  firstName: string
  lastName: string
  phone: string
  deliveryType: 'DELIVERY' | 'CLICK_COLLECT'
  address?: string
  city?: string
  postalCode?: string
  storeId?: string
  pickupDate?: string
  pickupTime?: string
  ageVerified: boolean
}

export interface Store {
  id: string
  name: string
  address: string
  city: string
  postalCode: string
  phone: string
  email: string
  openingHours: Record<string, { open: string; close: string }>
}

export interface DeliveryZone {
  id: string
  name: string
  postalCodes: string[]
  deliveryFee: number
  minOrder?: number | null
}