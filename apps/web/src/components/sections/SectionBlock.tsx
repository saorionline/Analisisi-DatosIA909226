import type { Section } from "@portfolio/contracts";

export function SectionBlock({ section }: { section: Section }) {
  return (
    <section className="section">
      <p className="eyebrow">
        {String(section.order).padStart(2, "0")} · {section.slug}
      </p>
      <h2>{section.title}</h2>
      {section.subtitle && <p className="subtitle">{section.subtitle}</p>}
      {section.intro && <p className="intro">{section.intro}</p>}

      {section.bullets && (
        <ul className="bullets">
          {section.bullets.map((b) => (
            <li key={b.heading}>
              <strong>{b.heading}</strong> {b.body}
            </li>
          ))}
        </ul>
      )}

      {section.table && (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                {section.table.headers.map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.table.rows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {section.code && (
        <figure>
          {section.code.caption && <figcaption>{section.code.caption}</figcaption>}
          <pre>
            <code>{section.code.content}</code>
          </pre>
        </figure>
      )}
    </section>
  );
}
