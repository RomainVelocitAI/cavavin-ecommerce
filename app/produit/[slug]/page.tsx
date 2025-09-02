import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/supabase/client";
import { ProductDetail } from "@/components/product/ProductDetail";

// Force dynamic rendering for product pages
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Revalidate every hour

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({ params }: PageProps) {
  const resolvedParams = await params;
  const product = await getProductBySlug(resolvedParams.slug);
  
  if (!product) {
    notFound();
  }

  // Adapter le format du produit pour le composant ProductDetail
  const formattedProduct = {
    ...product,
    images: product.images ? [product.images] : [],
    description: product.description || ''
  };

  return <ProductDetail product={formattedProduct} />;
}