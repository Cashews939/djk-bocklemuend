import fs from 'fs';

const html = fs.readFileSync('archiv_scraping/raw_pages/der-verein.html', 'utf8');

// Finde alle Repeater-Items auf der Vorstandsseite
const items = html.split('wixui-repeater__item');

for (const item of items) {
  const imgMatch = item.match(/alt="([^"]+)"/);
  const roleMatch = item.match(/class="[^"]*font_8[^"]*"[^>]*>(.*?)<\/p>/);
  const nameMatch = item.match(/class="[^"]*font_5[^"]*"[^>]*>(.*?)<\/p>/);

  if (roleMatch && nameMatch) {
    const role = roleMatch[1].replace(/<[^>]+>/g, '').trim();
    const name = nameMatch[1].replace(/<[^>]+>/g, '').trim();
    const img = imgMatch ? imgMatch[1] : 'kein Bild';
    if (role && name) {
      console.log(`ROLLE: ${role} | NAME: ${name} | BILD: ${img}`);
    }
  }
}
