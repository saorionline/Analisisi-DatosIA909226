import { Module } from "@nestjs/common";
import { DataManagementController } from "./data_management.controller";

// Módulo administrativo: aquí vivirá, más adelante, la edición/validación
// de los JSON de contenido (o el CRUD contra Prisma cuando migres).
@Module({
  controllers: [DataManagementController],
})
export class DataManagementModule {}
