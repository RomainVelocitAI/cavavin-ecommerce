// Test de connexion Supabase
const { Client } = require('pg');

// Test avec différentes configurations
const configs = [
  {
    name: 'Config 1: postgres user direct',
    host: 'db.dzproavuumvmootwgevi.supabase.co',
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: 'Bdmkiller=33!+',
    ssl: { rejectUnauthorized: false }
  },
  {
    name: 'Config 2: postgres.project user',
    host: 'db.dzproavuumvmootwgevi.supabase.co',
    port: 5432,
    database: 'postgres',
    user: 'postgres.dzproavuumvmootwgevi',
    password: 'Bdmkiller=33!+',
    ssl: { rejectUnauthorized: false }
  },
  {
    name: 'Config 3: Pooler connection',
    host: 'aws-0-ap-southeast-1.pooler.supabase.com',
    port: 6543,
    database: 'postgres',
    user: 'postgres.dzproavuumvmootwgevi',
    password: 'Bdmkiller=33!+',
    ssl: { rejectUnauthorized: false }
  }
];

const config = configs[0]; // On testera chaque config

const client = new Client(config);

async function testAllConfigs() {
  for (const cfg of configs) {
    console.log('\n' + '='.repeat(50));
    console.log('Test:', cfg.name);
    console.log('='.repeat(50));
    
    const client = new Client(cfg);
    
    try {
      console.log('Tentative de connexion...');
      await client.connect();
      console.log('✅ CONNEXION RÉUSSIE !');
      
      const result = await client.query('SELECT version()');
      console.log('Version PostgreSQL:', result.rows[0].version);
      
      await client.end();
      
      // Si ça marche, on affiche la config qui fonctionne
      console.log('\n🎉 Configuration fonctionnelle trouvée !');
      console.log('Host:', cfg.host);
      console.log('Port:', cfg.port);
      console.log('User:', cfg.user);
      break;
      
    } catch (error) {
      console.error('❌ Échec:', error.message);
      await client.end().catch(() => {});
    }
  }
}

testAllConfigs();