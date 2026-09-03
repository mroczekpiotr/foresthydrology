// scripts/translate.js
// Runs in GitHub Actions (or locally with OPENAI_API_KEY set). For every
// article, the Polish source (article.pl.md) is treated as the single
// source of truth. For each target language that is missing a translation
// file, this script calls the OpenAI API and writes
// articles/<slug>/article.<lang>.md, preserving the Markdown structure and
// translating the front matter values (title/description/tags) too.
//
// Safe to run repeatedly: existing translation files are never overwritten,
// so hand-edited translations are preserved. Delete a translation file to
// force it to be regenerated on the next run.
//
// Usage: OPENAI_API_KEY=sk-... node scripts/translate.js

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseFrontMatter } from "./md.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const ARTICLES_DIR = path.join(ROOT, "articles");
const SOURCE_LANG = "pl";
const TARGET_LANGS = ["en", "es", "de"];
const MODEL = process.env.TRANSLATE_MODEL || "gpt-4o-mini";

const LANG_NAMES = {
  en: "English",
  es: "Spanish (Spain, neutral international register)",
  de: "German",
};

const apiKey = process.env.OPENAI_API_KEY;

function buildPrompt(lang, frontMatterYaml, body) {
  return `You are a professional scientific translator. Translate the following Markdown
article about forest hydrology from Polish into ${LANG_NAMES[lang]}.

Rules:
- Preserve the Markdown structure exactly: headings, lists, tables, blockquotes,
  emphasis, and link syntax must remain valid Markdown.
- Do not translate content inside inline code spans or code fences.
- Keep numbers, units, and citations unchanged.
- Translate naturally for a science-literate general audience, not word-for-word.
- Return ONLY the translated Markdown body — no commentary, no code fences around
  the whole output.

--- BODY START ---
${body}
--- BODY END ---`;
}

function buildFrontMatterPrompt(lang, data) {
  return `Translate these front-matter fields of a forest hydrology article from Polish
into ${LANG_NAMES[lang]}. Keep the "date" and "topic" fields unchanged (copy them
verbatim). Translate "title", "description", and "tags" naturally. Respond with
strict JSON only, with keys: title, description, tags (tags as a single
comma-separated string, same number of tags as the input).

Input JSON:
${JSON.stringify({ title: data.title, description: data.description, tags: data.tags })}`;
}

async function callOpenAI(prompt) {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: MODEL,
      temperature: 0.2,
      messages: [{ role: "user", content: prompt }],
    }),
  });
  if (!res.ok) {
    throw new Error(`OpenAI API error ${res.status}: ${await res.text()}`);
  }
  const data = await res.json();
  return data.choices[0].message.content.trim();
}

async function translateArticle(slug, lang, sourceRaw) {
  const { data, body } = parseFrontMatter(sourceRaw);

  const fmRaw = await callOpenAI(buildFrontMatterPrompt(lang, data));
  const fmJson = JSON.parse(fmRaw.replace(/^```json\s*|\s*```$/g, ""));

  const translatedBody = await callOpenAI(buildPrompt(lang, data, body));

  const frontMatter = [
    "---",
    `title: ${fmJson.title}`,
    `description: ${fmJson.description}`,
    `date: ${data.date}`,
    `tags: ${fmJson.tags}`,
    `topic: ${data.topic || ""}`,
    "---",
    "",
  ].join("\n");

  return frontMatter + translatedBody.trim() + "\n";
}

async function main() {
  if (!apiKey) {
    console.log(
      "OPENAI_API_KEY not set — skipping automatic translation (existing files are left as-is)."
    );
    return;
  }

  const slugs = fs
    .readdirSync(ARTICLES_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  let created = 0;

  for (const slug of slugs) {
    const sourceFile = path.join(ARTICLES_DIR, slug, `article.${SOURCE_LANG}.md`);
    if (!fs.existsSync(sourceFile)) {
      console.warn(`Skipping "${slug}": no Polish source article.${SOURCE_LANG}.md found.`);
      continue;
    }
    const sourceRaw = fs.readFileSync(sourceFile, "utf8");

    for (const lang of TARGET_LANGS) {
      const targetFile = path.join(ARTICLES_DIR, slug, `article.${lang}.md`);
      if (fs.existsSync(targetFile)) continue; // never overwrite existing translations

      console.log(`Translating "${slug}" -> ${lang} ...`);
      try {
        const translated = await translateArticle(slug, lang, sourceRaw);
        fs.writeFileSync(targetFile, translated, "utf8");
        created++;
        console.log(`  wrote articles/${slug}/article.${lang}.md`);
      } catch (err) {
        console.error(`  failed to translate "${slug}" -> ${lang}:`, err.message);
      }
    }
  }

  console.log(`Done. Created ${created} new translation file(s).`);
}

main();
