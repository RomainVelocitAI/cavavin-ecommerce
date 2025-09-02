import Replicate from 'replicate';
import fs from 'fs';
import path from 'path';
import https from 'https';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN || '',
});

const products = [
  {
    name: 'chateau-margaux-2018',
    prompt: 'Professional product photography of a bottle of Château Margaux 2018 red wine from Bordeaux, elegant dark glass bottle with gold embossed label, on white background with soft shadows, luxury wine presentation, high resolution, commercial photography'
  },
  {
    name: 'chablis-premier-cru-2021',
    prompt: 'Professional product photography of a bottle of Chablis Premier Cru 2021 white wine from Burgundy, elegant clear glass bottle with refined label, on white background with soft shadows, premium wine presentation, high resolution, commercial photography'
  },
  {
    name: 'cotes-de-provence-rose-2023',
    prompt: 'Professional product photography of a bottle of Côtes de Provence rosé wine 2023, elegant pale pink wine in clear glass bottle with modern label, on white background with soft shadows, summer wine presentation, high resolution, commercial photography'
  },
  {
    name: 'whisky-nikka-12-ans',
    prompt: 'Professional product photography of a bottle of Nikka 12 years Japanese whisky, elegant dark bottle with Japanese calligraphy label, on white background with soft shadows, luxury spirits presentation, high resolution, commercial photography'
  },
  {
    name: 'rhum-diplomatico-reserva',
    prompt: 'Professional product photography of a bottle of Diplomatico Reserva rum from Venezuela, dark amber bottle with vintage label and rope decoration, on white background with soft shadows, premium rum presentation, high resolution, commercial photography'
  },
  {
    name: 'champagne-ruinart-blanc-de-blancs',
    prompt: 'Professional product photography of a bottle of Ruinart Blanc de Blancs champagne, elegant green-tinted glass bottle with classic champagne shape, gold foil and label, on white background with soft shadows, luxury champagne presentation, high resolution, commercial photography'
  }
];

async function downloadImage(url: string, filepath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {}); // Delete the file on error
      reject(err);
    });
  });
}

async function generateImages() {
  console.log('🎨 Génération des images avec Flux Schnell...\n');
  
  const outputDir = path.join(process.cwd(), 'public', 'images', 'products');
  
  // Créer le dossier s'il n'existe pas
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  for (const product of products) {
    try {
      console.log(`📸 Génération de l'image pour ${product.name}...`);
      
      const output = await replicate.run(
        "black-forest-labs/flux-schnell",
        {
          input: {
            prompt: product.prompt,
            num_outputs: 1,
            aspect_ratio: "1:1",
            output_format: "webp",
            output_quality: 90
          }
        }
      ) as string[];

      if (output && output[0]) {
        const imageUrl = output[0];
        const filepath = path.join(outputDir, `${product.name}.webp`);
        
        await downloadImage(imageUrl, filepath);
        console.log(`✅ Image générée et sauvegardée: ${product.name}.webp\n`);
      }
    } catch (error) {
      console.error(`❌ Erreur lors de la génération de ${product.name}:`, error);
    }
  }
  
  console.log('🎉 Génération des images terminée!');
}

// Vérifier que le token est défini
if (!process.env.REPLICATE_API_TOKEN) {
  console.error('❌ REPLICATE_API_TOKEN n\'est pas défini dans les variables d\'environnement');
  process.exit(1);
}

generateImages().catch(console.error);