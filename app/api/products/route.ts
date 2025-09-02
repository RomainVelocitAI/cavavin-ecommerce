import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    // Créer une nouvelle instance de PrismaClient avec DIRECT_URL
    const prisma = new PrismaClient({
      datasourceUrl: process.env.DIRECT_URL || process.env.DATABASE_URL
    })
    
    const searchParams = request.nextUrl.searchParams
    const page = Number(searchParams.get('page') || 1)
    const limit = Number(searchParams.get('limit') || 12)
    const category = searchParams.get('category')
    const sort = searchParams.get('sort') || 'newest'
    const search = searchParams.get('search')
    const featured = searchParams.get('featured')
    
    const skip = (page - 1) * limit
    
    // Construction de la clause where
    const where: any = {}
    
    if (category) {
      where.category = {
        slug: category
      }
    }
    
    if (featured === 'true') {
      where.featured = true
    }
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { region: { contains: search, mode: 'insensitive' } },
        { grapeVariety: { contains: search, mode: 'insensitive' } }
      ]
    }
    
    // Détermination de l'ordre de tri
    let orderBy: any = {}
    switch (sort) {
      case 'price-asc':
        orderBy = { price: 'asc' }
        break
      case 'price-desc':
        orderBy = { price: 'desc' }
        break
      case 'name':
        orderBy = { name: 'asc' }
        break
      default:
        orderBy = { createdAt: 'desc' }
    }
    
    // Récupération des produits
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        include: {
          category: true
        }
      }),
      prisma.product.count({ where })
    ])
    
    await prisma.$disconnect()
    
    // Conversion des images JSON string en array
    const formattedProducts = products.map(product => ({
      ...product,
      images: JSON.parse(product.images)
    }))
    
    return NextResponse.json({
      products: formattedProducts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    const errorDetails = {
      error: 'Erreur lors de la récupération des produits',
      message: errorMessage,
      isDbError: errorMessage.includes('P1001') || errorMessage.includes('connect') || errorMessage.includes('DATABASE_URL'),
      timestamp: new Date().toISOString()
    }
    
    return NextResponse.json(errorDetails, { status: 500 })
  }
}