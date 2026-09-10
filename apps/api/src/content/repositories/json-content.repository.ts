import { Injectable } from "@nestjs/common";
import * as fs from "fs";
import * as path from "path";
import { ContentRepository } from "./content.repository";
import { SectionEntity } from "../entities/section.entity";
import { ProjectEntity } from "../entities/project.entity";

// Implementación de HOY: lee los .json versionados en /content/data
@Injectable()
export class JsonContentRepository implements ContentRepository {
  private readonly sectionsDir = path.join(__dirname, "..", "data", "sections");
  private readonly projectsDir = path.join(__dirname, "..", "data", "projects");

  async findAllSections(): Promise<SectionEntity[]> {
    const files = fs.readdirSync(this.sectionsDir).filter((f) => f.endsWith(".json"));
    const sections = files.map((f) =>
      JSON.parse(fs.readFileSync(path.join(this.sectionsDir, f), "utf-8"))
    );
    return sections.sort((a, b) => a.order - b.order);
  }

  async findSectionBySlug(slug: string): Promise<SectionEntity | null> {
    const filePath = path.join(this.sectionsDir, `${slug}.json`);
    if (!fs.existsSync(filePath)) return null;
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  }

  async findAllProjects(): Promise<ProjectEntity[]> {
    if (!fs.existsSync(this.projectsDir)) return [];
    const files = fs.readdirSync(this.projectsDir).filter((f) => f.endsWith(".json"));
    return files.map((f) =>
      JSON.parse(fs.readFileSync(path.join(this.projectsDir, f), "utf-8"))
    );
  }

  async findProjectById(id: string): Promise<ProjectEntity | null> {
    const filePath = path.join(this.projectsDir, `${id}.json`);
    if (!fs.existsSync(filePath)) return null;
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  }
}
