export type Agency = "USFWS" | "NOAA Fisheries" | "Joint" | "Unknown";

export type SpeciesRecord = {
  id: string;
  commonName: string;
  scientificName: string;
  status: string;
  taxon: string;
  agency: Agency;
  habitat: string;
  source: string;
  sourceUrl?: string;
};

export type CountyRecord = {
  id: string;
  name: string;
  fips: string;
  region: string;
  source: string;
};

export type CountySpeciesRecord = {
  countyId: string;
  speciesId: string;
  basis: "official" | "derived" | "manual-review";
  notes: string;
};

export type CountyMetricRecord = {
  countyId: string;
  protectedHabitatPercent: number | null;
  criticalHabitatPresent: boolean | null;
  fragmentationRisk: "Low" | "Medium" | "High" | "Unknown";
  conservationPriority: "Low" | "Medium" | "High" | "Very High" | "Unknown";
  notes: string;
};
