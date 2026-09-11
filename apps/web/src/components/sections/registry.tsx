import type { ComponentType } from "react";
import type { Section, SectionLayout } from "@portfolio/contracts";
import { SectionBlock } from "./SectionBlock";
import { CoverHero } from "./CoverHero";

const registry: Record<SectionLayout, ComponentType<{ section: Section }>> = {
  "document": SectionBlock,
  "cover-hero": CoverHero,
};

export function SectionRenderer({ section }: { section: Section }) {
  const Layout = registry[section.layout] ?? SectionBlock;
  return <Layout section={section} />;
}