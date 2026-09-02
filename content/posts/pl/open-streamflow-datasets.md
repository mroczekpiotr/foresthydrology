Zanim uruchomisz nowy monitoring terenowy, warto sprawdzić, czy pobliski wodowskaz nie ma już długiego, użytecznego zapisu danych. To krótki przewodnik po otwartych zbiorach danych hydrometeorologicznych, które najczęściej pojawiają się w pracach nad zlewniami leśnymi, oraz kontroli jakości, jakie warto przeprowadzić, zanim się na nich oprzesz.

## Przepływy

Krajowe służby hydrologiczne zwykle publikują dane z wodowskazów z najlepiej udokumentowanymi krzywymi natężenia przepływu i znanymi lukami danych, więc od tego warto zacząć. Tam, gdzie wygodniejsze jest globalne zestawienie — np. przy badaniach regionalnych lub transgranicznych — GRDC (Global Runoff Data Centre) agreguje dobowe i miesięczne przepływy z tysięcy stacji, choć opóźnienie aktualizacji i gęstość stacji znacznie różnią się między krajami.

W przypadku małych zlewni leśnych oficjalne sieci wodowskazów są często zbyt rzadkie — wiele zlewni górnych odcinków rzek po prostu nie jest monitorowanych. Zbiory danych z sieci badawczych (np. stanowisk długoterminowych badań ekologicznych, sieci lasów doświadczalnych) czasem wypełniają tę lukę, ale zasady licencjonowania i cytowania są różne, więc warto sprawdzić politykę wykorzystania danych, zanim zbuduje się wokół niej cały przebieg pracy.

## Opady

Produkty reanalizy siatkowej oraz łączące dane satelitarne z naziemnymi (np. ERA5-Land, CHIRPS) są wygodne, ale mają tendencję do niedoszacowywania opadów orograficznych i konwekcyjnych w skali małej zlewni górnej — czyli dokładnie tego typu zdarzeń, które napędzają przepływy szczytowe na stromym, zalesionym terenie. Tam gdzie to możliwe, warto zweryfikować dane względem najbliższej stacji naziemnej, nawet jeśli leży poza granicą zlewni.

## Kontrole jakości warte przeprowadzenia, zanim zaufasz zbiorowi danych

1. **Najpierw wykreśl surowy szereg czasowy.** Wyraźne luki, spłaszczone okresy czy nierealistyczne skoki łatwiej dostrzec wizualnie niż w statystykach podsumowujących.
2. **Sprawdź zakres ważności krzywej natężenia przepływu**, jeśli jest publikowany. Ekstrapolowane zależności stan-przepływ są najmniej wiarygodne przy szczytach powodziowych — czyli często wtedy, gdy najbardziej nam zależy na dokładności.
3. **Porównaj nakładające się okresy** między dwoma pobliskimi źródłami, jeśli są dostępne; systematyczne przesunięcia to użyteczny wczesny sygnał ostrzegawczy.
4. **Przeczytaj metadane pod kątem zmian użytkowania terenu lub infrastruktury** powyżej wodowskazu (zbiorniki retencyjne, przerzuty wody, urbanizacja), które mogą naruszyć założenie o stacjonarności zlewni.

Nic z tego nie zastąpi krótkiej wizyty terenowej, jeśli dane mają posłużyć do realnej decyzji zarządczej — ale pozwala wychwycić większość problemów, które inaczej ujawniłyby się dopiero znacznie później, gdy model zostanie już skalibrowany na złych danych wejściowych.
