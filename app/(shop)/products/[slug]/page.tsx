import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { prisma } from '@/lib/db/prisma'
import { ProductDetail } from '@/components/product/ProductDetail'

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const product = await prisma.product.findUnique({
    where: { slug: resolvedParams.slug },
  })
  
  if (!product) {
    return {
      title: 'Produit non trouvé',
    }
  }
  
  return {
    title: `${product.name} - Cavavin La Réunion`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: JSON.parse(product.images),
      type: 'website',
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params
  const product = await prisma.product.findUnique({
    where: { slug: resolvedParams.slug },
    include: {
      category: true,
    },
  })
  
  if (!product) {
    notFound()
  }
  
  // Format product data
  const formattedProduct = {
    ...product,
    images: JSON.parse(product.images),
  }
  
  // JSON-LD for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: JSON.parse(product.images),
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'EUR',
      availability: product.inStock 
        ? 'https://schema.org/InStock' 
        : 'https://schema.org/OutOfStock',
    },
  }
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetail product={formattedProduct} />
    </>
  )
}