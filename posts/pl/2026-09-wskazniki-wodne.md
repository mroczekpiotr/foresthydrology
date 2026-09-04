---
title: "Wskaźniki wodne w teledetekcji: NDWI, NDMI, MNDWI, AWEI i inne"
date: "2026-09-04"
type: "REMOTE SENSING"
tags: "remote-sensing, water-indices, NDWI, NDMI, MNDWI, AWEI, Sentinel-2, Landsat"
---

Wskaźniki spektralne pozwalają przekształcić wielokanałowy obraz satelitarny w zmienną, którą łatwiej interpretować. W przypadku wody trzeba jednak uważać na nazewnictwo: **NDWI może oznaczać różne wzory zależnie od autora i zastosowania**.

## Najważniejsze wskaźniki

| Wskaźnik | Wzór | Zastosowanie |
|---|---|---|
| NDWI (McFeeters) | `(Green − NIR)/(Green + NIR)` | otwarta powierzchnia wody |
| NDMI / NDWI (Gao) | `(NIR − SWIR1)/(NIR + SWIR1)` | stan wodny roślinności |
| MNDWI | `(Green − SWIR1)/(Green + SWIR1)` | woda powierzchniowa, szczególnie przy zabudowie |
| LSWI | `(NIR − SWIR1)/(NIR + SWIR1)` | stan wodny powierzchni i roślinności |
| AWEI<sub>nsh</sub> | `4(Green−SWIR1) − (0.25NIR + 2.75SWIR2)` | ekstrakcja wody bez silnych cieni |
| AWEI<sub>sh</sub> | `Blue + 2.5Green − 1.5(NIR+SWIR1) − 0.25SWIR2` | ekstrakcja wody w obecności cieni |
| WI<sub>2015</sub> | `1.7204 + 171Green + 3Red − 70NIR − 45SWIR1 − 71SWIR2` | wielokanałowe wykrywanie wody |
| WRI | `(Green + Red)/(NIR + SWIR1)` | prosta detekcja wody |
| NDPI | `(SWIR1 − Green)/(SWIR1 + Green)` | wykrywanie wody, zastosowanie zależne od sensora |
| TCW | Tasseled Cap Wetness | wilgotność powierzchni |

Przeglądy literatury pokazują, że dobór wskaźnika powinien zależeć od celu analizy: otwarta woda, wilgotność roślin, gleba, mokradła czy woda w terenie zurbanizowanym to różne problemy teledetekcyjne.

## NDWI — dwie różne definicje

Klasyczny NDWI McFeetersa wykorzystuje Green i NIR do podkreślenia otwartej wody. Natomiast wskaźnik zaproponowany przez Gao wykorzystuje NIR i SWIR i opisuje zawartość wody w roślinności. W wielu współczesnych pracach drugi z nich nazywany jest NDMI.

## NDMI — szczególnie interesujący dla lasów

NDMI reaguje na stan wodny roślinności i może być wykorzystywany do analiz stresu wodnego, zmian sezonowych i wpływu suszy. Nie należy jednak utożsamiać wartości NDMI bezpośrednio z objętościową wilgotnością gleby — jest to wskaźnik sygnału spektralnego roślinności.

## MNDWI i AWEI

MNDWI zastępuje NIR pasmem SWIR i często lepiej oddziela wodę od zabudowy oraz części innych klas pokrycia terenu. AWEI został zaprojektowany tak, aby poprawić separację wody od powierzchni problematycznych, w tym cieni.

## Sentinel-2 i Landsat

| Sensor | Green | Red | NIR | SWIR1 | SWIR2 |
|---|---|---|---|---|---|
| Sentinel-2 MSI | B3 | B4 | B8 | B11 | B12 |
| Landsat 8/9 OLI | B3 | B4 | B5 | B6 | B7 |

Dla Sentinel-2 trzeba pamiętać, że B3, B4 i B8 mają 10 m, a B11 i B12 20 m. W analizie należy opisać zastosowaną metodę resamplingu.

## Wskaźnik to nie klasyfikator

Sam indeks nie mówi jeszcze, że piksel jest wodą. Najczęściej potrzebny jest próg zależny od sceny, sensora, mętności, cieni i sąsiednich klas pokrycia terenu. Dlatego dobrą praktyką jest porównanie kilku wskaźników na danych referencyjnych i ocena błędów klasyfikacji.

### Źródła

- Huang et al. (2018), *Detecting, Extracting, and Monitoring Surface Water From Space Using Optical Sensors: A Review*, Reviews of Geophysics.
- Xu (2006), *Modification of normalised difference water index (NDWI) to enhance open water features in remotely sensed imagery*.
- Feyisa et al. (2014), *Automated Water Extraction Index*.
- Fisher et al. (2016), *Comparing Landsat water index methods for automated water body classification*.
