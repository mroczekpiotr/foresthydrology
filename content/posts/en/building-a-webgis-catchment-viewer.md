Publishing catchment boundaries, gauge locations and monitoring station status online doesn't require a full GIS server stack. For a small research site, a static, client-side WebGIS viewer is often enough — and it deploys the same way as the rest of this site: as plain files on GitHub Pages.

## The minimal stack

- **Leaflet** for the map itself — small, dependency-light, and well documented.
- **GeoJSON** for catchment boundaries and station locations, exported once from your GIS software and committed as static files.
- A **basemap tile provider** with a permissive free tier (check usage limits before relying on one for a public site).

No server-side component is required. All the "GIS" happens ahead of time, in QGIS or similar, and the web page just renders the results.

## Structure

```
webgis/
  index.html
  catchments.geojson
  stations.geojson
  style.js
```

The map initialises with the catchment polygons styled by a simple attribute (e.g. dominant forest type), and station markers colored by current status if you're pulling that from a live feed. If station status needs to update without a redeploy, point the fetch at a small JSON endpoint you control, rather than baking status into the static GeoJSON — that keeps the map deployment static while the data stays current.

## Keeping it maintainable

- Keep one GeoJSON file per layer, not one giant combined file — it makes diffs in version control actually readable when a boundary changes.
- Simplify polygon geometry before export. A catchment boundary digitised from a 1 m LiDAR DEM has far more vertices than a web map needs; simplifying reduces file size substantially with no visible difference at typical zoom levels.
- Document the coordinate reference system in the README. Reprojection mistakes are the most common cause of "the map is empty" bug reports.

This setup scales surprisingly far for a research site — well past the point where most projects would assume they need a database and an API.
