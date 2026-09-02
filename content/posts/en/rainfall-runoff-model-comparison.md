Choosing a rainfall-runoff model structure for a small forested catchment usually comes down to a trade-off between data availability and the questions you actually need answered. This is a short comparison of lumped and semi-distributed structures across three headwater basins with contrasting forest cover.

## The three catchments

- **Basin A** — 4.2 km², ~90% coniferous cover, steep terrain.
- **Basin B** — 6.8 km², mixed forest and pasture (~55% forested), moderate relief.
- **Basin C** — 3.1 km², recently thinned conifer stand, gentle slopes.

## Lumped models

A lumped conceptual model (single storage compartments, catchment-average forcing) performed reasonably well for Basin A, where forest cover is near-uniform and the terrain doesn't create strong spatial gradients in precipitation or radiation. Calibration was fast and parameter identifiability was good.

For Basin B, the lumped structure struggled to reproduce the double-peaked hydrograph typical of storms where rain falls on both forested and open pasture simultaneously — the model has no way to represent the different response times of the two land covers.

## Semi-distributed models

Splitting Basin B into forest and pasture sub-units, each with its own storage and routing parameters, resolved most of the double-peak issue, at the cost of a longer calibration process and a real risk of overparameterisation given the limited streamflow record available for validation.

For Basin C, the semi-distributed structure was useful for a different reason: it let us represent the thinned stand as a distinct sub-unit with different interception and evapotranspiration parameters, which mattered because the thinning had happened mid-way through the observation record.

## Takeaways

- Start lumped. Only add spatial structure where you have a specific hypothesis about why response differs across the catchment (land cover change, strong elevation gradient, mixed land use).
- Every added sub-unit is added parameters. Check identifiability before trusting calibrated values, especially with short streamflow records.
- Land-use change mid-record (thinning, harvest, storm damage) is one of the strongest reasons to prefer semi-distributed structures even in otherwise homogeneous catchments.
