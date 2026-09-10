import { z } from "zod";

// Una "sección" es cada página del documento: portada | seccion | panel | arquitectura
export const SectionSchema = z.object({
  slug: z.string(),                 // "portada" | "seccion" | "panel" | "arquitectura"
  order: z.number().int(),
  title: z.string(),
  subtitle: z.string().optional(),
  intro: z.string().optional(),
  bullets: z
    .array(
      z.object({
        heading: z.string(),
        body: z.string(),
      })
    )
    .optional(),
  table: z
    .object({
      headers: z.array(z.string()),
      rows: z.array(z.array(z.string())),
    })
    .optional(),
  code: z
    .object({
      caption: z.string().optional(),
      language: z.string().optional(),
      content: z.string(),
    })
    .optional(),
});

export type Section = z.infer<typeof SectionSchema>;
