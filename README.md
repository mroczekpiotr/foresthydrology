# ForestHydrology.com

Wielojęzyczna (PL / EN / ES / DE), w pełni statyczna strona naukowo-popularna
o hydrologii leśnej. Repozytorium buduje gotowy serwis HTML w `dist/` i
wdraża go automatycznie na GitHub Pages przy każdym pushu do `main`.

- **Adres tymczasowy (GitHub Pages):** https://mroczekpiotr.github.io/foresthydrology/
- **Docelowy adres:** https://foresthydrology.com/ (domena na OVH — patrz sekcja
  [Podłączenie domeny](#podłączenie-własnej-domeny-ovh) poniżej)

## Jak to działa

- Treść artykułów jest źródłowo pisana **po polsku** w plikach
  `articles/<slug>/article.pl.md`.
- Przy każdym pushu do `main` GitHub Actions (`.github/workflows/deploy.yml`)
  uruchamia `scripts/translate.js`, który za pomocą API OpenAI **automatycznie
  tłumaczy brakujące wersje** artykułu na angielski, hiszpański i niemiecki —
  i zapisuje je jako `article.en.md`, `article.es.md`, `article.de.md` w tym
  samym folderze, commitując je z powrotem do repozytorium.
- Istniejące już pliki tłumaczeń **nigdy nie są nadpisywane** — jeśli chcesz
  poprawić tłumaczenie ręcznie, po prostu edytuj dany plik `.md`; automat go
  nie tknie, dopóki go nie usuniesz.
- Następnie `scripts/build.js` generuje statyczny serwis do `dist/` (strony
  główne, listy artykułów, pojedyncze artykuły, stronę „O projekcie” i
  „Kontakt” — dla każdego z 4 języków) i workflow wdraża `dist/` na GitHub
  Pages.

Cały generator jest napisany w czystym Node.js (bez zależności npm), więc
`npm install` nic nie musi pobierać.

## Struktura repozytorium

```
articles/<slug>/article.pl.md      źródłowy artykuł (polski, wymagany)
articles/<slug>/article.en.md      tłumaczenie EN (tworzone automatycznie lub ręcznie)
articles/<slug>/article.es.md      tłumaczenie ES
articles/<slug>/article.de.md      tłumaczenie DE
content/site/strings.<lang>.json   teksty interfejsu (nawigacja, stopka, strona "O projekcie" itd.)
assets/css/style.css               style całej strony
assets/img/                        logo, favicon, grafika hero, ikony
scripts/md.js                      mini-parser Markdown → HTML (bez zależności)
scripts/build.js                   generator statycznej strony (→ dist/)
scripts/translate.js               tłumaczenie artykułów przez API OpenAI (używane w CI)
.github/workflows/deploy.yml       build + tłumaczenie + wdrożenie na GitHub Pages
```

## Dodawanie nowego artykułu

1. Utwórz folder `articles/<nazwa-artykulu>/`.
2. Dodaj w nim plik `article.pl.md` z nagłówkiem (front matter) i treścią, np.:

   ```markdown
   ---
   title: Tytuł artykułu
   description: Krótki opis (1–2 zdania) używany na liście artykułów i w meta description.
   date: 2026-09-01
   tags: tag1, tag2
   topic: quality
   ---

   Treść artykułu w Markdown...
   ```

   Pole `topic` przyjmuje jedną z wartości: `interception`, `quality`, `snow`,
   `climate` (decyduje o ikonie i etykiecie tematu).

3. Zrób commit i push do `main`. GitHub Actions automatycznie:
   - przetłumaczy artykuł na EN/ES/DE (jeśli ustawiony jest sekret
     `OPENAI_API_KEY`),
   - zbuduje stronę,
   - wdroży ją na GitHub Pages.

Jeśli wolisz przygotować tłumaczenia ręcznie, po prostu dodaj od razu pliki
`article.en.md` / `article.es.md` / `article.de.md` — automatyczne tłumaczenie
pominie języki, które już istnieją.

## Podgląd lokalny

```bash
npm run build
npm run serve
```

Otwórz http://localhost:8000. `npm run build` czyści i odtwarza folder
`dist/`; `npm run serve` uruchamia prosty serwer statyczny (wymaga Python 3 —
możesz też użyć dowolnego innego serwera plików statycznych).

Aby ręcznie przetestować tłumaczenie (wymaga klucza API OpenAI):

```bash
OPENAI_API_KEY=sk-... npm run translate
npm run build
```

## Konfiguracja GitHub Pages (pierwsze uruchomienie)

1. W ustawieniach repozytorium: **Settings → Pages → Build and deployment →
   Source** ustaw **GitHub Actions**.
2. W **Settings → Secrets and variables → Actions** dodaj sekret
   `OPENAI_API_KEY` z kluczem do API OpenAI (opcjonalnie — bez niego strona
   nadal się zbuduje, po prostu nowe artykuły nie będą tłumaczone
   automatycznie, dopóki nie dodasz plików `.en.md` / `.es.md` / `.de.md`
   ręcznie).
3. Zrób push do `main` — workflow zbuduje i wdroży stronę pod
   `https://mroczekpiotr.github.io/foresthydrology/`.

Klucz API jest używany wyłącznie przez GitHub Actions (po stronie serwera) i
nigdy nie trafia do kodu strony ani do przeglądarki użytkownika.

## Podłączenie własnej domeny (OVH)

Gdy będziesz gotów/gotowa przenieść stronę pod `foresthydrology.com`:

1. **Dodaj plik `CNAME`** w katalogu głównym repozytorium z jedną linią:
   `foresthydrology.com`. `scripts/build.js` sam wykrywa ten plik i kopiuje go
   do `dist/`, więc nic więcej nie trzeba zmieniać w kodzie.
2. W panelu OVH (strefa DNS domeny `foresthydrology.com`) skonfiguruj:
   - rekord **A** dla `@` (apex domeny) wskazujący na adresy IP GitHub Pages:
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`,
   - rekord **CNAME** dla `www` wskazujący na `mroczekpiotr.github.io.`
3. W **Settings → Pages** repozytorium wpisz `foresthydrology.com` jako
   Custom domain i zaczekaj na weryfikację DNS, następnie zaznacz **Enforce
   HTTPS**.
4. Zmień w `.github/workflows/deploy.yml` wartość zmiennej `SITE_URL` na
   `https://foresthydrology.com/` (używana jest tylko do generowania
   adresów kanonicznych, `hreflang` i `sitemap.xml` — linki wewnętrzne strony
   są już względne i zadziałają pod dowolnym adresem bez zmian).

Propagacja DNS w OVH trwa zwykle od kilku minut do kilku godzin.

## Języki i tłumaczenia w interfejsie

Teksty interfejsu (menu, stopka, strona "O projekcie", komunikaty) znajdują
się w `content/site/strings.<lang>.json` — edytuj je bezpośrednio, aby
poprawić copy strony w danym języku.

## Licencja treści

Treści naukowe publikowane są w celach edukacyjnych. Przy publikacji
artykułów opartych na konkretnych badaniach warto dodawać odnośniki do
źródeł w treści artykułu (Markdown: `[opis](URL)`).
