# ForestHydrology.com

Multilingual static website for GitHub Pages.

Languages:
- Polish (`pl`)
- English (`en`)
- Spanish (`es`)
- German (`de`)

## Publishing model

Write or edit the Polish source article in `articles/<slug>/article.pl.md`.
On GitHub, the workflow can use the OpenAI API to translate missing language versions
and then build the static site.

Required GitHub repository secret for automatic translation:
`OPENAI_API_KEY`

The key is used only by GitHub Actions and is never placed in browser JavaScript.

## Local preview

```bash
npm install
npm run build
python3 -m http.server 8000 -d dist
```

Open http://localhost:8000

## GitHub Pages

The included workflow builds `dist/` and deploys it to GitHub Pages.
