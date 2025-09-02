import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartProvider } from "@/contexts/CartContext";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cavavin La Réunion - Votre caviste de référence",
  description: "Découvrez notre sélection de plus de 250 vins et spiritueux. Livraison sur toute l'île de La Réunion ou retrait en boutique.",
  keywords: "vin, spiritueux, caviste, La Réunion, Saint-Denis, Saint-Pierre, livraison vin",
  openGraph: {
    title: "Cavavin La Réunion",
    description: "Votre caviste de référence à La Réunion",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.className} antialiased min-h-screen flex flex-col`}>
        <CartProvider>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
