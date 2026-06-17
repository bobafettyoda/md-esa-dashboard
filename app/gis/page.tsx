import Link from "next/link";
import { counties } from "../../data/dashboard-data";
import "../styles.css";

export default function GISPage() {
  const withArea = counties.filter((county) => county.areaAcres).length;
  const totalArea = counties.reduce((sum, county) => sum + (county.areaAcres || 0), 0);
  const protectedAcres = counties.reduce((sum, county) => sum + (county.protectedAreaAcres || 0), 0);
  const criticalAcres = counties.reduce((sum, county) => sum + (county.criticalHabitatAcres || 0), 0);
  const unprotectedCriticalAcres = counties.reduce(
    (sum, county) => sum + (county.unprotectedCriticalHabitatAcres || 0),
    0
  );

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
          <strong>{Math.round(protectedAcres).toLocaleString()}</strong>
        </div>
        <div className="metric">
          <span>Critical Habitat</span>
          <strong>{Math.round(criticalAcres).toLocaleString()}</strong>
        </div>
      </section>

      <section className="panel">
        <h2>Overlay Summary</h2>
        <div className="gisGrid">
          <div>
            <span>Protected Land Acres</span>
            <strong>{Math.round(protectedAcres).toLocaleString()}</strong>
          </div>
          <div>
            <span>Critical Habitat Acres</span>
            <strong>{Math.round(criticalAcres).toLocaleString()}</strong>
          </div>
          <div>
            <span>Unprotected Critical Habitat</span>
            <strong>{Math.round(unprotectedCriticalAcres).toLocaleString()}</strong>
          </div>
          <div>
            <span>Layer Status</span>
            <strong>GeoJSON overlays</strong>
          </div>
        </div>
        <p className="dataFootnote">
          The current overlay files are in <code>public/geo/layers</code>. Replace
          them with PAD-US protected lands and USFWS/NOAA critical habitat exports
          clipped to Maryland for production analysis.
        </p>
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
