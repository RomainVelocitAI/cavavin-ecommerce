# Cavavin E-commerce

Site e-commerce pour Cavavin La Réunion - Vins et Spiritueux

## Stack Technique

- **Frontend**: Next.js 15.5.2, React 19, TypeScript
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel
- **Styling**: Tailwind CSS
- **Paiement**: Stripe (intégration prévue)

## Fonctionnalités

- ✅ Catalogue de produits (vins, spiritueux, champagnes)
- ✅ Produits vedettes sur la page d'accueil
- ✅ Catégories de produits
- ✅ Informations détaillées sur les vins (région, cépage, notes de dégustation)
- 🔄 Panier et commande (en développement)
- 🔄 Paiement Stripe (en développement)

## Configuration

1. Copier `.env.local.example` en `.env.local`
2. Ajouter les variables d'environnement Supabase
3. Installer les dépendances : `npm install`
4. Lancer le serveur de développement : `npm run dev`

## Déploiement

Le site est automatiquement déployé sur Vercel à chaque push sur la branche `main`.

---
*Dernière mise à jour : 02/09/2025 - v0.1.2*