import Link from "next/link";
import {
  counties,
  getConservationScore,
  getSpeciesForCounty,
} from "../../../data/dashboard-data";
import "../../styles.css";

export default async function CountyProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const county = counties.find((c) => c.id === id);

  if (!county) {
    return (
      <main className="page">
        <div className="panel">
          <h1>County not found</h1>
          <Link href="/">Back to dashboard</Link>
        </div>
      </main>
    );
  }

  const countySpecies = getSpeciesForCounty(county);
  const score = getConservationScore(county);

  return (
    <main className="page">
      <Link className="backLink" href="/">← Back to dashboard</Link>

      <section className="panel speciesProfileHero">
        <div>
          <p className="eyebrow">{county.region}</p>
          <h1>{county.name}</h1>
          <p className="lede">{county.notes}</p>
        </div>

        <div className="profileBadge">
          <span>{score}</span>
          <small>Conservation score</small>
        </div>
      </section>

      <section className="metrics metricsFive">
        <div className="metric">
          <span>ESA Species</span>
          <strong>{countySpecies.length}</strong>
        </div>
        <div className="metric">
          <span>Protected Habitat</span>
          <strong>{county.protectedHabitatPercent ?? "Review"}{county.protectedHabitatPercent === null ? "" : "%"}</strong>
        </div>
        <div className="metric">
          <span>Critical Habitat</span>
          <strong>{county.criticalHabitatPresent === null ? "Review" : county.criticalHabitatPresent ? "Yes" : "No"}</strong>
        </div>
        <div className="metric">
          <span>Fragmentation</span>
          <strong>{county.fragmentationRisk}</strong>
        </div>
        <div className="metric">
          <span>Priority</span>
          <strong>{county.conservationPriority}</strong>
        </div>
      </section>

      <section className="panel">
        <h2>GIS Analysis</h2>
        <div className="gisGrid">
          <div>
            <span>County Area</span>
            <strong>{county.areaAcres ? county.areaAcres.toLocaleString() + " acres" : "Pending"}</strong>
          </div>
          <div>
            <span>Protected Area</span>
            <strong>{county.protectedAreaAcres !== null && county.protectedAreaAcres !== undefined ? county.protectedAreaAcres.toLocaleString() + " acres" : "Pending PAD-US"}</strong>
          </div>
          <div>
            <span>Critical Habitat</span>
            <strong>{county.criticalHabitatAcres !== null && county.criticalHabitatAcres !== undefined ? county.criticalHabitatAcres.toLocaleString() + " acres" : "Pending USFWS/NOAA"}</strong>
          </div>
          <div>
            <span>Unprotected Critical Habitat</span>
            <strong>{county.unprotectedCriticalHabitatAcres !== null && county.unprotectedCriticalHabitatAcres !== undefined ? county.unprotectedCriticalHabitatAcres.toLocaleString() + " acres" : "Pending overlay"}</strong>
          </div>
        </div>
        <p className="dataFootnote">
          GIS status: {county.gisStatus || "pending"}. County area is already calculated from real geometry.
          Protected lands and critical habitat are calculated from the current GeoJSON overlay files. Replace starter overlays with PAD-US and official USFWS/NOAA exports for production analysis.
        </p>
      </section>

      <section className="panel">
        <h2>Species Present</h2>
        <div className="speciesGrid">
          {countySpecies.map((item) => (
            <Link className="speciesCard speciesLink" href={`/species/${item.id}`} key={item.id}>
              <div className="speciesHeader">
                <h4>{item.commonName}</h4>
                <span>{item.status}</span>
              </div>
              <p className="scientific">{item.scientificName}</p>
              <dl>
                <div><dt>Taxon</dt><dd>{item.taxon}</dd></div>
                <div><dt>Agency</dt><dd>{item.agency}</dd></div>
                <div><dt>Habitat</dt><dd>{item.habitat}</dd></div>
              </dl>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

export function generateStaticParams() {
  return counties.map((county) => ({
    id: county.id,
  }));
}
