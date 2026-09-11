import { SectionSchema, ProjectSchema, type Section, type Project } from "@portfolio/contracts";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";

// Next.js guarda en su Data Cache el resultado de cada fetch del servidor
// (apps/web/.next/cache/fetch-cache). Para un API de contenido que editas a
// mano, eso significa seguir viendo los JSON de hace una hora.
// no-store lo desactiva: cada request va al backend de verdad.
const NO_CACHE = { cache: "no-store" } as const;

export async function getSections(): Promise<Section[]> {
  const res = await fetch(`${API_URL}/sections`, NO_CACHE);
  const data = await res.json();
  return data.map((s: unknown) => SectionSchema.parse(s));
}

export async function getSection(slug: string): Promise<Section> {
  const res = await fetch(`${API_URL}/sections/${slug}`, NO_CACHE);
  return SectionSchema.parse(await res.json());
}

export async function getProjects(): Promise<Project[]> {
  const res = await fetch(`${API_URL}/projects`, NO_CACHE);
  const data = await res.json();
  return data.map((p: unknown) => ProjectSchema.parse(p));
}
