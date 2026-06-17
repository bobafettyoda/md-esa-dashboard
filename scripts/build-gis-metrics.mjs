import fs from "fs/promises";
import path from "path";
import * as turf from "@turf/turf";

const countiesPath = path.join(process.cwd(), "public", "geo", "maryland-counties.geojson");
const outPath = path.join(process.cwd(), "data", "generated", "county-gis-metrics.json");

const counties = JSON.parse(await fs.readFile(countiesPath, "utf8"));

const metrics = counties.features.map((feature) => {
  const countyId = feature.properties.dashboardId;
  const areaSqMeters = turf.area(feature);
  const areaAcres = areaSqMeters / 4046.8564224;

  return {
    countyId,
    fullFips: feature.properties.fullFips,
    name: `${feature.properties.NAME}${feature.properties.LSAD ? " " + feature.properties.LSAD : ""}`,
    areaAcres: Math.round(areaAcres),
    protectedAreaAcres: null,
    protectedAreaPercent: null,
    criticalHabitatAcres: null,
    criticalHabitatPercent: null,
    unprotectedCriticalHabitatAcres: null,
    gisStatus: "county-boundary-loaded",
    notes:
      "County area is calculated from Census county GeoJSON using Turf.js. Protected-area and critical-habitat metrics are pending PAD-US, USFWS, and NOAA spatial overlays.",
  };
});

await fs.mkdir(path.dirname(outPath), { recursive: true });
await fs.writeFile(outPath, JSON.stringify(metrics, null, 2));

console.log(`Wrote GIS metrics for ${metrics.length} counties to ${outPath}`);
