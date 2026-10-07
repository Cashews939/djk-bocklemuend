# DJK Köln-Bocklemünd 1967 e.V. – Offizielle Vereinswebseite

Moderne, barrierefreie und mobile-optimierte Web-Präsenz für die **DJK Köln-Bocklemünd 1967 e.V.** (inkl. Tennis-Sparte **TG Grün-Weiß**).

## 🚀 Technologie-Stack
- **Framework:** Astro 6 (mit React-Inseln)
- **Styling:** Tailwind CSS (Vereinsfarben: Grün / Weiß / DJK-Marineblau)
- **Content Management:** Keystatic CMS (Git-basiert & Markdown/YAML)
- **Hosting / Deployment:** Vercel

## 📂 Wichtige Bereiche
- `src/pages/`: Astro-Routen (Startseite, Tennis, Sportarten, Aktuelles, Termine, Impressum)
- `src/content/`: Keystatic Inhalts-Sammlungen (`aktuelles`, `termine`, `tennis-mannschaften`)
- `src/components/`: Wiederverwendbare Astro- und React-Komponenten
- `.agents/skills/`: Projekt-spezifische Antigravity-Skills für Build-Checks, Satzungs-Compliance und CMS-Pflege
- `archiv_scraping/`: Lokale Sicherung aller Originalseiten, 400+ Fotos und Vereinsdokumente des alten Webauftritts

## 🛠️ Entwicklung & Build
```bash
# Abhängigkeiten installieren
npm install

# Lokalen Entwicklungsserver starten
npm run dev

# Produktions-Build prüfen
npm run build
```
