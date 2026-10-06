import { Jimp } from 'jimp';
import path from 'path';

async function processMascots() {
  const inputPath = 'public/assets/images/educational_mascots.jpg';
  console.log('Reading image:', inputPath);
  const image = await Jimp.read(inputPath);
  const width = image.bitmap.width;
  const height = image.bitmap.height;
  console.log(`Original size: ${width}x${height}`);

  // Helper to make background transparent (flood from corners or color threshold)
  // Since background is solid white, replace pixels near white:
  // Note: we only want outside white to be transparent, or any pixel with R>242, G>242, B>242
  // But wait, Kiki's shirt has white stripes, socks have white, book pages are white.
  // We can do a flood fill transparency from the borders (x=0, y=0, etc.) so internal white is preserved!

  function makeOutsideTransparent(img) {
    const w = img.bitmap.width;
    const h = img.bitmap.height;
    const visited = new Uint8Array(w * h);
    const queue = [];

    // Check if pixel is white-ish background
    function isWhite(x, y) {
      const idx = (y * w + x) * 4;
      const r = img.bitmap.data[idx];
      const g = img.bitmap.data[idx + 1];
      const b = img.bitmap.data[idx + 2];
      return r >= 238 && g >= 238 && b >= 238;
    }

    // Seed edges
    for (let x = 0; x < w; x++) {
      if (isWhite(x, 0)) { queue.push(x, 0); visited[x] = 1; }
      if (isWhite(x, h - 1)) { queue.push(x, h - 1); visited[(h - 1) * w + x] = 1; }
    }
    for (let y = 0; y < h; y++) {
      if (isWhite(0, y)) { queue.push(0, y); visited[y * w] = 1; }
      if (isWhite(w - 1, y)) { queue.push(w - 1, y); visited[y * w + w - 1] = 1; }
    }

    let head = 0;
    while (head < queue.length) {
      const qx = queue[head++];
      const qy = queue[head++];

      // Set alpha to 0 for background
      const idx = (qy * w + qx) * 4;
      img.bitmap.data[idx + 3] = 0; // Transparent!

      // Check 4 neighbors
      const neighbors = [
        [qx + 1, qy],
        [qx - 1, qy],
        [qx, qy + 1],
        [qx, qy - 1]
      ];

      for (const [nx, ny] of neighbors) {
        if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
          const nidx = ny * w + nx;
          if (!visited[nidx] && isWhite(nx, ny)) {
            visited[nidx] = 1;
            queue.push(nx, ny);
          }
        }
      }
    }
  }

  // 1. Process Duo Image
  console.log('Processing Duo image...');
  const duoImg = image.clone();
  makeOutsideTransparent(duoImg);
  await duoImg.write('public/assets/images/mascots_duo.png');
  console.log('Saved mascots_duo.png');

  // 2. Crop Kiki (Boy)
  // Left side: x ~ 60 to 570, y ~ 60 to 860
  console.log('Cropping Kiki...');
  const kikiImg = image.clone();
  kikiImg.crop({ x: 50, y: 50, w: 530, h: 810 });
  makeOutsideTransparent(kikiImg);
  await kikiImg.write('public/assets/images/kiki.png');
  console.log('Saved kiki.png');

  // Kiki Head Avatar
  const kikiHead = image.clone();
  kikiHead.crop({ x: 130, y: 70, w: 370, h: 370 });
  makeOutsideTransparent(kikiHead);
  await kikiHead.write('public/assets/images/kiki_head.png');
  console.log('Saved kiki_head.png');

  // 3. Crop Lala (Girl)
  // Right side: x ~ 620 to 1140, y ~ 60 to 860
  console.log('Cropping Lala...');
  const lalaImg = image.clone();
  lalaImg.crop({ x: 620, y: 50, w: 530, h: 810 });
  makeOutsideTransparent(lalaImg);
  await lalaImg.write('public/assets/images/lala.png');
  console.log('Saved lala.png');

  // Lala Head Avatar
  const lalaHead = image.clone();
  lalaHead.crop({ x: 690, y: 70, w: 370, h: 370 });
  makeOutsideTransparent(lalaHead);
  await lalaHead.write('public/assets/images/lala_head.png');
  console.log('Saved lala_head.png');

  console.log('All mascots processed successfully!');
}

processMascots().catch(err => {
  console.error('Error processing mascots:', err);
  process.exit(1);
});
