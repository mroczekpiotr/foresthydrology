Wyznaczenie granicy zlewni to zazwyczaj pierwszy krok w każdym badaniu hydrologii leśnej — zanim zaczniemy mówić o retencji koron drzew, infiltracji czy odpływie, musimy dokładnie wiedzieć, jaki fragment terenu odwadnia się do naszego punktu zainteresowania.

## Punkt wyjścia: NMT

Większość analiz zaczyna się od numerycznego modelu terenu (NMT). Dla zlewni górnych odcinków rzek rozdzielczość ma większe znaczenie niż zasięg: kafelek SRTM 30 m jest często zbyt gruby, by uchwycić małe cieki pierwszego rzędu pod okapem drzewostanu, podczas gdy NMT z LiDAR o rozdzielczości 1–5 m potrafi uchwycić subtelne formy terenu decydujące o kierunkach spływu.

Zanim cokolwiek wyznaczymy, warto wypełnić zagłębienia bezodpływowe i rozwiązać obszary płaskie. Niewypełnione depresje — często artefakty samego NMT, a nie realne cechy krajobrazu — psują dalszą akumulację przepływu.

## Kierunek i akumulacja spływu

Po hydrologicznym przygotowaniu NMT standardowa sekwencja wygląda następująco:

1. Obliczenie kierunku spływu (D8, D-infinity lub MFD, w zależności od tego, jak ważny jest dla nas rozproszony spływ na łagodnych stokach).
2. Obliczenie akumulacji spływu na podstawie siatki kierunków.
3. Progowanie siatki akumulacji w celu wyznaczenia sieci cieków.
4. Przyciągnięcie punktu zamykającego do najbliższej komórki o wysokiej akumulacji.
5. Wyznaczenie zlewni powyżej tego punktu zamykającego.

Pod gęstym drzewostanem drogi leśne i szlaki zrywkowe mogą na NMT z fotogrametrii wizualnie przypominać cieki — zawsze warto zweryfikować je względem NMT z LiDAR, który przenika przez korony drzew.

## Uwaga o lokalizacji punktu zamykającego

Niewielkie błędy w lokalizacji punktu zamykającego mogą prowadzić do nieproporcjonalnie dużych błędów w wyznaczonej powierzchni zlewni dla małych zlewni górskich odcinków, po prostu dlatego, że sieć cieków jest krótka i stroma. Przyciąganie do najbliższej komórki powyżej progu akumulacji spływu, zamiast do surowych współrzędnych, pozwala uniknąć większości takich błędów.

## Co dalej

Gdy masz już wiarygodną granicę zlewni, staje się ona jednostką przestrzenną dla wszystkiego innego na tej stronie — do niej przycinane są kompozycje teledetekcyjne, na niej agregowane są dane wejściowe modeli, a względem niej raportowane są dane z monitoringu.
