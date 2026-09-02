/* ============================================================
   forest hydrology — site engine
   No build step: plain fetch + templating, works on GitHub Pages.
   ============================================================ */

const LANGS = ["en", "pl", "es", "ja"];
const DEFAULT_LANG = "en";

/* ---------- language / path helpers ---------- */

function currentLang() {
  const seg = window.location.pathname.split("/").filter(Boolean)[0];
  return LANGS.includes(seg) ? seg : DEFAULT_LANG;
}

function withLang(lang, path) {
  // path like "index.html" or "articles.html?category=gis"
  return `/${lang}/${path}`;
}

function switchLangHref(targetLang) {
  const parts = window.location.pathname.split("/").filter(Boolean);
  if (LANGS.includes(parts[0])) parts[0] = targetLang;
  else parts.unshift(targetLang);
  return "/" + parts.join("/") + window.location.search;
}

/* ---------- data loading ---------- */

async function loadJSON(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Failed to load ${path}`);
  return res.json();
}

async function loadSite(lang) {
  return loadJSON(`/content/${lang}/site.json`);
}

async function loadPostsIndex() {
  return loadJSON(`/content/posts-index.json`);
}

async function loadPostBody(lang, slug) {
  const res = await fetch(`/content/posts/${lang}/${slug}.md`);
  if (!res.ok) return null;
  return res.text();
}

async function loadAboutBody(lang) {
  const res = await fetch(`/content/about/${lang}.md`);
  if (!res.ok) return null;
  return res.text();
}

/* ---------- markdown ---------- */
// marked.js is loaded via CDN script tag on each page.
function renderMarkdown(md) {
  if (window.marked) return window.marked.parse(md);
  // minimal fallback if CDN unavailable: preserve paragraphs
  return md
    .split(/\n\n+/)
    .map((p) => `<p>${p.replace(/\n/g, "<br>")}</p>`)
    .join("\n");
}

/* ---------- date formatting ---------- */
function formatDate(iso, lang) {
  const d = new Date(iso + "T00:00:00");
  const localeMap = { en: "en-GB", pl: "pl-PL", es: "es-ES", ja: "ja-JP" };
  return d.toLocaleDateString(localeMap[lang] || "en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/* ---------- chrome: header + footer ---------- */

const CATEGORY_ORDER = ["gis", "remote-sensing", "modelling", "data", "webgis"];

function renderHeader(site, lang, activeKey) {
  const el = document.getElementById("site-header");
  if (!el) return;

  const navItems = [
    { key: "articles", href: withLang(lang, "articles.html"), label: site.nav.articles },
    ...CATEGORY_ORDER.map((cat) => ({
      key: cat,
      href: withLang(lang, `articles.html?category=${cat}`),
      label: site.nav[toCamel(cat)],
    })),
    { key: "about", href: withLang(lang, "about.html"), label: site.nav.about },
  ];

  const navHTML = navItems
    .map(
      (item) =>
        `<a href="${item.href}"${item.key === activeKey ? ' class="active" aria-current="page"' : ""}>${item.label}</a>`
    )
    .join("");

  const langHTML = LANGS.map((l) => {
    const isJa = l === "ja";
    return `<a href="${switchLangHref(l)}"${l === lang ? ' class="active" aria-current="true"' : ""}${isJa ? ' title="日本語（試験運用）"' : ""}>${l.toUpperCase()}</a>`;
  }).join("");

  el.innerHTML = `
    <div class="wrap site-header-inner">
      <a class="brand" href="${withLang(lang, "index.html")}">
        <span class="mark">◈</span> ${site.siteTitle}
      </a>
      <nav class="main-nav" aria-label="Main">${navHTML}</nav>
      <div class="lang-switch" aria-label="Language">${langHTML}</div>
    </div>
  `;
}

function toCamel(cat) {
  return cat.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}

function renderFooter(site) {
  const el = document.getElementById("site-footer");
  if (!el) return;
  const year = new Date().getFullYear();
  el.innerHTML = `
    <div class="wrap">
      <span>${site.footer.tagline}</span>
      <span>© ${year} · ${site.footer.rights}</span>
    </div>
  `;
}

/* ---------- shared page bootstrap ---------- */

async function bootChrome(activeKey) {
  const lang = currentLang();
  const site = await loadSite(lang);
  document.documentElement.lang = lang;
  renderHeader(site, lang, activeKey);
  renderFooter(site);
  return { lang, site };
}

/* ---------- home page ---------- */

async function renderHome() {
  const { lang, site } = await bootChrome("home");

  document.getElementById("hero-eyebrow").textContent = site.hero.eyebrow;
  document.getElementById("hero-title").textContent = site.hero.title;
  document.getElementById("hero-lead").textContent = site.hero.lead;
  document.getElementById("explore-label").textContent = site.ui.exploreSections;
  document.getElementById("recent-label").textContent = site.ui.recentArticles;

  const grid = document.getElementById("category-grid");
  grid.innerHTML = CATEGORY_ORDER.map((cat) => {
    const c = site.categories[cat];
    return `
      <a class="category-card" href="${withLang(lang, `articles.html?category=${cat}`)}">
        <div>
          <div class="cat-name">${c.name}</div>
          <div class="cat-desc">${c.desc}</div>
        </div>
        <div class="cat-go">${site.ui.readMore} →</div>
      </a>`;
  }).join("");

  const index = await loadPostsIndex();
  const recent = index
    .slice()
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 5);
  renderPostList(recent, site, lang, document.getElementById("recent-posts"));
}

/* ---------- articles listing page ---------- */

async function renderArticles() {
  const { lang, site } = await bootChrome(getCategoryFromQuery() || "articles");
  const category = getCategoryFromQuery();

  const titleEl = document.getElementById("list-title");
  titleEl.textContent = category ? site.categories[category].name : site.ui.allArticles;

  const descEl = document.getElementById("list-desc");
  descEl.textContent = category ? site.categories[category].desc : "";

  const index = await loadPostsIndex();
  const filtered = index
    .filter((p) => !category || p.category === category)
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  renderPostList(filtered, site, lang, document.getElementById("post-list"), true);
}

function getCategoryFromQuery() {
  const params = new URLSearchParams(window.location.search);
  return params.get("category");
}

function renderPostList(posts, site, lang, container, showEmpty) {
  if (!posts.length) {
    if (showEmpty) container.innerHTML = `<div class="empty-state">${site.ui.noPosts}</div>`;
    return;
  }
  container.innerHTML = posts
    .map((p) => {
      const t = p.translations[lang];
      const catName = site.categories[p.category] ? site.categories[p.category].name : p.category;
      if (!t || !t.available) {
        const fallbackLang = LANGS.find((l) => p.translations[l] && p.translations[l].available);
        const fallbackTitle = fallbackLang ? p.translations[fallbackLang].title : p.slug;
        return `
          <li class="post-item">
            <div class="post-meta"><span class="cat-tag">${catName}</span><br>${formatDate(p.date, lang)}</div>
            <div>
              <h3><a href="${withLang(lang, `post.html?slug=${p.slug}`)}">${fallbackTitle}</a></h3>
              <p class="unavailable">${site.ui.notAvailable}</p>
            </div>
          </li>`;
      }
      return `
        <li class="post-item">
          <div class="post-meta"><span class="cat-tag">${catName}</span><br>${formatDate(p.date, lang)}</div>
          <div>
            <h3><a href="${withLang(lang, `post.html?slug=${p.slug}`)}">${t.title}</a></h3>
            <p class="excerpt">${t.excerpt}</p>
          </div>
        </li>`;
    })
    .join("");
}

/* ---------- single post page ---------- */

async function renderPost() {
  const { lang, site } = await bootChrome(null);
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug");
  const container = document.getElementById("post-container");

  if (!slug) {
    container.innerHTML = `<div class="empty-state">${site.ui.noPosts}</div>`;
    return;
  }

  const index = await loadPostsIndex();
  const entry = index.find((p) => p.slug === slug);
  if (!entry) {
    container.innerHTML = `<div class="empty-state">${site.ui.noPosts}</div>`;
    return;
  }

  const t = entry.translations[lang];
  const catName = site.categories[entry.category] ? site.categories[entry.category].name : entry.category;

  if (!t || !t.available) {
    const available = LANGS.filter((l) => entry.translations[l] && entry.translations[l].available);
    const links = available
      .map((l) => `<a href="${withLang(l, `post.html?slug=${slug}`)}">${l.toUpperCase()}</a>`)
      .join(" · ");
    container.innerHTML = `
      <div class="post-header">
        <span class="cat-tag">${catName}</span>
        <p>${site.ui.notAvailable}</p>
        <p>${site.ui.chooseAnother} ${links}</p>
      </div>
      <a class="back-link" href="${withLang(lang, "articles.html")}">← ${site.ui.backToArticles}</a>
    `;
    document.title = `${site.siteTitle}`;
    return;
  }

  const md = await loadPostBody(lang, slug);
  document.title = `${t.title} — ${site.siteTitle}`;

  container.innerHTML = `
    <header class="post-header">
      <span class="cat-tag">${catName}</span>
      <h1>${t.title}</h1>
      <div class="post-date">${site.ui.publishedOn} ${formatDate(entry.date, lang)}</div>
    </header>
    <div class="post-body">${md ? renderMarkdown(md) : ""}</div>
    <a class="back-link" href="${withLang(lang, "articles.html")}">← ${site.ui.backToArticles}</a>
  `;
}

/* ---------- about page ---------- */

async function renderAbout() {
  const { lang, site } = await bootChrome("about");
  document.getElementById("about-title").textContent = site.about.title;
  const md = await loadAboutBody(lang);
  document.getElementById("about-body").innerHTML = md ? renderMarkdown(md) : "";
  document.title = `${site.about.title} — ${site.siteTitle}`;
}

/* ---------- root redirect (site root index.html) ---------- */

function redirectToPreferredLang() {
  const browserLang = (navigator.language || "en").slice(0, 2).toLowerCase();
  const target = LANGS.includes(browserLang) ? browserLang : DEFAULT_LANG;
  window.location.replace(`/${target}/index.html`);
}
