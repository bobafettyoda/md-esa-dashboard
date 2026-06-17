"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { counties, getSpeciesForCounty, getConservationScore } from "../data/dashboard-data";
import "./styles.css";

const geoUrl = "/geo/us-counties.json";

const countyNameToId: Record<string, string> = {
  "Dorchester": "dorchester",
  "Worcester": "worcester",
  "Anne Arundel": "anne-arundel",
  "Garrett": "garrett",
  "Montgomery": "montgomery",
  "Somerset": "somerset",
};

export default function Home() {
  const [selectedCountyId, setSelectedCountyId] = useState(counties[0].id);
  const [query, setQuery] = useState("");

  const filteredCounties = useMemo(
    () => counties.filter((c) => c.name.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  const selectedCounty =
    counties.find((c) => c.id === selectedCountyId) || counties[0];

  const selectedSpecies = getSpeciesForCounty(selectedCounty);
  const conservationScore = getConservationScore(selectedCounty);

  const usfwsCount = selectedSpecies.filter((s) => s.agency === "USFWS").length;
  const noaaCount = selectedSpecies.filter((s) => s.agency === "NOAA Fisheries").length;

  const rankedCounties = [...counties]
    .map((county) => ({
      ...county,
      score: getConservationScore(county),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

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
          <div className="heroLinks">
            <Link href="/counties">Browse counties</Link>
            <Link href="/sources">View data source registry</Link>
          </div>
        </div>

        <div className="heroCard">
          <span className="heroNumber">{counties.length}</span>
          <span>demo counties</span>
          <span className="heroNumber">{selectedSpecies.length}</span>
          <span>species in selected county</span>
        </div>
      </section>

      <section className="panel dataBanner">
        <strong>Data status:</strong> Source-backed generated dataset. Species records reference USFWS/NOAA sources; county-species links and habitat metrics are marked for review until spatial validation is added.
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

          <div className="metrics metricsFive">
            <div className="metric"><span>ESA Species</span><strong>{selectedSpecies.length}</strong></div>
            <div className="metric"><span>Protected Habitat</span><strong>{selectedCounty.protectedHabitatPercent ?? "Review"}{selectedCounty.protectedHabitatPercent === null ? "" : "%"}</strong></div>
            <div className="metric"><span>Critical Habitat</span><strong>{selectedCounty.criticalHabitatPresent === null ? "Review" : selectedCounty.criticalHabitatPresent ? "Yes" : "No"}</strong></div>
            <div className="metric"><span>Fragmentation</span><strong>{selectedCounty.fragmentationRisk}</strong></div>
            <div className="metric"><span>Conservation Score</span><strong>{conservationScore}</strong></div>
          </div>

          <div className="panel mapPanel">
            <div>
              <h3>Maryland County Map</h3>
              <p>
                Click a mapped Maryland county to update the dashboard. Counties
                with demo data are highlighted; others are shown for geographic context.
              </p>
            </div>

            <div className="realMap">
              <ComposableMap
                projection="geoMercator"
                projectionConfig={{
                  center: [-76.8, 39.0],
                  scale: 8500,
                }}
                width={800}
                height={430}
              >
                <ZoomableGroup zoom={1}>
                  <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                      geographies
                        .filter((geo) => String(geo.properties.STATE) === "24")
                        .map((geo) => {
                          const countyName = String(geo.properties.NAME);
                          const countyId = countyNameToId[countyName];
                          const hasData = Boolean(countyId);
                          const isActive = countyId === selectedCounty.id;

                          return (
                            <Geography
                              key={geo.rsmKey}
                              geography={geo}
                              onClick={() => {
                                if (countyId) setSelectedCountyId(countyId);
                              }}
                              className={[
                                "geoCounty",
                                hasData ? "hasData" : "",
                                isActive ? "active" : "",
                              ].join(" ")}
                            />
                          );
                        })
                    }
                  </Geographies>
                </ZoomableGroup>
              </ComposableMap>
            </div>
          </div>

          <div className="panel">
            <h3>Top Priority Counties</h3>
            <div className="rankingList">
              {rankedCounties.map((county, index) => (
                <button
                  key={county.id}
                  className={county.id === selectedCounty.id ? "rankRow active" : "rankRow"}
                  onClick={() => setSelectedCountyId(county.id)}
                >
                  <span className="rankNumber">#{index + 1}</span>
                  <span>
                    <strong>{county.name}</strong>
                    <small>
                      {county.conservationPriority} priority · <Link href={`/counties/${county.id}`}>View profile</Link>
                    </small>
                  </span>
                  <b>{county.score}</b>
                </button>
              ))}
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
              <p>Estimated unprotected habitat: <strong>{selectedCounty.protectedHabitatPercent === null ? "Review needed" : `${100 - selectedCounty.protectedHabitatPercent}%`}</strong></p>
              <p>Priority signal: <strong>{selectedCounty.conservationPriority}</strong></p>
            </div>
          </div>

          <div className="panel">
            <h3>Species Present</h3>
            <div className="speciesGrid">
              {selectedSpecies.map((item) => (
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
          </div>
        </section>
      </section>
    </main>
  );
}
