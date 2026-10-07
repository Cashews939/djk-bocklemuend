---
name: keystatic-content-creator
description: >-
  Erstellt und erweitert Keystatic-Collections in keystatic.config.ts oder generiert
  validierte News-, Termin-, Sportarten- und Mannschaftsbeiträge für DJK Köln-Bocklemünd.
---

# Keystatic Collection & Content Creator

Verwende diesen Skill, wenn neue Inhaltsbereiche (Collections) oder neue Inhaltsbeiträge (News, Termine, Tennis-Mannschaften, Schnuppertraining, Downloads) für die DJK Köln-Bocklemünd 1967 e.V. angelegt werden sollen.

## MODUS 1: Bestehende Collections befüllen (`create-entry`)

### A) News / Aktuelles (`src/content/aktuelles/<slug>.mdoc`)
- **Pfad:** `src/content/aktuelles/<slug>.mdoc`
- **Schema-Felder:**
  - `title`: Titel des Beitrags (z. B. *„Erfolgreicher Saisonauftakt der 1. Herren auf unserer Tennisanlage“*)
  - `date`: YYYY-MM-DD
  - `category`: `Tennis` | `Pickleball` | `Badminton` | `Tischtennis` | `Turnen & Gymnastik` | `Verein Allgemein`
  - `teaser`: Kurzer Vorschautext für die Übersichtskarte
  - `content`: Fließtext (Markdoc-Dokument)
- **Beispiel:**
```markdown
---
title: Toller Rückblick auf das Tennis-Sommercamp 2026
date: 2026-08-10
category: Tennis
teaser: Über 25 Kinder und Jugendliche hatten auf unseren 5 Ascheplätzen an der Heinrich-Rohlmann-Straße eine intensive und spaßige Trainingswoche.
---

Hier folgt der ausführliche Bericht und Impressionen vom Sommercamp...
```

### B) Termine & Events (`src/content/termine/<slug>.yaml`)
- **Pfad:** `src/content/termine/<slug>.yaml`
- **Schema-Felder:**
```yaml
title: Medenspiel 1. Damen vs. TC Rodenkirchen
date: 2026-05-14
time: "10:00 Uhr"
category: Tennis
location: Tennisanlage Heinrich-Rohlmann-Straße (Köln-Bocklemünd)
```

### C) Tennis-Mannschaften (`src/content/tennis-mannschaften/<slug>.yaml`)
- **Pfad:** `src/content/tennis-mannschaften/<slug>.yaml`
- **Schema-Felder:**
```yaml
name: 1. Damen
liga: 1. Bezirksliga (TVM)
captain: Anna Becker
training: "Dienstags & Donnerstags 18:00 - 20:00 Uhr"
tvmUrl: https://tvm-tennis.de/spielbetrieb/verein/2110-tg-gw-im-djk-bocklemuend
order: 1
```

---

## MODUS 2: Neue Collection anlegen (`create-collection`)
Wenn eine neue Inhaltskategorie (z. B. `downloads`, `vorstand`, `sportarten`, `preise-gastspieler`) angelegt werden soll:

1. **Keystatic konfigurieren (`keystatic.config.ts`):**
   - Neue Collection in `collections: { ... }` definieren:
     ```ts
     downloads: collection({
       label: 'Dokumente & Downloads',
       slugField: 'title',
       path: 'src/content/downloads/*',
       schema: {
         title: fields.slug({ name: { label: 'Dokumentenbezeichnung' } }),
         category: fields.select({
           label: 'Kategorie',
           options: [
             { label: 'Aufnahmeantrag', value: 'mitgliedschaft' },
             { label: 'Satzung & Ordnungen', value: 'satzung' },
             { label: 'Protokolle MV', value: 'protokolle' },
             { label: 'Tennis Gastspieler & Gebühren', value: 'tennis' },
           ],
           defaultValue: 'mitgliedschaft',
         }),
         file: fields.file({
           label: 'PDF-Datei',
           directory: 'public/downloads',
           publicPath: '/downloads/',
         }),
       },
     }),
     ```

2. **Verifikation:**
   - Im Terminal `npm run build` in `D:\Tennisverein` ausführen, um TypeScript- und Schema-Konflikte auszuschließen.
