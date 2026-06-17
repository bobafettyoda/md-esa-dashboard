"use client";

import { useMemo, useState } from "react";
import { counties, species } from "../data/dashboard-data";

export default function Home() {
  const [selectedCountyId, setSelectedCountyId] = useState(counties[0].id);

  const selectedCounty = counties.find((county) => county.id === selectedCountyId) ?? counties[0];
  const selectedSpecies = useMemo(
    () => species.filter((item) => selectedCounty.speciesIds.includes(item.id)),
    [selectedCounty]
  );

  const avgProtected = selectedSpecies.length
    ? Math.round(selectedSpecies.reduce((sum, item) => sum + item.protectedOverlap, 0) / selectedSpecies.length)
    : 0;

  return (
    <main className="page-shell">
      <section className="hero">
        <div>
          <p className="eyebrow">Static MVP</p>
          <h1>Maryland ESA Habitat Dashboard</h1>
          <p className="subtitle">
            A lightweight first version for exploring ESA-listed species, jurisdiction,
            critical habitat signals, and conservation gaps by Maryland county.
          </p>
        </div>
        <div className="hero-card">
          <span>Build phase</span>
          <strong>Frontend demo</strong>
          <p>No Docker. No database. Just the product experience.</p>
        </div>
      </section>

      <section className="controls">
        <label htmlFor="county">Choose a Maryland county</label>
        <select id="county" value={selectedCountyId} onChange={(event) => setSelectedCountyId(event.target.value)}>
          {counties.map((county) => (
            <option key={county.id} value={county.id}>{county.name}</option>
          ))}
        </select>
      </section>

      <section className="metrics">
        <article>
          <span>Selected county</span>
          <strong>{selectedCounty.name}</strong>
          <p>{selectedCounty.region}</p>
        </article>
        <article>
          <span>ESA-listed species</span>
          <strong>{selectedSpecies.length}</strong>
          <p>Demo records linked to this county.</p>
        </article>
        <article>
          <span>Average protected overlap</span>
          <strong>{avgProtected}%</strong>
          <p>Placeholder score for MVP planning.</p>
        </article>
      </section>

      <section className="panel">
        <div className="panel-header">
          <div>
            <p className="eyebrow">County results</p>
            <h2>Species present in {selectedCounty.name}</h2>
          </div>
        </div>

        <div className="species-grid">
          {selectedSpecies.map((item) => (
            <article className="species-card" key={item.id}>
              <div className="species-topline">
                <h3>{item.commonName}</h3>
                <span className={item.esaStatus === "Endangered" ? "badge danger" : "badge warning"}>{item.esaStatus}</span>
              </div>
              <p className="latin">{item.scientificName}</p>
              <dl>
                <div><dt>Taxon</dt><dd>{item.taxon}</dd></div>
                <div><dt>Lead agency</dt><dd>{item.leadAgency}</dd></div>
                <div><dt>Critical habitat</dt><dd>{item.criticalHabitat}</dd></div>
                <div><dt>Protected overlap</dt><dd>{item.protectedOverlap}%</dd></div>
              </dl>
              <p className="gap-note">{item.gapNote}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="roadmap">
        <h2>Next build steps</h2>
        <ol>
          <li>Add all Maryland counties and richer species data.</li>
          <li>Add a map with county boundaries and selected-county highlighting.</li>
          <li>Replace demo records with USFWS, NOAA, PAD-US, and Maryland DNR data.</li>
          <li>Add PostGIS only after the product flow is clear.</li>
        </ol>
      </section>
    </main>
  );
}
