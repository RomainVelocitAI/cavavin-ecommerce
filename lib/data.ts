export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  color: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  price: number;
  description: string;
  region: string;
  year?: number;
  grapeVariety?: string;
  alcoholContent: string;
  tastingNotes: string;
  foodPairing: string;
  image: string;
  stock: number;
  featured?: boolean;
}

export const categories: Category[] = [
  {
    id: "1",
    name: "Vins Rouges",
    slug: "vins-rouges",
    description: "Découvrez notre sélection exceptionnelle de vins rouges du monde entier",
    image: "/images/categories/red-wine.jpg",
    color: "#722F37"
  },
  {
    id: "2",
    name: "Vins Blancs",
    slug: "vins-blancs",
    description: "Des vins blancs frais et élégants pour toutes les occasions",
    image: "/images/categories/white-wine.jpg",
    color: "#F5E6A3"
  },
  {
    id: "3",
    name: "Vins Rosés",
    slug: "vins-roses",
    description: "L'élégance et la fraîcheur des meilleurs rosés",
    image: "/images/categories/rose-wine.jpg",
    color: "#F8B5C4"
  },
  {
    id: "4",
    name: "Champagnes & Bulles",
    slug: "champagnes-bulles",
    description: "Célébrez avec nos champagnes et vins effervescents d'exception",
    image: "/images/categories/champagne.jpg",
    color: "#F7E7CE"
  },
  {
    id: "5",
    name: "Spiritueux",
    slug: "spiritueux",
    description: "Whiskies, rhums, cognacs et autres spiritueux de prestige",
    image: "/images/categories/spirits.jpg",
    color: "#4B1A2F"
  }
];

export const products: Product[] = [
  // Vins Rouges
  {
    id: "1",
    name: "Château Margaux 2018",
    slug: "chateau-margaux-2018",
    categoryId: "1",
    price: 890.00,
    description: "Un grand cru classé de Margaux, millésime exceptionnel offrant une complexité et une élégance incomparables.",
    region: "Bordeaux, Margaux",
    year: 2018,
    grapeVariety: "Cabernet Sauvignon, Merlot, Petit Verdot",
    alcoholContent: "13.5%",
    tastingNotes: "Nez intense de fruits noirs, cassis et mûre. Bouche veloutée avec des tanins soyeux, notes de cèdre et de graphite.",
    foodPairing: "Viandes rouges grillées, agneau rôti, fromages affinés",
    image: "/images/products/margaux-2018.jpg",
    stock: 12,
    featured: true
  },
  {
    id: "2",
    name: "Gevrey-Chambertin 2019",
    slug: "gevrey-chambertin-2019",
    categoryId: "1",
    price: 125.00,
    description: "Un Pinot Noir d'exception de Bourgogne, incarnant la finesse et la complexité de son terroir.",
    region: "Bourgogne, Côte de Nuits",
    year: 2019,
    grapeVariety: "Pinot Noir",
    alcoholContent: "13%",
    tastingNotes: "Arômes de cerise, framboise, avec des notes épicées et une touche de sous-bois.",
    foodPairing: "Canard aux cerises, bœuf bourguignon, plateau de fromages",
    image: "/images/products/gevrey-2019.jpg",
    stock: 24,
    featured: false
  },
  {
    id: "3",
    name: "Châteauneuf-du-Pape 2020",
    slug: "chateauneuf-du-pape-2020",
    categoryId: "1",
    price: 89.00,
    description: "Un vin puissant et généreux du Rhône, alliant tradition et modernité.",
    region: "Vallée du Rhône",
    year: 2020,
    grapeVariety: "Grenache, Syrah, Mourvèdre",
    alcoholContent: "14.5%",
    tastingNotes: "Fruits rouges mûrs, épices douces, garrigue et une finale longue et chaleureuse.",
    foodPairing: "Gibier, daube provençale, fromages de caractère",
    image: "/images/products/chateauneuf-2020.jpg",
    stock: 36,
    featured: true
  },
  {
    id: "4",
    name: "Saint-Émilion Grand Cru 2017",
    slug: "saint-emilion-grand-cru-2017",
    categoryId: "1",
    price: 145.00,
    description: "Un grand cru de Saint-Émilion, expression parfaite du Merlot sur terroir calcaire.",
    region: "Bordeaux, Saint-Émilion",
    year: 2017,
    grapeVariety: "Merlot, Cabernet Franc",
    alcoholContent: "14%",
    tastingNotes: "Fruits noirs confiturés, notes de truffe, chocolat noir et réglisse.",
    foodPairing: "Entrecôte grillée, magret de canard, truffe",
    image: "/images/products/saint-emilion-2017.jpg",
    stock: 18,
    featured: false
  },
  {
    id: "5",
    name: "Barolo DOCG 2018",
    slug: "barolo-docg-2018",
    categoryId: "1",
    price: 95.00,
    description: "Le roi des vins italiens, un Nebbiolo puissant et élégant du Piémont.",
    region: "Piémont, Italie",
    year: 2018,
    grapeVariety: "Nebbiolo",
    alcoholContent: "14%",
    tastingNotes: "Rose séchée, cerise, goudron, avec des tanins fermes et une longue finale.",
    foodPairing: "Risotto aux truffes, brasato al Barolo, fromages vieillis",
    image: "/images/products/barolo-2018.jpg",
    stock: 20,
    featured: false
  },

  // Vins Blancs
  {
    id: "6",
    name: "Chablis Premier Cru 2021",
    slug: "chablis-premier-cru-2021",
    categoryId: "2",
    price: 68.00,
    description: "Un Chardonnay minéral et précis, expression pure du terroir kimméridgien.",
    region: "Bourgogne, Chablis",
    year: 2021,
    grapeVariety: "Chardonnay",
    alcoholContent: "12.5%",
    tastingNotes: "Citron vert, pierre à fusil, fleurs blanches avec une acidité vive et rafraîchissante.",
    foodPairing: "Huîtres, fruits de mer, poissons grillés",
    image: "/images/products/chablis-2021.jpg",
    stock: 30,
    featured: true
  },
  {
    id: "7",
    name: "Sancerre Blanc 2022",
    slug: "sancerre-blanc-2022",
    categoryId: "2",
    price: 42.00,
    description: "Un Sauvignon Blanc vibrant de la Loire, frais et aromatique.",
    region: "Loire, Sancerre",
    year: 2022,
    grapeVariety: "Sauvignon Blanc",
    alcoholContent: "13%",
    tastingNotes: "Agrumes, groseille à maquereau, notes herbacées et minérales.",
    foodPairing: "Fromage de chèvre, asperges, poissons en sauce",
    image: "/images/products/sancerre-2022.jpg",
    stock: 48,
    featured: false
  },
  {
    id: "8",
    name: "Meursault 2020",
    slug: "meursault-2020",
    categoryId: "2",
    price: 110.00,
    description: "Un grand blanc de Bourgogne, riche et complexe avec un boisé subtil.",
    region: "Bourgogne, Côte de Beaune",
    year: 2020,
    grapeVariety: "Chardonnay",
    alcoholContent: "13%",
    tastingNotes: "Noisette, beurre frais, poire mûre avec une texture crémeuse.",
    foodPairing: "Volaille à la crème, homard, saint-jacques",
    image: "/images/products/meursault-2020.jpg",
    stock: 15,
    featured: true
  },
  {
    id: "9",
    name: "Riesling Grand Cru 2021",
    slug: "riesling-grand-cru-2021",
    categoryId: "2",
    price: 58.00,
    description: "Un Riesling d'Alsace élégant et racé, entre fraîcheur et complexité.",
    region: "Alsace",
    year: 2021,
    grapeVariety: "Riesling",
    alcoholContent: "12%",
    tastingNotes: "Pêche blanche, fleurs d'acacia, notes pétrolées caractéristiques.",
    foodPairing: "Choucroute de la mer, cuisine asiatique, fromages à pâte pressée",
    image: "/images/products/riesling-2021.jpg",
    stock: 25,
    featured: false
  },
  {
    id: "10",
    name: "Pouilly-Fumé 2022",
    slug: "pouilly-fume-2022",
    categoryId: "2",
    price: 45.00,
    description: "Un Sauvignon Blanc fumé et minéral des bords de Loire.",
    region: "Loire, Pouilly-Fumé",
    year: 2022,
    grapeVariety: "Sauvignon Blanc",
    alcoholContent: "12.5%",
    tastingNotes: "Notes fumées caractéristiques, silex, agrumes et fruits exotiques.",
    foodPairing: "Saumon fumé, coquillages, fromages de chèvre",
    image: "/images/products/pouilly-fume-2022.jpg",
    stock: 35,
    featured: false
  },

  // Vins Rosés
  {
    id: "11",
    name: "Côtes de Provence Rosé 2023",
    slug: "cotes-de-provence-rose-2023",
    categoryId: "3",
    price: 28.00,
    description: "Le rosé de Provence par excellence, frais et délicat.",
    region: "Provence",
    year: 2023,
    grapeVariety: "Grenache, Cinsault, Syrah",
    alcoholContent: "12.5%",
    tastingNotes: "Pêche blanche, fraise des bois, notes florales délicates.",
    foodPairing: "Salade niçoise, grillades, cuisine méditerranéenne",
    image: "/images/products/provence-rose-2023.jpg",
    stock: 60,
    featured: true
  },
  {
    id: "12",
    name: "Tavel Rosé 2023",
    slug: "tavel-rose-2023",
    categoryId: "3",
    price: 35.00,
    description: "Le seul rosé de garde de France, puissant et structuré.",
    region: "Vallée du Rhône, Tavel",
    year: 2023,
    grapeVariety: "Grenache, Cinsault, Clairette",
    alcoholContent: "13.5%",
    tastingNotes: "Fruits rouges intenses, épices douces, finale longue et savoureuse.",
    foodPairing: "Paella, tajines, viandes blanches grillées",
    image: "/images/products/tavel-rose-2023.jpg",
    stock: 40,
    featured: false
  },
  {
    id: "13",
    name: "Bandol Rosé 2023",
    slug: "bandol-rose-2023",
    categoryId: "3",
    price: 42.00,
    description: "Un rosé de gastronomie, complexe et élégant.",
    region: "Provence, Bandol",
    year: 2023,
    grapeVariety: "Mourvèdre, Grenache, Cinsault",
    alcoholContent: "13%",
    tastingNotes: "Agrumes, fruits rouges, notes salines et herbacées.",
    foodPairing: "Bouillabaisse, poissons grillés, fromages de chèvre frais",
    image: "/images/products/bandol-rose-2023.jpg",
    stock: 30,
    featured: false
  },
  {
    id: "14",
    name: "Sancerre Rosé 2023",
    slug: "sancerre-rose-2023",
    categoryId: "3",
    price: 38.00,
    description: "Un rosé de Pinot Noir, fin et délicat de la Loire.",
    region: "Loire, Sancerre",
    year: 2023,
    grapeVariety: "Pinot Noir",
    alcoholContent: "12.5%",
    tastingNotes: "Groseille, framboise, notes minérales caractéristiques.",
    foodPairing: "Charcuterie fine, tapas, sushis",
    image: "/images/products/sancerre-rose-2023.jpg",
    stock: 25,
    featured: false
  },

  // Champagnes & Bulles
  {
    id: "15",
    name: "Dom Pérignon 2012",
    slug: "dom-perignon-2012",
    categoryId: "4",
    price: 385.00,
    description: "L'excellence du champagne, un millésime d'exception.",
    region: "Champagne",
    year: 2012,
    grapeVariety: "Chardonnay, Pinot Noir",
    alcoholContent: "12.5%",
    tastingNotes: "Complexe et raffiné, notes de brioche, agrumes confits, amande grillée.",
    foodPairing: "Caviar, homard, foie gras",
    image: "/images/products/dom-perignon-2012.jpg",
    stock: 8,
    featured: true
  },
  {
    id: "16",
    name: "Ruinart Blanc de Blancs",
    slug: "ruinart-blanc-de-blancs",
    categoryId: "4",
    price: 145.00,
    description: "La pureté du Chardonnay dans un champagne d'une grande finesse.",
    region: "Champagne",
    grapeVariety: "Chardonnay",
    alcoholContent: "12%",
    tastingNotes: "Floral et minéral, notes d'agrumes, poire, touche de noisette.",
    foodPairing: "Coquilles Saint-Jacques, poissons fins, apéritif",
    image: "/images/products/ruinart-blanc.jpg",
    stock: 15,
    featured: false
  },
  {
    id: "17",
    name: "Bollinger Special Cuvée",
    slug: "bollinger-special-cuvee",
    categoryId: "4",
    price: 85.00,
    description: "Un champagne de caractère, emblématique de la maison Bollinger.",
    region: "Champagne",
    grapeVariety: "Pinot Noir, Chardonnay, Pinot Meunier",
    alcoholContent: "12%",
    tastingNotes: "Pomme cuite, épices, notes briochées et une belle longueur.",
    foodPairing: "Volaille rôtie, fromages à pâte molle, apéritif",
    image: "/images/products/bollinger.jpg",
    stock: 25,
    featured: true
  },
  {
    id: "18",
    name: "Crémant de Loire Brut",
    slug: "cremant-de-loire-brut",
    categoryId: "4",
    price: 22.00,
    description: "Une alternative élégante au champagne, fraîche et festive.",
    region: "Loire",
    grapeVariety: "Chenin Blanc, Chardonnay, Cabernet Franc",
    alcoholContent: "12%",
    tastingNotes: "Pomme verte, fleurs blanches, bulles fines et persistantes.",
    foodPairing: "Apéritif, desserts aux fruits, fromages frais",
    image: "/images/products/cremant-loire.jpg",
    stock: 45,
    featured: false
  },
  {
    id: "19",
    name: "Prosecco Superiore DOCG",
    slug: "prosecco-superiore-docg",
    categoryId: "4",
    price: 28.00,
    description: "Le meilleur du Prosecco italien, frais et fruité.",
    region: "Vénétie, Italie",
    grapeVariety: "Glera",
    alcoholContent: "11%",
    tastingNotes: "Poire, pomme verte, fleurs d'acacia, finale fraîche.",
    foodPairing: "Antipasti, risotto, apéritif",
    image: "/images/products/prosecco.jpg",
    stock: 50,
    featured: false
  },

  // Spiritueux
  {
    id: "20",
    name: "Hennessy Paradis",
    slug: "hennessy-paradis",
    categoryId: "5",
    price: 650.00,
    description: "Un cognac d'exception, assemblage de plus de 100 eaux-de-vie.",
    region: "Cognac",
    alcoholContent: "40%",
    tastingNotes: "Miel, jasmin, notes épicées et boisées d'une grande complexité.",
    foodPairing: "Chocolat noir, cigare, dégustation pure",
    image: "/images/products/hennessy-paradis.jpg",
    stock: 5,
    featured: true
  },
  {
    id: "21",
    name: "Macallan 18 ans",
    slug: "macallan-18-ans",
    categoryId: "5",
    price: 485.00,
    description: "Un single malt écossais vieilli en fûts de sherry, d'une richesse incomparable.",
    region: "Speyside, Écosse",
    alcoholContent: "43%",
    tastingNotes: "Fruits secs, épices, chocolat, orange confite, chêne.",
    foodPairing: "Chocolat, fromages affinés, dégustation pure",
    image: "/images/products/macallan-18.jpg",
    stock: 6,
    featured: true
  },
  {
    id: "22",
    name: "Diplomatico Reserva Exclusiva",
    slug: "diplomatico-reserva-exclusiva",
    categoryId: "5",
    price: 58.00,
    description: "Un rhum vénézuélien premium, doux et complexe.",
    region: "Venezuela",
    alcoholContent: "40%",
    tastingNotes: "Vanille, caramel, fruits tropicaux, épices douces.",
    foodPairing: "Chocolat, desserts caramélisés, cigare",
    image: "/images/products/diplomatico.jpg",
    stock: 20,
    featured: false
  },
  {
    id: "23",
    name: "Hendrick's Gin",
    slug: "hendricks-gin",
    categoryId: "5",
    price: 45.00,
    description: "Un gin écossais unique infusé au concombre et à la rose.",
    region: "Écosse",
    alcoholContent: "41.4%",
    tastingNotes: "Genièvre, concombre, pétales de rose, agrumes.",
    foodPairing: "Tonic premium, cocktails, apéritif",
    image: "/images/products/hendricks.jpg",
    stock: 30,
    featured: false
  },
  {
    id: "24",
    name: "Grey Goose Vodka",
    slug: "grey-goose-vodka",
    categoryId: "5",
    price: 55.00,
    description: "Une vodka française ultra-premium, d'une pureté exceptionnelle.",
    region: "France",
    alcoholContent: "40%",
    tastingNotes: "Douce et crémeuse, notes d'amande, agrumes subtils.",
    foodPairing: "Caviar, saumon fumé, cocktails premium",
    image: "/images/products/grey-goose.jpg",
    stock: 25,
    featured: false
  }
];

export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter(product => product.categoryId === categoryId);
}

export function getFeaturedProducts(): Product[] {
  return products.filter(product => product.featured);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(product => product.slug === slug);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find(category => category.slug === slug);
}