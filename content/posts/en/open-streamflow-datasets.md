Before setting up any new field monitoring, it's worth checking whether a nearby gauge already has a long, usable record. This is a short guide to the open hydrometeorological datasets that come up most often in forested-catchment work, and the quality checks worth running before trusting them.

## Streamflow

National hydrological services generally publish gauge records with the best documentation of rating curves and known gaps, so start there. Where a global compilation is more convenient — for regional or cross-border studies — GRDC (Global Runoff Data Centre) aggregates daily and monthly discharge from thousands of stations, though update latency and station density vary a lot by country.

For small forested catchments specifically, official gauge networks are often too sparse — many headwater basins simply aren't gauged. Research-network datasets (e.g. long-term ecological research sites, experimental forest networks) sometimes fill this gap, but licensing and citation requirements vary, so check the data use policy before building a workflow around one.

## Precipitation

Gridded reanalysis and satellite-gauge blended products (e.g. ERA5-Land, CHIRPS) are convenient but tend to underrepresent orographic and convective rainfall at the scale of a small headwater basin — exactly the kind of event that drives peak flow in steep, forested terrain. Where possible, cross-check against the nearest ground station, even one outside the catchment boundary.

## Quality checks worth doing before you trust a dataset

1. **Plot the raw time series first.** Obvious gaps, flat-lined periods, or implausible spikes are easier to spot visually than in summary statistics.
2. **Check the rating curve's valid range**, if published. Extrapolated stage-discharge relationships are least reliable at flood peaks — often the values you care about most.
3. **Compare overlapping periods** between two nearby sources where available; systematic offsets are a useful early warning sign.
4. **Read the metadata for land-use or infrastructure changes** upstream of the gauge (reservoirs, diversions, urbanisation) that could break the assumption of a stationary catchment.

None of this replaces a short field visit if the data will drive a real management decision — but it catches most of the problems that would otherwise only surface much later, once a model has already been calibrated on bad input.
