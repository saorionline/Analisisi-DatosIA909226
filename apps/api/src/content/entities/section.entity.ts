export class SectionEntity {
  slug!: string;
  order!: number;
  title!: string;
  subtitle?: string;
  intro?: string;
  bullets?: { heading: string; body: string }[];
  table?: { headers: string[]; rows: string[][] };
  code?: { caption?: string; language?: string; content: string };
}
