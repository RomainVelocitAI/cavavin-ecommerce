import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function updateProductImages() {
  try {
    // Mapping des nouvelles images par catégorie
    const imageMapping = {
      'vins-rouges': '/images/products/red-wine-bordeaux.webp',
      'vins-blancs': '/images/products/white-wine-sauvignon.webp',
      'vins-roses': '/images/products/rose-wine-provence.webp',
      'spiritueux': '/images/products/whisky-premium.webp',
      'champagnes': '/images/products/champagne-luxury.webp',
    }

    // Mettre à jour les produits par catégorie
    for (const [categorySlug, imagePath] of Object.entries(imageMapping)) {
      const category = await prisma.category.findUnique({
        where: { slug: categorySlug }
      })

      if (category) {
        await prisma.product.updateMany({
          where: { categoryId: category.id },
          data: { 
            images: JSON.stringify([imagePath])
          }
        })
        console.log(`✅ Images mises à jour pour la catégorie: ${categorySlug}`)
      }
    }

    console.log('🎉 Toutes les images ont été mises à jour!')
  } catch (error) {
    console.error('Erreur lors de la mise à jour des images:', error)
  } finally {
    await prisma.$disconnect()
  }
}

updateProductImages()