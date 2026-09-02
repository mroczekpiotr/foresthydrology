Retencja koron drzew — część opadu zatrzymywana i wyparowywana przez liście i gałęzie, zanim w ogóle dotrze do gleby — jest trudna do bezpośredniego pomiaru w większej skali. Naziemne pomiary przecieku koron dają wartości punktowe; satelitarne produkty wskaźnika powierzchni liściowej (LAI) pozwalają rozszerzyć te oszacowania na całe zlewnie.

## Dlaczego LAI to sensowne przybliżenie

Pojemność retencyjna koron drzew jest w pierwszym przybliżeniu proporcjonalna do powierzchni liści i gałęzi zdolnej zatrzymać wodę. Szeregi czasowe LAI z czujników takich jak MODIS czy produktów pochodnych Sentinel-2 śledzą rozwój koron w sezonie wegetacyjnym, co czyni je użytą zmienną objaśniającą w sezonowych modelach retencji — wysoką w pełni ulistnienia, niższą po opadnięciu liści w drzewostanach liściastych.

## Praktyczne zastrzeżenia

Kilka rzeczy wartych sprawdzenia, zanim zaufamy oszacowaniu retencji opartemu na LAI:

- **Nasycenie przy wysokim LAI.** Optyczne produkty LAI mają tendencję do nasycania powyżej LAI ≈ 5–6, typowego dla gęstych drzewostanów iglastych, co spłaszcza pozorną zależność od pojemności retencyjnej.
- **Piksele mieszane na granicach lasu.** Piksel MODIS o rozdzielczości 500 m obejmujący granicę zrębu zupełnego zwróci wartość LAI, która nie odzwierciedla dobrze żadnej z form pokrycia terenu — warto starannie przyciąć dane do maski zlewni.
- **Udział podszytu.** Produkty LAI zwykle mierzą całkowitą powierzchnię koron, nie tylko górnego piętra drzewostanu; w zlewniach z gęstym podszytem retencja przypisywana „lasowi" może obejmować warstwę krzewów o zupełnie innej dynamice magazynowania.

## Prosty schemat postępowania

1. Wyodrębnij bezchmurny kompozyt LAI dla zlewni dla każdego interesującego kroku czasowego.
2. Przelicz LAI na oszacowanie pojemności retencyjnej koron, stosując współczynnik specyficzny dla gatunku lub typu drzewostanu zaczerpnięty z literatury (różnią się one istotnie między drzewostanami iglastymi a liściastymi).
3. Zasil prosty model retencji (np. analityczny model typu Ruttera lub Gasha) uzyskaną pojemnością retencyjną i lokalnymi danymi o intensywności opadu.
4. Zweryfikuj wynik względem dostępnych pomiarów przecieku koron, choćby z krótkiej kampanii terenowej, zanim zaufasz wynikom w skali zlewni.

To celowo punkt wyjścia, a nie gotowy, zamknięty przebieg pracy — wybór współczynnika w kroku 2 zwykle ma większe znaczenie niż cokolwiek innego w tym schemacie.
