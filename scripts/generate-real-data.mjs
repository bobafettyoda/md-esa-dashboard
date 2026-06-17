import fs from "fs/promises";
import path from "path";

const OUT = path.join(process.cwd(), "data", "generated");

const counties = [
  ["allegany", "Allegany County", "24001", "Western Maryland"],
  ["anne-arundel", "Anne Arundel County", "24003", "Central Maryland"],
  ["baltimore", "Baltimore County", "24005", "Central Maryland"],
  ["calvert", "Calvert County", "24009", "Southern Maryland"],
  ["caroline", "Caroline County", "24011", "Eastern Shore"],
  ["carroll", "Carroll County", "24013", "Central Maryland"],
  ["cecil", "Cecil County", "24015", "Upper Eastern Shore"],
  ["charles", "Charles County", "24017", "Southern Maryland"],
  ["dorchester", "Dorchester County", "24019", "Eastern Shore"],
  ["frederick", "Frederick County", "24021", "Western/Central Maryland"],
  ["garrett", "Garrett County", "24023", "Western Maryland"],
  ["harford", "Harford County", "24025", "Upper Chesapeake"],
  ["howard", "Howard County", "24027", "Central Maryland"],
  ["kent", "Kent County", "24029", "Upper Eastern Shore"],
  ["montgomery", "Montgomery County", "24031", "Capital Region"],
  ["prince-georges", "Prince George's County", "24033", "Capital Region"],
  ["queen-annes", "Queen Anne's County", "24035", "Eastern Shore"],
  ["st-marys", "St. Mary's County", "24037", "Southern Maryland"],
  ["somerset", "Somerset County", "24039", "Lower Eastern Shore"],
  ["talbot", "Talbot County", "24041", "Eastern Shore"],
  ["washington", "Washington County", "24043", "Western Maryland"],
  ["wicomico", "Wicomico County", "24045", "Lower Eastern Shore"],
  ["worcester", "Worcester County", "24047", "Lower Eastern Shore"],
  ["baltimore-city", "Baltimore City", "24510", "Central Maryland"],
].map(([id, name, fips, region]) => ({
  id,
  name,
  fips,
  region,
  source: "U.S. Census county FIPS / cartographic boundary reference",
}));

const species = [
  {
    id: "atlantic-sturgeon",
    commonName: "Atlantic Sturgeon",
    scientificName: "Acipenser oxyrinchus oxyrinchus",
    status: "Endangered",
    taxon: "Fish",
    agency: "NOAA Fisheries",
    habitat: "Tidal rivers, estuaries, Chesapeake Bay corridors, and Atlantic coastal waters",
    source: "NOAA Fisheries ESA-listed species / critical habitat context",
    sourceUrl: "https://www.fisheries.noaa.gov/species/atlantic-sturgeon",
  },
  {
    id: "shortnose-sturgeon",
    commonName: "Shortnose Sturgeon",
    scientificName: "Acipenser brevirostrum",
    status: "Endangered",
    taxon: "Fish",
    agency: "NOAA Fisheries",
    habitat: "Large rivers, tidal rivers, and estuarine systems",
    source: "NOAA Fisheries ESA-listed species context",
    sourceUrl: "https://www.fisheries.noaa.gov/species/shortnose-sturgeon",
  },
  {
    id: "northern-long-eared-bat",
    commonName: "Northern Long-eared Bat",
    scientificName: "Myotis septentrionalis",
    status: "Endangered",
    taxon: "Mammal",
    agency: "USFWS",
    habitat: "Forested summer habitat, roost trees, and winter hibernacula",
    source: "USFWS ECOSphere species record context",
    sourceUrl: "https://ecos.fws.gov/ecp/species/9045",
  },
  {
    id: "piping-plover",
    commonName: "Piping Plover",
    scientificName: "Charadrius melodus",
    status: "Threatened",
    taxon: "Bird",
    agency: "USFWS",
    habitat: "Atlantic barrier beaches, sparsely vegetated shorelines, and nesting beaches",
    source: "USFWS ECOSphere species record context",
    sourceUrl: "https://ecos.fws.gov/ecp/species/6039",
  },
  {
    id: "red-knot",
    commonName: "Rufa Red Knot",
    scientificName: "Calidris canutus rufa",
    status: "Threatened",
    taxon: "Bird",
    agency: "USFWS",
    habitat: "Coastal stopover habitats, tidal flats, beaches, and migratory shoreline areas",
    source: "USFWS ECOSphere species record context",
    sourceUrl: "https://ecos.fws.gov/ecp/species/1864",
  },
  {
    id: "bog-turtle",
    commonName: "Bog Turtle",
    scientificName: "Glyptemys muhlenbergii",
    status: "Threatened",
    taxon: "Reptile",
    agency: "USFWS",
    habitat: "Spring-fed wetlands, wet meadows, bogs, and seepage wetlands",
    source: "USFWS ECOSphere species record context",
    sourceUrl: "https://ecos.fws.gov/ecp/species/6962",
  },
  {
    id: "roseate-tern",
    commonName: "Roseate Tern",
    scientificName: "Sterna dougallii dougallii",
    status: "Endangered",
    taxon: "Bird",
    agency: "USFWS",
    habitat: "Coastal islands, beaches, and nearshore feeding areas",
    source: "USFWS ECOSphere species record context",
    sourceUrl: "https://ecos.fws.gov/ecp/species/2083",
  },
  {
    id: "loggerhead-sea-turtle",
    commonName: "Loggerhead Sea Turtle",
    scientificName: "Caretta caretta",
    status: "Threatened",
    taxon: "Reptile",
    agency: "Joint",
    habitat: "Atlantic coastal waters, nearshore marine areas, and nesting beaches",
    source: "NOAA Fisheries and USFWS joint ESA species context",
    sourceUrl: "https://www.fisheries.noaa.gov/species/loggerhead-turtle",
  },
  {
    id: "kemps-ridley-sea-turtle",
    commonName: "Kemp's Ridley Sea Turtle",
    scientificName: "Lepidochelys kempii",
    status: "Endangered",
    taxon: "Reptile",
    agency: "Joint",
    habitat: "Atlantic coastal waters, nearshore marine habitats, and migratory corridors",
    source: "NOAA Fisheries and USFWS joint ESA species context",
    sourceUrl: "https://www.fisheries.noaa.gov/species/kemps-ridley-turtle",
  },
];

const countySpecies = [
  ["dorchester", "atlantic-sturgeon"], ["dorchester", "shortnose-sturgeon"], ["dorchester", "northern-long-eared-bat"], ["dorchester", "red-knot"],
  ["worcester", "piping-plover"], ["worcester", "red-knot"], ["worcester", "roseate-tern"], ["worcester", "loggerhead-sea-turtle"], ["worcester", "kemps-ridley-sea-turtle"], ["worcester", "northern-long-eared-bat"],
  ["somerset", "atlantic-sturgeon"], ["somerset", "red-knot"], ["somerset", "loggerhead-sea-turtle"], ["somerset", "northern-long-eared-bat"],
  ["cecil", "atlantic-sturgeon"], ["cecil", "shortnose-sturgeon"], ["cecil", "northern-long-eared-bat"],
  ["harford", "atlantic-sturgeon"], ["harford", "shortnose-sturgeon"], ["harford", "northern-long-eared-bat"],
  ["kent", "atlantic-sturgeon"], ["kent", "red-knot"], ["kent", "northern-long-eared-bat"],
  ["queen-annes", "atlantic-sturgeon"], ["queen-annes", "red-knot"], ["queen-annes", "northern-long-eared-bat"],
  ["talbot", "atlantic-sturgeon"], ["talbot", "red-knot"], ["talbot", "northern-long-eared-bat"],
  ["calvert", "atlantic-sturgeon"], ["calvert", "red-knot"], ["calvert", "northern-long-eared-bat"],
  ["st-marys", "atlantic-sturgeon"], ["st-marys", "red-knot"], ["st-marys", "northern-long-eared-bat"],
  ["anne-arundel", "atlantic-sturgeon"], ["anne-arundel", "northern-long-eared-bat"],
  ["baltimore-city", "atlantic-sturgeon"],
  ["baltimore", "northern-long-eared-bat"], ["baltimore", "bog-turtle"],
  ["carroll", "northern-long-eared-bat"], ["carroll", "bog-turtle"],
  ["frederick", "northern-long-eared-bat"], ["frederick", "bog-turtle"],
  ["garrett", "northern-long-eared-bat"], ["garrett", "bog-turtle"],
  ["montgomery", "northern-long-eared-bat"], ["montgomery", "bog-turtle"],
  ["prince-georges", "shortnose-sturgeon"], ["prince-georges", "northern-long-eared-bat"],
  ["charles", "shortnose-sturgeon"], ["charles", "northern-long-eared-bat"],
  ["allegany", "northern-long-eared-bat"],
  ["caroline", "northern-long-eared-bat"],
  ["howard", "northern-long-eared-bat"],
  ["washington", "northern-long-eared-bat"],
  ["wicomico", "atlantic-sturgeon"], ["wicomico", "northern-long-eared-bat"],
].map(([countyId, speciesId]) => ({
  countyId,
  speciesId,
  basis: "manual-review",
  notes:
    "MVP county-species relationship requiring source-by-source review against ECOS/IPaC, NOAA range data, and spatial occurrence/range datasets before production use.",
}));

const metricTemplate = {
  "Very High": { protectedHabitatPercent: 68, criticalHabitatPresent: true, fragmentationRisk: "Medium" },
  High: { protectedHabitatPercent: 45, criticalHabitatPresent: true, fragmentationRisk: "Medium" },
  Medium: { protectedHabitatPercent: 32, criticalHabitatPresent: false, fragmentationRisk: "Medium" },
};

const priorityByCounty = {
  dorchester: "Very High",
  worcester: "Very High",
  somerset: "Very High",
  cecil: "High",
  harford: "High",
  kent: "High",
  "queen-annes": "High",
  talbot: "High",
  calvert: "High",
  "st-marys": "High",
  "anne-arundel": "High",
  charles: "High",
  garrett: "High",
};

const countyMetrics = counties.map((county) => {
  const conservationPriority = priorityByCounty[county.id] || "Medium";
  const template = metricTemplate[conservationPriority] || metricTemplate.Medium;
  return {
    countyId: county.id,
    protectedHabitatPercent: template.protectedHabitatPercent,
    criticalHabitatPresent: template.criticalHabitatPresent,
    fragmentationRisk:
      ["anne-arundel", "baltimore", "baltimore-city", "montgomery", "prince-georges", "howard"].includes(county.id)
        ? "High"
        : template.fragmentationRisk,
    conservationPriority,
    notes:
      "Generated MVP metric. Replace with PAD-US protected-area overlap, official critical-habitat polygons, and fragmentation analysis in the PostGIS phase.",
  };
});

const sources = [
  {
    id: "usfws-ecosphere",
    name: "USFWS ECOSphere Species Data Explorer",
    agency: "U.S. Fish & Wildlife Service",
    category: "species",
    url: "https://ecos.fws.gov/ecp/report/adhocDocumentation?catalogId=species&reportId=species",
    notes: "Official FWS ESA species metadata source and REST query documentation.",
  },
  {
    id: "noaa-critical-habitat",
    name: "NOAA National ESA Critical Habitat Mapper",
    agency: "NOAA Fisheries",
    category: "critical-habitat",
    url: "https://www.fisheries.noaa.gov/resource/map/national-esa-critical-habitat-mapper",
    notes: "Official NOAA Fisheries critical habitat map service and downloads.",
  },
  {
    id: "pad-us",
    name: "PAD-US Protected Areas Database",
    agency: "U.S. Geological Survey",
    category: "protected-lands",
    url: "https://www.usgs.gov/programs/gap-analysis-project/science/pad-us-data-download",
    notes: "National protected-areas inventory for protected-overlap calculations.",
  },
  {
    id: "census-counties",
    name: "U.S. Census Cartographic Boundary Files",
    agency: "U.S. Census Bureau",
    category: "boundaries",
    url: "https://www.census.gov/geographies/mapping-files/time-series/geo/cartographic-boundary.html",
    notes: "County boundary source for map geographies.",
  },
];

await fs.mkdir(OUT, { recursive: true });
await fs.writeFile(path.join(OUT, "counties.json"), JSON.stringify(counties, null, 2));
await fs.writeFile(path.join(OUT, "species.json"), JSON.stringify(species, null, 2));
await fs.writeFile(path.join(OUT, "county-species.json"), JSON.stringify(countySpecies, null, 2));
await fs.writeFile(path.join(OUT, "county-metrics.json"), JSON.stringify(countyMetrics, null, 2));
await fs.writeFile(path.join(OUT, "sources.json"), JSON.stringify(sources, null, 2));

console.log("Generated real-data scaffold in data/generated");
