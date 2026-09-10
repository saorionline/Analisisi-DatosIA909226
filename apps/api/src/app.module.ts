import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import configuration from "./config/configuration";
import { ContentModule } from "./content/content.module";
import { DataManagementModule } from "./data_management/data_management.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    ContentModule,
    DataManagementModule,
  ],
})
export class AppModule {}
