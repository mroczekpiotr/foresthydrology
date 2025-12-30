#!/usr/bin/env bash
set -euo pipefail

# create_scaffold_zip.sh
# Generuje szkielet Hugo dla foresthydrology.com i pakuje go do foresthydrology-scaffold.zip
#
# Użycie:
# 1) zapisz plik jako create_scaffold_zip.sh
# 2) chmod +x create_scaffold_zip.sh
# 3) ./create_scaffold_zip.sh
#
# Wynik: foresthydrology-scaffold.zip w bieżącym katalogu

OUT_ZIP="foresthydrology-scaffold.zip"
TMPDIR="$(mktemp -d)"
SCAFFOLD_DIR="${TMPDIR}/foresthydrology-site"

echo "Tworzę szkic w ${SCAFFOLD_DIR} ..."

mkdir -p "${SCAFFOLD_DIR}"
cd "${SCAFFOLD_DIR}"

# config.toml
cat > config.toml <<'EOF'
baseURL = "https://foresthydrology.com/"
languageCode = "pl-PL"
title = "Forest Hydrology"
theme = ""
paginate = 10

[params]
  author = "Forest Hydrology Team"
  description = "Badania i zasoby dotyczące hydrologii leśnej"
  favicon = "/images/logo.svg"

[taxonomies]
  tag = "tags"
  category = "categories"

[permalinks]
  posts = "/blog/:year/:month/:slug/"
EOF

# katalogi
mkdir -p archetypes content/posts layouts/_default layouts/partials layouts/shortcodes static/css static/images .github/workflows

# archetypes/default.md
cat > archetypes/default.md <<'EOF'
+++
title = "{{ replace .Name "-" " " | title }}"
date = {{ .Date }}
draft = true
tags = []
categories = []
+++
EOF

# content
cat > content/_index.md <<'EOF'
+++
title = "Forest Hydrology"
date = 2025-12-30T00:00:00+01:00
draft = false
description = "Witamy na stronie poświęconej hydrologii leśnej — badania, dane, publikacje i narzędzia."
+++

Witamy na stronie projektu Forest Hydrology. Znajdziesz tu artykuły, zasoby i przykłady zastosowań.
EOF

cat > content/about.md <<'EOF'
+++
title = "O projekcie"
date = 2025-12-30T00:00:00+01:00
draft = false
+++

Projekt Forest Hydrology zajmuje się badaniem procesów hydrologicznych w ekosystemach leśnych.
Naszym celem jest udostępnianie wyników badań, narzędzi i danych.
EOF

cat > content/posts/hello-world.md <<'EOF'
+++
title = "Wprowadzenie do Forest Hydrology"
date = 2025-12-30T10:00:00+01:00
draft = false
tags = ["intro","hydrology"]
categories = ["wprowadzenie"]
+++

To jest pierwszy wpis na stronie Forest Hydrology. Tutaj opiszemy cele projektu, przykładowe dane i dalsze kroki.
EOF

# layouts i partials
cat > layouts/_default/baseof.html <<'EOF'
<!doctype html>
<html lang="{{ .Site.LanguageCode }}">
  <head>
    {{ partial "head.html" . }}
  </head>
  <body>
    {{ partial "header.html" . }}
    <main class="site-main">
      {{ block "main" . }}{{ end }}
    </main>
    {{ partial "footer.html" . }}
  </body>
</html>
EOF

cat > layouts/index.html <<'EOF'
{{ define "main" }}
  <section class="hero">
    <div class="wrap">
      <h1>{{ .Site.Title }}</h1>
      <p>{{ with .Site.Params.description }}{{ . }}{{ end }}</p>
      <p><a class="btn" href="/posts/">Blog</a> <a class="btn" href="/about/">O projekcie</a></p>
    </div>
  </section>

  <section class="recent wrap">
    <h2>Najnowsze wpisy</h2>
    <ul>
    {{ range first 5 (where .Site.RegularPages "Section" "posts") }}
      <li>
        <a href="{{ .Permalink }}">{{ .Title }}</a>
        <p class="meta">{{ .Date.Format "2006-01-02" }} • {{ .Params.categories | first }}</p>
      </li>
    {{ end }}
    </ul>
  </section>
{{ end }}
{{ template "_default/baseof.html" . }}
EOF

cat > layouts/_default/list.html <<'EOF'
{{ define "main" }}
  <div class="wrap">
    <h1>{{ .Title }}</h1>
    <ul class="post-list">
    {{ range .Pages }}
      <li>
        <a href="{{ .Permalink }}">{{ .Title }}</a>
        <p class="meta">{{ .Date.Format "2006-01-02" }} • {{ .Params.categories | first }}</p>
        <p>{{ .Summary }}</p>
      </li>
    {{ end }}
    </ul>

    {{ if .Paginator }}
      <nav class="pagination">
        {{ if .Paginator.HasPrev }}<a href="{{ .Paginator.Prev.URL }}">← Starsze</a>{{ end }}
        {{ if .Paginator.HasNext }}<a href="{{ .Paginator.Next.URL }}">Nowsze →</a>{{ end }}
      </nav>
    {{ end }}
  </div>
{{ end }}
{{ template "_default/baseof.html" . }}
EOF

cat > layouts/_default/single.html <<'EOF'
{{ define "main" }}
  <article class="wrap post">
    <h1>{{ .Title }}</h1>
    <p class="meta">{{ .Date.Format "2006-01-02" }} • {{ range $i, $c := .Params.categories }}{{ if $i }}, {{ end }}{{ $c }}{{ end }}</p>
    <div class="content">
      {{ .Content }}
    </div>
    <footer class="post-footer">
      {{ with .Params.tags }} <p>Tagi: {{ range $i, $t := . }}{{ if $i }}, {{ end }}<a href="/tags/{{ $t | urlize }}">{{ $t }}</a>{{ end }}</p> {{ end }}
    </footer>
  </article>
{{ end }}
{{ template "_default/baseof.html" . }}
EOF

cat > layouts/partials/head.html <<'EOF'
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>{{ if .Title }}{{ .Title }} | {{ end }}{{ .Site.Title }}</title>
<meta name="description" content="{{ with .Site.Params.description }}{{ . }}{{ end }}" />
<link rel="icon" href="{{ .Site.Params.favicon }}" />
<link rel="stylesheet" href="/css/styles.css" />
EOF

cat > layouts/partials/header.html <<'EOF'
<header class="site-header">
  <div class="wrap">
    <a class="brand" href="{{ "/" | relURL }}">
      <img src="/images/logo.svg" alt="{{ .Site.Title }}" class="logo" />
      <span class="site-title">{{ .Site.Title }}</span>
    </a>
    <nav class="site-nav">
      <a href="/">Home</a>
      <a href="/posts/">Blog</a>
      <a href="/about/">O projekcie</a>
    </nav>
  </div>
</header>
EOF

cat > layouts/partials/footer.html <<'EOF'
<footer class="site-footer">
  <div class="wrap">
    <p>© {{ now.Format "2006" }} {{ .Site.Title }} • Made with Hugo</p>
  </div>
</footer>
EOF

cat > layouts/shortcodes/youtube.html <<'EOF'
<iframe width="560" height="315" src="https://www.youtube.com/embed/{{ .Get 0 }}" frameborder="0" allowfullscreen></iframe>
EOF

# static assets
cat > static/css/styles.css <<'EOF'
:root{
  --bg:#ffffff;
  --text:#222;
  --accent:#2b7a2b;
}
*{box-sizing:border-box}
body{font-family:system-ui,-apple-system,Segoe UI,Roboto,"Helvetica Neue",Arial;line-height:1.6;color:var(--text);background:var(--bg);margin:0}
.wrap{max-width:900px;margin:0 auto;padding:1rem}
.site-header{border-bottom:1px solid #eee}
.site-header .wrap{display:flex;align-items:center;justify-content:space-between;padding:1rem 0}
.brand{display:flex;align-items:center;text-decoration:none;color:inherit}
.logo{width:40px;height:40px;margin-right:.5rem}
.site-title{font-weight:700}
.site-nav a{margin-left:1rem;text-decoration:none;color:var(--accent)}
.hero{background:#f5f9f5;padding:3rem 0;margin-bottom:1rem}
.hero h1{margin:0 0 .5rem}
.btn{display:inline-block;padding:.5rem .9rem;background:var(--accent);color:#fff;text-decoration:none;border-radius:4px;margin-right:.5rem}
.post-list{list-style:none;padding:0}
.post-list li{padding:.8rem 0;border-bottom:1px solid #f0f0f0}
.meta{color:#666;font-size:.9rem}
.site-footer{border-top:1px solid #eee;padding:1rem 0;margin-top:2rem;color:#666}
.post .content img{max-width:100%}
EOF

cat > static/images/logo.svg <<'EOF'
<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120">
  <rect width="120" height="120" fill="#2b7a2b"/>
  <g fill="#fff" transform="translate(20,20)">
    <path d="M10 60 C 25 20, 55 20, 70 60 L 60 60 C 50 35, 30 35, 20 60 Z"/>
    <rect x="8" y="60" width="64" height="6" fill="#0b3b0b" />
  </g>
</svg>
EOF

# README, gitignore, netlify + workflow
cat > README.md <<'EOF'
# Forest Hydrology — Hugo site scaffold

Szkielet strony Hugo dla foresthydrology.com.
EOF

cat > .gitignore <<'EOF'
/public/
/resources/_gen/
/node_modules/
.DS_Store
.env
EOF

cat > netlify.toml <<'EOF'
[build]
  publish = "public"
  command = "hugo --minify"

[context.production.environment]
  HUGO_VERSION = "0.115.0"
  HUGO_ENV = "production"
EOF

cat > .github/workflows/deploy.yml <<'EOF'
name: Build and Deploy Hugo site

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Hugo
        uses: peaceiris/actions-hugo@v2
        with:
          hugo-version: 'latest'
      - name: Build
        run: hugo --minify
      - name: Deploy to Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          publish_dir: ./public
          publish_branch: gh-pages
          github_token: ${{ secrets.GITHUB_TOKEN }}
EOF

# zip
cd "${TMPDIR}"
echo "Pakuje do ${OUT_ZIP} ..."
if command -v zip >/dev/null 2>&1; then
  zip -r "${OUT_ZIP}" "$(basename "${SCAFFOLD_DIR}")" >/dev/null
else
  # fallback na tar.gz i potem konwersja nie jest potrzebna; użyj tar.gz jeśli brak zip
  tar -czf "${OUT_ZIP%.zip}.tar.gz" -C "${TMPDIR}" "$(basename "${SCAFFOLD_DIR}")"
  echo "Brak zip; utworzono tar.gz: ${OUT_ZIP%.zip}.tar.gz"
  echo "Kopiuję do bieżącego katalogu..."
  cp "${OUT_ZIP%.zip}.tar.gz" "${OLDPWD}/"
  echo "Gotowe. Znajdź archiwum w katalogu z którego uruchomiłeś skrypt."
  rm -rf "${TMPDIR}"
  exit 0
fi

# przenieś zip do katalogu skąd uruchomiono skrypt
cp "${OUT_ZIP}" "${OLDPWD}/"
echo "Archiwum ${OUT_ZIP} zapisane w katalogu, z którego uruchomiłeś skrypt."
# cleanup
rm -rf "${TMPDIR}"
echo "Gotowe."
EOF