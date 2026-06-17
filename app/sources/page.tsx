import Link from "next/link";
import { dataSources } from "../../data/sources/registry";
import "../styles.css";

export default function SourcesPage() {
  return (
    <main className="page">
      <Link className="backLink" href="/">← Back to dashboard</Link>

      <section className="panel speciesProfileHero">
        <div>
          <p className="eyebrow">Data architecture</p>
          <h1>Source Registry</h1>
          <p className="lede">
            Planned and active sources for turning this MVP into a real Maryland
            conservation intelligence platform.
          </p>
        </div>
      </section>

      <section className="panel">
        <div className="sourceGrid">
          {dataSources.map((source) => (
            <a
              className="sourceCard"
              href={source.url}
              target="_blank"
              rel="noreferrer"
              key={source.id}
            >
              <p className="eyebrow">{source.category}</p>
              <h3>{source.name}</h3>
              <p>{source.notes}</p>
              <small>
                {source.agency} · {source.status}
              </small>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
