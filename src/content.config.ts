import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Content collection `karya` (brief §11.1).
 *
 * Adding a project = adding ONE markdown file. No component edits, ever.
 *
 * Two fields exist purely to keep the site honest:
 *  - `draft` marks content that was transcribed from a live site or guessed, and must be
 *    replaced with verified facts before M6 (CI blocks `draft: true` at the end).
 *  - `concept` marks concept work, so the UI can keep the "Konsep" badge wherever the
 *    project appears — concept work must never read as client work.
 */
const karya = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/karya' }),
  schema: z.object({
    name: z.string(),
    category: z.string(),
    status: z.enum(['live', 'concept', 'coming-soon']),
    url: z.string().url().nullable(),
    concept: z.boolean().default(false),
    /** null → the year label is hidden entirely (proposal P4); never invent a year. */
    year: z.number().int().min(2000).max(2100).nullable(),
    /** null → hidden. */
    role: z.string().nullable(),
    order: z.number().int(),
    summary: z.string(),
    stack: z
      .array(
        z.object({
          name: z.string(),
          why: z.string(),
        }),
      )
      .default([]),
    problem: z.string().nullable(),
    solution: z.string().nullable(),
    features: z
      .array(
        z.object({
          title: z.string(),
          body: z.string(),
          image: z.string().nullable().default(null),
          alt: z.string().nullable().default(null),
        }),
      )
      .default([]),
    /** The differentiator section: what agents did, and what Bima checked or corrected. */
    agentWork: z
      .object({
        agent: z.array(z.string()).default([]),
        checked: z.array(z.string()).default([]),
      })
      .default({ agent: [], checked: [] }),
    /**
     * Real results only. null (the default) means the "Hasil" section is omitted —
     * an empty array would render an empty heading, so absence is explicit here.
     */
    results: z
      .array(
        z.object({
          label: z.string(),
          value: z.string(),
        }),
      )
      .nullable()
      .default(null),
    draft: z.boolean().default(false),
  }),
});

export const collections = { karya };
