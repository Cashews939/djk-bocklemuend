---
name: astro-ui-component-builder
description: >-
  Erstellt standardisierte, barrierefreie UI-Komponenten in Astro oder React mit
  Tailwind CSS, TypeScript-Props und WCAG 2.1 AA Konformität für DJK Köln-Bocklemünd.
---

# Astro UI Component Builder

Verwende diesen Skill, wenn neue UI-Komponenten oder Layout-Elemente für die DJK Köln-Bocklemünd 1967 e.V. erstellt oder erweitert werden sollen (z. B. Platzbelegungs-Hinweise, Mannschaftskarten für TVM-Ligen, Schnuppertraining-Cards, Event-Teaser oder Vereinsshop-Banner).

## 1. Zieldatei & Technologie-Wahl
- **Speicherort:** `src/components/` bzw. `src/components/ui/<ComponentName>.[astro|tsx]`
- **Framework-Wahl:**
  - Standard: **`.astro`** für alle rein präsentationalen Komponenten (Buttons, Cards, Badges, Header, Footer, Teaser, Infoboxen).
  - Nur **`.tsx` (React)**, wenn zwingend clientseitiger Zustand oder interaktive React-Hooks erforderlich sind (z. B. dynamische Platzbelegungs-Umschalter, Filtersysteme für Sportarten, Anmeldedialoge). Bei React in Astro immer die passende Client-Direktive (`client:load`, `client:visible`) setzen.

## 2. TypeScript Props-Definition
Jede Komponente definiert ein strikt typisiertes Interface:
```astro
---
interface Props {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  class?: string;
  id?: string;
}

const {
  variant = 'primary',
  size = 'md',
  class: className = '',
  ...rest
} = Astro.props;
---
```

## 3. Styling & Vereinsdesign (TG Grün-Weiß & DJK Bocklemünd)
- **Keine Inline-Styles:** Alle Formatierungen erfolgen über Tailwind-Utility-Klassen.
- **Farbschema & Klassen von DJK Bocklemünd (Tennis & Mehrsparten):**
  - Akzent / Primär (Frisches Tennis-Grün / Emerald): `bg-emerald-600 hover:bg-emerald-700 text-white`, `text-emerald-700 hover:text-emerald-800`, `border-emerald-600`
  - Kontrast / Sekundär (DJK Marineblau / Slate): `text-slate-900 font-bold`, `bg-slate-900 text-white`, `bg-blue-900`
  - Frische Tennisplatz-Nuance (optional Sand/Court-Akzent): `text-amber-700`, `border-amber-500`
  - Hintergrund: `bg-slate-50`, `bg-white`, `bg-zinc-50`
  - Rahmen: `border-slate-100`, `border-slate-200`
  - Fließtext: `text-slate-800`, `text-slate-600`, `text-zinc-700`
  - Hover & Transitions: `transition duration-200 ease-in-out`

## 4. Barrierefreiheit (WCAG 2.1 AA Pflichtkriterien)
- **Semantische HTML-Tags:** Buttons als `<button>`, Links als `<a>`. Niemals `<div>` mit Klick-Event ohne Tastatur-Fallback.
- **Tastaturbedienbarkeit:** Alle interaktiven Elemente müssen über `Tab` erreichbar sein und sichtbare Fokus-Zustände besitzen (`focus-visible:ring-2 focus-visible:ring-emerald-600`).
- **ARIA-Attribute:**
  - Icons ohne Text müssen `aria-label` oder `title` tragen.
  - Dekorative Grafiken oder Emojis erhalten `aria-hidden="true"`.
- **Valide Hierarchie:** Keine verschachtelten `<main>`-Tags erzeugen.
- **Kontraste:** Mindestens 4.5:1 Kontrastverhältnis zwischen Text und Hintergrund.

## 5. Verifikationsschritt
- Nach dem Anlegen der Komponente einen Test-Aufruf in einer Beispielseite platzieren und `npm run build` in `D:\Tennisverein` ausführen, um TypeScript- und Syntax-Fehler auszuschließen.
