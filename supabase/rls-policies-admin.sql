-- =====================================================
-- POLITIQUES RLS POUR L'ADMINISTRATION CAVAVIN
-- =====================================================
-- Ce fichier contient toutes les politiques RLS nécessaires
-- pour faire fonctionner la page admin de Cavavin
-- 
-- INSTRUCTIONS:
-- 1. Connectez-vous à votre dashboard Supabase
-- 2. Allez dans l'éditeur SQL (SQL Editor)
-- 3. Copiez et collez tout ce fichier
-- 4. Cliquez sur "Run" pour exécuter
-- =====================================================

-- =====================================================
-- ÉTAPE 1: ACTIVER RLS SUR TOUTES LES TABLES
-- =====================================================

-- Activer RLS sur la table Product
ALTER TABLE "Product" ENABLE ROW LEVEL SECURITY;

-- Activer RLS sur la table Category
ALTER TABLE "Category" ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- ÉTAPE 2: SUPPRIMER LES ANCIENNES POLITIQUES (si elles existent)
-- =====================================================

-- Supprimer les anciennes politiques sur Product
DROP POLICY IF EXISTS "Allow public read access to products" ON "Product";
DROP POLICY IF EXISTS "Allow public update for products" ON "Product";
DROP POLICY IF EXISTS "Allow public insert for products" ON "Product";
DROP POLICY IF EXISTS "Allow public delete for products" ON "Product";
DROP POLICY IF EXISTS "Enable read access for all users" ON "Product";
DROP POLICY IF EXISTS "Enable update for all users" ON "Product";

-- Supprimer les anciennes politiques sur Category
DROP POLICY IF EXISTS "Allow public read access to categories" ON "Category";
DROP POLICY IF EXISTS "Enable read access for all users" ON "Category";

-- =====================================================
-- ÉTAPE 3: CRÉER LES POLITIQUES POUR LA TABLE PRODUCT
-- =====================================================

-- Politique de LECTURE (SELECT) - Tout le monde peut lire les produits
CREATE POLICY "Enable read access for all users" 
ON "Product" 
FOR SELECT 
USING (true);

-- Politique de MISE À JOUR (UPDATE) - Tout le monde peut modifier (temporaire pour l'admin)
-- NOTE: Dans un environnement de production, vous devriez limiter cela aux utilisateurs authentifiés
CREATE POLICY "Enable update for all users" 
ON "Product" 
FOR UPDATE 
USING (true)
WITH CHECK (true);

-- Politique d'INSERTION (INSERT) - Pour pouvoir ajouter de nouveaux produits
CREATE POLICY "Enable insert for all users" 
ON "Product" 
FOR INSERT 
WITH CHECK (true);

-- Politique de SUPPRESSION (DELETE) - Pour pouvoir supprimer des produits
CREATE POLICY "Enable delete for all users" 
ON "Product" 
FOR DELETE 
USING (true);

-- =====================================================
-- ÉTAPE 4: CRÉER LES POLITIQUES POUR LA TABLE CATEGORY
-- =====================================================

-- Politique de LECTURE (SELECT) - Tout le monde peut lire les catégories
CREATE POLICY "Enable read access for all users" 
ON "Category" 
FOR SELECT 
USING (true);

-- Politique de MISE À JOUR (UPDATE) - Pour gérer les catégories
CREATE POLICY "Enable update for all users" 
ON "Category" 
FOR UPDATE 
USING (true)
WITH CHECK (true);

-- Politique d'INSERTION (INSERT) - Pour ajouter des catégories
CREATE POLICY "Enable insert for all users" 
ON "Category" 
FOR INSERT 
WITH CHECK (true);

-- Politique de SUPPRESSION (DELETE) - Pour supprimer des catégories
CREATE POLICY "Enable delete for all users" 
ON "Category" 
FOR DELETE 
USING (true);

-- =====================================================
-- ÉTAPE 5: VÉRIFIER QUE ANONYMOUS A LES PERMISSIONS
-- =====================================================

-- Donner les permissions à anonymous sur Product
GRANT SELECT, INSERT, UPDATE, DELETE ON "Product" TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON "Product" TO authenticated;

-- Donner les permissions à anonymous sur Category
GRANT SELECT, INSERT, UPDATE, DELETE ON "Category" TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON "Category" TO authenticated;

-- =====================================================
-- ÉTAPE 6: RAFRAÎCHIR LE CACHE DES PERMISSIONS
-- =====================================================

-- Forcer le rafraîchissement des permissions
NOTIFY pgrst, 'reload config';

-- =====================================================
-- VÉRIFICATION
-- =====================================================
-- Pour vérifier que les politiques sont bien appliquées, exécutez:

-- Vérifier les politiques sur Product
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'Product';

-- Vérifier les politiques sur Category
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'Category';

-- =====================================================
-- NOTES IMPORTANTES
-- =====================================================
-- 1. Ces politiques permettent à TOUS les utilisateurs (même non authentifiés)
--    de modifier les produits. C'est temporaire pour faire fonctionner l'admin.
--
-- 2. Pour un environnement de production, vous devriez:
--    - Ajouter une authentification pour l'admin
--    - Limiter les UPDATE/INSERT/DELETE aux utilisateurs admin uniquement
--    - Utiliser des politiques comme: auth.uid() = 'votre-uuid-admin'
--
-- 3. Si vous avez toujours des erreurs 401 après avoir exécuté ce script:
--    - Vérifiez que RLS est bien activé dans l'onglet "Authentication" > "Policies"
--    - Vérifiez que votre clé anon est correcte dans les variables d'environnement
--    - Essayez de désactiver/réactiver RLS sur les tables
--
-- 4. Pour désactiver temporairement RLS (déconseillé en production):
--    ALTER TABLE "Product" DISABLE ROW LEVEL SECURITY;
--    ALTER TABLE "Category" DISABLE ROW LEVEL SECURITY;