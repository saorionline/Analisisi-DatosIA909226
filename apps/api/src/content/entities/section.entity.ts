export class SectionEntity {
  slug!: string;
  order!: number;
  layout?: "document" | "cover-hero";
  title!: string;
  subtitle?: string;
  intro?: string;
  bullets?: { heading: string; body: string }[];
  table?: { headers: string[]; rows: string[][] };
  code?: { caption?: string; language?: string; content: string };
  media?: {
    image?: string;
    eyebrow?: string;
    align?: "left" | "right" | "center" | "full";
  };
}