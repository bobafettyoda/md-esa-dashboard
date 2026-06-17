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
  {
    id: "roseate-tern",
    commonName: "Roseate Tern",
    scientificName: "Sterna dougallii dougallii",
    status: "Endangered",
    taxon: "Bird",
    agency: "USFWS",
    habitat: "Coastal islands, beaches, and nearshore feeding areas",
  },
  {
    id: "sea-turtles",
    commonName: "Sea Turtles",
    scientificName: "Caretta caretta / Lepidochelys kempii",
    status: "Threatened",
    taxon: "Reptile",
    agency: "Joint",
    habitat: "Atlantic coastal waters, nearshore habitats, and nesting beaches",
  },
];

export const counties: County[] = [
  {
    id: "allegany",
    name: "Allegany County",
    region: "Western Maryland",
    conservationPriority: "Medium",
    protectedHabitatPercent: 44,
    criticalHabitatPresent: false,
    fragmentationRisk: "Medium",
    notes: "Mountain forests and stream corridors provide habitat connectivity across western Maryland.",
    speciesIds: ["northern-long-eared-bat"],
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
    id: "baltimore-city",
    name: "Baltimore City",
    region: "Central Maryland",
    conservationPriority: "Medium",
    protectedHabitatPercent: 18,
    criticalHabitatPresent: false,
    fragmentationRisk: "High",
    notes: "Urban waterfront and stream restoration areas create targeted habitat improvement opportunities.",
    speciesIds: ["atlantic-sturgeon"],
  },
  {
    id: "baltimore",
    name: "Baltimore County",
    region: "Central Maryland",
    conservationPriority: "High",
    protectedHabitatPercent: 35,
    criticalHabitatPresent: false,
    fragmentationRisk: "High",
    notes: "Forest patches, reservoirs, and stream valleys form important regional habitat corridors.",
    speciesIds: ["northern-long-eared-bat", "bog-turtle"],
  },
  {
    id: "calvert",
    name: "Calvert County",
    region: "Southern Maryland",
    conservationPriority: "High",
    protectedHabitatPercent: 41,
    criticalHabitatPresent: true,
    fragmentationRisk: "Medium",
    notes: "Chesapeake Bay shoreline and tidal wetlands support coastal conservation priorities.",
    speciesIds: ["atlantic-sturgeon", "red-knot", "northern-long-eared-bat"],
  },
  {
    id: "caroline",
    name: "Caroline County",
    region: "Eastern Shore",
    conservationPriority: "Medium",
    protectedHabitatPercent: 31,
    criticalHabitatPresent: false,
    fragmentationRisk: "Medium",
    notes: "Agricultural landscapes and river corridors create restoration and connectivity opportunities.",
    speciesIds: ["northern-long-eared-bat"],
  },
  {
    id: "carroll",
    name: "Carroll County",
    region: "Central Maryland",
    conservationPriority: "Medium",
    protectedHabitatPercent: 27,
    criticalHabitatPresent: false,
    fragmentationRisk: "High",
    notes: "Upland farms, forest fragments, and headwater streams shape local habitat planning needs.",
    speciesIds: ["northern-long-eared-bat", "bog-turtle"],
  },
  {
    id: "cecil",
    name: "Cecil County",
    region: "Upper Eastern Shore",
    conservationPriority: "High",
    protectedHabitatPercent: 43,
    criticalHabitatPresent: true,
    fragmentationRisk: "Medium",
    notes: "Upper Chesapeake and Susquehanna influence make this important for aquatic and shoreline habitats.",
    speciesIds: ["atlantic-sturgeon", "shortnose-sturgeon", "northern-long-eared-bat"],
  },
  {
    id: "charles",
    name: "Charles County",
    region: "Southern Maryland",
    conservationPriority: "High",
    protectedHabitatPercent: 49,
    criticalHabitatPresent: false,
    fragmentationRisk: "Medium",
    notes: "Potomac shoreline, wetlands, and forest blocks support aquatic and terrestrial conservation priorities.",
    speciesIds: ["shortnose-sturgeon", "northern-long-eared-bat"],
  },
  {
    id: "dorchester",
    name: "Dorchester County",
    region: "Eastern Shore",
    conservationPriority: "Very High",
    protectedHabitatPercent: 62,
    criticalHabitatPresent: true,
    fragmentationRisk: "Medium",
    notes: "Large tidal wetland systems and Chesapeake Bay habitat make this a high-priority conservation geography.",
    speciesIds: ["atlantic-sturgeon", "shortnose-sturgeon", "northern-long-eared-bat", "red-knot"],
  },
  {
    id: "frederick",
    name: "Frederick County",
    region: "Western/Central Maryland",
    conservationPriority: "Medium",
    protectedHabitatPercent: 34,
    criticalHabitatPresent: false,
    fragmentationRisk: "Medium",
    notes: "Mountain ridges, agricultural valleys, and stream networks provide varied habitat corridors.",
    speciesIds: ["northern-long-eared-bat", "bog-turtle"],
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
    id: "harford",
    name: "Harford County",
    region: "Upper Chesapeake",
    conservationPriority: "High",
    protectedHabitatPercent: 39,
    criticalHabitatPresent: true,
    fragmentationRisk: "Medium",
    notes: "Susquehanna Flats, tidal waters, and forest corridors create important habitat intersections.",
    speciesIds: ["atlantic-sturgeon", "shortnose-sturgeon", "northern-long-eared-bat"],
  },
  {
    id: "howard",
    name: "Howard County",
    region: "Central Maryland",
    conservationPriority: "Medium",
    protectedHabitatPercent: 24,
    criticalHabitatPresent: false,
    fragmentationRisk: "High",
    notes: "Suburban growth pressure makes stream valleys and forest remnants important conservation targets.",
    speciesIds: ["northern-long-eared-bat"],
  },
  {
    id: "kent",
    name: "Kent County",
    region: "Upper Eastern Shore",
    conservationPriority: "High",
    protectedHabitatPercent: 48,
    criticalHabitatPresent: true,
    fragmentationRisk: "Medium",
    notes: "Chesapeake shoreline, tidal rivers, and agricultural landscapes support coastal and migratory species.",
    speciesIds: ["atlantic-sturgeon", "red-knot", "northern-long-eared-bat"],
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
    id: "prince-georges",
    name: "Prince George's County",
    region: "Capital Region",
    conservationPriority: "High",
    protectedHabitatPercent: 33,
    criticalHabitatPresent: false,
    fragmentationRisk: "High",
    notes: "Potomac and Patuxent corridors offer important restoration and habitat connectivity opportunities.",
    speciesIds: ["shortnose-sturgeon", "northern-long-eared-bat"],
  },
  {
    id: "queen-annes",
    name: "Queen Anne's County",
    region: "Eastern Shore",
    conservationPriority: "High",
    protectedHabitatPercent: 46,
    criticalHabitatPresent: true,
    fragmentationRisk: "Medium",
    notes: "Bay shoreline, tidal creeks, and migratory stopover habitat make this a high-value coastal county.",
    speciesIds: ["atlantic-sturgeon", "red-knot", "northern-long-eared-bat"],
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
    speciesIds: ["atlantic-sturgeon", "red-knot", "northern-long-eared-bat", "sea-turtles"],
  },
  {
    id: "st-marys",
    name: "St. Mary's County",
    region: "Southern Maryland",
    conservationPriority: "High",
    protectedHabitatPercent: 45,
    criticalHabitatPresent: true,
    fragmentationRisk: "Medium",
    notes: "Lower Potomac and Chesapeake shorelines create important coastal habitat and restoration priorities.",
    speciesIds: ["atlantic-sturgeon", "red-knot", "northern-long-eared-bat"],
  },
  {
    id: "talbot",
    name: "Talbot County",
    region: "Eastern Shore",
    conservationPriority: "High",
    protectedHabitatPercent: 52,
    criticalHabitatPresent: true,
    fragmentationRisk: "Medium",
    notes: "Tidal shoreline and estuarine habitat support fish, bird, and marsh conservation priorities.",
    speciesIds: ["atlantic-sturgeon", "red-knot", "northern-long-eared-bat"],
  },
  {
    id: "washington",
    name: "Washington County",
    region: "Western Maryland",
    conservationPriority: "Medium",
    protectedHabitatPercent: 37,
    criticalHabitatPresent: false,
    fragmentationRisk: "Medium",
    notes: "Potomac River corridors and mountain ridges support regional habitat connectivity.",
    speciesIds: ["northern-long-eared-bat"],
  },
  {
    id: "wicomico",
    name: "Wicomico County",
    region: "Lower Eastern Shore",
    conservationPriority: "High",
    protectedHabitatPercent: 42,
    criticalHabitatPresent: false,
    fragmentationRisk: "Medium",
    notes: "Nanticoke watershed and Eastern Shore forest-wetland mosaics support restoration priorities.",
    speciesIds: ["atlantic-sturgeon", "northern-long-eared-bat"],
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
    speciesIds: ["piping-plover", "red-knot", "roseate-tern", "sea-turtles", "northern-long-eared-bat"],
  },
];

export function getSpeciesForCounty(county: County): Species[] {
  return county.speciesIds
    .map((id) => species.find((item) => item.id === id))
    .filter(Boolean) as Species[];
}

export function getConservationScore(county: County): number {
  const speciesScore = Math.min(county.speciesIds.length * 12, 40);
  const protectionScore = Math.round(county.protectedHabitatPercent * 0.35);
  const criticalScore = county.criticalHabitatPresent ? 15 : 0;
  const fragmentationPenalty =
    county.fragmentationRisk === "High" ? 12 : county.fragmentationRisk === "Medium" ? 6 : 0;

  return Math.max(0, Math.min(100, speciesScore + protectionScore + criticalScore - fragmentationPenalty));
}
