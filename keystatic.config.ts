import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    aktuelles: collection({
      label: 'Aktuelles & News',
      slugField: 'title',
      path: 'src/content/aktuelles/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Titel' } }),
        date: fields.date({ label: 'Veröffentlichungsdatum' }),
        category: fields.select({
          label: 'Sparte / Kategorie',
          options: [
            { label: 'Tennis', value: 'Tennis' },
            { label: 'Pickleball', value: 'Pickleball' },
            { label: 'Badminton', value: 'Badminton' },
            { label: 'Tischtennis', value: 'Tischtennis' },
            { label: 'Turnen & Gymnastik', value: 'Turnen & Gymnastik' },
            { label: 'Verein Allgemein', value: 'Verein Allgemein' },
          ],
          defaultValue: 'Tennis',
        }),
        teaser: fields.text({ label: 'Teaser / Kurzbeschreibung', multiline: true }),
        content: fields.markdoc({
          label: 'Haupttext / Inhalt',
        }),
      },
    }),
    termine: collection({
      label: 'Termine & Veranstaltungen',
      slugField: 'title',
      path: 'src/content/termine/*',
      schema: {
        title: fields.slug({ name: { label: 'Titel des Termins' } }),
        date: fields.date({ label: 'Datum' }),
        time: fields.text({ label: 'Uhrzeit (z. B. 10:00 Uhr)' }),
        category: fields.text({ label: 'Sparte / Anlass' }),
        location: fields.text({ label: 'Ort (z. B. Heinrich-Rohlmann-Straße oder Halle)' }),
      },
    }),
    tennisMannschaften: collection({
      label: 'Tennis Mannschaften (TG Grün-Weiß)',
      slugField: 'name',
      path: 'src/content/tennis-mannschaften/*',
      schema: {
        name: fields.slug({ name: { label: 'Mannschaftsname (z. B. 1. Damen, 1. Herren)' } }),
        liga: fields.text({ label: 'Liga (z. B. 1. Bezirksliga TVM)' }),
        captain: fields.text({ label: 'Mannschaftsführer/in' }),
        training: fields.text({ label: 'Trainingszeiten' }),
        tvmUrl: fields.url({ label: 'TVM / nuLiga Link zur Tabelle & Spielplan' }),
        order: fields.integer({ label: 'Reihenfolge / Sortierung', defaultValue: 1 }),
      },
    }),
  },
});
