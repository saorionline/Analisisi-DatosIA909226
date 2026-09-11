import { getSections } from "../lib/api";
import { SectionRenderer } from "../components/sections/registry";

// La API se consulta en cada request: nada se congela en build time,
// asi que editar un JSON en apps/api se refleja al recargar.
export const dynamic = "force-dynamic";

export default async function HomePage() {
  try {
    const sections = await getSections();
    return (
      <main>
        {/* La pagina ya no decide que componente pinta cada seccion.
            El campo "layout" del JSON lo declara y registry.tsx lo resuelve. */}
        {sections.map((section) => (
          <SectionRenderer key={section.slug} section={section} />
        ))}
      </main>
    );
  } catch (err) {
    return (
      <main>
        <div className="error">
          <p>No pude leer la API.</p>
          <p>
            Levanta el backend con <code>pnpm dev:api</code> y recarga. Estoy
            consultando{" "}
            <code>
              {process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api"}
            </code>
            .
          </p>
          <p>{err instanceof Error ? err.message : String(err)}</p>
        </div>
      </main>
    );
  }
}
