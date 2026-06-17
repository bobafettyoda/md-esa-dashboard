import fs from "fs/promises";
import path from "path";

const inputPath = path.join(process.cwd(), "public", "geo", "us-counties.json");
const outputPath = path.join(process.cwd(), "public", "geo", "maryland-counties.geojson");

const raw = JSON.parse(await fs.readFile(inputPath, "utf8"));

const marylandFeatures = raw.features
  .filter((feature) => String(feature.properties.STATE) === "24")
  .map((feature) => ({
    ...feature,
    properties: {
      ...feature.properties,
      dashboardId: toDashboardId(feature.properties.NAME),
      stateFips: feature.properties.STATE,
      countyFips: feature.properties.COUNTY,
      fullFips: `${feature.properties.STATE}${feature.properties.COUNTY}`,
    },
  }));

function toDashboardId(name) {
  return String(name)
    .toLowerCase()
    .replace("st. mary's", "st-marys")
    .replace("prince george's", "prince-georges")
    .replace("queen anne's", "queen-annes")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

const out = {
  type: "FeatureCollection",
  name: "maryland-counties",
  features: marylandFeatures,
};

await fs.writeFile(outputPath, JSON.stringify(out, null, 2));

console.log(`Wrote ${marylandFeatures.length} Maryland counties to ${outputPath}`);
