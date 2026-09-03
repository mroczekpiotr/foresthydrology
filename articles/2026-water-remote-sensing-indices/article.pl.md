# Indeksy teledetekcyjne wód i wilgotności: NDWI, MNDWI, NDMI i inne

Indeksy spektralne pozwalają przekształcić wielokanałowe obrazy satelitarne w zmienne, które łatwiej interpretować w analizach hydrologicznych. W przypadku lasów szczególnie interesujące są dwa różne zagadnienia: **wykrywanie otwartej wody** oraz **ocena uwodnienia roślinności i powierzchni**. Nie istnieje jeden uniwersalny indeks, który najlepiej działa w każdych warunkach.

## Najważniejsze indeksy

| Indeks | Wzór | Główne zastosowanie |
|---|---|---|
| **NDWI (McFeeters)** | (Green − NIR) / (Green + NIR) | wykrywanie wód powierzchniowych |
| **MNDWI** | (Green − SWIR) / (Green + SWIR) | woda, szczególnie przy problemie zabudowy i ciemnych powierzchni |
| **NDMI** | (NIR − SWIR) / (NIR + SWIR) | wilgotność roślinności / uwodnienie powierzchni |
| **LSWI** | (NIR − SWIR) / (NIR + SWIR) | wilgotność powierzchni lądowej i roślinności |
| **AWEIsh** | Blue + 2.5·Green − 1.5·(NIR + SWIR1) − 0.25·SWIR2 | woda przy obecności cieni |
| **AWEInsh** | 4·(Green − SWIR1) − (0.25·NIR + 2.75·SWIR1) | woda bez dominujących cieni |
| **WRI** | (Green + Red) / (NIR + SWIR) | detekcja wody |
| **WI2015** | 1.7204 + 171·G + 3·R − 70·NIR − 45·SWIR1 − 71·SWIR2 | klasyfikacja wody |
| **TCW** | Tasseled Cap Wetness | wilgotność i „mokrość” powierzchni |
| **NDPI** | (SWIR − Green) / (SWIR + Green) | alternatywna detekcja zbiorników wodnych |
| **NDSI** | (Green − SWIR) / (Green + SWIR) | przede wszystkim śnieg; nie jest klasycznym indeksem wodnym |

W literaturze spotyka się również warianty NDWI oraz kombinacje indeksów, np. regułę **MNDWI > 0 i NDVI < 0**, wykorzystywaną do rozdzielania wody od roślinności. citeturn0search0turn0search6

## NDWI — Normalized Difference Water Index

Klasyczny NDWI McFeetersa wykorzystuje pasma Green i NIR:

<div class="formula">(Green − NIR) / (Green + NIR)</div>

Woda ma relatywnie wysoką odpowiedź w paśmie zielonym i silnie absorbuje promieniowanie w NIR, dlatego NDWI może skutecznie podkreślać powierzchnie wodne. Jednocześnie zabudowa i niektóre ciemne powierzchnie mogą powodować problemy z klasyfikacją. citeturn0search6turn0search8

## MNDWI — Modified NDWI

MNDWI zastępuje NIR pasmem SWIR:

<div class="formula">(Green − SWIR) / (Green + SWIR)</div>

Jest szczególnie użyteczny wtedy, gdy trzeba poprawić separację wody od terenów zabudowanych. W badaniach porównawczych MNDWI jest jednym z najczęściej stosowanych indeksów do ekstrakcji powierzchni wodnych. citeturn0search1turn0search3

## NDMI — wilgotność roślinności

NDMI wykorzystuje NIR i SWIR:

<div class="formula">(NIR − SWIR) / (NIR + SWIR)</div>

W przeciwieństwie do NDWI McFeetersa NDMI nie powinien być traktowany po prostu jako „indeks otwartej wody”. Jest przede wszystkim czuły na zawartość wody w roślinności i wilgotność powierzchni. Dla Sentinel-2 często stosuje się B8A i B11, zależnie od przyjętej metodologii. citeturn0search7turn0search10

## AWEI — Automated Water Extraction Index

AWEI został opracowany jako indeks wykorzystujący kilka pasm i poprawiający detekcję wody w sytuacjach, w których proste indeksy mają problemy z cieniami i innymi ciemnymi powierzchniami. Występują warianty AWEIsh i AWEInsh. citeturn0search0turn0search2

## WI2015

WI2015 jest wielokanałowym indeksem zaprojektowanym do detekcji wody. Dla Sentinel-2 wykorzystuje Green, Red, NIR, SWIR1 i SWIR2. Warto pamiętać, że współczynniki i progi nie powinny być bezrefleksyjnie przenoszone pomiędzy sensorami i typami powierzchni. citeturn0search5turn0search14

## Co wybrać w lesie?

Dla **stawów, jezior, rzek i zalewów** dobrym punktem wyjścia są NDWI, MNDWI i AWEI. W terenach górskich lub silnie zacienionych warto szczególnie przetestować AWEI oraz porównać wynik z maską cieni.

Dla **wilgotności drzewostanu i stresu wodnego** bardziej odpowiednie są NDMI/LSWI niż klasyczny NDWI.

Dla **mokradeł i okresowo uwodnionych powierzchni** warto analizować jednocześnie MNDWI/AWEI, NDMI/LSWI oraz dane SAR. Sam próg jednego indeksu może być niestabilny między sezonami i typami siedlisk.

## Ważne: próg nie jest uniwersalny

Wartości indeksów zależą m.in. od sensora, korekcji atmosferycznej, rodzaju wody, mętności, roślinności, gleby, cieni i geometrii obserwacji. Dlatego próg np. 0 nie powinien być traktowany jako bezwarunkowa reguła dla każdego obszaru. Badania porównawcze pokazują, że skuteczność indeksów zależy od warunków terenowych i celu klasyfikacji. citeturn0search8turn0search14

## Dla ForestHydrology

Najciekawszym zastosowaniem będzie połączenie indeksów spektralnych z GIS: analiza zmian wilgotności w czasie, wykrywanie okresowego podtopienia, identyfikacja mokradeł, monitoring suszy oraz modelowanie podatności drzewostanów na stres wodny.

### Źródła

1. McFeeters, S.K. (1996) — The use of the Normalized Difference Water Index (NDWI) in the delineation of open water features. *International Journal of Remote Sensing*.
2. Xu, H. (2006) — Modification of normalised difference water index (NDWI) to enhance open water features in remotely sensed imagery. *International Journal of Remote Sensing*.
3. Feyisa, G.L. et al. (2014) — Automated Water Extraction Index: A new technique for surface water mapping using Landsat imagery. *Remote Sensing of Environment*.
4. Fisher et al. (2016) — Comparing Landsat water index methods for automated water classification. *Remote Sensing of Environment*.
5. Wilson & Sader — zastosowania NDMI w monitoringu wilgotności roślinności leśnej.
6. Przegląd metod detekcji wód powierzchniowych i porównania indeksów: literatura zestawiona w artykule. citeturn0search0turn0search14
