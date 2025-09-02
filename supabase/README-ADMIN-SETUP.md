# Configuration Admin Cavavin - Instructions

## ⚠️ IMPORTANT - Erreur 401 sur la page Admin

Si vous avez une erreur 401 (Unauthorized) quand vous essayez de modifier les prix, stock ou produits vedettes dans l'admin, suivez ces instructions.

## 🚀 Solution Rapide (2 minutes)

### Étape 1: Connectez-vous à Supabase
1. Allez sur [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Connectez-vous à votre compte
3. Sélectionnez votre projet Cavavin

### Étape 2: Ouvrez l'éditeur SQL
1. Dans le menu de gauche, cliquez sur **"SQL Editor"** (icône de terminal)
2. Cliquez sur **"New query"** pour créer une nouvelle requête

### Étape 3: Exécutez le script SQL
1. Ouvrez le fichier `rls-policies-admin.sql` qui se trouve dans ce dossier
2. Copiez **TOUT** le contenu du fichier
3. Collez-le dans l'éditeur SQL de Supabase
4. Cliquez sur le bouton **"Run"** (ou appuyez sur Ctrl+Enter)

### Étape 4: Vérifiez que ça fonctionne
1. Retournez sur votre site admin : [https://cavavin-ecommerce.vercel.app/admin](https://cavavin-ecommerce.vercel.app/admin)
2. Essayez de modifier un prix ou de marquer un produit comme vedette
3. Ça devrait maintenant fonctionner ! ✅

## 🔍 Que fait ce script ?

Le script configure les permissions (RLS - Row Level Security) pour permettre:
- ✅ **Lecture** des produits (déjà fonctionnel)
- ✅ **Modification** des prix
- ✅ **Modification** du stock
- ✅ **Marquer/démarquer** les produits vedettes
- ✅ **Ajouter/supprimer** des produits (pour le futur)

## ❓ Toujours des problèmes ?

Si vous avez toujours l'erreur 401 après avoir exécuté le script :

### Option 1: Désactiver temporairement RLS (solution rapide mais moins sécurisée)
```sql
ALTER TABLE "Product" DISABLE ROW LEVEL SECURITY;
ALTER TABLE "Category" DISABLE ROW LEVEL SECURITY;
```

### Option 2: Vérifier les politiques
1. Dans Supabase, allez dans **"Authentication"** > **"Policies"**
2. Vérifiez que vous voyez les politiques pour les tables Product et Category
3. Chaque table devrait avoir 4 politiques (SELECT, INSERT, UPDATE, DELETE)

### Option 3: Vérifier vos clés API
1. Dans Supabase, allez dans **"Settings"** > **"API"**
2. Copiez la clé **"anon public"**
3. Vérifiez qu'elle correspond à `NEXT_PUBLIC_SUPABASE_ANON_KEY` dans Vercel

## 🔐 Note de Sécurité

**IMPORTANT**: La configuration actuelle permet à TOUS les visiteurs de modifier les produits. C'est temporaire pour faire fonctionner rapidement l'admin.

Pour un site en production, vous devriez :
1. Ajouter une authentification (login/mot de passe)
2. Limiter les modifications aux utilisateurs admin uniquement
3. Utiliser Supabase Auth pour gérer les permissions

## 📝 Résumé des Commandes Admin

Une fois configuré, votre page admin permet de :
- 📝 Modifier les prix en cliquant sur l'icône crayon
- ⭐ Marquer/démarquer les produits vedettes
- 📦 Gérer les quantités en stock
- 🔍 Rechercher et filtrer les produits
- 📊 Voir les statistiques (total, stock, vedettes)

## 🆘 Support

Si vous avez toujours des problèmes après avoir suivi ces instructions :
1. Vérifiez la console du navigateur (F12) pour voir l'erreur exacte
2. Vérifiez les logs dans Supabase (Table Editor > Logs)
3. Assurez-vous que le projet est bien déployé sur Vercel avec les dernières modifications