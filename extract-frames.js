const sharp = require('sharp');
const path = require('path');

const INPUT = path.join(__dirname, 'video.webp');
const OUTPUT_DIR = path.join(__dirname, 'public', 'sequence');
const FRAME_COUNT = 120;

async function extractFrames() {
  console.log(`🎬 Extrayendo ${FRAME_COUNT} frames de video.webp...`);

  const tasks = [];

  for (let i = 0; i < FRAME_COUNT; i++) {
    const frameNum = i + 1;
    const filename = `frame_${String(frameNum).padStart(4, '0')}.png`;
    const filepath = path.join(OUTPUT_DIR, filename);

    tasks.push(
      sharp(INPUT, { page: i })
        .png()
        .toFile(filepath)
        .then(() => {
          if (frameNum % 20 === 0) {
            console.log(`✅ Frame ${frameNum}/${FRAME_COUNT}`);
          }
        })
    );
  }

  await Promise.all(tasks);

  const { readdirSync } = require('fs');
  const files = readdirSync(OUTPUT_DIR).filter(f => f.endsWith('.png'));
  console.log(`\n✅ Frames extraídos: ${files.length}/${FRAME_COUNT}`);
  console.log(`📁 Ubicación: ${OUTPUT_DIR}`);
}

extractFrames().catch(console.error);
