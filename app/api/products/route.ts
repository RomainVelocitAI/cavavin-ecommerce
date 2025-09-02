import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

// Données statiques temporaires jusqu'à ce que la connexion DB soit résolue
const STATIC_PRODUCTS = [
  {
    id: 'prod_margaux_2018',
    name: 'Château Margaux 2018',
    slug: 'chateau-margaux-2018',
    description: 'Un grand cru classé de Bordeaux, élégant et complexe avec des notes de fruits noirs et d\'épices.',
    price: 890,
    images: ['/images/products/red-wine-bordeaux.webp'],
    inStock: true,
    stockQuantity: 12,
    vintage: 2018,
    region: 'Bordeaux, Margaux',
    grapeVariety: 'Cabernet Sauvignon, Merlot',
    alcoholContent: 13.5,
    servingTemp: '16-18°C',
    tastingNotes: 'Notes de cassis, violette, cèdre et graphite',
    foodPairing: 'Viandes rouges, gibier, fromages affinés',
    featured: true,
    category: {
      id: 'cat_vins_rouges',
      name: 'Vins Rouges',
      slug: 'vins-rouges'
    }
  },
  {
    id: 'prod_chablis_2021',
    name: 'Chablis Premier Cru 2021',
    slug: 'chablis-premier-cru-2021',
    description: 'Un Chablis minéral et frais avec une belle tension.',
    price: 42.00,
    images: ['/images/products/white-wine-sauvignon.webp'],
    inStock: true,
    stockQuantity: 18,
    vintage: 2021,
    region: 'Bourgogne, Chablis',
    grapeVariety: 'Chardonnay',
    alcoholContent: 12.5,
    servingTemp: '10-12°C',
    tastingNotes: 'Agrumes, pierre à fusil, fleurs blanches',
    foodPairing: 'Huîtres, fruits de mer, poissons grillés',
    featured: true,
    category: {
      id: 'cat_vins_blancs',
      name: 'Vins Blancs',
      slug: 'vins-blancs'
    }
  },
  {
    id: 'prod_ruinart',
    name: 'Champagne Ruinart Blanc de Blancs',
    slug: 'champagne-ruinart-blanc-de-blancs',
    description: 'Un champagne élégant et raffiné, 100% Chardonnay.',
    price: 85.00,
    images: ['https://images.unsplash.com/photo-1547595628-c61a32d9b423?w=800'],
    inStock: true,
    stockQuantity: 15,
    region: 'Champagne',
    grapeVariety: 'Chardonnay',
    alcoholContent: 12.5,
    servingTemp: '6-8°C',
    tastingNotes: 'Agrumes, fleurs blanches, brioche',
    foodPairing: 'Apéritif, fruits de mer, poissons fins',
    featured: true,
    category: {
      id: 'cat_champagnes',
      name: 'Champagnes',
      slug: 'champagnes'
    }
  },
  {
    id: 'prod_nikka',
    name: 'Whisky Japonais Nikka 12 ans',
    slug: 'whisky-nikka-12-ans',
    description: 'Un whisky japonais élégant et raffiné, vieilli 12 ans.',
    price: 95.00,
    images: ['/images/products/whisky-premium.webp'],
    inStock: true,
    stockQuantity: 8,
    alcoholContent: 43,
    servingTemp: 'Température ambiante',
    tastingNotes: 'Vanille, miel, fruits secs, boisé délicat',
    featured: true,
    category: {
      id: 'cat_spiritueux',
      name: 'Spiritueux',
      slug: 'spiritueux'
    }
  },
  {
    id: 'prod_cotes_rhone',
    name: 'Côtes du Rhône Villages 2020',
    slug: 'cotes-du-rhone-villages-2020',
    description: 'Un vin rouge charpenté aux arômes de fruits rouges mûrs et d\'épices douces.',
    price: 15.90,
    images: ['/images/products/red-wine-bordeaux.webp'],
    inStock: true,
    stockQuantity: 48,
    vintage: 2020,
    region: 'Vallée du Rhône',
    grapeVariety: 'Grenache, Syrah, Mourvèdre',
    alcoholContent: 14,
    servingTemp: '16-18°C',
    tastingNotes: 'Fruits rouges, poivre, garrigue',
    foodPairing: 'Grillades, ratatouille, fromages',
    featured: false,
    category: {
      id: 'cat_vins_rouges',
      name: 'Vins Rouges',
      slug: 'vins-rouges'
    }
  },
  {
    id: 'prod_pinot_noir',
    name: 'Pinot Noir Bourgogne 2019',
    slug: 'pinot-noir-bourgogne-2019',
    description: 'Un pinot noir élégant et fin, typique de la Bourgogne.',
    price: 35.50,
    images: ['/images/products/red-wine-bordeaux.webp'],
    inStock: true,
    stockQuantity: 24,
    vintage: 2019,
    region: 'Bourgogne',
    grapeVariety: 'Pinot Noir',
    alcoholContent: 13,
    servingTemp: '14-16°C',
    tastingNotes: 'Cerise, framboise, sous-bois',
    foodPairing: 'Volailles, poissons en sauce, champignons',
    featured: false,
    category: {
      id: 'cat_vins_rouges',
      name: 'Vins Rouges',
      slug: 'vins-rouges'
    }
  },
  {
    id: 'prod_sancerre',
    name: 'Sancerre Blanc 2022',
    slug: 'sancerre-blanc-2022',
    description: 'Un Sauvignon blanc vif et aromatique de la Loire.',
    price: 28.90,
    images: ['/images/products/white-wine-sauvignon.webp'],
    inStock: true,
    stockQuantity: 36,
    vintage: 2022,
    region: 'Loire, Sancerre',
    grapeVariety: 'Sauvignon Blanc',
    alcoholContent: 13,
    servingTemp: '8-10°C',
    tastingNotes: 'Agrumes, buis, minéralité',
    foodPairing: 'Fromage de chèvre, poissons, salades',
    featured: false,
    category: {
      id: 'cat_vins_blancs',
      name: 'Vins Blancs',
      slug: 'vins-blancs'
    }
  },
  {
    id: 'prod_provence_rose',
    name: 'Côtes de Provence Rosé 2023',
    slug: 'cotes-de-provence-rose-2023',
    description: 'Un rosé frais et fruité, parfait pour l\'été.',
    price: 18.50,
    images: ['/images/products/rose-wine-provence.webp'],
    inStock: true,
    stockQuantity: 60,
    vintage: 2023,
    region: 'Provence',
    grapeVariety: 'Grenache, Cinsault, Syrah',
    alcoholContent: 12.5,
    servingTemp: '6-8°C',
    tastingNotes: 'Pêche, fraise, agrumes',
    foodPairing: 'Salades, grillades, cuisine méditerranéenne',
    featured: false,
    category: {
      id: 'cat_vins_roses',
      name: 'Vins Rosés',
      slug: 'vins-roses'
    }
  },
  {
    id: 'prod_bollinger',
    name: 'Champagne Bollinger Special Cuvée',
    slug: 'champagne-bollinger-special-cuvee',
    description: 'Un champagne puissant et complexe, parfait pour les grandes occasions.',
    price: 68.00,
    images: ['https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800'],
    inStock: true,
    stockQuantity: 20,
    region: 'Champagne',
    grapeVariety: 'Pinot Noir, Chardonnay, Pinot Meunier',
    alcoholContent: 12,
    servingTemp: '8-10°C',
    tastingNotes: 'Pomme, poire, noisette, toast',
    foodPairing: 'Volailles, fromages, desserts',
    featured: false,
    category: {
      id: 'cat_champagnes',
      name: 'Champagnes',
      slug: 'champagnes'
    }
  },
  {
    id: 'prod_diplomatico',
    name: 'Rhum Diplomatico Reserva',
    slug: 'rhum-diplomatico-reserva',
    description: 'Un rhum vénézuélien complexe et gourmand.',
    price: 48.00,
    images: ['https://images.unsplash.com/photo-1570598912132-0ba1dc952b7d?w=800'],
    inStock: true,
    stockQuantity: 20,
    alcoholContent: 40,
    servingTemp: 'Température ambiante',
    tastingNotes: 'Caramel, vanille, épices, chocolat',
    featured: false,
    category: {
      id: 'cat_spiritueux',
      name: 'Spiritueux',
      slug: 'spiritueux'
    }
  }
]

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const page = Number(searchParams.get('page') || 1)
    const limit = Number(searchParams.get('limit') || 12)
    const category = searchParams.get('category')
    const sort = searchParams.get('sort') || 'newest'
    const search = searchParams.get('search')
    const featured = searchParams.get('featured')
    
    const skip = (page - 1) * limit
    
    // Filtrer les produits
    let filteredProducts = [...STATIC_PRODUCTS]
    
    if (category) {
      filteredProducts = filteredProducts.filter(p => p.category.slug === category)
    }
    
    if (featured === 'true') {
      filteredProducts = filteredProducts.filter(p => p.featured)
    }
    
    if (search) {
      const searchLower = search.toLowerCase()
      filteredProducts = filteredProducts.filter(p => 
        p.name.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower) ||
        p.region?.toLowerCase().includes(searchLower) ||
        p.grapeVariety?.toLowerCase().includes(searchLower)
      )
    }
    
    // Trier les produits
    switch (sort) {
      case 'price-asc':
        filteredProducts.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        filteredProducts.sort((a, b) => b.price - a.price)
        break
      case 'name':
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        // newest - garder l'ordre par défaut
    }
    
    // Pagination
    const paginatedProducts = filteredProducts.slice(skip, skip + limit)
    
    return NextResponse.json({
      products: paginatedProducts,
      pagination: {
        page,
        limit,
        total: filteredProducts.length,
        totalPages: Math.ceil(filteredProducts.length / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json({
      error: 'Erreur lors de la récupération des produits',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}