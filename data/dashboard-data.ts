export type Species = {
  id: string;
  commonName: string;
  scientificName: string;
  status: "Endangered" | "Threatened" | "Candidate" | "Proposed";
  taxon: string;
  agency: "USFWS" | "NOAA Fisheries" | "Joint";
  habitat: string;
};

export type County = {
  id: string;
  name: string;
  region: string;
  conservationPriority: "Low" | "Medium" | "High" | "Very High";
  protectedHabitatPercent: number;
  criticalHabitatPresent: boolean;
  fragmentationRisk: "Low" | "Medium" | "High";
  notes: string;
  speciesIds: string[];
};

export const species: Species[] = [
  {
    id: "atlantic-sturgeon",
    commonName: "Atlantic Sturgeon",
    scientificName: "Acipenser oxyrinchus oxyrinchus",
    status: "Endangered",
    taxon: "Fish",
    agency: "NOAA Fisheries",
    habitat: "Tidal rivers, estuaries, and Chesapeake Bay corridors",
  },
  {
    id: "shortnose-sturgeon",
    commonName: "Shortnose Sturgeon",
    scientificName: "Acipenser brevirostrum",
    status: "Endangered",
    taxon: "Fish",
    agency: "NOAA Fisheries",
    habitat: "Large coastal rivers and estuarine systems",
  },
  {
    id: "northern-long-eared-bat",
    commonName: "Northern Long-eared Bat",
    scientificName: "Myotis septentrionalis",
    status: "Endangered",
    taxon: "Mammal",
    agency: "USFWS",
    habitat: "Forested summer habitat and winter hibernacula",
  },
  {
    id: "piping-plover",
    commonName: "Piping Plover",
    scientificName: "Charadrius melodus",
    status: "Threatened",
    taxon: "Bird",
    agency: "USFWS",
    habitat: "Atlantic barrier beaches and sparsely vegetated shorelines",
  },
  {
    id: "red-knot",
    commonName: "Red Knot",
    scientificName: "Calidris canutus rufa",
    status: "Threatened",
    taxon: "Bird",
    agency: "USFWS",
    habitat: "Coastal stopover habitat, tidal flats, and beaches",
  },
  {
    id: "bog-turtle",
    commonName: "Bog Turtle",
    scientificName: "Glyptemys muhlenbergii",
    status: "Threatened",
    taxon: "Reptile",
    agency: "USFWS",
    habitat: "Wet meadows, spring-fed wetlands, and bog complexes",
  },
];

export const counties: County[] = [
  {
    id: "dorchester",
    name: "Dorchester County",
    region: "Eastern Shore",
    conservationPriority: "Very High",
    protectedHabitatPercent: 62,
    criticalHabitatPresent: true,
    fragmentationRisk: "Medium",
    notes: "Large tidal wetland systems and Chesapeake Bay habitat make this a high-priority conservation geography.",
    speciesIds: ["atlantic-sturgeon", "shortnose-sturgeon", "northern-long-eared-bat"],
  },
  {
    id: "worcester",
    name: "Worcester County",
    region: "Lower Eastern Shore",
    conservationPriority: "Very High",
    protectedHabitatPercent: 71,
    criticalHabitatPresent: true,
    fragmentationRisk: "Medium",
    notes: "Barrier island, coastal bay, and beach habitats support listed shorebirds and migratory species.",
    speciesIds: ["piping-plover", "red-knot", "northern-long-eared-bat"],
  },
  {
    id: "anne-arundel",
    name: "Anne Arundel County",
    region: "Central Maryland",
    conservationPriority: "High",
    protectedHabitatPercent: 38,
    criticalHabitatPresent: false,
    fragmentationRisk: "High",
    notes: "Developed Chesapeake shoreline with important forest patches, tidal creeks, and restoration opportunities.",
    speciesIds: ["atlantic-sturgeon", "northern-long-eared-bat"],
  },
  {
    id: "garrett",
    name: "Garrett County",
    region: "Western Maryland",
    conservationPriority: "High",
    protectedHabitatPercent: 55,
    criticalHabitatPresent: false,
    fragmentationRisk: "Low",
    notes: "Large forest blocks and cooler mountain habitat support bat conservation and connectivity.",
    speciesIds: ["northern-long-eared-bat", "bog-turtle"],
  },
  {
    id: "montgomery",
    name: "Montgomery County",
    region: "Capital Region",
    conservationPriority: "Medium",
    protectedHabitatPercent: 29,
    criticalHabitatPresent: false,
    fragmentationRisk: "High",
    notes: "Urbanization creates fragmentation pressure, but stream valleys and park networks offer corridor opportunities.",
    speciesIds: ["northern-long-eared-bat", "bog-turtle"],
  },
  {
    id: "somerset",
    name: "Somerset County",
    region: "Lower Eastern Shore",
    conservationPriority: "Very High",
    protectedHabitatPercent: 68,
    criticalHabitatPresent: true,
    fragmentationRisk: "Medium",
    notes: "Extensive marshes, low-lying lands, and Chesapeake Bay shoreline make this county important for coastal resilience.",
    speciesIds: ["atlantic-sturgeon", "red-knot", "northern-long-eared-bat"],
  },
];

export function getSpeciesForCounty(county: County): Species[] {
  return county.speciesIds
    .map((id) => species.find((item) => item.id === id))
    .filter(Boolean) as Species[];
}
