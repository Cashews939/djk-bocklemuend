import fs from 'fs';

const pages = [
  'badminton.html',
  'pickleball.html',
  'eltern-kind-turnen.html',
  'projects-7.html',
  'tischtennis-1.html',
  'tt-bilder.html',
  'kopie-von-tt-bilder-vm-2025.html'
];

for (const p of pages) {
  const filePath = `archiv_scraping/raw_pages/${p}`;
  if (!fs.existsSync(filePath)) continue;
  const html = fs.readFileSync(filePath, 'utf8');
  console.log(`=== URLS IN ${p} ===`);
  const regex = /https?:\/\/static\.wixstatic\.com\/media\/([a-zA-Z0-9_~]+(\.(png|jpg|jpeg|webp))?)/gi;
  const found = new Set();
  let m;
  while ((m = regex.exec(html)) !== null) {
    found.add(m[0]);
  }
  console.log(`Gefunden: ${found.size} Bilder`);
  let count = 0;
  for (const url of found) {
    if (count++ < 5) console.log(`   ${url}`);
  }
}
