// scripts/md.js
// A small, dependency-free Markdown -> HTML converter tailored for
// scientific article content (headings, paragraphs, lists, blockquotes,
// tables, links, images, emphasis, inline code, fenced code, footnote-ish
// references). Not a full CommonMark implementation, but covers what the
// ForestHydrology.com article corpus needs.

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Inline-level transforms: images, links, bold, italic, inline code.
function renderInline(text) {
  // Protect inline code first so its contents aren't touched by other rules.
  const codeStore = [];
  text = text.replace(/`([^`]+)`/g, (_, code) => {
    codeStore.push(escapeHtml(code));
    return `\u0000CODE${codeStore.length - 1}\u0000`;
  });

  // Images: ![alt](src "title")
  text = text.replace(
    /!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)/g,
    (_, alt, src, title) =>
      `<img src="${src}" alt="${escapeHtml(alt)}"${
        title ? ` title="${escapeHtml(title)}"` : ""
      } loading="lazy">`
  );

  // Links: [text](href "title")
  text = text.replace(
    /\[([^\]]+)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)/g,
    (_, label, href, title) => {
      const external = /^https?:\/\//.test(href);
      return `<a href="${href}"${title ? ` title="${escapeHtml(title)}"` : ""}${
        external ? ' target="_blank" rel="noopener noreferrer"' : ""
      }>${label}</a>`;
    }
  );

  // Bold + italic combined: ***text***
  text = text.replace(/\*\*\*([^*]+)\*\*\*/g, "<strong><em>$1</em></strong>");
  // Bold: **text**
  text = text.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  // Italic: *text*
  text = text.replace(/(^|[^*])\*([^*\n]+)\*(?!\*)/g, "$1<em>$2</em>");

  // Restore inline code
  text = text.replace(
    /\u0000CODE(\d+)\u0000/g,
    (_, i) => `<code>${codeStore[Number(i)]}</code>`
  );

  return text;
}

function isTableSeparator(line) {
  return /^\s*\|?[\s:|-]+\|?\s*$/.test(line) && line.includes("-");
}

function parseTableRow(line) {
  let cells = line.trim();
  if (cells.startsWith("|")) cells = cells.slice(1);
  if (cells.endsWith("|")) cells = cells.slice(0, -1);
  return cells.split("|").map((c) => c.trim());
}

export function mdToHtml(markdown) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const html = [];
  let i = 0;
  let inCode = false;
  let codeLang = "";
  let codeBuf = [];
  let paraBuf = [];
  let listStack = []; // { type: 'ul'|'ol' }
  let inBlockquote = false;
  let bqBuf = [];

  function flushParagraph() {
    if (paraBuf.length) {
      html.push(`<p>${renderInline(paraBuf.join(" "))}</p>`);
      paraBuf = [];
    }
  }

  function closeLists() {
    while (listStack.length) {
      html.push(`</${listStack.pop().type}>`);
    }
  }

  function flushBlockquote() {
    if (bqBuf.length) {
      html.push(`<blockquote>${mdToHtml(bqBuf.join("\n"))}</blockquote>`);
      bqBuf = [];
    }
    inBlockquote = false;
  }

  while (i < lines.length) {
    const raw = lines[i];
    const line = raw;

    // Fenced code blocks
    const fence = line.match(/^```(\w*)\s*$/);
    if (fence) {
      if (!inCode) {
        flushParagraph();
        closeLists();
        flushBlockquote();
        inCode = true;
        codeLang = fence[1] || "";
        codeBuf = [];
      } else {
        html.push(
          `<pre><code${
            codeLang ? ` class="language-${codeLang}"` : ""
          }>${escapeHtml(codeBuf.join("\n"))}</code></pre>`
        );
        inCode = false;
        codeLang = "";
        codeBuf = [];
      }
      i++;
      continue;
    }
    if (inCode) {
      codeBuf.push(raw);
      i++;
      continue;
    }

    // Blank line
    if (/^\s*$/.test(line)) {
      flushParagraph();
      closeLists();
      flushBlockquote();
      i++;
      continue;
    }

    // Blockquote
    if (/^>\s?/.test(line)) {
      flushParagraph();
      closeLists();
      inBlockquote = true;
      bqBuf.push(line.replace(/^>\s?/, ""));
      i++;
      continue;
    } else if (inBlockquote) {
      flushBlockquote();
    }

    // Headings
    const heading = line.match(/^(#{1,6})\s+(.*)$/);
    if (heading) {
      flushParagraph();
      closeLists();
      const level = heading[1].length;
      const text = heading[2].trim();
      const slug = text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      html.push(
        `<h${level} id="${slug}">${renderInline(text)}</h${level}>`
      );
      i++;
      continue;
    }

    // Horizontal rule
    if (/^\s*(-{3,}|\*{3,}|_{3,})\s*$/.test(line)) {
      flushParagraph();
      closeLists();
      html.push("<hr>");
      i++;
      continue;
    }

    // Tables: header row + separator row
    if (
      line.includes("|") &&
      lines[i + 1] &&
      isTableSeparator(lines[i + 1])
    ) {
      flushParagraph();
      closeLists();
      const headerCells = parseTableRow(line);
      i += 2;
      const rows = [];
      while (i < lines.length && lines[i].includes("|") && lines[i].trim() !== "") {
        rows.push(parseTableRow(lines[i]));
        i++;
      }
      let table = '<div class="table-wrap"><table><thead><tr>';
      table += headerCells
        .map((c) => `<th>${renderInline(c)}</th>`)
        .join("");
      table += "</tr></thead><tbody>";
      for (const row of rows) {
        table += "<tr>" + row.map((c) => `<td>${renderInline(c)}</td>`).join("") + "</tr>";
      }
      table += "</tbody></table></div>";
      html.push(table);
      continue;
    }

    // Ordered list
    const ol = line.match(/^(\s*)\d+\.\s+(.*)$/);
    if (ol) {
      flushParagraph();
      if (!listStack.length || listStack[listStack.length - 1].type !== "ol") {
        closeLists();
        html.push("<ol>");
        listStack.push({ type: "ol" });
      }
      html.push(`<li>${renderInline(ol[2])}</li>`);
      i++;
      continue;
    }

    // Unordered list
    const ul = line.match(/^(\s*)[-*+]\s+(.*)$/);
    if (ul) {
      flushParagraph();
      if (!listStack.length || listStack[listStack.length - 1].type !== "ul") {
        closeLists();
        html.push("<ul>");
        listStack.push({ type: "ul" });
      }
      html.push(`<li>${renderInline(ul[2])}</li>`);
      i++;
      continue;
    }

    // Otherwise, part of a paragraph
    closeLists();
    paraBuf.push(line.trim());
    i++;
  }

  flushParagraph();
  closeLists();
  flushBlockquote();
  if (inCode && codeBuf.length) {
    html.push(`<pre><code>${escapeHtml(codeBuf.join("\n"))}</code></pre>`);
  }

  return html.join("\n");
}

export function parseFrontMatter(raw) {
  const text = raw.replace(/\r\n/g, "\n");
  const match = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return { data: {}, body: text };
  const [, fmBlock, body] = match;
  const data = {};
  for (const line of fmBlock.split("\n")) {
    if (!line.trim()) continue;
    const kv = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (!kv) continue;
    let value = kv[2].trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    data[kv[1]] = value;
  }
  return { data, body };
}
