import { z } from "zod";

export const SectionLayoutSchema = z.enum(["document", "cover-hero"]);
export type SectionLayout = z.infer<typeof SectionLayoutSchema>;

export const SectionSchema = z.object({
  slug: z.string(),
  order: z.number().int(),
  layout: SectionLayoutSchema.default("document"),   // ← nuevo
  title: z.string(),
  subtitle: z.string().optional(),
  intro: z.string().optional(),
  bullets: z
    .array(z.object({ heading: z.string(), body: z.string() }))
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
  media: z
    .object({
      image: z.string().optional(),
      eyebrow: z.string().optional(),
      align: z.enum(["left", "right", "center", "full"]).default("center"),
    })
    .optional(),                                     // ← campos propios de la portada
});

export type Section = z.infer<typeof SectionSchema>;