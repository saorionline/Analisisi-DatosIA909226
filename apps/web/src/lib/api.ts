import { SectionSchema, ProjectSchema, type Section, type Project } from "@portfolio/contracts";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";

export async function getSections(): Promise<Section[]> {
  const res = await fetch(`${API_URL}/sections`);
  const data = await res.json();
  return data.map((s: unknown) => SectionSchema.parse(s));
}

export async function getSection(slug: string): Promise<Section> {
  const res = await fetch(`${API_URL}/sections/${slug}`);
  return SectionSchema.parse(await res.json());
}

export async function getProjects(): Promise<Project[]> {
  const res = await fetch(`${API_URL}/projects`);
  const data = await res.json();
  return data.map((p: unknown) => ProjectSchema.parse(p));
}
