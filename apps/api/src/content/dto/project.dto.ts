import { ProjectSchema } from "@portfolio/contracts";

export type ProjectDto = ReturnType<typeof ProjectSchema.parse>;
