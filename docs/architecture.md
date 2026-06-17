# Maryland Conservation Intelligence Platform

## Current MVP

- Next.js frontend
- Static data in `data/dashboard-data.ts`
- Real county GeoJSON map
- County rankings
- Species profile pages
- Source registry

## Target architecture

Frontend:
- Next.js
- MapLibre for production GIS layers
- Species and geography profile pages

Backend:
- FastAPI or Next.js route handlers
- PostgreSQL/PostGIS for spatial analysis

Data:
- USFWS ECOSphere
- NOAA Fisheries critical habitat
- PAD-US protected lands
- U.S. Census county boundaries
- Maryland watershed/refuge/district boundaries

Core analyses:
- species by geography
- critical habitat by geography
- protected habitat overlap
- unprotected habitat gaps
- fragmentation/connectivity indicators
- conservation score
