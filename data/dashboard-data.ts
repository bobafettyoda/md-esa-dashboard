import rawCounties from "./generated/counties.json";
import rawSpecies from "./generated/species.json";
import rawCountySpecies from "./generated/county-species.json";
import rawCountyMetrics from "./generated/county-metrics.json";
import rawGisMetrics from "./generated/county-gis-metrics.json";

export type Species = {
  id: string;
  commonName: string;
  scientificName: string;
  status: string;
  taxon: string;
  agency: "USFWS" | "NOAA Fisheries" | "Joint" | "Unknown";
  habitat: string;
  source: string;
  sourceUrl?: string;
};

export type County = {
  id: string;
  name: string;
  fips: string;
  region: string;
  source: string;
  conservationPriority: "Low" | "Medium" | "High" | "Very High" | "Unknown";
  protectedHabitatPercent: number | null;
  criticalHabitatPresent: boolean | null;
  fragmentationRisk: "Low" | "Medium" | "High" | "Unknown";
  notes: string;
  areaAcres?: number | null;
  protectedAreaAcres?: number | null;
  criticalHabitatAcres?: number | null;
  unprotectedCriticalHabitatAcres?: number | null;
  gisStatus?: string;
  speciesIds: string[];
};

type CountySpecies = {
  countyId: string;
  speciesId: string;
  basis: string;
  notes: string;
};

type CountyMetric = {
  countyId: string;
  protectedHabitatPercent: number | null;
  criticalHabitatPresent: boolean | null;
  fragmentationRisk: "Low" | "Medium" | "High" | "Unknown";
  conservationPriority: "Low" | "Medium" | "High" | "Very High" | "Unknown";
  notes: string;
};

export const species = rawSpecies as Species[];

const countySpecies = rawCountySpecies as CountySpecies[];
const countyMetrics = rawCountyMetrics as CountyMetric[];
const countyGisMetrics = rawGisMetrics as Array<{
  countyId: string;
  areaAcres: number;
  protectedAreaAcres: number | null;
  protectedAreaPercent: number | null;
  criticalHabitatAcres: number | null;
  criticalHabitatPercent: number | null;
  unprotectedCriticalHabitatAcres: number | null;
  gisStatus: string;
}>;

export const counties = (rawCounties as Array<{
  id: string;
  name: string;
  fips: string;
  region: string;
  source: string;
}>).map((county) => {
  const metric = countyMetrics.find((item) => item.countyId === county.id);
  const gisMetric = countyGisMetrics.find((item) => item.countyId === county.id);

  return {
    ...county,
    conservationPriority: metric?.conservationPriority || "Unknown",
    protectedHabitatPercent:
      gisMetric?.protectedAreaPercent ?? metric?.protectedHabitatPercent ?? null,
    criticalHabitatPresent:
      gisMetric?.criticalHabitatAcres !== null && gisMetric?.criticalHabitatAcres !== undefined
        ? gisMetric.criticalHabitatAcres > 0
        : metric?.criticalHabitatPresent ?? null,
    fragmentationRisk: metric?.fragmentationRisk || "Unknown",
    notes:
      metric?.notes ||
      "Generated county record. Detailed habitat metrics require GIS overlap analysis.",
    areaAcres: gisMetric?.areaAcres ?? null,
    protectedAreaAcres: gisMetric?.protectedAreaAcres ?? null,
    criticalHabitatAcres: gisMetric?.criticalHabitatAcres ?? null,
    unprotectedCriticalHabitatAcres: gisMetric?.unprotectedCriticalHabitatAcres ?? null,
    gisStatus: gisMetric?.gisStatus,
    speciesIds: countySpecies
      .filter((item) => item.countyId === county.id)
      .map((item) => item.speciesId),
  };
}) as County[];

export function getSpeciesForCounty(county: County): Species[] {
  return county.speciesIds
    .map((id) => species.find((item) => item.id === id))
    .filter(Boolean) as Species[];
}

export function getCountiesForSpecies(speciesId: string): County[] {
  return counties.filter((county) => county.speciesIds.includes(speciesId));
}

export function getConservationScore(county: County): number {
  const speciesScore = Math.min(county.speciesIds.length * 12, 40);
  const protectionScore = Math.round((county.protectedHabitatPercent ?? 0) * 0.35);
  const criticalScore = county.criticalHabitatPresent ? 15 : 0;
  const fragmentationPenalty =
    county.fragmentationRisk === "High"
      ? 12
      : county.fragmentationRisk === "Medium"
        ? 6
        : 0;

  return Math.max(
    0,
    Math.min(100, speciesScore + protectionScore + criticalScore - fragmentationPenalty)
  );
}
