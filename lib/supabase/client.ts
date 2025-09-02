import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types pour les données
export interface Product {
  id: string
  name: string
  slug: string
  description: string | null
  price: number
  images: string
  inStock: boolean
  stockQuantity: number
  featured: boolean
  categoryId: string
  vintage: number | null
  region: string | null
  grapeVariety: string | null
  alcoholContent: number | null
  servingTemp: string | null
  tastingNotes: string | null
  foodPairing: string | null
  createdAt: string
  updatedAt: string
  category?: Category
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  createdAt: string
  updatedAt: string
}

// Fonctions utilitaires pour récupérer les données
export async function getProducts(options?: {
  featured?: boolean
  limit?: number
  category?: string
  search?: string
  page?: number
}) {
  let query = supabase
    .from('Product')
    .select(`
      *,
      category:Category(*)
    `)
  
  if (options?.featured) {
    query = query.eq('featured', true)
  }
  
  if (options?.category) {
    const { data: categoryData } = await supabase
      .from('Category')
      .select('id')
      .eq('slug', options.category)
      .single()
    
    if (categoryData) {
      query = query.eq('categoryId', categoryData.id)
    }
  }
  
  if (options?.search) {
    query = query.or(`name.ilike.%${options.search}%,description.ilike.%${options.search}%`)
  }
  
  const limit = options?.limit || 12
  const page = options?.page || 1
  const from = (page - 1) * limit
  const to = from + limit - 1
  
  query = query.range(from, to)
  
  const { data, error, count } = await query
  
  if (error) {
    console.error('Error fetching products:', error)
    return { products: [], total: 0 }
  }
  
  // Transformer les images JSON string en array
  const products = data?.map(product => ({
    ...product,
    images: JSON.parse(product.images || '[]')
  })) || []
  
  return {
    products,
    total: count || 0
  }
}

export async function getCategories() {
  const { data, error } = await supabase
    .from('Category')
    .select('*')
    .order('name', { ascending: true })
  
  if (error) {
    console.error('Error fetching categories:', error)
    return []
  }
  
  return data || []
}

export async function getStores() {
  const { data, error } = await supabase
    .from('Store')
    .select('*')
  
  if (error) {
    console.error('Error fetching stores:', error)
    return []
  }
  
  // Transformer openingHours JSON string en objet
  return data?.map(store => ({
    ...store,
    openingHours: JSON.parse(store.openingHours || '{}')
  })) || []
}

export async function getDeliveryZones() {
  const { data, error } = await supabase
    .from('DeliveryZone')
    .select('*')
  
  if (error) {
    console.error('Error fetching delivery zones:', error)
    return []
  }
  
  // Transformer postalCodes JSON string en array
  return data?.map(zone => ({
    ...zone,
    postalCodes: JSON.parse(zone.postalCodes || '[]')
  })) || []
}