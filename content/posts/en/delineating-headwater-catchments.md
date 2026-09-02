Delineating a catchment boundary is usually the first step in any forest hydrology study — before you can talk about interception, infiltration or streamflow, you need to know exactly which piece of land drains to your point of interest.

## Starting from a DEM

Most workflows begin with a digital elevation model (DEM). For headwater catchments, resolution matters more than extent: a 30 m SRTM tile is often too coarse to resolve small first-order channels under canopy, while a 1–5 m LiDAR-derived DEM can pick up subtle terrain features that control flow paths.

Before delineating anything, it's worth filling sinks and resolving flat areas. Unfilled depressions — often artifacts of the DEM itself rather than real landscape features — will break flow accumulation downstream.

## Flow direction and accumulation

Once the DEM is hydrologically conditioned, the standard sequence is:

1. Compute flow direction (D8, D-infinity, or MFD, depending on how much you care about dispersive flow on gentle slopes).
2. Compute flow accumulation from the flow direction grid.
3. Threshold the accumulation grid to define a stream network.
4. Snap your pour point to the nearest high-accumulation cell.
5. Delineate the catchment upstream of that pour point.

Under dense canopy, forest roads and skid trails can visually resemble channels in a DEM derived from photogrammetry — always cross-check against a canopy-penetrating LiDAR DEM where possible.

## A note on pour point placement

Small errors in pour point placement can produce disproportionately large errors in delineated catchment area for small headwater basins, simply because the channel network is short and steep. Snapping to the nearest cell above a flow accumulation threshold, rather than to raw coordinates, avoids most of these mistakes.

## Where this goes next

Once you have a reliable catchment boundary, it becomes the spatial unit for everything else on this site — remote sensing composites are clipped to it, model inputs are aggregated over it, and monitoring data is reported against it.
