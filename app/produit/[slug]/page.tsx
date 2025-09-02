import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getProductBySlug, getRelatedProducts, getAllProductSlugs } from "@/lib/supabase/client";
import { ShoppingCart, Heart, Share2, ChevronLeft, Wine, MapPin, Calendar, Grape } from "lucide-react";

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

  const relatedProducts = await getRelatedProducts(product.categoryId, product.id, 4);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-champagne/5">
      <Header />
      
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-wine-700">Accueil</Link>
          <span>/</span>
          <Link href="/catalogue" className="hover:text-wine-700">Catalogue</Link>
          <span>/</span>
          {product.category && (
            <Link href={`/catalogue?category=${product.category.slug}`} className="hover:text-wine-700">
              {product.category.name}
            </Link>
          )}
          <span>/</span>
          <span className="text-wine-900 font-medium">{product.name}</span>
        </div>
      </div>

      {/* Product Detail */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="relative">
            <Link 
              href="/catalogue"
              className="inline-flex items-center gap-2 mb-6 text-wine-700 hover:text-wine-900 transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
              Retour au catalogue
            </Link>
            
            <div className="aspect-[3/4] bg-gradient-to-b from-champagne/20 to-white rounded-2xl shadow-xl p-12 flex items-center justify-center">
              <div className="w-48 h-64 bg-wine-700/10 rounded-lg" />
            </div>
            
            {product.featured && (
              <span className="absolute top-20 right-4 px-4 py-2 bg-wine-700 text-white rounded-full">
                Coup de cœur
              </span>
            )}
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-6">
              {product.category && (
                <span className="inline-block px-3 py-1 text-sm rounded-full text-white mb-4 bg-wine-700">
                  {product.category.name}
                </span>
              )}
              
              <h1 className="text-4xl font-bold text-wine-900 mb-2">{product.name}</h1>
              <p className="text-xl text-gray-600 mb-4">{product.region}</p>
              
              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-4xl font-bold text-wine-700">{product.price.toFixed(2)}€</span>
                <span className="text-sm text-gray-500">
                  {product.inStock ? `En stock (${product.stockQuantity} bouteilles)` : 'Rupture de stock'}
                </span>
              </div>

              <p className="text-gray-700 mb-8 leading-relaxed">{product.description}</p>
            </div>

            {/* Product Details */}
            <div className="bg-white rounded-xl p-6 mb-8 shadow-md">
              <h2 className="text-xl font-bold mb-4 text-wine-900">Caractéristiques</h2>
              <div className="grid grid-cols-2 gap-4">
                {product.vintage && (
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-wine-700 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Millésime</p>
                      <p className="font-medium">{product.vintage}</p>
                    </div>
                  </div>
                )}
                
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-wine-700 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Région</p>
                    <p className="font-medium">{product.region}</p>
                  </div>
                </div>
                
                {product.grapeVariety && (
                  <div className="flex items-start gap-3">
                    <Grape className="h-5 w-5 text-wine-700 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Cépage</p>
                      <p className="font-medium">{product.grapeVariety}</p>
                    </div>
                  </div>
                )}
                
                <div className="flex items-start gap-3">
                  <Wine className="h-5 w-5 text-wine-700 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Degré d&apos;alcool</p>
                    <p className="font-medium">{product.alcoholContent}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tasting Notes */}
            <div className="bg-champagne/20 rounded-xl p-6 mb-8">
              <h2 className="text-xl font-bold mb-4 text-wine-900">Notes de Dégustation</h2>
              <p className="text-gray-700 mb-4">{product.tastingNotes}</p>
              
              <h3 className="font-semibold mb-2 text-wine-700">Accords Mets & Vins</h3>
              <p className="text-gray-700">{product.foodPairing}</p>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button 
                className="flex-1 px-8 py-4 bg-wine-700 text-white rounded-lg hover:bg-wine-900 transition-colors flex items-center justify-center gap-2 font-semibold shadow-lg"
                disabled={!product.inStock}
              >
                <ShoppingCart className="h-5 w-5" />
                Ajouter au panier
              </button>
              
              <button className="p-4 border border-wine-700 text-wine-700 rounded-lg hover:bg-wine-700 hover:text-white transition-colors">
                <Heart className="h-5 w-5" />
              </button>
              
              <button className="p-4 border border-wine-700 text-wine-700 rounded-lg hover:bg-wine-700 hover:text-white transition-colors">
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-wine-900">Vous pourriez aussi aimer</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/produit/${relatedProduct.slug}`}
                  className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden"
                >
                  <div className="aspect-[3/4] bg-gradient-to-b from-champagne/10 to-white p-6 flex items-center justify-center">
                    <div className="w-20 h-28 bg-wine-700/5 rounded-lg" />
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-bold mb-1 text-wine-900 group-hover:text-wine-700 transition-colors line-clamp-1">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">{relatedProduct.region}</p>
                    <span className="text-lg font-bold text-wine-700">{relatedProduct.price.toFixed(2)}€</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}