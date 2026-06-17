import fs from "fs/promises";
import path from "path";
import * as turf from "@turf/turf";

const root = process.cwd();

const countiesPath = path.join(root, "public", "geo", "maryland-counties.geojson");
const protectedPath = path.join(root, "public", "geo", "layers", "protected-lands.geojson");
const criticalPath = path.join(root, "public", "geo", "layers", "critical-habitat.geojson");
const outPath = path.join(root, "data", "generated", "county-gis-metrics.json");

async function readGeoJson(filePath, fallbackName) {
  try {
    return JSON.parse(await fs.readFile(filePath, "utf8"));
  } catch {
    return {
      type: "FeatureCollection",
      name: fallbackName,
      features: [],
    };
  }
}

function acres(feature) {
  if (!feature) return 0;
  return turf.area(feature) / 4046.8564224;
}

function round(value) {
  if (value === null || value === undefined || Number.isNaN(value)) return null;
  return Math.round(value);
}

function percent(part, whole) {
  if (!whole) return null;
  return Math.round((part / whole) * 1000) / 10;
}

function safeIntersection(a, b) {
  try {
    return turf.intersect(turf.featureCollection([a, b]));
  } catch {
    return null;
  }
}

function intersectAreaAcres(target, overlays) {
  let total = 0;

  for (const overlay of overlays.features || []) {
    const intersection = safeIntersection(target, overlay);
    if (intersection) {
      total += acres(intersection);
    }
  }

  return total;
}

function unprotectedCriticalHabitatAcres(county, criticalHabitat, protectedLands) {
  let total = 0;

  for (const critical of criticalHabitat.features || []) {
    const criticalInCounty = safeIntersection(county, critical);
    if (!criticalInCounty) continue;

    const criticalCountyAcres = acres(criticalInCounty);
    let protectedCriticalAcres = 0;

    for (const protectedArea of protectedLands.features || []) {
      const protectedIntersection = safeIntersection(criticalInCounty, protectedArea);
      if (protectedIntersection) {
        protectedCriticalAcres += acres(protectedIntersection);
      }
    }

    total += Math.max(0, criticalCountyAcres - protectedCriticalAcres);
  }

  return total;
}

const counties = await readGeoJson(countiesPath, "maryland-counties");
const protectedLands = await readGeoJson(protectedPath, "protected-lands");
const criticalHabitat = await readGeoJson(criticalPath, "critical-habitat");

const metrics = counties.features.map((county) => {
  const countyId = county.properties.dashboardId;
  const areaAcres = acres(county);

  const protectedAreaAcres = intersectAreaAcres(county, protectedLands);
  const criticalHabitatAcres = intersectAreaAcres(county, criticalHabitat);
  const unprotectedCriticalAcres = unprotectedCriticalHabitatAcres(
    county,
    criticalHabitat,
    protectedLands
  );

  return {
    countyId,
    fullFips: county.properties.fullFips,
    name: `${county.properties.NAME}${county.properties.LSAD ? " " + county.properties.LSAD : ""}`,
    areaAcres: round(areaAcres),
    protectedAreaAcres: round(protectedAreaAcres),
    protectedAreaPercent: percent(protectedAreaAcres, areaAcres),
    criticalHabitatAcres: round(criticalHabitatAcres),
    criticalHabitatPercent: percent(criticalHabitatAcres, areaAcres),
    unprotectedCriticalHabitatAcres: round(unprotectedCriticalAcres),
    gisStatus:
      protectedLands.features.length > 0 && criticalHabitat.features.length > 0
        ? "protected-lands-and-critical-habitat-overlays-loaded"
        : "county-boundary-loaded",
    notes:
      "County area, protected-land overlap, critical-habitat overlap, and unprotected critical-habitat acres are calculated with Turf.js from GeoJSON overlay layers.",
  };
});

await fs.mkdir(path.dirname(outPath), { recursive: true });
await fs.writeFile(outPath, JSON.stringify(metrics, null, 2));

console.log(`Counties: ${counties.features.length}`);
console.log(`Protected land features: ${protectedLands.features.length}`);
console.log(`Critical habitat features: ${criticalHabitat.features.length}`);
console.log(`Wrote GIS metrics to ${outPath}`);
