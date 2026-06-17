# Real data ingestion roadmap

This folder is for scripts that will eventually replace static MVP data with real source data.

Planned jobs:

1. `fetch-usfws-species.ts`
   - Pull listed species metadata from USFWS ECOSphere.
   - Normalize common name, scientific name, ESA status, taxon, lead agency, source URLs.

2. `fetch-noaa-species.ts`
   - Pull NOAA-managed ESA species metadata.
   - Normalize into the same species model.

3. `fetch-county-boundaries.ts`
   - Download Census county boundaries.
   - Filter to Maryland.
   - Export simplified GeoJSON for frontend use.

4. `fetch-critical-habitat.ts`
   - Download USFWS and NOAA critical habitat spatial layers.
   - Clip to Maryland.
   - Prepare data for map overlays.

5. `fetch-padus.ts`
   - Download PAD-US protected lands.
   - Clip to Maryland.
   - Compute protected-land overlap.

Future backend:
- PostGIS for spatial joins
- Tippecanoe/PMTiles for vector tiles
- Scheduled data refresh with GitHub Actions
