# Wdrożenie na GitHub Pages — foresthydrology.com

## 1. Utwórz repozytorium

Na GitHubie utwórz nowe, publiczne repozytorium, np. `foresthydrology`. Nie zaznaczaj opcji dodania README — wgrasz gotowe pliki.

## 2. Wypchnij pliki strony

W folderze z rozpakowaną zawartością tego archiwum:

```bash
git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin https://github.com/<twoja-nazwa>/foresthydrology.git
git push -u origin main
```

## 3. Włącz GitHub Pages

W repozytorium: **Settings → Pages**.
- **Source**: `Deploy from a branch`
- **Branch**: `main`, folder `/ (root)`
- Zapisz.

Po chwili GitHub poda adres tymczasowy typu `https://<twoja-nazwa>.github.io/foresthydrology/` — sprawdź, czy strona się wczytuje (może chwilę potrwać, kilka minut przy pierwszym wdrożeniu).

> Uwaga: dopóki nie podłączysz własnej domeny, niektóre linki wewnętrzne (zaczynające się od `/`, np. `/en/index.html`) mogą się nie zgadzać z podścieżką `/foresthydrology/` tego tymczasowego adresu. To normalne — po podłączeniu domeny własnej (krok 4) strona będzie serwowana z katalogu głównego i wszystko zadziała poprawnie. Jeśli chcesz to przetestować przed podłączeniem domeny, najprościej jest po prostu od razu przejść do kroku 4.

## 4. Podłącz domenę foresthydrology.com

Plik `CNAME` z treścią `foresthydrology.com` jest już w repozytorium — GitHub wykryje go automatycznie po pierwszym wdrożeniu.

### W panelu DNS Twojej domeny (u rejestratora domeny) dodaj:

Dla domeny głównej (`foresthydrology.com`) — 4 rekordy `A` wskazujące na adresy GitHub Pages:

```
A    @    185.199.108.153
A    @    185.199.109.153
A    @    185.199.110.153
A    @    185.199.111.153
```

Opcjonalnie, jeśli chcesz też `www.foresthydrology.com`:

```
CNAME    www    <twoja-nazwa>.github.io.
```

### W GitHub:

**Settings → Pages → Custom domain** → wpisz `foresthydrology.com` → Save.
Odczekaj, aż propagacja DNS się zakończy (od kilku minut do ~24h), a GitHub potwierdzi domenę zielonym haczykiem. Następnie zaznacz **Enforce HTTPS** (może pojawić się z opóźnieniem, aż GitHub wygeneruje certyfikat).

## 5. Sprawdź działanie

- `https://foresthydrology.com/` → powinno przekierować do `/en/index.html` (lub innego języka wg przeglądarki).
- Przełącznik języków (EN / PL / ES / JA) w prawym górnym rogu.
- Menu: Artykuły/Articles, GIS, Remote Sensing, Modelling, Data, WebGIS, About.

## 6. Codzienna praca — dodawanie treści

Zobacz `CONTENT_GUIDE.md` w repozytorium — każdy nowy artykuł czy tłumaczenie to tylko nowy plik `.md` + jeden wpis w `content/posts-index.json`, potem `git push`. Żadnego budowania, żadnych dodatkowych narzędzi.
