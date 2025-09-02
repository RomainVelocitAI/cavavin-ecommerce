import { Shield } from 'lucide-react'
import Link from 'next/link'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="h-6 w-6" />
              <h1 className="text-xl font-bold">Administration Cavavin</h1>
            </div>
            <nav className="flex items-center gap-6">
              <Link 
                href="/admin" 
                className="hover:text-gray-300 transition"
              >
                Produits
              </Link>
              <Link 
                href="/" 
                className="hover:text-gray-300 transition"
              >
                Retour au site
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Admin Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}