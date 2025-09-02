import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    // Vérifier si les variables d'environnement sont présentes
    const hasDbUrl = !!process.env.DATABASE_URL
    const hasDirectUrl = !!process.env.DIRECT_URL
    
    // Masquer les valeurs sensibles mais montrer si elles existent
    const dbUrlPreview = process.env.DATABASE_URL 
      ? process.env.DATABASE_URL.substring(0, 30) + '...[MASKED]'
      : 'NOT SET'
    
    const directUrlPreview = process.env.DIRECT_URL
      ? process.env.DIRECT_URL.substring(0, 30) + '...[MASKED]'
      : 'NOT SET'
    
    // Tenter une connexion simple à la base de données
    let dbStatus = 'not tested'
    let productCount = 0
    
    try {
      const { PrismaClient } = await import('@prisma/client')
      // Force l'utilisation de DIRECT_URL
      const prisma = new PrismaClient({
        datasourceUrl: process.env.DIRECT_URL || process.env.DATABASE_URL
      })
      
      // Tester la connexion
      productCount = await prisma.product.count()
      dbStatus = 'connected with DIRECT_URL'
      
      await prisma.$disconnect()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (dbError: any) {
      dbStatus = `error: ${dbError.message}`
    }
    
    return NextResponse.json({
      envVars: {
        DATABASE_URL: hasDbUrl ? 'SET' : 'NOT SET',
        DIRECT_URL: hasDirectUrl ? 'SET' : 'NOT SET',
        DATABASE_URL_PREVIEW: dbUrlPreview,
        DIRECT_URL_PREVIEW: directUrlPreview,
      },
      database: {
        status: dbStatus,
        productCount: productCount
      },
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return NextResponse.json({
      error: 'Test failed',
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}