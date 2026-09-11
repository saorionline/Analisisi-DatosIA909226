import type { Section } from "@portfolio/contracts";

/**
 * Layout "cover-hero": portada con tratamiento invertido.
 *
 * Rompe a propósito el ritmo de tarjetas que impone SectionBlock, para que
 * el lector perciba el inicio de un bloque nuevo del documento.
 *
 * Se registra en ./registry.tsx bajo la clave "cover-hero"; ninguna página
 * lo importa de forma directa.
 */
export function CoverHero({ section }: { section: Section }) {
  // media es opcional en el schema, y align trae default "center" desde zod
  // solo cuando media existe. Si media falta por completo, el fallback es aquí.
  const align = section.media?.align ?? "center";

  return (
    <section className={`cover-hero cover-hero--${align}`}>
      {section.media?.image && (
        // aria-hidden + alt vacío: es decoración, no contenido.
        // El lector de pantalla ya recibe el título y el subtítulo.
        <div className="cover-hero__backdrop" aria-hidden="true">
          <img src={section.media.image} alt="" />
        </div>
      )}

      <div className="cover-hero__inner">
        {section.media?.eyebrow && (
          <p className="cover-hero__eyebrow">{section.media.eyebrow}</p>
        )}

        {/* h2 y no h1: la portada vive dentro del documento, después de otras
            secciones que ya usan h2. Un h1 aquí rompería la jerarquía de
            encabezados. El peso visual lo da el CSS, no la etiqueta. */}
        <h2 className="cover-hero__title">{section.title}</h2>

        {section.subtitle && (
          <p className="cover-hero__subtitle">{section.subtitle}</p>
        )}

        {section.intro && <p className="cover-hero__intro">{section.intro}</p>}
      </div>
    </section>
  );
}
