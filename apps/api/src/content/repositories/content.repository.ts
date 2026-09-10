import { SectionEntity } from "../entities/section.entity";
import { ProjectEntity } from "../entities/project.entity";

// Contrato: cualquier fuente de datos (JSON hoy, Prisma/Postgres mañana)
// debe cumplir esta interfaz. El resto de la app depende SOLO de esto.
export interface ContentRepository {
  findAllSections(): Promise<SectionEntity[]>;
  findSectionBySlug(slug: string): Promise<SectionEntity | null>;
  findAllProjects(): Promise<ProjectEntity[]>;
  findProjectById(id: string): Promise<ProjectEntity | null>;
}

// Token de inyección de dependencias (Nest no puede inyectar interfaces TS directamente)
export const CONTENT_REPOSITORY = "CONTENT_REPOSITORY";
