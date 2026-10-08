import fs from 'fs';

const pages = [
  'badminton.html',
  'pickleball.html',
  'eltern-kind-turnen.html',
  'projects-7.html',
  'tischtennis-1.html'
];

for (const p of pages) {
  const filePath = `archiv_scraping/raw_pages/${p}`;
  if (!fs.existsSync(filePath)) continue;
  const html = fs.readFileSync(filePath, 'utf8');
  console.log(`=== IMAGES IN ${p} ===`);
  const matches = html.matchAll(/alt="([^"]+)"/g);
  const found = new Set();
  for (const m of matches) {
    if (m[1].includes('.png') || m[1].includes('.jpg') || m[1].includes('.jpeg') || m[1].includes('.webp')) {
      found.add(m[1]);
    }
  }
  for (const f of found) {
    console.log(` - ${f}`);
  }
}
