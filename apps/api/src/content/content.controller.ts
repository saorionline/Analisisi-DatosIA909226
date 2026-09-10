import { Controller, Get, Param } from "@nestjs/common";
import { ContentService } from "./content.service";

@Controller() // el prefijo global "api" ya lo pone main.ts
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Get("sections")
  getSections() {
    return this.contentService.getSections();
  }

  @Get("sections/:slug")
  getSection(@Param("slug") slug: string) {
    return this.contentService.getSectionBySlug(slug);
  }

  @Get("projects")
  getProjects() {
    return this.contentService.getProjects();
  }

  @Get("projects/:id")
  getProject(@Param("id") id: string) {
    return this.contentService.getProjectById(id);
  }
}
