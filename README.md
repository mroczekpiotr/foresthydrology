# ForestHydrology.com

Starter website for GitHub Pages.

## Publish on GitHub Pages
1. Create a public GitHub repository, e.g. `foresthydrology`.
2. Upload all files from this folder.
3. Go to **Settings → Pages**.
4. Select **Deploy from a branch**, branch `main`, folder `/ (root)`.
5. Save.
6. For a custom domain, enter `foresthydrology.com` under **Custom domain** and configure DNS at your domain registrar.

## Structure
- `index.html` — homepage
- `articles.html` — article hub
- `gis.html` — GIS section
- `remote-sensing.html` — remote sensing
- `modelling.html` — hydrological modelling
- `data.html` — datasets
- `webgis.html` — Leaflet WebGIS prototype
- `articles/` — article pages
- `data/` — example GeoJSON
- `css/`, `js/`, `images/` — assets

## WebGIS next step
Replace `data/example.geojson` with your own GeoJSON or connect Leaflet to WMS/WFS services from GeoServer. For large datasets, use PostGIS/GeoServer or vector tiles rather than shipping large SHP/GeoJSON files to the browser.
