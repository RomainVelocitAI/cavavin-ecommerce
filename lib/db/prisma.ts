import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// En production sur Vercel, utiliser DIRECT_URL si DATABASE_URL ne fonctionne pas
const databaseUrl = process.env.VERCEL_ENV === 'production' && process.env.DIRECT_URL 
  ? process.env.DIRECT_URL 
  : process.env.DATABASE_URL

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  datasourceUrl: databaseUrl
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma