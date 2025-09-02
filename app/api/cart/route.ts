import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

// GET: Récupérer le panier (pour l'instant retourne un panier vide)
export async function GET() {
  try {
    // Pour l'instant, retourner un panier vide
    // Dans une vraie application, on stockerait le panier dans la session ou base de données
    return NextResponse.json({ 
      items: [],
      total: 0
    })
  } catch (error) {
    console.error('Error fetching cart:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération du panier' },
      { status: 500 }
    )
  }
}

// POST: Ajouter au panier
export async function POST(request: NextRequest) {
  try {
    const { productId, quantity = 1 } = await request.json()
    
    // Pour l'instant, retourner un succès simple
    // Dans une vraie application, on ajouterait le produit au panier en session/DB
    return NextResponse.json({
      success: true,
      message: 'Produit ajouté au panier',
      productId,
      quantity
    })
  } catch (error) {
    console.error('Error adding to cart:', error)
    return NextResponse.json(
      { error: 'Erreur lors de l\'ajout au panier' },
      { status: 500 }
    )
  }
}

