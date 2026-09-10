import { Injectable } from "@nestjs/common";
import { ContentRepository } from "./content.repository";
import { SectionEntity } from "../entities/section.entity";
import { ProjectEntity } from "../entities/project.entity";

// Implementación de MAÑANA: cuando migres a Postgres (Supabase/Neon),
// solo llenas estos métodos con `this.prisma.section.findMany()`, etc.,
// y cambias el provider en content.module.ts. Nada más se toca.
@Injectable()
export class PrismaContentRepository implements ContentRepository {
  async findAllSections(): Promise<SectionEntity[]> {
    throw new Error("PrismaContentRepository no implementado todavía");
  }
  async findSectionBySlug(_slug: string): Promise<SectionEntity | null> {
    throw new Error("PrismaContentRepository no implementado todavía");
  }
  async findAllProjects(): Promise<ProjectEntity[]> {
    throw new Error("PrismaContentRepository no implementado todavía");
  }
  async findProjectById(_id: string): Promise<ProjectEntity | null> {
    throw new Error("PrismaContentRepository no implementado todavía");
  }
}
