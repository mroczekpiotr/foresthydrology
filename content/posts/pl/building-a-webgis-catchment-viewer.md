Publikowanie w sieci granic zlewni, lokalizacji wodowskazów i statusu stacji monitoringu nie wymaga pełnego stosu serwera GIS. Dla małego serwisu badawczego statyczna przeglądarka WebGIS działająca po stronie klienta zwykle w zupełności wystarczy — i wdraża się ją tak samo jak resztę tej strony: jako zwykłe pliki na GitHub Pages.

## Minimalny zestaw narzędzi

- **Leaflet** do samej mapy — lekki, z niewielką liczbą zależności i dobrze udokumentowany.
- **GeoJSON** dla granic zlewni i lokalizacji stacji, wyeksportowany raz z oprogramowania GIS i zapisany jako pliki statyczne.
- **Dostawca kafelków mapy bazowej** z hojnym darmowym pakietem (sprawdź limity użycia, zanim oprzesz na nim publiczną stronę).

Nie jest potrzebny żaden komponent serwerowy. Cała część „GIS" dzieje się wcześniej, w QGIS lub podobnym programie, a strona internetowa jedynie renderuje wyniki.

## Struktura

```
webgis/
  index.html
  catchments.geojson
  stations.geojson
  style.js
```

Mapa inicjalizuje się z poligonami zlewni stylizowanymi według prostego atrybutu (np. dominujący typ lasu), a znaczniki stacji kolorowane są według aktualnego statusu, jeśli pobierasz go z aktywnego źródła danych. Jeśli status stacji musi się aktualizować bez ponownego wdrożenia strony, skieruj zapytanie do niewielkiego, kontrolowanego przez siebie endpointu JSON, zamiast zapisywać status na stałe w statycznym pliku GeoJSON — dzięki temu wdrożenie mapy pozostaje statyczne, a dane są aktualne.

## Jak utrzymać to w porządku

- Trzymaj jeden plik GeoJSON na warstwę, a nie jeden gigantyczny plik zbiorczy — dzięki temu różnice (diff) w kontroli wersji są naprawdę czytelne, gdy zmienia się jakaś granica.
- Uprość geometrię poligonów przed eksportem. Granica zlewni zdigitalizowana z NMT LiDAR o rozdzielczości 1 m ma znacznie więcej wierzchołków, niż potrzebuje mapa internetowa; uproszczenie istotnie zmniejsza rozmiar pliku bez widocznej różnicy przy typowych poziomach powiększenia.
- Udokumentuj układ współrzędnych w README. Błędy reprojekcji to najczęstsza przyczyna zgłoszeń typu „mapa jest pusta".

Taki zestaw skaluje się zaskakująco daleko jak na stronę badawczą — znacznie dalej niż punkt, w którym większość projektów zakłada, że potrzebuje bazy danych i API.
