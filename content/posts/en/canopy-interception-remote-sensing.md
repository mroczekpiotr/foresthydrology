Canopy interception — the fraction of rainfall caught and evaporated by leaves and branches before it ever reaches the ground — is hard to measure directly at scale. Field throughfall gauges give point estimates; satellite leaf area index (LAI) products offer a way to extend that to whole catchments.

## Why LAI is a reasonable proxy

Interception storage capacity scales, to a first approximation, with the amount of leaf and branch surface area available to hold water. LAI time series from sensors such as MODIS or Sentinel-2-derived products track canopy development through the growing season, which makes them a useful covariate for seasonal interception models — high in full leaf-out, lower after leaf fall in deciduous stands.

## Practical caveats

A few things worth checking before trusting an LAI-based interception estimate:

- **Saturation at high LAI.** Optical LAI products tend to saturate above LAI ≈ 5–6, common in dense conifer stands, which flattens the apparent relationship with interception capacity.
- **Mixed pixels at forest edges.** A 500 m MODIS pixel straddling a clearcut boundary will report an LAI that doesn't represent either land cover well — clip carefully to your catchment mask.
- **Understory contribution.** LAI products typically measure total canopy, not just the overstory; in catchments with dense understory, interception attributed to "the forest" may include a shrub layer with very different storage dynamics.

## A simple workflow

1. Extract a cloud-free LAI composite over the catchment for each time step of interest.
2. Convert LAI to a canopy storage capacity estimate using a species- or stand-type-specific coefficient from the literature (these vary meaningfully between conifer and broadleaf stands).
3. Drive a simple interception model (e.g. a Rutter- or Gash-type analytical model) with the resulting storage capacity and local rainfall intensity data.
4. Validate against any available throughfall measurements, even a short field campaign, before trusting catchment-scale outputs.

This is deliberately a starting point, not a finished pipeline — the coefficient choice in step 2 usually matters more than anything else in the workflow.
