# Fernerkundungsindizes für Wasser und Feuchte: NDWI, MNDWI, NDMI und weitere

Spektralindizes wandeln multispektrale Satellitenbilder in Variablen um, die in hydrologischen Analysen leichter interpretiert werden können. Für Wälder sind insbesondere zwei Fragen wichtig: **die Erkennung offener Wasserflächen** und **die Bewertung der Feuchte von Vegetation und Oberfläche**. Es gibt keinen einzelnen Index, der unter allen Bedingungen am besten funktioniert.

## Wichtige Indizes

| Index | Formel | Hauptanwendung |
|---|---|---|
| **NDWI (McFeeters)** | (Green − NIR) / (Green + NIR) | Erkennung von Oberflächengewässern |
| **MNDWI** | (Green − SWIR) / (Green + SWIR) | Wassererkennung, insbesondere gegenüber bebauten Flächen |
| **NDMI** | (NIR − SWIR) / (NIR + SWIR) | Vegetationsfeuchte / Wassergehalt der Oberfläche |
| **LSWI** | (NIR − SWIR) / (NIR + SWIR) | Feuchte von Landoberfläche und Vegetation |
| **AWEIsh** | Blue + 2.5·Green − 1.5·(NIR + SWIR1) − 0.25·SWIR2 | Wassererkennung bei Schatten |
| **AWEInsh** | 4·(Green − SWIR1) − (0.25·NIR + 2.75·SWIR1) | Wassererkennung ohne dominante Schatten |
| **WRI** | (Green + Red) / (NIR + SWIR) | Wassererkennung |
| **WI2015** | 1.7204 + 171·G + 3·R − 70·NIR − 45·SWIR1 − 71·SWIR2 | Wasserklassifikation |
| **TCW** | Tasseled Cap Wetness | Oberflächenfeuchte |
| **NDPI** | (SWIR − Green) / (SWIR + Green) | alternative Erkennung von Wasserflächen |
| **NDSI** | (Green − SWIR) / (Green + SWIR) | hauptsächlich Schnee; kein klassischer Wasserindex |

Auch Varianten von NDWI und Kombinationen wie **MNDWI > 0 und NDVI < 0** werden verwendet, um Wasser von Vegetation zu trennen. citeturn0search0turn0search6

## NDWI

Der klassische NDWI nach McFeeters verwendet Green und NIR:

<div class="formula">(Green − NIR) / (Green + NIR)</div>

Wasser weist im grünen Spektralbereich relativ höhere Reflexion und im NIR eine starke Absorption auf. Bebauung und andere dunkle Oberflächen können jedoch zu Fehlklassifikationen führen. citeturn0search6turn0search8

## MNDWI

MNDWI ersetzt NIR durch SWIR:

<div class="formula">(Green − SWIR) / (Green + SWIR)</div>

Der Index ist besonders hilfreich, wenn Wasser besser von bebauten Flächen getrennt werden soll. citeturn0search1turn0search3

## NDMI

NDMI verwendet NIR und SWIR:

<div class="formula">(NIR − SWIR) / (NIR + SWIR)</div>

Im Gegensatz zum NDWI nach McFeeters sollte NDMI nicht einfach als Index für offene Wasserflächen interpretiert werden. Er reagiert vor allem auf den Wassergehalt der Vegetation und die Oberflächenfeuchte. citeturn0search7turn0search10

## AWEI und WI2015

AWEI kombiniert mehrere Bänder und wurde entwickelt, um die Wassererkennung bei Schatten und anderen dunklen Oberflächen zu verbessern. WI2015 ist ein weiterer multibandiger Wasserindex. Koeffizienten und Schwellenwerte sollten nicht unkritisch zwischen Sensoren und Umgebungen übertragen werden. citeturn0search0turn0search5

## Welcher Index für Wälder?

Für **Seen, Flüsse, Teiche und Überflutungsflächen** sind NDWI, MNDWI und AWEI gute Ausgangspunkte.

Für **Waldfeuchte und Wasserstress** sind NDMI/LSWI in der Regel geeigneter.

Für **Feuchtgebiete und saisonal überflutete Flächen** ist eine Kombination aus MNDWI/AWEI, NDMI/LSWI und SAR-Daten sinnvoll.

## Schwellenwerte sind nicht universell

Die Indexwerte hängen unter anderem von Sensor, atmosphärischer Korrektur, Trübung, Vegetation, Boden, Schatten und Beobachtungsgeometrie ab. Ein Schwellenwert von 0 sollte deshalb nicht als universelle Regel verstanden werden. citeturn0search8turn0search14

## ForestHydrology

Besonders interessant ist die Kombination dieser Indizes mit GIS für Zeitreihenanalysen der Feuchte, saisonale Überflutungen, Feuchtgebiete, Dürremonitoring und die Modellierung der Anfälligkeit von Wäldern gegenüber Wasserstress.
