import Link from "next/link";
import { counties, getConservationScore, getSpeciesForCounty } from "../../data/dashboard-data";
import "../styles.css";

export default function CountiesPage() {
  const ranked = [...counties]
    .map((county) => ({
      ...county,
      score: getConservationScore(county),
      speciesCount: getSpeciesForCounty(county).length,
    }))
    .sort((a, b) => b.score - a.score);

  return (
    <main className="page">
      <Link className="backLink" href="/">← Back to dashboard</Link>

      <section className="panel speciesProfileHero">
        <div>
          <p className="eyebrow">Maryland geography</p>
          <h1>County Directory</h1>
          <p className="lede">
            Browse all Maryland counties by conservation score, ESA species count,
            protected habitat, and conservation priority.
          </p>
        </div>
      </section>

      <section className="panel">
        <div className="countyDirectory">
          {ranked.map((county) => (
            <Link className="directoryCard" href={`/counties/${county.id}`} key={county.id}>
              <div>
                <p className="eyebrow">{county.region}</p>
                <h3>{county.name}</h3>
                <p>{county.notes}</p>
              </div>

              <div className="directoryStats">
                <span>Score <strong>{county.score}</strong></span>
                <span>Species <strong>{county.speciesCount}</strong></span>
                <span>Protected <strong>{county.protectedHabitatPercent}%</strong></span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
