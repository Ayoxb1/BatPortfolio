const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const FRAME_COUNT = 120;
const WIDTH = 720;
const HEIGHT = 1280;
const OUTPUT_DIR = path.join(__dirname, 'public', 'sequence');

// Crear carpeta si no existe
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Función para generar un frame con SVG
async function generateFrame(frameNum) {
  const progress = frameNum / FRAME_COUNT;

  // Colores basados en progreso
  const hue = (frameNum * 3) % 360;
  const color1 = `hsl(${hue}, 100%, 50%)`;
  const color2 = `hsl(${(hue + 90) % 360}, 100%, 50%)`;

  // Crear SVG con gradiente animado
  const svg = `
    <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${color1};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${color2};stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#grad1)"/>
      <circle cx="${WIDTH/2}" cy="${HEIGHT * progress}" r="${50 + progress * 100}" fill="rgba(255,255,255,0.1)"/>
      <text x="50%" y="50%" font-size="48" font-family="Arial" fill="white" text-anchor="middle" dominant-baseline="middle" opacity="${Math.sin(progress * Math.PI)}">
        Frame ${frameNum}
      </text>
    </svg>
  `;

  const filename = `frame_${String(frameNum).padStart(4, '0')}.png`;
  const filepath = path.join(OUTPUT_DIR, filename);

  try {
    await sharp(Buffer.from(svg)).png().toFile(filepath);
    if (frameNum % 20 === 0) {
      console.log(`✅ Generated frame ${frameNum}/${FRAME_COUNT}`);
    }
  } catch (err) {
    console.error(`Error generating frame ${frameNum}:`, err.message);
  }
}

// Generar todos los frames
async function generateAllFrames() {
  console.log(`🎬 Generando ${FRAME_COUNT} frames PNG...`);
  const frames = [];

  for (let i = 1; i <= FRAME_COUNT; i++) {
    frames.push(generateFrame(i));
  }

  await Promise.all(frames);

  // Verificar que se crearon
  const files = fs.readdirSync(OUTPUT_DIR).filter(f => f.endsWith('.png'));
  console.log(`\n✅ Frames generados: ${files.length}/${FRAME_COUNT}`);
  console.log(`📁 Ubicación: ${OUTPUT_DIR}`);
}

generateAllFrames().catch(console.error);
