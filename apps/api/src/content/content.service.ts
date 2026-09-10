import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CONTENT_REPOSITORY, ContentRepository } from "./repositories/content.repository";

@Injectable()
export class ContentService {
  constructor(
    @Inject(CONTENT_REPOSITORY) private readonly repo: ContentRepository
  ) {}

  getSections() {
    return this.repo.findAllSections();
  }

  async getSectionBySlug(slug: string) {
    const section = await this.repo.findSectionBySlug(slug);
    if (!section) throw new NotFoundException(`Sección "${slug}" no existe`);
    return section;
  }

  getProjects() {
    return this.repo.findAllProjects();
  }

  async getProjectById(id: string) {
    const project = await this.repo.findProjectById(id);
    if (!project) throw new NotFoundException(`Proyecto "${id}" no existe`);
    return project;
  }
}
