// Configuration de l'API
export const API_CONFIG = {
  // URL de l'API backend sur Render
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'https://cavavin-backend.onrender.com',
  
  // Endpoints
  endpoints: {
    products: '/api/products',
    categories: '/api/categories',
    stores: '/api/stores',
    deliveryZones: '/api/delivery-zones',
  }
}

// Helper pour construire les URLs complètes
export const getApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.baseUrl}${endpoint}`
}