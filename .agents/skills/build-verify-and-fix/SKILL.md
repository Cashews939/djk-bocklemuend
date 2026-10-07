---
name: build-verify-and-fix
description: >-
  Führt defensive Build- und Typprüfungen im Terminal aus, fängt Astro-, TypeScript-
  und Bildoptimierungsfehler automatisch ab und behebt sie vor jedem Commit.
---

# Build Verify and Fix

Verwende diesen Skill als defensiven Qualitätssicherungs-Schritt vor jedem Git-Commit, Push oder nach Codeänderungen an Komponenten, Konfigurationen und Inhalten im Projekt DJK Köln-Bocklemünd (`D:\Tennisverein`).

## 1. Ausführung des Build-Checks
Führe im Projektordner `D:\Tennisverein` folgenden Befehl aus:
```bash
npm run build
```

## 2. Automatische Fehler-Diagnose & Korrektur

Wenn der Build mit Exit-Code != 0 fehlschlägt oder Warnungen wirft, analysiere die Konsole und wende die passende Korrektur an:

### A) Bild- & Asset-Importfehler
- **Ursache:** Bilder in `src/assets/` wurden mit falschem Pfad oder Dateinamen importiert (z. B. Groß-/Kleinschreibung wie `.jpeg` vs `.jpg`).
- **Korrektur:** Dateinamen in `src/assets/` prüfen und Importpfad exakt abgleichen. Immer `import { Image } from 'astro:assets';` verwenden.

### B) Keystatic & Content-Schema-Fehler
- **Ursache:** Ein Eintrag in `src/content/aktuelles/`, `src/content/termine/` oder `src/content/tennis-mannschaften/` passt nicht zum Schema in `keystatic.config.ts`.
- **Korrektur:** 
  - `aktuelles`: Pflichtfelder `title`, `date`, `category`, `teaser`, `content` prüfen.
  - `termine`: Felder `title`, `date`, `time`, `location`, `category` prüfen.
  - `tennis-mannschaften`: Felder `name`, `liga`, `training`, `tvmUrl` prüfen.

### C) Nicht geschlossene oder falsch geschachtelte HTML/Astro-Tags
- **Ursache:** Mismatched Tags (z. B. `<MainLayout>` geöffnet, aber mit `</Layout>` geschlossen) oder fehlendes schließendes Fragment.
- **Korrektur:** Korrigiere das schließende Tag exakt auf den Namen der importierten Komponente.

### D) Fehlende Imports oder TypeScript-Typisierungsfehler
- **Ursache:** Eine Komponente oder ein Typ wird verwendet, ist aber nicht importiert.
- **Korrektur:** Ergänze den passenden Import im Frontmatter (`---`) der Datei.

## 3. Wiederholungsschleife & Freigabe
1. Nach jeder automatischen Korrektur erneut `npm run build` in `D:\Tennisverein` ausführen.
2. Wiederholen, bis der Build mit **Code 0** und ohne Fehler durchläuft.
3. Erst wenn der Build erfolgreich ist, darf der Git-Commit (`git commit`) und Push (`git push`) durchgeführt werden.
