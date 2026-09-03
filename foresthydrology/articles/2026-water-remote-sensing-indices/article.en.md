# Remote-sensing indices for water and moisture: NDWI, MNDWI, NDMI and more

Spectral indices transform multispectral satellite imagery into variables that are easier to interpret in hydrological analyses. In forests, two different questions are especially important: **detecting open water** and **assessing vegetation and surface moisture**. There is no single index that performs best under every condition.

## Key indices

| Index | Formula | Main application |
|---|---|---|
| **NDWI (McFeeters)** | (Green − NIR) / (Green + NIR) | surface-water detection |
| **MNDWI** | (Green − SWIR) / (Green + SWIR) | water detection, especially where built-up surfaces are problematic |
| **NDMI** | (NIR − SWIR) / (NIR + SWIR) | vegetation moisture / surface water content |
| **LSWI** | (NIR − SWIR) / (NIR + SWIR) | land-surface and vegetation moisture |
| **AWEIsh** | Blue + 2.5·Green − 1.5·(NIR + SWIR1) − 0.25·SWIR2 | water detection in shadow-prone scenes |
| **AWEInsh** | 4·(Green − SWIR1) − (0.25·NIR + 2.75·SWIR1) | water detection without dominant shadows |
| **WRI** | (Green + Red) / (NIR + SWIR) | water detection |
| **WI2015** | 1.7204 + 171·G + 3·R − 70·NIR − 45·SWIR1 − 71·SWIR2 | water classification |
| **TCW** | Tasseled Cap Wetness | surface wetness |
| **NDPI** | (SWIR − Green) / (SWIR + Green) | alternative pond/water detection |
| **NDSI** | (Green − SWIR) / (Green + SWIR) | primarily snow; not a conventional water index |

Variants of NDWI and combinations such as **MNDWI > 0 and NDVI < 0** are also used to separate water from vegetation. citeturn0search0turn0search6

## NDWI — Normalized Difference Water Index

The classic McFeeters NDWI uses Green and NIR:

<div class="formula">(Green − NIR) / (Green + NIR)</div>

Water generally has relatively higher reflectance in green wavelengths and strong absorption in NIR, allowing NDWI to highlight open water. Built-up areas and some dark surfaces can nevertheless create classification problems. citeturn0search6turn0search8

## MNDWI — Modified NDWI

MNDWI replaces NIR with SWIR:

<div class="formula">(Green − SWIR) / (Green + SWIR)</div>

It is particularly useful when improving the separation of water from built-up land is important. citeturn0search1turn0search3

## NDMI — vegetation moisture

NDMI uses NIR and SWIR:

<div class="formula">(NIR − SWIR) / (NIR + SWIR)</div>

Unlike McFeeters' NDWI, NDMI should not simply be interpreted as an open-water index. It is mainly sensitive to vegetation water content and surface moisture. For Sentinel-2, B8A and B11 are often used depending on the methodology. citeturn0search7turn0search10

## AWEI — Automated Water Extraction Index

AWEI combines several spectral bands and was designed to improve water detection when simple indices struggle with shadows and other dark surfaces. AWEIsh and AWEInsh variants are commonly used. citeturn0search0turn0search2

## WI2015

WI2015 is a multi-band water-detection index using Green, Red, NIR, SWIR1 and SWIR2. Its coefficients and thresholds should not be transferred blindly between sensors and environments. citeturn0search5turn0search14

## Which index for forests?

For **ponds, lakes, rivers and inundated areas**, NDWI, MNDWI and AWEI are good starting points. In mountainous or strongly shaded terrain, AWEI should be tested and compared with a shadow mask.

For **forest moisture and water stress**, NDMI/LSWI are generally more appropriate than classic NDWI.

For **wetlands and seasonally inundated areas**, it is useful to combine MNDWI/AWEI with NDMI/LSWI and SAR data. A single fixed threshold can be unstable across seasons and habitat types.

## An important caveat: thresholds are not universal

Index values depend on the sensor, atmospheric correction, water type, turbidity, vegetation, soil, shadows and observation geometry. A threshold such as 0 should therefore not be treated as a universal rule. Comparative studies show that index performance depends strongly on the environment and classification objective. citeturn0search8turn0search14

## ForestHydrology perspective

A particularly useful direction is to combine spectral indices with GIS: time-series moisture analysis, seasonal inundation mapping, wetland identification, drought monitoring and modelling of forest vulnerability to water stress.

### References

1. McFeeters, S.K. (1996) — The use of the Normalized Difference Water Index (NDWI) in the delineation of open water features.
2. Xu, H. (2006) — Modification of normalised difference water index (NDWI) to enhance open water features.
3. Feyisa, G.L. et al. (2014) — Automated Water Extraction Index.
4. Fisher et al. (2016) — Comparing Landsat water index methods for automated water classification.
