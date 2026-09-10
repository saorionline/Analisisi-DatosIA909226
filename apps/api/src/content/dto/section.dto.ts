import { SectionSchema } from "@portfolio/contracts";

// Reutiliza el esquema zod compartido con el frontend: una sola fuente de verdad.
export type SectionDto = ReturnType<typeof SectionSchema.parse>;
