export class ProjectEntity {
  id!: string;
  title!: string;
  category!: string;
  summary!: string;
  metrics!: { label: string; value: string }[];
  technicalHighlights!: string[];
  contentMarkdown?: string;
}
