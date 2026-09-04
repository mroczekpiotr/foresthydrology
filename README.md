# Forest Hydrology

Production-oriented multilingual static site for forest hydrology, environmental engineering, GIS, remote sensing and hydrological modelling.

## Languages
Polski, English, Español, Deutsch, Français, Português, Bahasa Indonesia, 日本語, 中文.

## Content model
Articles, research, GIS/remote sensing, hydrological modelling, video/tutorials, author profile and hashtag-based discovery.

## Publishing
GitHub Pages + GitHub Actions. The static site can be hosted at:
- https://mroczekpiotr.github.io/foresthydrology/
- https://foresthydrology.com/

## Custom domain
`CNAME` contains `foresthydrology.com`.

## Automatic translation
Polish is the editorial source. The translation workflow can generate EN/ES/DE/FR/PT/ID/JA/ZH Markdown using the OpenAI API. Add `OPENAI_API_KEY` as a repository Actions secret; never commit the key.

## Important editorial rule
Machine translations should be reviewed before publication for scientific terminology, especially in Japanese, Chinese and technical hydrology/GIS content.
