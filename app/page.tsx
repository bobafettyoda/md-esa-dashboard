"use client";

import { useMemo, useState } from "react";
import { counties, getSpeciesForCounty } from "../data/dashboard-data";
import "./styles.css";

const mapPoints: Record<string, { x: number; y: number }> = {
  garrett: { x: 8, y: 46 },
  montgomery: { x: 36, y: 56 },
  "anne-arundel": { x: 55, y: 54 },
  dorchester: { x: 73, y: 63 },
  somerset: { x: 77, y: 82 },
  worcester: { x: 88, y: 79 },
};

export default function Home() {
  const [selectedCountyId, setSelectedCountyId] = useState(counties[0].id);
  const [query, setQuery] = useState("");

  const filteredCounties = useMemo(
    () => counties.filter((c) => c.name.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  const selectedCounty = counties.find((c) => c.id === selectedCountyId) || counties[0];
  const selectedSpecies = getSpeciesForCounty(selectedCounty);

  const usfwsCount = selectedSpecies.filter((s) => s.agency === "USFWS").length;
  const noaaCount = selectedSpecies.filter((s) => s.agency === "NOAA Fisheries").length;

  return (
    <main className="page">
      <section className="hero">
        <div>
          <p className="eyebrow">Open-source conservation intelligence</p>
          <h1>Maryland ESA Habitat Dashboard</h1>
          <p className="lede">
            Explore ESA-listed species, agency jurisdiction, habitat protection,
            fragmentation risk, and conservation priorities by Maryland county.
          </p>
        </div>

        <div className="heroCard">
          <span className="heroNumber">{counties.length}</span>
          <span>demo counties</span>
          <span className="heroNumber">{selectedSpecies.length}</span>
          <span>species in selected county</span>
        </div>
      </section>

      <section className="layout">
        <aside className="sidebar">
          <label htmlFor="county-search">Search counties</label>
          <input
            id="county-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Dorchester, Worcester..."
          />

          <div className="countyList">
            {filteredCounties.map((county) => (
              <button
                key={county.id}
                className={county.id === selectedCounty.id ? "county active" : "county"}
                onClick={() => setSelectedCountyId(county.id)}
              >
                <strong>{county.name}</strong>
                <span>{county.region}</span>
              </button>
            ))}
          </div>
        </aside>

        <section className="content">
          <div className="panel countyHero">
            <div>
              <p className="eyebrow">{selectedCounty.region}</p>
              <h2>{selectedCounty.name}</h2>
              <p>{selectedCounty.notes}</p>
            </div>

            <div className={`priority ${selectedCounty.conservationPriority.replace(" ", "-").toLowerCase()}`}>
              {selectedCounty.conservationPriority} Priority
            </div>
          </div>

          <div className="metrics">
            <div className="metric"><span>ESA Species</span><strong>{selectedSpecies.length}</strong></div>
            <div className="metric"><span>Protected Habitat</span><strong>{selectedCounty.protectedHabitatPercent}%</strong></div>
            <div className="metric"><span>Critical Habitat</span><strong>{selectedCounty.criticalHabitatPresent ? "Yes" : "No"}</strong></div>
            <div className="metric"><span>Fragmentation</span><strong>{selectedCounty.fragmentationRisk}</strong></div>
          </div>

          <div className="panel mapPanel">
            <div>
              <h3>Maryland Conservation Map</h3>
              <p>
                Click a county marker to update the dashboard. This is a lightweight
                map prototype; the next version can use real GeoJSON boundaries.
              </p>
            </div>

            <div className="marylandMap" aria-label="Maryland county selector map">
              <div className="mdShape shapeWest" />
              <div className="mdShape shapeCentral" />
              <div className="mdShape shapeBay" />
              <div className="mdShape shapeEastern" />

              {counties.map((county) => {
                const point = mapPoints[county.id];
                if (!point) return null;

                return (
                  <button
                    key={county.id}
                    className={county.id === selectedCounty.id ? "mapPoint active" : "mapPoint"}
                    style={{ left: `${point.x}%`, top: `${point.y}%` }}
                    onClick={() => setSelectedCountyId(county.id)}
                    title={county.name}
                  >
                    <span>{county.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="agencyGrid">
            <div className="panel">
              <h3>Agency Jurisdiction</h3>
              <div className="agencyRows">
                <div><span>USFWS species</span><strong>{usfwsCount}</strong></div>
                <div><span>NOAA Fisheries species</span><strong>{noaaCount}</strong></div>
              </div>
            </div>

            <div className="panel">
              <h3>Habitat Gap Snapshot</h3>
              <p>Estimated unprotected habitat: <strong>{100 - selectedCounty.protectedHabitatPercent}%</strong></p>
              <p>Priority signal: <strong>{selectedCounty.conservationPriority}</strong></p>
            </div>
          </div>

          <div className="panel">
            <h3>Species Present</h3>
            <div className="speciesGrid">
              {selectedSpecies.map((item) => (
                <article className="speciesCard" key={item.id}>
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
                </article>
              ))}
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
