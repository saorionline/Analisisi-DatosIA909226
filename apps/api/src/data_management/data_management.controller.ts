import { Controller, Get } from "@nestjs/common";

@Controller("data-management")
export class DataManagementController {
  @Get("health")
  health() {
    return { status: "ok", module: "data_management" };
  }
}
