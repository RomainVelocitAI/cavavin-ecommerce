import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    // Vérifier les variables d'environnement
    const hasSupabaseUrl = !!process.env.NEXT_PUBLIC_SUPABASE_URL
    const hasSupabaseKey = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    if (!hasSupabaseUrl || !hasSupabaseKey) {
      return NextResponse.json({
        error: 'Configuration manquante',
        hasSupabaseUrl,
        hasSupabaseKey,
        message: 'Les variables NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY doivent être configurées'
      }, { status: 500 })
    }
    
    // Créer le client Supabase
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    
    // Tester la connexion en récupérant les produits vedettes
    const { data, error, count } = await supabase
      .from('Product')
      .select('*, category:Category(*)', { count: 'exact' })
      .eq('featured', true)
      .limit(5)
    
    if (error) {
      return NextResponse.json({
        error: 'Erreur Supabase',
        message: error.message,
        details: error
      }, { status: 500 })
    }
    
    // Transformer les images JSON string en array
    const products = data?.map(product => ({
      ...product,
      images: JSON.parse(product.images || '[]')
    })) || []
    
    return NextResponse.json({
      success: true,
      message: 'Connexion Supabase réussie !',
      productsCount: count || 0,
      products,
      config: {
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 30) + '...',
        hasAnonKey: true
      }
    })
  } catch (error) {
    return NextResponse.json({
      error: 'Erreur inattendue',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}