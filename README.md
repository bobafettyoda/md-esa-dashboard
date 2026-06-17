# Maryland ESA Habitat Dashboard - Static MVP

This is a simple first version of the dashboard: no Docker, no database, no PostGIS.
It lets you validate the product experience before adding heavier GIS infrastructure.

## Run locally or in Codespaces

```bash
npm install
npm run dev
```

Open port 3000.

## What it includes

- Maryland county selector
- ESA-listed species demo data
- Species cards with status, agency, critical habitat signal, and gap notes
- Roadmap for adding map and real data

## Why this version exists

Build the user experience first. Add PostGIS and real habitat geometry only after the dashboard flow is useful.
