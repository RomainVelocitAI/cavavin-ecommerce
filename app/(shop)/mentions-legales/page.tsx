export default function MentionsLegalesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Mentions Légales</h1>
      
      <div className="prose max-w-none space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-3">Éditeur du site</h2>
          <div className="bg-gray-50 rounded-lg p-6">
            <p><strong>Raison sociale:</strong> Cavavin La Réunion SARL</p>
            <p><strong>Capital social:</strong> 50 000 €</p>
            <p><strong>Siège social:</strong> 123 Rue Maréchal Leclerc, 97400 Saint-Denis</p>
            <p><strong>RCS:</strong> Saint-Denis B 123 456 789</p>
            <p><strong>SIRET:</strong> 123 456 789 00012</p>
            <p><strong>TVA Intracommunautaire:</strong> FR 12 123456789</p>
            <p><strong>Téléphone:</strong> 0262 12 34 56</p>
            <p><strong>Email:</strong> contact@cavavin-reunion.re</p>
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-3">Directeur de la publication</h2>
          <p>M. Jean DUPONT, Gérant</p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-3">Hébergement</h2>
          <div className="bg-gray-50 rounded-lg p-6">
            <p><strong>Hébergeur:</strong> Vercel Inc.</p>
            <p><strong>Adresse:</strong> 440 N Barranca Ave #4133, Covina, CA 91723</p>
            <p><strong>Site web:</strong> https://vercel.com</p>
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-3">Licences de vente d&apos;alcool</h2>
          <div className="bg-gray-50 rounded-lg p-6">
            <p><strong>Licence IV Saint-Denis:</strong> N° 974-2023-0001</p>
            <p><strong>Licence IV Saint-Pierre:</strong> N° 974-2023-0002</p>
            <p><strong>Numéro d&apos;agrément:</strong> FR 974 123 CE</p>
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-3">Propriété intellectuelle</h2>
          <p>
            L&apos;ensemble de ce site relève de la législation française et internationale sur le droit 
            d&apos;auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, 
            y compris pour les documents téléchargeables et les représentations iconographiques et 
            photographiques.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-3">Protection des données personnelles</h2>
          <p>
            Conformément à la loi « informatique et libertés » du 6 janvier 1978 modifiée et au 
            Règlement Général sur la Protection des Données (RGPD), vous disposez d&apos;un droit d&apos;accès, 
            de rectification, de suppression et d&apos;opposition aux données personnelles vous concernant.
          </p>
          <p className="mt-3">
            Pour exercer ces droits, vous pouvez nous contacter par email à: 
            <strong> protection-donnees@cavavin-reunion.re</strong>
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-3">Cookies</h2>
          <p>
            Ce site utilise des cookies pour améliorer l&apos;expérience utilisateur et analyser le trafic. 
            En continuant à naviguer sur ce site, vous acceptez l&apos;utilisation de cookies conformément 
            à notre politique de confidentialité.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-3">Médiation</h2>
          <p>
            En cas de litige, vous pouvez recourir gratuitement au service de médiation 
            MEDICYS pour rechercher une solution amiable.
          </p>
          <div className="bg-gray-50 rounded-lg p-6 mt-3">
            <p><strong>MEDICYS</strong></p>
            <p>73 Boulevard de Clichy</p>
            <p>75009 Paris</p>
            <p>Site: www.medicys.fr</p>
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-3">Avertissement</h2>
          <div className="bg-yellow-50 border border-yellow-400 rounded-lg p-4">
            <p>
              <strong>La vente d&apos;alcool est interdite aux mineurs.</strong> 
              L&apos;abus d&apos;alcool est dangereux pour la santé. À consommer avec modération.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}