import Link from "next/link";
import {
  counties,
  species,
  getConservationScore,
  getSpeciesForCounty,
} from "../../../data/dashboard-data";
import "../../styles.css";

export default async function SpeciesProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = species.find((s) => s.id === id);

  if (!item) {
    return (
      <main className="page">
        <div className="panel">
          <h1>Species not found</h1>
          <Link href="/">Back to dashboard</Link>
        </div>
      </main>
    );
  }

  const presentCounties = counties
    .filter((county) => county.speciesIds.includes(item.id))
    .map((county) => ({
      ...county,
      score: getConservationScore(county),
    }))
    .sort((a, b) => b.score - a.score);

  const agencyCounties = presentCounties.length;
  const criticalHabitatCounties = presentCounties.filter(
    (county) => county.criticalHabitatPresent
  ).length;

  return (
    <main className="page">
      <Link className="backLink" href="/">← Back to dashboard</Link>

      <section className="panel speciesProfileHero">
        <div>
          <p className="eyebrow">{item.agency}</p>
          <h1>{item.commonName}</h1>
          <p className="scientific large">{item.scientificName}</p>
          <p className="lede">{item.habitat}</p>
        </div>

        <div className="profileBadge">
          <span>{item.status}</span>
          <small>ESA status</small>
        </div>
      </section>

      <section className="metrics metricsFour">
        <div className="metric">
          <span>Taxon</span>
          <strong>{item.taxon}</strong>
        </div>
        <div className="metric">
          <span>Lead Agency</span>
          <strong>{item.agency}</strong>
        </div>
        <div className="metric">
          <span>Counties Present</span>
          <strong>{agencyCounties}</strong>
        </div>
        <div className="metric">
          <span>Critical Habitat Counties</span>
          <strong>{criticalHabitatCounties}</strong>
        </div>
      </section>

      <section className="panel">
        <h2>Maryland Counties Where Present</h2>
        <div className="rankingList">
          {presentCounties.map((county, index) => (
            <Link className="rankRow" href="/" key={county.id}>
              <span className="rankNumber">#{index + 1}</span>
              <span>
                <strong>{county.name}</strong>
                <small>
                  {county.region} · {county.conservationPriority} priority
                </small>
              </span>
              <b>{county.score}</b>
            </Link>
          ))}
        </div>
      </section>

      <section className="agencyGrid">
        <div className="panel">
          <h3>Data Notes</h3>
          <p>
            This profile currently uses curated static MVP data. The next
            production step is connecting this species record to USFWS ECOSphere,
            NOAA Fisheries, and critical habitat spatial services.
          </p>
        </div>

        <div className="panel">
          <h3>Future Real-Data Links</h3>
          <ul className="sourceList">
            <li>USFWS ECOS species record</li>
            <li>Critical habitat layer</li>
            <li>Recovery plan or conservation plan</li>
            <li>County-level habitat overlap analysis</li>
          </ul>
        </div>
      </section>
    </main>
  );
}

export function generateStaticParams() {
  return species.map((item) => ({
    id: item.id,
  }));
}
