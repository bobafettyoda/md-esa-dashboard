export type Species = {
  id: string;
  commonName: string;
  scientificName: string;
  esaStatus: "Endangered" | "Threatened";
  taxon: string;
  leadAgency: "USFWS" | "NOAA Fisheries" | "Joint";
  criticalHabitat: "Yes" | "No" | "Partial / nearby";
  protectedOverlap: number;
  gapNote: string;
};

export type County = {
  id: string;
  name: string;
  region: string;
  speciesIds: string[];
};

export const species: Species[] = [
  {
    id: "atlantic-sturgeon",
    commonName: "Atlantic Sturgeon",
    scientificName: "Acipenser oxyrinchus oxyrinchus",
    esaStatus: "Endangered",
    taxon: "Fish",
    leadAgency: "NOAA Fisheries",
    criticalHabitat: "Yes",
    protectedOverlap: 42,
    gapNote: "Prioritize river corridors, spawning habitat, and water-quality restoration."
  },
  {
    id: "shortnose-sturgeon",
    commonName: "Shortnose Sturgeon",
    scientificName: "Acipenser brevirostrum",
    esaStatus: "Endangered",
    taxon: "Fish",
    leadAgency: "NOAA Fisheries",
    criticalHabitat: "Partial / nearby",
    protectedOverlap: 35,
    gapNote: "Focus on Chesapeake Bay tributaries and barriers to fish passage."
  },
  {
    id: "northern-long-eared-bat",
    commonName: "Northern Long-eared Bat",
    scientificName: "Myotis septentrionalis",
    esaStatus: "Endangered",
    taxon: "Mammal",
    leadAgency: "USFWS",
    criticalHabitat: "No",
    protectedOverlap: 58,
    gapNote: "Protect mature forest patches, roost trees, and winter hibernacula buffers."
  },
  {
    id: "piping-plover",
    commonName: "Piping Plover",
    scientificName: "Charadrius melodus",
    esaStatus: "Threatened",
    taxon: "Bird",
    leadAgency: "USFWS",
    criticalHabitat: "Yes",
    protectedOverlap: 71,
    gapNote: "Focus on beach nesting areas, public access management, and dune protection."
  },
  {
    id: "red-knot",
    commonName: "Rufa Red Knot",
    scientificName: "Calidris canutus rufa",
    esaStatus: "Threatened",
    taxon: "Bird",
    leadAgency: "USFWS",
    criticalHabitat: "No",
    protectedOverlap: 49,
    gapNote: "Protect stopover shorelines and horseshoe-crab-linked foraging areas."
  }
];

export const counties: County[] = [
  { id: "anne-arundel", name: "Anne Arundel County", region: "Central Maryland / Chesapeake Bay", speciesIds: ["northern-long-eared-bat", "atlantic-sturgeon", "shortnose-sturgeon"] },
  { id: "dorchester", name: "Dorchester County", region: "Eastern Shore", speciesIds: ["atlantic-sturgeon", "shortnose-sturgeon", "northern-long-eared-bat", "red-knot"] },
  { id: "garrett", name: "Garrett County", region: "Western Maryland", speciesIds: ["northern-long-eared-bat"] },
  { id: "somerset", name: "Somerset County", region: "Lower Eastern Shore", speciesIds: ["piping-plover", "red-knot", "northern-long-eared-bat"] },
  { id: "worcester", name: "Worcester County", region: "Atlantic Coast", speciesIds: ["piping-plover", "red-knot", "northern-long-eared-bat"] },
  { id: "baltimore-city", name: "Baltimore City", region: "Central Maryland", speciesIds: ["northern-long-eared-bat"] },
  { id: "montgomery", name: "Montgomery County", region: "Capital Region", speciesIds: ["northern-long-eared-bat"] },
  { id: "prince-georges", name: "Prince George's County", region: "Capital Region", speciesIds: ["northern-long-eared-bat", "atlantic-sturgeon"] }
];
