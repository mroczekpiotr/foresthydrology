Wybór struktury modelu opad-odpływ dla małej zlewni leśnej zwykle sprowadza się do kompromisu między dostępnością danych a pytaniami, na jakie faktycznie trzeba odpowiedzieć. Poniżej krótkie porównanie struktur zlewiowych (lumped) i semi-rozproszonych na trzech zlewniach górnych odcinków rzek o różnej lesistości.

## Trzy zlewnie

- **Zlewnia A** — 4,2 km², ok. 90% pokrycia iglastego, teren stromy.
- **Zlewnia B** — 6,8 km², las mieszany z pastwiskami (ok. 55% lesistości), umiarkowana rzeźba terenu.
- **Zlewnia C** — 3,1 km², niedawno przerzedzony drzewostan iglasty, łagodne stoki.

## Modele zlewiowe (lumped)

Prosty model konceptualny (pojedyncze zbiorniki retencyjne, dane wymuszające uśrednione dla zlewni) sprawdził się nieźle dla zlewni A, gdzie pokrycie leśne jest niemal jednolite, a teren nie tworzy silnych gradientów przestrzennych opadu ani promieniowania. Kalibracja przebiegała szybko, a identyfikowalność parametrów była dobra.

W przypadku zlewni B model zlewiowy miał trudności z odtworzeniem dwuszczytowego hydrogramu typowego dla burz, podczas których deszcz pada jednocześnie na obszar leśny i otwarte pastwisko — model nie ma sposobu na przedstawienie różnych czasów odpowiedzi dwóch form pokrycia terenu.

## Modele semi-rozproszone

Podzielenie zlewni B na podjednostki leśne i pastwiskowe, każdą z własnymi parametrami retencji i routingu, rozwiązało większość problemu z dwoma szczytami, kosztem dłuższego procesu kalibracji i realnego ryzyka nadmiernej parametryzacji przy ograniczonym zapisie przepływów dostępnym do walidacji.

Dla zlewni C struktura semi-rozproszona okazała się przydatna z innego powodu: pozwoliła przedstawić przerzedzony drzewostan jako odrębną podjednostkę z innymi parametrami retencji i ewapotranspiracji, co miało znaczenie, ponieważ przerzedzenie nastąpiło w połowie okresu obserwacji.

## Wnioski

- Zacznij od modelu zlewiowego. Strukturę przestrzenną dodawaj tylko tam, gdzie masz konkretną hipotezę wyjaśniającą, dlaczego odpowiedź różni się w obrębie zlewni (zmiana pokrycia terenu, silny gradient wysokościowy, mieszane użytkowanie terenu).
- Każda dodana podjednostka to dodatkowe parametry. Sprawdź identyfikowalność, zanim zaufasz skalibrowanym wartościom, szczególnie przy krótkich zapisach przepływów.
- Zmiana użytkowania terenu w trakcie okresu obserwacji (przerzedzenie, zrąb, szkody po burzy) to jeden z najsilniejszych argumentów za strukturą semi-rozproszoną, nawet w skądinąd jednorodnych zlewniach.
