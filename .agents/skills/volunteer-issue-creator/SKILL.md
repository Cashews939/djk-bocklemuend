---
name: volunteer-issue-creator
description: >-
  Übersetzt Feature-Wünsche, Website-Aufgaben, Platzpflege- oder Trainer-Aufrufe in
  modulare Aufgabenpakete für ehrenamtliche Unterstützer der DJK Köln-Bocklemünd.
---

# Volunteer & Club Issue Creator

Verwende diesen Skill, wenn Ideen, Website-Erweiterungen, CMS-Pflegeaufgaben oder ehrenamtliche Aufrufe für die DJK Köln-Bocklemünd 1967 e.V. (insb. TG Grün-Weiß Tennis) in leicht verständliche, einladende Mitmach-Aufgaben gegliedert werden sollen.

## 1. Kriterien für ein gutes Vereins-Issue
- **Modularität:** Aufgaben für die Web-Präsenz sollten überschaubar (1–3 Stunden) und klar definiert sein.
- **Keine technischen Barrieren:** Wenn es um redaktionelle Aufgaben via Keystatic CMS geht (z. B. Spielberichte einpflegen oder Platzgebühren aktualisieren), einfache Schritt-für-Schritt-Anleitungen beifügen.
- **Kölsch-herzlicher Vereinston:** Einladende Sprache (*„Mit dem Herz in Bocklemünd – Mach mit!“*), die ehrenamtliches Engagement wertschätzt.

## 2. Standard-Issue-Template

Erstelle das Issue nach folgendem strukturierten Schema:

```markdown
### 🎯 Was ist das Ziel?
[Kurze Beschreibung der Aufgabe, z. B. „Schnuppertraining-Informationskarte für die Tennisjugend gestalten“ oder „TVM-Medenspiel-Verlinkungen der Mannschaften einbinden“.]

### 🎾 Kontext & Vereinsnutzen
[1-2 Sätze dazu, warum diese Erweiterung den Mitgliedern, Eltern, Gästen oder Teams der DJK Bocklemünd nützt.]

### 📂 Betroffene Dateien / Bereiche
- \`src/components/...\`
- \`src/content/...\`
- oder Keystatic CMS: \`/keystatic\` (Inhalte pflegen)

### ✅ Akzeptanzkriterien (Definition of Done)
- [ ] Kriterium 1 (z. B. Alle Trainingszeiten und Ansprechpartner der Mannschaft hinterlegt)
- [ ] Kriterium 2 (z. B. Responsive Darstellung auf Mobiltelefonen)
- [ ] Kriterium 3 (z. B. Vereinsfarben Grün/Weiß/Slate eingehalten)
- [ ] Lokaler Build (\`npm run build\`) läuft in \`D:\Tennisverein\` fehlerfrei durch

### 🛠️ Lokale Test-Anleitung für Mitwirkende
1. Repository klonen / Branch erstellen:
   \`git checkout -b feature/mein-beitrag\`
2. Im Projektordner (\`D:\Tennisverein\`) Abhängigkeiten installieren und Dev-Server starten:
   \`npm install\`
   \`npm run dev\`
3. Im Browser unter \`http://localhost:4321\` prüfen.
4. Vor dem Commit den Produktions-Build testen:
   \`npm run build\`

### 🏷️ Empfohlene Labels
- \`good-first-issue\`
- \`djk-bocklemuend\`
- [Bereich: \`tennis\`, \`jugend\`, \`cms\`, \`design\`, \`gastspieler\`, \`breitensport\`]
```

## 3. Ausgabe & Ablage
- Gib das fertige Markdown-Issue direkt im Chat aus oder speichere es auf Wunsch unter `docs/issues/<issue-name>.md` ab.
