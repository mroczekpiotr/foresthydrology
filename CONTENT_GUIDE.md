# Jak dodawać treści — Forest Hydrology

Strona nie wymaga żadnego budowania (build step). Dodanie nowej treści to zawsze:
**dodaj plik(i) → zaktualizuj jeden plik indeksu → wypchnij (`git push`) na GitHub.**

---

## 1. Dodawanie nowego artykułu

### Krok 1 — napisz treść w Markdown

Dla każdego języka, w którym masz gotowe tłumaczenie, utwórz plik:

```
content/posts/<lang>/<slug>.md
```

np. dla nowego artykułu o ewapotranspiracji w kategorii "Modelling":

```
content/posts/en/evapotranspiration-forest-stands.md
content/posts/pl/evapotranspiration-forest-stands.md
```

`<slug>` musi być **identyczny** we wszystkich językach (to on łączy tłumaczenia ze sobą) — używaj tylko małych liter, cyfr i myślników, bez polskich znaków ani spacji.

Plik `.md` zawiera **wyłącznie treść artykułu** (nagłówki `##`, akapity, listy, `**pogrubienia**`, cytaty `>`, bloki kodu ```` ``` ````). Tytuł, data i kategoria żyją w indeksie (krok 2), nie w pliku Markdown.

Jeśli tłumaczenie na dany język nie jest jeszcze gotowe — po prostu nie twórz tego pliku. Strona automatycznie pokaże komunikat "niedostępne w tym języku" z linkiem do dostępnych wersji.

### Krok 2 — dodaj wpis do indeksu

Otwórz `content/posts-index.json` i dodaj nowy obiekt na **początku** tablicy (kolejność w pliku nie ma znaczenia dla wyświetlania — strony i tak sortują po dacie, ale ułatwia to orientację):

```json
{
  "slug": "evapotranspiration-forest-stands",
  "category": "modelling",
  "date": "2026-09-10",
  "translations": {
    "en": { "available": true, "title": "Tytuł po angielsku", "excerpt": "Krótki opis, 1-2 zdania." },
    "pl": { "available": true, "title": "Tytuł po polsku", "excerpt": "Krótki opis, 1-2 zdania." },
    "es": { "available": false },
    "ja": { "available": false }
  }
}
```

**Ważne zasady:**
- `slug` musi dokładnie odpowiadać nazwom plików `.md` z kroku 1.
- `category` musi być jedną z: `gis`, `remote-sensing`, `modelling`, `data`, `webgis`.
- `date` w formacie `RRRR-MM-DD` — od niej zależy sortowanie "najnowsze artykuły".
- Dla języka, w którym nie masz jeszcze tłumaczenia, wpisz `{ "available": false }` — nic więcej.
- Gdy tłumaczenie będzie gotowe później: utwórz brakujący plik `.md` i zmień `available` na `true` + dodaj `title`/`excerpt`.

Uwaga: plik musi pozostać poprawnym JSON-em (przecinki między obiektami, cudzysłowy). Jeśli nie masz pewności — dowolny walidator JSON online pomoże wyłapać literówkę przed wypchnięciem zmian.

### Krok 3 — wypchnij zmiany

```
git add content/
git commit -m "Add: evapotranspiration-forest-stands"
git push
```

GitHub Pages nie wymaga żadnego budowania — strona aktualizuje się automatycznie po kilku dziesiątkach sekund od push.

---

## 2. Dodawanie tłumaczenia do istniejącego artykułu

1. Napisz `content/posts/<lang>/<ten-sam-slug>.md`.
2. W `content/posts-index.json` znajdź istniejący wpis o tym slugu i zmień odpowiednią sekcję językową na:
   ```json
   "es": { "available": true, "title": "...", "excerpt": "..." }
   ```
3. `git push`.

---

## 3. Edycja strony "O stronie" (About)

Treść tej strony to zwykły plik Markdown per język, bez wpisu w żadnym indeksie:

```
content/about/en.md
content/about/pl.md
content/about/es.md
content/about/ja.md
```

Edytuj bezpośrednio i wypchnij zmiany.

---

## 4. Zmiana tekstów interfejsu (nawigacja, etykiety, wprowadzenie na stronie głównej)

Wszystkie stałe teksty UI (nazwy kategorii, treść "hero" na stronie głównej, etykiety typu "Opublikowano", "Powrót do artykułów") żyją w:

```
content/en/site.json
content/pl/site.json
content/es/site.json
content/ja/site.json
```

Każdy plik ma tę samą strukturę pól — edytuj tylko wartości (teksty po prawej stronie dwukropka), nie nazwy pól.

---

## 5. Dodanie kolejnego języka w przyszłości (np. chińskiego)

1. Utwórz `content/zh/site.json` na bazie istniejącego pliku (przetłumacz wszystkie wartości).
2. Utwórz `content/about/zh.md`.
3. Dodaj `zh` do listy `LANGS` na początku `assets/js/main.js`.
4. Skopiuj folder `en/` jako `zh/` (te same 4 pliki HTML, nic w nich nie trzeba zmieniać poza atrybutem `lang="en"` → `lang="zh"`).
5. Stopniowo dodawaj tłumaczenia artykułów jak w punkcie 2.

Do czasu aż artykuł ma `"available": true` dla danego języka, strona sama pokaże czytelny komunikat i link do wersji dostępnych — nic się nie "wysypie".

---

## Struktura folderów — ściągawka

```
/
├── CNAME                          → domena (foresthydrology.com)
├── index.html                     → przekierowanie wg języka przeglądarki
├── assets/
│   ├── css/style.css              → wygląd strony
│   ├── js/main.js                 → cała logika (routing, ładowanie treści)
│   └── img/contours.svg           → grafika hero
├── content/
│   ├── en|pl|es|ja/site.json      → teksty interfejsu per język
│   ├── about/en|pl|es|ja.md       → treść strony "O stronie"
│   ├── posts-index.json           → METADANE wszystkich artykułów (źródło prawdy)
│   └── posts/en|pl|es|ja/*.md     → TREŚĆ artykułów, plik na artykuł na język
└── en|pl|es|ja/
    ├── index.html                 → strona główna
    ├── articles.html              → lista artykułów (+ ?category=gis itd.)
    ├── post.html                  → pojedynczy artykuł (?slug=...)
    └── about.html                 → strona "O stronie"
```

Pliki HTML w folderach językowych są identyczne dla wszystkich języków — nie trzeba ich edytować przy dodawaniu treści. Cała personalizacja dzieje się w `content/`.
