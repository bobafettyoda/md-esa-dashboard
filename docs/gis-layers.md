# GIS layers

The GIS engine reads these files:

- public/geo/maryland-counties.geojson
- public/geo/layers/protected-lands.geojson
- public/geo/layers/critical-habitat.geojson

## Protected lands

Production source:
- USGS PAD-US

Workflow:
1. Download PAD-US.
2. Filter or clip to Maryland.
3. Export as GeoJSON.
4. Replace public/geo/layers/protected-lands.geojson.
5. Run npm run gis:build.

## Critical habitat

Production sources:
- USFWS Active Critical Habitat
- NOAA National ESA Critical Habitat Mapper

Workflow:
1. Download or query USFWS/NOAA critical habitat layers.
2. Filter or clip to Maryland.
3. Merge into one GeoJSON.
4. Replace public/geo/layers/critical-habitat.geojson.
5. Run npm run gis:build.

## Metrics generated

For each county:

- area acres
- protected area acres
- protected area percent
- critical habitat acres
- critical habitat percent
- unprotected critical habitat acres

Current starter layers are simplified sample overlays. They prove the math pipeline.
