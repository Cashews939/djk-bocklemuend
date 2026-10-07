import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const aktuelles = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdoc,mdx}', base: './src/content/aktuelles' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    category: z.string(),
    teaser: z.string(),
  }),
});

const termine = defineCollection({
  loader: glob({ pattern: '**/*.{yaml,yml,json}', base: './src/content/termine' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    time: z.string(),
    category: z.string(),
    location: z.string(),
  }),
});

const tennisMannschaften = defineCollection({
  loader: glob({ pattern: '**/*.{yaml,yml,json}', base: './src/content/tennis-mannschaften' }),
  schema: z.object({
    name: z.string(),
    liga: z.string(),
    captain: z.string().optional(),
    training: z.string().optional(),
    tvmUrl: z.string().url().optional(),
    order: z.number().default(1),
  }),
});

export const collections = {
  aktuelles,
  termine,
  'tennis-mannschaften': tennisMannschaften,
};
