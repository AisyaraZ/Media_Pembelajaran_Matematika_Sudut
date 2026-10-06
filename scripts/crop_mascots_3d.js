import { Jimp } from 'jimp';

async function process3DMascots() {
  const inputPath = 'public/assets/images/mascots_3d.jpg';
  console.log('Reading 3D mascots image:', inputPath);
  const image = await Jimp.read(inputPath);
  const width = image.bitmap.width;
  const height = image.bitmap.height;
  console.log(`Original size: ${width}x${height}`);

  // Flood fill transparency from the outside boundary
  function makeOutsideTransparent(img) {
    const w = img.bitmap.width;
    const h = img.bitmap.height;
    const visited = new Uint8Array(w * h);
    const queue = [];

    // Consider background white if R, G, B are all >= 238
    function isBgWhite(x, y) {
      const idx = (y * w + x) * 4;
      const r = img.bitmap.data[idx];
      const g = img.bitmap.data[idx + 1];
      const b = img.bitmap.data[idx + 2];
      return r >= 235 && g >= 235 && b >= 235;
    }

    // Seed 4 edges
    for (let x = 0; x < w; x++) {
      if (isBgWhite(x, 0)) { queue.push(x, 0); visited[x] = 1; }
      if (isBgWhite(x, h - 1)) { queue.push(x, h - 1); visited[(h - 1) * w + x] = 1; }
    }
    for (let y = 0; y < h; y++) {
      if (isBgWhite(0, y)) { queue.push(0, y); visited[y * w] = 1; }
      if (isBgWhite(w - 1, y)) { queue.push(w - 1, y); visited[y * w + w - 1] = 1; }
    }

    let head = 0;
    while (head < queue.length) {
      const qx = queue[head++];
      const qy = queue[head++];

      const idx = (qy * w + qx) * 4;
      img.bitmap.data[idx + 3] = 0; // Make transparent

      const neighbors = [
        [qx + 1, qy],
        [qx - 1, qy],
        [qx, qy + 1],
        [qx, qy - 1]
      ];

      for (const [nx, ny] of neighbors) {
        if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
          const nidx = ny * w + nx;
          if (!visited[nidx] && isBgWhite(nx, ny)) {
            visited[nidx] = 1;
            queue.push(nx, ny);
          }
        }
      }
    }
  }

  // 1. Process Duo (Both 3D Kiki and Lala)
  console.log('Processing Duo 3D image...');
  const duoImg = image.clone();
  duoImg.crop({ x: 210, y: 70, w: 770, h: 820 });
  makeOutsideTransparent(duoImg);
  await duoImg.write('public/assets/images/mascots_duo.png');
  console.log('Saved mascots_duo.png');

  // 2. Crop Kiki (3D Boy)
  console.log('Cropping 3D Kiki...');
  const kikiImg = image.clone();
  kikiImg.crop({ x: 210, y: 70, w: 400, h: 820 });
  makeOutsideTransparent(kikiImg);
  await kikiImg.write('public/assets/images/kiki.png');
  console.log('Saved kiki.png');

  // 3. Kiki Head Avatar
  console.log('Cropping 3D Kiki Head...');
  const kikiHead = image.clone();
  kikiHead.crop({ x: 215, y: 70, w: 330, h: 340 });
  makeOutsideTransparent(kikiHead);
  await kikiHead.write('public/assets/images/kiki_head.png');
  console.log('Saved kiki_head.png');

  // 4. Crop Lala (3D Girl)
  console.log('Cropping 3D Lala...');
  const lalaImg = image.clone();
  lalaImg.crop({ x: 615, y: 100, w: 365, h: 790 });
  makeOutsideTransparent(lalaImg);
  await lalaImg.write('public/assets/images/lala.png');
  console.log('Saved lala.png');

  // 5. Lala Head Avatar
  console.log('Cropping 3D Lala Head...');
  const lalaHead = image.clone();
  lalaHead.crop({ x: 670, y: 85, w: 265, h: 280 });
  makeOutsideTransparent(lalaHead);
  await lalaHead.write('public/assets/images/lala_head.png');
  console.log('Saved lala_head.png');

  console.log('All 3D mascots processed successfully!');
}

process3DMascots().catch(err => {
  console.error('Error processing 3D mascots:', err);
  process.exit(1);
});
