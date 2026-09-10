import { Module } from "@nestjs/common";
import { ContentController } from "./content.controller";
import { ContentService } from "./content.service";
import { CONTENT_REPOSITORY } from "./repositories/content.repository";
import { JsonContentRepository } from "./repositories/json-content.repository";
// import { PrismaContentRepository } from "./repositories/prisma-content.repository";

@Module({
  controllers: [ContentController],
  providers: [
    ContentService,
    {
      provide: CONTENT_REPOSITORY,
      useClass: JsonContentRepository, // <-- el día de la migración: useClass: PrismaContentRepository
    },
  ],
})
export class ContentModule {}
