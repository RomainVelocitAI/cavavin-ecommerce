import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🔄 Connexion à la base de données...')
  
  // Créer les catégories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'vins-rouges' },
      update: {},
      create: {
        name: 'Vins Rouges',
        slug: 'vins-rouges',
        description: 'Notre sélection de vins rouges de qualité',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'vins-blancs' },
      update: {},
      create: {
        name: 'Vins Blancs',
        slug: 'vins-blancs',
        description: 'Des vins blancs frais et élégants',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'vins-roses' },
      update: {},
      create: {
        name: 'Vins Rosés',
        slug: 'vins-roses',
        description: 'Vins rosés parfaits pour l\'été',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'spiritueux' },
      update: {},
      create: {
        name: 'Spiritueux',
        slug: 'spiritueux',
        description: 'Whisky, Rhum, Gin et autres spiritueux',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'champagnes' },
      update: {},
      create: {
        name: 'Champagnes',
        slug: 'champagnes',
        description: 'Champagnes et vins effervescents',
      },
    }),
  ])
  
  // Créer des produits pour chaque catégorie
  const products = [
    // Vins Rouges
    {
      name: 'Château Margaux 2018',
      slug: 'chateau-margaux-2018',
      description: 'Un grand cru classé de Bordeaux, élégant et complexe avec des notes de fruits noirs et d\'épices.',
      categoryId: categories[0].id,
      price: 890,
      images: JSON.stringify(['/images/products/red-wine-bordeaux.webp']),
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
    },
    {
      name: 'Côtes du Rhône Villages 2020',
      slug: 'cotes-du-rhone-villages-2020',
      description: 'Un vin rouge charpenté aux arômes de fruits rouges mûrs et d\'épices douces.',
      categoryId: categories[0].id,
      price: 15.90,
      images: JSON.stringify(['/images/products/red-wine-bordeaux.webp']),
      inStock: true,
      stockQuantity: 48,
      vintage: 2020,
      region: 'Vallée du Rhône',
      grapeVariety: 'Grenache, Syrah, Mourvèdre',
      alcoholContent: 14,
      servingTemp: '16-18°C',
      tastingNotes: 'Fruits rouges, poivre, garrigue',
      foodPairing: 'Grillades, ratatouille, fromages',
    },
    {
      name: 'Pinot Noir Bourgogne 2019',
      slug: 'pinot-noir-bourgogne-2019',
      description: 'Un pinot noir élégant et fin, typique de la Bourgogne.',
      categoryId: categories[0].id,
      price: 35.50,
      images: JSON.stringify(['/images/products/red-wine-bordeaux.webp']),
      inStock: true,
      stockQuantity: 24,
      vintage: 2019,
      region: 'Bourgogne',
      grapeVariety: 'Pinot Noir',
      alcoholContent: 13,
      servingTemp: '14-16°C',
      tastingNotes: 'Cerise, framboise, sous-bois',
      foodPairing: 'Volailles, poissons en sauce, champignons',
    },
    
    // Vins Blancs
    {
      name: 'Chablis Premier Cru 2021',
      slug: 'chablis-premier-cru-2021',
      description: 'Un Chablis minéral et frais avec une belle tension.',
      categoryId: categories[1].id,
      price: 42.00,
      images: JSON.stringify(['/images/products/white-wine-sauvignon.webp']),
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
    },
    {
      name: 'Sancerre Blanc 2022',
      slug: 'sancerre-blanc-2022',
      description: 'Un Sauvignon blanc vif et aromatique de la Loire.',
      categoryId: categories[1].id,
      price: 28.90,
      images: JSON.stringify(['/images/products/white-wine-sauvignon.webp']),
      inStock: true,
      stockQuantity: 36,
      vintage: 2022,
      region: 'Loire, Sancerre',
      grapeVariety: 'Sauvignon Blanc',
      alcoholContent: 13,
      servingTemp: '8-10°C',
      tastingNotes: 'Agrumes, buis, minéralité',
      foodPairing: 'Fromage de chèvre, poissons, salades',
    },
    {
      name: 'Riesling Alsace Grand Cru 2020',
      slug: 'riesling-alsace-grand-cru-2020',
      description: 'Un Riesling complexe et racé d\'Alsace.',
      categoryId: categories[1].id,
      price: 38.50,
      images: JSON.stringify(['/images/products/white-wine-sauvignon.webp']),
      inStock: true,
      stockQuantity: 15,
      vintage: 2020,
      region: 'Alsace',
      grapeVariety: 'Riesling',
      alcoholContent: 12.5,
      servingTemp: '8-10°C',
      tastingNotes: 'Citron, pétrole, miel',
      foodPairing: 'Cuisine asiatique, poissons, choucroute',
    },
    
    // Vins Rosés
    {
      name: 'Côtes de Provence Rosé 2023',
      slug: 'cotes-de-provence-rose-2023',
      description: 'Un rosé frais et fruité, parfait pour l\'été.',
      categoryId: categories[2].id,
      price: 18.50,
      images: JSON.stringify(['/images/products/rose-wine-provence.webp']),
      inStock: true,
      stockQuantity: 60,
      vintage: 2023,
      region: 'Provence',
      grapeVariety: 'Grenache, Cinsault, Syrah',
      alcoholContent: 12.5,
      servingTemp: '6-8°C',
      tastingNotes: 'Pêche, fraise, agrumes',
      foodPairing: 'Salades, grillades, cuisine méditerranéenne',
    },
    {
      name: 'Tavel Rosé 2022',
      slug: 'tavel-rose-2022',
      description: 'Un rosé de gastronomie, structuré et complexe.',
      categoryId: categories[2].id,
      price: 22.00,
      images: JSON.stringify(['/images/products/white-wine-sauvignon.webp']),
      inStock: true,
      stockQuantity: 30,
      vintage: 2022,
      region: 'Vallée du Rhône, Tavel',
      grapeVariety: 'Grenache, Cinsault',
      alcoholContent: 13.5,
      servingTemp: '8-10°C',
      tastingNotes: 'Fruits rouges, épices douces',
      foodPairing: 'Cuisine épicée, barbecue, paella',
    },
    
    // Spiritueux
    {
      name: 'Whisky Japonais Nikka 12 ans',
      slug: 'whisky-nikka-12-ans',
      description: 'Un whisky japonais élégant et raffiné, vieilli 12 ans.',
      categoryId: categories[3].id,
      price: 95.00,
      images: JSON.stringify(['/images/products/whisky-premium.webp']),
      inStock: true,
      stockQuantity: 8,
      alcoholContent: 43,
      servingTemp: 'Température ambiante',
      tastingNotes: 'Vanille, miel, fruits secs, boisé délicat',
      featured: true,
    },
    {
      name: 'Rhum Diplomatico Reserva',
      slug: 'rhum-diplomatico-reserva',
      description: 'Un rhum vénézuélien complexe et gourmand.',
      categoryId: categories[3].id,
      price: 48.00,
      images: JSON.stringify(['https://images.unsplash.com/photo-1570598912132-0ba1dc952b7d?w=800']),
      inStock: true,
      stockQuantity: 20,
      alcoholContent: 40,
      servingTemp: 'Température ambiante',
      tastingNotes: 'Caramel, vanille, épices, chocolat',
    },
    {
      name: 'Gin Hendrick\'s',
      slug: 'gin-hendricks',
      description: 'Un gin écossais unique aux notes de concombre et de rose.',
      categoryId: categories[3].id,
      price: 42.00,
      images: JSON.stringify(['https://images.unsplash.com/photo-1574007558239-44b0e5502d45?w=800']),
      inStock: true,
      stockQuantity: 25,
      alcoholContent: 44,
      servingTemp: 'Servir frais avec tonic',
      tastingNotes: 'Concombre, rose, genévrier, agrumes',
    },
    
    // Champagnes
    {
      name: 'Champagne Ruinart Blanc de Blancs',
      slug: 'champagne-ruinart-blanc-de-blancs',
      description: 'Un champagne élégant et raffiné, 100% Chardonnay.',
      categoryId: categories[4].id,
      price: 85.00,
      images: JSON.stringify(['https://images.unsplash.com/photo-1547595628-c61a32d9b423?w=800']),
      inStock: true,
      stockQuantity: 15,
      region: 'Champagne',
      grapeVariety: 'Chardonnay',
      alcoholContent: 12.5,
      servingTemp: '6-8°C',
      tastingNotes: 'Agrumes, fleurs blanches, brioche',
      foodPairing: 'Apéritif, fruits de mer, poissons fins',
      featured: true,
    },
    {
      name: 'Champagne Bollinger Special Cuvée',
      slug: 'champagne-bollinger-special-cuvee',
      description: 'Un champagne puissant et complexe, parfait pour les grandes occasions.',
      categoryId: categories[4].id,
      price: 68.00,
      images: JSON.stringify(['https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800']),
      inStock: true,
      stockQuantity: 20,
      region: 'Champagne',
      grapeVariety: 'Pinot Noir, Chardonnay, Pinot Meunier',
      alcoholContent: 12,
      servingTemp: '8-10°C',
      tastingNotes: 'Pomme, poire, noisette, toast',
      foodPairing: 'Volailles, fromages, desserts',
    },
    {
      name: 'Prosecco Valdobbiadene DOCG',
      slug: 'prosecco-valdobbiadene',
      description: 'Un prosecco frais et fruité de qualité supérieure.',
      categoryId: categories[4].id,
      price: 18.90,
      images: JSON.stringify(['https://images.unsplash.com/photo-1598306442928-4d90f32c6866?w=800']),
      inStock: true,
      stockQuantity: 40,
      region: 'Vénétie, Italie',
      grapeVariety: 'Glera',
      alcoholContent: 11.5,
      servingTemp: '6-8°C',
      tastingNotes: 'Pomme verte, poire, fleurs blanches',
      foodPairing: 'Apéritif, antipasti, desserts fruités',
    },
  ]
  
  // Insérer les produits
  console.log('📦 Création des produits...')
  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: product,
    })
  }
  
  // Créer les boutiques
  console.log('🏪 Création des boutiques...')
  
  // First, delete existing stores to avoid duplicates
  await prisma.store.deleteMany({})
  
  // Create new stores
  await Promise.all([
    prisma.store.create({
      data: {
        name: 'Cavavin Saint-Denis',
        address: '123 Rue du Commerce',
        city: 'Saint-Denis',
        postalCode: '97400',
        phone: '0262 12 34 56',
        email: 'saintdenis@cavavin-reunion.re',
        openingHours: JSON.stringify({
          lundi: { open: '09:00', close: '19:00' },
          mardi: { open: '09:00', close: '19:00' },
          mercredi: { open: '09:00', close: '19:00' },
          jeudi: { open: '09:00', close: '19:00' },
          vendredi: { open: '09:00', close: '19:00' },
          samedi: { open: '09:00', close: '19:00' },
          dimanche: { open: 'Fermé', close: 'Fermé' },
        }),
      },
    }),
    prisma.store.create({
      data: {
        name: 'Cavavin Saint-Pierre',
        address: '456 Avenue des Vins',
        city: 'Saint-Pierre',
        postalCode: '97410',
        phone: '0262 98 76 54',
        email: 'saintpierre@cavavin-reunion.re',
        openingHours: JSON.stringify({
          lundi: { open: '09:00', close: '19:00' },
          mardi: { open: '09:00', close: '19:00' },
          mercredi: { open: '09:00', close: '19:00' },
          jeudi: { open: '09:00', close: '19:00' },
          vendredi: { open: '09:00', close: '19:00' },
          samedi: { open: '09:00', close: '19:00' },
          dimanche: { open: 'Fermé', close: 'Fermé' },
        }),
      },
    }),
  ])
  
  // Créer les zones de livraison
  console.log('🚚 Création des zones de livraison...')
  
  // First, delete existing delivery zones to avoid duplicates
  await prisma.deliveryZone.deleteMany({})
  
  // Create new delivery zones
  await Promise.all([
    prisma.deliveryZone.create({
      data: {
        name: 'Zone Nord',
        postalCodes: JSON.stringify(['97400', '97490']),
        deliveryFee: 5,
        minOrder: 30,
      },
    }),
    prisma.deliveryZone.create({
      data: {
        name: 'Zone Sud',
        postalCodes: JSON.stringify(['97410', '97430', '97480']),
        deliveryFee: 5,
        minOrder: 30,
      },
    }),
    prisma.deliveryZone.create({
      data: {
        name: 'Zone Ouest',
        postalCodes: JSON.stringify(['97420', '97435', '97460']),
        deliveryFee: 7,
        minOrder: 40,
      },
    }),
    prisma.deliveryZone.create({
      data: {
        name: 'Zone Est',
        postalCodes: JSON.stringify(['97470', '97440']),
        deliveryFee: 7,
        minOrder: 40,
      },
    }),
  ])
  
  console.log('✅ Base de données initialisée avec succès!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })