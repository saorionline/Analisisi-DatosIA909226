import { z } from "zod";

export const ProjectMetricSchema = z.object({
  label: z.string(),
  value: z.string(),
});

export const ProjectSchema = z.object({
  id: z.string(),
  title: z.string(),
  category: z.string(),
  summary: z.string(),
  metrics: z.array(ProjectMetricSchema).default([]),
  technicalHighlights: z.array(z.string()).default([]),
  contentMarkdown: z.string().optional(),
});

export type Project = z.infer<typeof ProjectSchema>;
export type ProjectMetric = z.infer<typeof ProjectMetricSchema>;
