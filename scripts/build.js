// scripts/build.js
// Dependency-free static site generator for ForestHydrology.com.
// Reads content/ + articles/ and renders dist/ as a fully static,
// four-language site (pl, en, es, de).
//
// Usage:
//   node scripts/build.js
// Env vars:
//   SITE_URL   Absolute base URL used for canonical/hreflang/sitemap.
//              Defaults to the GitHub Pages preview URL. Set this to
//              https://foresthydrology.com/ once the custom domain is live.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { mdToHtml, parseFrontMatter } from "./md.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");
const LANGS = ["pl", "en", "es", "de"];
const SITE_URL = (process.env.SITE_URL || "https://mroczekpiotr.github.io/foresthydrology/").replace(/\/?$/, "/");
const REPO_URL = "https://github.com/mroczekpiotr/foresthydrology";
const CONTACT_EMAIL = "contact@foresthydrology.com";

// ---------------------------------------------------------------- utilities

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function writeFile(relPath, content) {
  const full = path.join(DIST, relPath);
  ensureDir(path.dirname(full));
  fs.writeFileSync(full, content, "utf8");
}

function copyDir(src, dest) {
  fs.cpSync(src, dest, { recursive: true });
}

function relPrefix(depth) {
  return depth === 0 ? "./" : "../".repeat(depth);
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function wordCount(text) {
  const stripped = text.replace(/<[^>]+>/g, " ");
  const words = stripped.trim().split(/\s+/).filter(Boolean);
  return words.length;
}

function readingTime(words) {
  return Math.max(1, Math.round(words / 200));
}

const TOPIC_ICON = {
  interception: "icon-drop.svg",
  quality: "icon-leaf.svg",
  snow: "icon-snow.svg",
  climate: "icon-climate.svg",
};

// ------------------------------------------------------------- load content

const strings = {};
for (const lang of LANGS) {
  strings[lang] = readJson(path.join(ROOT, "content", "site", `strings.${lang}.json`));
}

const articlesDir = path.join(ROOT, "articles");
const slugs = fs
  .readdirSync(articlesDir, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)
  .sort();

// articlesByLang[lang] -> array of article objects, newest first
const articlesByLang = Object.fromEntries(LANGS.map((l) => [l, []]));
// langsBySlug[slug] -> Set of lang codes that have a translation
const langsBySlug = {};

for (const slug of slugs) {
  langsBySlug[slug] = new Set();
  for (const lang of LANGS) {
    const file = path.join(articlesDir, slug, `article.${lang}.md`);
    if (!fs.existsSync(file)) continue;
    const raw = fs.readFileSync(file, "utf8");
    const { data, body } = parseFrontMatter(raw);
    const html = mdToHtml(body);
    const words = wordCount(html);
    const dateObj = data.date ? new Date(data.date) : new Date();
    const dateFormatted = new Intl.DateTimeFormat(strings[lang].html_lang, {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(dateObj);

    articlesByLang[lang].push({
      slug,
      title: data.title || slug,
      description: data.description || "",
      date: data.date || "",
      dateObj,
      dateFormatted,
      tags: (data.tags || "")
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      topic: data.topic || "",
      icon: TOPIC_ICON[data.topic] || "icon-drop.svg",
      html,
      words,
      minutes: readingTime(words),
      isOriginal: lang === "pl",
    });
    langsBySlug[slug].add(lang);
  }
}

for (const lang of LANGS) {
  articlesByLang[lang].sort((a, b) => b.dateObj - a.dateObj);
}

// ------------------------------------------------------------------ layout

function svgInline(file) {
  // Small icons are inlined so they inherit `currentColor` for theming.
  const p = path.join(ROOT, "assets", "img", file);
  return fs.readFileSync(p, "utf8").replace(/<\?xml[^>]*\?>\s*/, "");
}

function iconCache() {
  const cache = {};
  return (file) => (cache[file] ??= svgInline(file));
}
const icon = iconCache();

function alternateLinks({ langToPath }) {
  // langToPath: { pl: 'pl/articles/slug/', en: 'en/articles/slug/', ... }
  const links = Object.entries(langToPath)
    .map(([lang, p]) => `<link rel="alternate" hreflang="${lang}" href="${SITE_URL}${p}">`)
    .join("\n  ");
  const xDefault = langToPath.en || langToPath.pl || Object.values(langToPath)[0];
  return `${links}\n  <link rel="alternate" hreflang="x-default" href="${SITE_URL}${xDefault}">`;
}

function langMenu(lang, prefix, langToPath) {
  const items = LANGS.filter((l) => langToPath[l])
    .map((l) => {
      const current = l === lang;
      return `<a href="${prefix}${langToPath[l]}"${current ? ' aria-current="true"' : ""}>${strings[l].lang_name}${
        current ? " ✓" : ""
      }</a>`;
    })
    .join("\n        ");
  return `<details class="lang-switch">
        <summary>🌐 ${strings[lang].lang_name}</summary>
        <nav class="lang-menu" aria-label="${escapeHtml(strings[lang].language_label)}">
        ${items}
        </nav>
      </details>`;
}

function header(lang, prefix, active, langToPath) {
  const s = strings[lang];
  const home = `${prefix}${lang}/`;
  const nav = [
    { href: home, key: "nav_home", id: "home" },
    { href: `${prefix}${lang}/articles/`, key: "nav_articles", id: "articles" },
    { href: `${prefix}${lang}/about/`, key: "nav_about", id: "about" },
    { href: `${prefix}${lang}/contact/`, key: "nav_contact", id: "contact" },
  ];
  const navLinks = (cls) =>
    nav
      .map(
        (n) =>
          `<a class="${cls || ""}" href="${n.href}"${active === n.id ? ' aria-current="page"' : ""}>${s[n.key]}</a>`
      )
      .join("\n        ");

  return `<header class="site-header">
    <div class="container">
      <a class="brand" href="${home}">
        <img src="${prefix}assets/img/logo.svg" alt="" width="36" height="36">
        <span class="brand-text">
          <span class="brand-name">${s.site_name}</span>
          <span class="brand-tagline">${s.tagline}</span>
        </span>
      </a>
      <nav class="main-nav" aria-label="${escapeHtml(s.nav_home)}">
        ${navLinks()}
      </nav>
      ${langMenu(lang, prefix, langToPath)}
      <button class="nav-toggle" aria-expanded="false" aria-controls="mobileNav" onclick="var n=document.getElementById('mobileNav');var open=n.classList.toggle('is-open');this.setAttribute('aria-expanded',open);">
        <span class="nav-toggle-icon"></span>
      </button>
    </div>
    <nav class="mobile-nav" id="mobileNav" aria-label="${escapeHtml(s.nav_home)}">
      ${navLinks()}
    </nav>
  </header>`;
}

function footer(lang, prefix) {
  const s = strings[lang];
  const year = new Date().getFullYear();
  return `<footer class="site-footer">
    <div class="container footer-grid">
      <div class="footer-brand">
        <img src="${prefix}assets/img/logo.svg" alt="" width="34" height="34">
        <div>
          <h2>${s.site_name}</h2>
          <p>${s.footer_tagline}</p>
        </div>
      </div>
      <div class="footer-col">
        <h3>${s.nav_articles}</h3>
        <ul>
          <li><a href="${prefix}${lang}/articles/">${s.nav_articles}</a></li>
          <li><a href="${prefix}${lang}/about/">${s.nav_about}</a></li>
          <li><a href="${prefix}${lang}/contact/">${s.nav_contact}</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h3>${s.language_label}</h3>
        <ul>
          ${LANGS.map((l) => `<li><a href="${prefix}${l}/">${strings[l].lang_name}</a></li>`).join("\n          ")}
        </ul>
      </div>
    </div>
    <div class="container footer-bottom">
      <span>© ${year} ${s.site_name}. ${s.footer_rights}</span>
      <a href="${REPO_URL}" target="_blank" rel="noopener noreferrer">${s.footer_source}</a>
    </div>
  </footer>`;
}

function page({ lang, prefix, active, title, description, bodyHtml, langToPath, canonicalPath }) {
  const s = strings[lang];
  const fullTitle = title ? `${title} — ${s.site_name}` : `${s.site_name} — ${s.tagline}`;
  return `<!doctype html>
<html lang="${s.html_lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(fullTitle)}</title>
  <meta name="description" content="${escapeHtml(description || s.meta_description)}">
  <link rel="canonical" href="${SITE_URL}${canonicalPath}">
  ${langToPath ? alternateLinks({ langToPath }) : ""}
  <link rel="icon" href="${prefix}assets/img/favicon.svg" type="image/svg+xml">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="${escapeHtml(s.site_name)}">
  <meta property="og:title" content="${escapeHtml(fullTitle)}">
  <meta property="og:description" content="${escapeHtml(description || s.meta_description)}">
  <meta property="og:url" content="${SITE_URL}${canonicalPath}">
  <meta property="og:locale" content="${s.html_lang}">
  <meta name="twitter:card" content="summary">
  <link rel="stylesheet" href="${prefix}assets/css/style.css">
</head>
<body>
  <a class="skip-link" href="#main">${s.skip_to_content}</a>
  ${header(lang, prefix, active, langToPath || {})}
  <main id="main">
  ${bodyHtml}
  </main>
  ${footer(lang, prefix)}
</body>
</html>
`;
}

// ------------------------------------------------------------- page bodies

function topicCard(lang, key, iconFile) {
  const s = strings[lang];
  return `<div class="topic-card">
          <div class="icon">${icon(iconFile)}</div>
          <h3>${s[`topic_${key}_title`]}</h3>
          <p>${s[`topic_${key}_text`]}</p>
        </div>`;
}

function articleCard(lang, prefix, a) {
  const s = strings[lang];
  return `<article class="article-card">
          <div class="article-card-media">${icon(a.icon)}</div>
          <div class="article-card-body">
            <span class="article-card-meta">${a.dateFormatted} · ${a.minutes} ${s.reading_time_suffix}</span>
            <h3><a href="${prefix}${lang}/articles/${a.slug}/">${escapeHtml(a.title)}</a></h3>
            <p>${escapeHtml(a.description)}</p>
            <a class="read-more" href="${prefix}${lang}/articles/${a.slug}/">${s.read_more} →</a>
          </div>
        </article>`;
}

function homeBody(lang, prefix) {
  const s = strings[lang];
  const latest = articlesByLang[lang].slice(0, 3);
  return `
  <section class="hero">
    <img class="hero-bg" src="${prefix}assets/img/hero-art.svg" alt="">
    <div class="hero-scrim"></div>
    <div class="container">
      <span class="hero-kicker">${s.home_hero_kicker}</span>
      <h1>${s.home_hero_title}</h1>
      <p>${s.home_hero_subtitle}</p>
      <div class="hero-actions">
        <a class="btn btn-primary" href="${prefix}${lang}/articles/">${s.home_hero_cta_primary}</a>
        <a class="btn btn-ghost" href="${prefix}${lang}/about/">${s.home_hero_cta_secondary}</a>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container mission">
      <div class="mission-text">
        <div class="section-head">
          <h2>${s.home_mission_title}</h2>
        </div>
        <p>${s.home_mission_text}</p>
      </div>
      <div class="topics-grid">
        ${topicCard(lang, "interception", "icon-drop.svg")}
        ${topicCard(lang, "quality", "icon-leaf.svg")}
        ${topicCard(lang, "snow", "icon-snow.svg")}
        ${topicCard(lang, "climate", "icon-climate.svg")}
      </div>
    </div>
  </section>

  <section class="section section-alt">
    <div class="container">
      <div class="section-head">
        <h2>${s.home_latest_title}</h2>
      </div>
      <div class="articles-grid">
        ${latest.map((a) => articleCard(lang, prefix, a)).join("\n        ")}
      </div>
      <div class="section-cta">
        <a class="btn btn-primary" href="${prefix}${lang}/articles/">${s.home_latest_view_all}</a>
      </div>
    </div>
  </section>`;
}

function articlesIndexBody(lang, prefix) {
  const s = strings[lang];
  const all = articlesByLang[lang];
  return `
  <section class="section">
    <div class="container">
      <div class="section-head">
        <h2>${s.articles_title}</h2>
        <p>${s.articles_intro}</p>
      </div>
      <div class="articles-grid">
        ${all.map((a) => articleCard(lang, prefix, a)).join("\n        ")}
      </div>
    </div>
  </section>`;
}

function tocFromHtml(html) {
  const items = [];
  const re = /<h2 id="([^"]+)">([\s\S]*?)<\/h2>/g;
  let m;
  while ((m = re.exec(html))) {
    items.push({ id: m[1], text: m[2].replace(/<[^>]+>/g, "") });
  }
  return items;
}

function articleBody(lang, prefix, a) {
  const s = strings[lang];
  const toc = tocFromHtml(a.html);
  const otherLangs = LANGS.filter((l) => l !== lang && langsBySlug[a.slug].has(l));
  return `
  <section class="article-hero">
    <div class="container">
      <p class="breadcrumb"><a href="${prefix}${lang}/">${s.nav_home}</a> / <a href="${prefix}${lang}/articles/">${s.nav_articles}</a></p>
      ${a.topic ? `<span class="article-tag">${s[`topic_${a.topic}_title`] || a.topic}</span>` : ""}
      <h1>${escapeHtml(a.title)}</h1>
      <p class="article-lede">${escapeHtml(a.description)}</p>
      <div class="article-meta">
        <span>${s.published_on}: ${a.dateFormatted}</span>
        <span>${a.minutes} ${s.reading_time_suffix}</span>
      </div>
    </div>
  </section>
  <div class="container article-body-wrap">
    <article class="prose">
      ${!a.isOriginal ? `<p class="notice">${s.translated_notice}</p>` : ""}
      ${a.html}
    </article>
    <aside class="article-sidebar">
      ${
        toc.length
          ? `<div class="sidebar-card">
        <h2>${s.toc_title}</h2>
        <ul class="toc-list">
          ${toc.map((t) => `<li><a href="#${t.id}">${escapeHtml(t.text)}</a></li>`).join("\n          ")}
        </ul>
      </div>`
          : ""
      }
      ${
        otherLangs.length
          ? `<div class="sidebar-card">
        <h2>${s.language_label}</h2>
        <div class="other-languages">
          ${otherLangs
            .map((l) => `<a href="${prefix}${l}/articles/${a.slug}/">${strings[l].lang_name}</a>`)
            .join("\n          ")}
        </div>
      </div>`
          : ""
      }
      <div class="sidebar-card">
        <h2>${s.nav_articles}</h2>
        <a href="${prefix}${lang}/articles/">← ${s.back_to_articles}</a>
      </div>
    </aside>
  </div>`;
}

function aboutBody(lang) {
  const s = strings[lang];
  return `
  <section class="section">
    <div class="container">
      <div class="section-head">
        <h2>${s.about_title}</h2>
        <p>${s.about_intro}</p>
      </div>
      <div class="prose" style="max-width:72ch">
        <p>${s.about_body}</p>
      </div>
      <div class="values-grid">
        <div class="value-card"><h3>${s.about_value_1_title}</h3><p>${s.about_value_1_text}</p></div>
        <div class="value-card"><h3>${s.about_value_2_title}</h3><p>${s.about_value_2_text}</p></div>
        <div class="value-card"><h3>${s.about_value_3_title}</h3><p>${s.about_value_3_text}</p></div>
      </div>
    </div>
  </section>`;
}

function contactBody(lang) {
  const s = strings[lang];
  return `
  <section class="section">
    <div class="container">
      <div class="section-head">
        <h2>${s.contact_title}</h2>
        <p>${s.contact_text}</p>
      </div>
      <div class="contact-card">
        <p>${s.contact_email_label}</p>
        <p><a class="email" href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a></p>
      </div>
    </div>
  </section>`;
}

// -------------------------------------------------------------- page build

function langToPathFor(kind, slug) {
  const map = {};
  for (const l of LANGS) {
    if (kind === "home") map[l] = `${l}/`;
    else if (kind === "articles") map[l] = `${l}/articles/`;
    else if (kind === "about") map[l] = `${l}/about/`;
    else if (kind === "contact") map[l] = `${l}/contact/`;
    else if (kind === "article") {
      if (langsBySlug[slug]?.has(l)) map[l] = `${l}/articles/${slug}/`;
    }
  }
  return map;
}

for (const lang of LANGS) {
  const prefix1 = relPrefix(1); // pl/index.html etc -> depth 1
  const prefix2 = relPrefix(2); // pl/articles/index.html, pl/about/index.html
  const prefix3 = relPrefix(3); // pl/articles/slug/index.html

  writeFile(
    `${lang}/index.html`,
    page({
      lang,
      prefix: prefix1,
      active: "home",
      title: null,
      description: strings[lang].meta_description,
      bodyHtml: homeBody(lang, prefix1),
      langToPath: langToPathFor("home"),
      canonicalPath: `${lang}/`,
    })
  );

  writeFile(
    `${lang}/articles/index.html`,
    page({
      lang,
      prefix: prefix2,
      active: "articles",
      title: strings[lang].articles_title,
      description: strings[lang].articles_intro,
      bodyHtml: articlesIndexBody(lang, prefix2),
      langToPath: langToPathFor("articles"),
      canonicalPath: `${lang}/articles/`,
    })
  );

  writeFile(
    `${lang}/about/index.html`,
    page({
      lang,
      prefix: prefix2,
      active: "about",
      title: strings[lang].about_title,
      description: strings[lang].about_intro,
      bodyHtml: aboutBody(lang),
      langToPath: langToPathFor("about"),
      canonicalPath: `${lang}/about/`,
    })
  );

  writeFile(
    `${lang}/contact/index.html`,
    page({
      lang,
      prefix: prefix2,
      active: "contact",
      title: strings[lang].contact_title,
      description: strings[lang].contact_text,
      bodyHtml: contactBody(lang),
      langToPath: langToPathFor("contact"),
      canonicalPath: `${lang}/contact/`,
    })
  );

  for (const a of articlesByLang[lang]) {
    writeFile(
      `${lang}/articles/${a.slug}/index.html`,
      page({
        lang,
        prefix: prefix3,
        active: "articles",
        title: a.title,
        description: a.description,
        bodyHtml: articleBody(lang, prefix3, a),
        langToPath: langToPathFor("article", a.slug),
        canonicalPath: `${lang}/articles/${a.slug}/`,
      })
    );
  }
}

// ------------------------------------------------------------- root, 404s

function langLandingHtml() {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>ForestHydrology.com</title>
  <meta name="description" content="ForestHydrology.com — a multilingual science outlet on forest hydrology.">
  <link rel="icon" href="assets/img/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="assets/css/style.css">
  <script>
    (function () {
      var known = ${JSON.stringify(LANGS)};
      var nav = (navigator.language || "en").slice(0, 2).toLowerCase();
      var target = known.indexOf(nav) !== -1 ? nav : "en";
      if (!location.search.includes("nolang")) {
        location.replace(target + "/");
      }
    })();
  </script>
</head>
<body>
  <div class="lang-landing">
    <div class="lang-landing-card">
      <img src="assets/img/logo.svg" alt="ForestHydrology">
      <h1>ForestHydrology.com</h1>
      <p>Choose your language / Wybierz język / Elige tu idioma / Sprache wählen</p>
      <div class="lang-options">
        ${LANGS.map(
          (l) =>
            `<a href="${l}/">${strings[l].lang_name}<small>${strings[l].tagline}</small></a>`
        ).join("\n        ")}
      </div>
    </div>
  </div>
</body>
</html>
`;
}

writeFile("index.html", langLandingHtml());

function notFoundHtml() {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>404 — ForestHydrology.com</title>
  <link rel="icon" href="assets/img/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
  <div class="container error-page">
    <img src="assets/img/logo.svg" alt="" width="56" height="56" style="margin:0 auto 1.5rem">
    <h1>404</h1>
    <p>Page not found. / Strona nie znaleziona. / Página no encontrada. / Seite nicht gefunden.</p>
    <div class="lang-options" style="max-width:420px;margin:2rem auto 0">
      ${LANGS.map((l) => `<a class="btn btn-primary" href="${l}/">${strings[l].lang_name}</a>`).join("\n      ")}
    </div>
  </div>
</body>
</html>
`;
}
writeFile("404.html", notFoundHtml());

// -------------------------------------------------------------- assets etc

copyDir(path.join(ROOT, "assets"), path.join(DIST, "assets"));
fs.writeFileSync(path.join(DIST, ".nojekyll"), "");

// If a /CNAME file exists at the repo root (added once the custom domain on
// OVH is ready to go live), carry it into dist/ so GitHub Pages picks it up.
const cnameSrc = path.join(ROOT, "CNAME");
if (fs.existsSync(cnameSrc)) {
  fs.copyFileSync(cnameSrc, path.join(DIST, "CNAME"));
  console.log(`Copied custom domain CNAME (${fs.readFileSync(cnameSrc, "utf8").trim()}) into dist/`);
}
fs.writeFileSync(
  path.join(DIST, "robots.txt"),
  `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}sitemap.xml\n`
);

// -------------------------------------------------------------- sitemap.xml

function buildSitemap() {
  const urls = [];
  const pushUrl = (loc, alternates) => {
    urls.push({ loc, alternates });
  };
  for (const lang of LANGS) {
    pushUrl(`${SITE_URL}${lang}/`, langToPathFor("home"));
    pushUrl(`${SITE_URL}${lang}/articles/`, langToPathFor("articles"));
    pushUrl(`${SITE_URL}${lang}/about/`, langToPathFor("about"));
    pushUrl(`${SITE_URL}${lang}/contact/`, langToPathFor("contact"));
  }
  for (const slug of slugs) {
    for (const lang of LANGS) {
      if (!langsBySlug[slug].has(lang)) continue;
      pushUrl(`${SITE_URL}${lang}/articles/${slug}/`, langToPathFor("article", slug));
    }
  }
  const body = urls
    .map((u) => {
      const alt = Object.entries(u.alternates)
        .map(([l, p]) => `\n      <xhtml:link rel="alternate" hreflang="${l}" href="${SITE_URL}${p}"/>`)
        .join("");
      return `  <url>\n    <loc>${u.loc}</loc>${alt}\n  </url>`;
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${body}\n</urlset>\n`;
}

fs.writeFileSync(path.join(DIST, "sitemap.xml"), buildSitemap());

// ------------------------------------------------------------------- done

const totalArticlePages = LANGS.reduce((n, l) => n + articlesByLang[l].length, 0);
console.log(`Built ${LANGS.length} languages, ${slugs.length} articles (${totalArticlePages} article pages).`);
console.log(`SITE_URL = ${SITE_URL}`);
console.log(`Output: ${DIST}`);
