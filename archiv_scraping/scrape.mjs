import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://www.djk-bocklemuend.de';
const ARCHIVE_DIR = path.resolve('archiv_scraping');
const PAGES_DIR = path.join(ARCHIVE_DIR, 'raw_pages');
const IMAGES_DIR = path.join(ARCHIVE_DIR, 'images');
const DOCS_DIR = path.join(ARCHIVE_DIR, 'documents');

[ARCHIVE_DIR, PAGES_DIR, IMAGES_DIR, DOCS_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

async function getSitemapUrls() {
  try {
    const sitemapRes = await fetch(`${BASE_URL}/pages-sitemap.xml`, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    });
    const xml = await sitemapRes.text();
    const urls = [];
    const matches = xml.matchAll(/<loc>(.*?)<\/loc>/g);
    for (const match of matches) {
      if (match[1]) urls.push(match[1]);
    }
    return Array.from(new Set(urls));
  } catch (err) {
    console.error('Fehler beim Abrufen der Sitemap:', err);
    return [];
  }
}

function cleanFilename(str) {
  return str.replace(/[^a-zA-Z0-9_\-\.]/g, '_').slice(0, 100);
}

const downloadedImages = new Set();
const downloadedDocs = new Set();

async function downloadFile(url, destDir, setTracker) {
  try {
    if (setTracker.has(url)) return;
    setTracker.add(url);

    let parsed;
    try {
      parsed = new URL(url, BASE_URL);
    } catch {
      return;
    }

    const pathname = parsed.pathname;
    const baseName = path.basename(pathname);
    if (!baseName || baseName.length < 3) return;

    const safeName = cleanFilename(baseName);
    const destPath = path.join(destDir, safeName);

    if (fs.existsSync(destPath)) return;

    const res = await fetch(parsed.href, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    });
    if (!res.ok) return;

    const arrayBuffer = await res.arrayBuffer();
    fs.writeFileSync(destPath, Buffer.from(arrayBuffer));
    console.log(`[DOWNLOAD] ${safeName} (${Math.round(arrayBuffer.byteLength / 1024)} KB)`);
  } catch (err) {
    // Fehler bei einzelnen Bildern/Dokumenten ignorieren
  }
}

function extractAssets(html) {
  const imageUrls = [];
  const docUrls = [];

  // Wix static images & normal img src
  const imgRegex = /https?:\/\/[^\s"'<>]+\.(?:png|jpg|jpeg|webp|gif|svg)/gi;
  const wixImgRegex = /https?:\/\/static\.wixstatic\.com\/media\/[a-zA-Z0-9_~]+/gi;
  
  let match;
  while ((match = imgRegex.exec(html)) !== null) {
    imageUrls.push(match[0]);
  }
  while ((match = wixImgRegex.exec(html)) !== null) {
    imageUrls.push(match[0]);
  }

  // Documents (pdf, docx etc)
  const docRegex = /https?:\/\/[^\s"'<>]+\.(?:pdf|docx?|xlsx?)/gi;
  const wixUgdRegex = /https?:\/\/www\.djk-bocklemuend\.de\/_files\/ugd\/[a-zA-Z0-9_]+\.pdf/gi;

  while ((match = docRegex.exec(html)) !== null) {
    docUrls.push(match[0]);
  }
  while ((match = wixUgdRegex.exec(html)) !== null) {
    docUrls.push(match[0]);
  }

  return { imageUrls, docUrls };
}

async function run() {
  console.log('Starte Archivierung von DJK Bocklemünd...');
  const urls = await getSitemapUrls();
  console.log(`Gefundene URLs in Sitemap: ${urls.length}`);

  const pageManifest = [];

  for (let i = 0; i < urls.length; i++) {
    const pageUrl = urls[i];
    console.log(`[SEITE ${i + 1}/${urls.length}] Lade ${pageUrl}...`);
    try {
      const res = await fetch(pageUrl, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
      });
      if (!res.ok) {
        console.warn(`Fehler ${res.status} bei ${pageUrl}`);
        continue;
      }
      const html = await res.text();

      const urlObj = new URL(pageUrl);
      const slugName = urlObj.pathname.replace(/^\/|\/$/g, '').replace(/[\/\?&=%]/g, '_') || 'home';
      const pageFile = path.join(PAGES_DIR, `${slugName}.html`);
      fs.writeFileSync(pageFile, html, 'utf-8');

      const { imageUrls, docUrls } = extractAssets(html);

      pageManifest.push({
        url: pageUrl,
        file: `raw_pages/${slugName}.html`,
        imagesFound: imageUrls.length,
        docsFound: docUrls.length
      });

      // Bilder herunterladen
      for (const img of imageUrls) {
        await downloadFile(img, IMAGES_DIR, downloadedImages);
      }

      // Dokumente herunterladen
      for (const doc of docUrls) {
        await downloadFile(doc, DOCS_DIR, downloadedDocs);
      }

    } catch (err) {
      console.error(`Fehler bei ${pageUrl}:`, err.message);
    }
  }

  fs.writeFileSync(
    path.join(ARCHIVE_DIR, 'manifest.json'),
    JSON.stringify({
      scrapedAt: new Date().toISOString(),
      totalPages: pageManifest.length,
      totalImages: downloadedImages.size,
      totalDocs: downloadedDocs.size,
      pages: pageManifest
    }, null, 2),
    'utf-8'
  );

  console.log('--- ARCHIVIERUNG ABGESCHLOSSEN ---');
  console.log(`Gespeicherte Seiten: ${pageManifest.length}`);
  console.log(`Heruntergeladene Bilder: ${downloadedImages.size}`);
  console.log(`Heruntergeladene Dokumente/PDFs: ${downloadedDocs.size}`);
}

run();
