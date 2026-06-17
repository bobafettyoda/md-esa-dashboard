import Link from "next/link";
import { counties } from "../../data/dashboard-data";
import "../styles.css";

export default function GISPage() {
  const withArea = counties.filter((county) => county.areaAcres).length;
  const totalArea = counties.reduce((sum, county) => sum + (county.areaAcres || 0), 0);

  return (
    <main className="page">
      <Link className="backLink" href="/">← Back to dashboard</Link>

      <section className="panel speciesProfileHero">
        <div>
          <p className="eyebrow">Spatial analysis</p>
          <h1>GIS Engine</h1>
          <p className="lede">
            County geometry is now loaded and analyzed. This page tracks the GIS pipeline
            as protected lands, critical habitat, and overlap calculations are added.
          </p>
        </div>
      </section>

      <section className="metrics metricsFour">
        <div className="metric">
          <span>Counties with Geometry</span>
          <strong>{withArea}</strong>
        </div>
        <div className="metric">
          <span>Total County Area</span>
          <strong>{Math.round(totalArea).toLocaleString()}</strong>
        </div>
        <div className="metric">
          <span>Protected Lands</span>
          <strong>Pending</strong>
        </div>
        <div className="metric">
          <span>Critical Habitat</span>
          <strong>Pending</strong>
        </div>
      </section>

      <section className="panel">
        <h2>County Area Metrics</h2>
        <div className="rankingList">
          {[...counties]
            .sort((a, b) => (b.areaAcres || 0) - (a.areaAcres || 0))
            .map((county, index) => (
              <Link className="rankRow" href={`/counties/${county.id}`} key={county.id}>
                <span className="rankNumber">#{index + 1}</span>
                <span>
                  <strong>{county.name}</strong>
                  <small>{county.gisStatus || "pending"}</small>
                </span>
                <b>{county.areaAcres ? Math.round(county.areaAcres / 1000) + "k" : "—"}</b>
              </Link>
            ))}
        </div>
      </section>
    </main>
  );
}
