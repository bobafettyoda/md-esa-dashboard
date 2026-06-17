export type DataSource = {
  id: string;
  name: string;
  agency: string;
  category: "species" | "critical-habitat" | "protected-lands" | "boundaries";
  status: "planned" | "active" | "manual";
  notes: string;
  url: string;
};

export const dataSources: DataSource[] = [
  {
    id: "usfws-ecosphere",
    name: "USFWS ECOSphere Species Data Explorer",
    agency: "U.S. Fish & Wildlife Service",
    category: "species",
    status: "planned",
    notes:
      "Primary source for FWS ESA-listed species metadata, status, and reports.",
    url: "https://ecos.fws.gov/ecp/report/adhocDocumentation?catalogId=species&reportId=species",
  },
  {
    id: "usfws-critical-habitat",
    name: "USFWS Active Critical Habitat",
    agency: "U.S. Fish & Wildlife Service",
    category: "critical-habitat",
    status: "planned",
    notes:
      "Spatial data for active proposed and final critical habitat for FWS and joint species.",
    url: "https://ecos.fws.gov/ecp/report/table/critical-habitat.html",
  },
  {
    id: "noaa-critical-habitat",
    name: "NOAA National ESA Critical Habitat Mapper",
    agency: "NOAA Fisheries",
    category: "critical-habitat",
    status: "planned",
    notes:
      "Spatial data for proposed and designated NOAA ESA critical habitat.",
    url: "https://www.fisheries.noaa.gov/resource/map/national-esa-critical-habitat-mapper",
  },
  {
    id: "pad-us",
    name: "PAD-US Protected Areas Database",
    agency: "U.S. Geological Survey",
    category: "protected-lands",
    status: "planned",
    notes:
      "National protected lands inventory for protected-area overlap and gap analysis.",
    url: "https://www.usgs.gov/programs/gap-analysis-project/science/pad-us-data-download",
  },
  {
    id: "census-counties",
    name: "U.S. Census County Boundaries",
    agency: "U.S. Census Bureau",
    category: "boundaries",
    status: "active",
    notes:
      "County boundary GeoJSON currently used for the frontend Maryland county map.",
    url: "https://www.census.gov/geographies/mapping-files/time-series/geo/cartographic-boundary.html",
  },
];
