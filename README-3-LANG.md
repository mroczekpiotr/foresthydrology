# ForestHydrology — 3 language structure

The site now has real Polish, English and Spanish versions:

- `/pl/`
- `/en/`
- `/es/`

Each main page exists in all three languages. Articles are under:

- `/pl/articles/`
- `/en/articles/`
- `/es/articles/`

The root `index.html` redirects to English and offers all three languages.

## Upload to GitHub

Replace the contents of your repository with the contents of this folder.

Important: keep these root folders/files:
- `css/`
- `js/`
- `images/`
- `data/`
- `robots.txt`
- `sitemap.xml`

and add:
- `pl/`
- `en/`
- `es/`

Do not upload the outer folder itself as an extra nesting level. `index.html` must remain in the repository root.

For future posts, add the 3 language HTML files to the corresponding `articles` folders and update the language-specific `articles/articles.json`.
