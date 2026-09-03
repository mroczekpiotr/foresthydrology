# Índices de teledetección para agua y humedad: NDWI, MNDWI, NDMI y otros

Los índices espectrales convierten las imágenes satelitales multiespectrales en variables más fáciles de interpretar en análisis hidrológicos. En los bosques son especialmente importantes dos cuestiones: **detectar agua superficial** y **evaluar la humedad de la vegetación y de la superficie**. No existe un único índice que funcione mejor en todas las condiciones.

## Índices principales

| Índice | Fórmula | Aplicación principal |
|---|---|---|
| **NDWI (McFeeters)** | (Green − NIR) / (Green + NIR) | detección de aguas superficiales |
| **MNDWI** | (Green − SWIR) / (Green + SWIR) | detección de agua y reducción del ruido urbano |
| **NDMI** | (NIR − SWIR) / (NIR + SWIR) | humedad de la vegetación / contenido de agua superficial |
| **LSWI** | (NIR − SWIR) / (NIR + SWIR) | humedad de la superficie y de la vegetación |
| **AWEIsh** | Blue + 2.5·Green − 1.5·(NIR + SWIR1) − 0.25·SWIR2 | agua en escenas con sombras |
| **AWEInsh** | 4·(Green − SWIR1) − (0.25·NIR + 2.75·SWIR1) | agua sin sombras dominantes |
| **WRI** | (Green + Red) / (NIR + SWIR) | detección de agua |
| **WI2015** | 1.7204 + 171·G + 3·R − 70·NIR − 45·SWIR1 − 71·SWIR2 | clasificación del agua |
| **TCW** | Tasseled Cap Wetness | humedad de la superficie |
| **NDPI** | (SWIR − Green) / (SWIR + Green) | detección alternativa de masas de agua |
| **NDSI** | (Green − SWIR) / (Green + SWIR) | principalmente nieve; no es un índice hídrico clásico |

También se utilizan variantes del NDWI y combinaciones como **MNDWI > 0 y NDVI < 0** para separar el agua de la vegetación. citeturn0search0turn0search6

## NDWI

El NDWI clásico de McFeeters utiliza Green y NIR:

<div class="formula">(Green − NIR) / (Green + NIR)</div>

El agua presenta una respuesta relativamente alta en el verde y una fuerte absorción en NIR. Sin embargo, las superficies urbanas y otras superficies oscuras pueden generar errores. citeturn0search6turn0search8

## MNDWI

MNDWI sustituye NIR por SWIR:

<div class="formula">(Green − SWIR) / (Green + SWIR)</div>

Es especialmente útil cuando se necesita mejorar la separación entre agua y superficies construidas. citeturn0search1turn0search3

## NDMI

NDMI utiliza NIR y SWIR:

<div class="formula">(NIR − SWIR) / (NIR + SWIR)</div>

A diferencia del NDWI de McFeeters, NDMI no debe interpretarse simplemente como un índice de agua abierta. Es principalmente sensible al contenido de agua de la vegetación y a la humedad superficial. citeturn0search7turn0search10

## AWEI y WI2015

AWEI combina varias bandas y fue diseñado para mejorar la detección de agua frente a sombras y otras superficies oscuras. WI2015 es otro índice multibanda para la detección de agua. Sus coeficientes y umbrales no deberían transferirse automáticamente entre sensores y ambientes. citeturn0search0turn0search5

## ¿Qué índice utilizar en los bosques?

Para **lagos, ríos, estanques y zonas inundadas**, NDWI, MNDWI y AWEI son buenos puntos de partida.

Para **humedad del bosque y estrés hídrico**, NDMI/LSWI suelen ser más adecuados.

Para **humedales y superficies inundadas estacionalmente**, conviene combinar MNDWI/AWEI con NDMI/LSWI y datos SAR.

## Los umbrales no son universales

Los valores dependen del sensor, la corrección atmosférica, la turbidez, la vegetación, el suelo, las sombras y la geometría de observación. Por tanto, un umbral de 0 no debe tratarse como una regla universal. citeturn0search8turn0search14

## ForestHydrology

Una línea especialmente interesante es combinar estos índices con SIG para analizar series temporales de humedad, inundaciones estacionales, humedales, sequía y vulnerabilidad de los bosques al estrés hídrico.
