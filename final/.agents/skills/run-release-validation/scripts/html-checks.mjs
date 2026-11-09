#!/usr/bin/env node
// Objective HTML release checks. Dependency-free, read-only.
// Usage: node html-checks.mjs <file.html> [more.html ...]
// Output: one line per check: "<file> | PASS|FAIL | <check> | <detail>"
// Exit code: 0 when every check passes, 1 when any check fails, 2 on usage error.
import { readFileSync } from "node:fs";

const files = process.argv.slice(2);
if (files.length === 0) {
  console.error("Usage: node html-checks.mjs <file.html> [more.html ...]");
  process.exit(2);
}

const lineOf = (src, index) => src.slice(0, index).split("\n").length;
const strip = (s) => s.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();
const attr = (tag, name) => {
  const m = tag.match(new RegExp(`\\s${name}\\s*=\\s*("([^"]*)"|'([^']*)'|([^\\s>]+))`, "i"));
  return m ? (m[2] ?? m[3] ?? m[4] ?? "") : null;
};

let failed = false;

for (const file of files) {
  let raw;
  try {
    raw = readFileSync(file, "utf8");
  } catch (error) {
    console.log(`${file} | FAIL | readable | ${error.message}`);
    failed = true;
    continue;
  }

  // Blank out comments, scripts and styles (keeping offsets) so they never produce matches.
  const blank = (m) => m.replace(/[^\n]/g, " ");
  const src = raw
    .replace(/<!--[\s\S]*?-->/g, blank)
    .replace(/<script\b[\s\S]*?<\/script>/gi, blank)
    .replace(/<style\b[\s\S]*?<\/style>/gi, blank);

  const results = [];
  const add = (check, ok, detail) => results.push({ check, ok, detail });

  // lang
  const htmlTag = src.match(/<html\b[^>]*>/i);
  const lang = htmlTag ? attr(htmlTag[0], "lang") : null;
  add("lang attribute", !!lang, lang ? `lang="${lang}"` : "<html> has no non-empty lang attribute");

  // title length 10-60
  const title = src.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i);
  const titleText = title ? strip(title[1]) : null;
  add(
    "title length 10-60",
    titleText !== null && titleText.length >= 10 && titleText.length <= 60,
    titleText === null ? "no <title>" : `"${titleText}" is ${titleText.length} characters`
  );

  // meta description
  const metas = src.match(/<meta\b[^>]*>/gi) ?? [];
  const desc = metas.find((m) => (attr(m, "name") ?? "").toLowerCase() === "description");
  const descText = desc ? (attr(desc, "content") ?? "").trim() : "";
  add("meta description", descText.length > 0, descText ? `${descText.length} characters` : "missing or empty");

  // viewport
  const viewport = metas.find((m) => (attr(m, "name") ?? "").toLowerCase() === "viewport");
  const viewportContent = viewport ? attr(viewport, "content") ?? "" : "";
  add(
    "viewport meta",
    /width\s*=\s*device-width/i.test(viewportContent),
    viewport ? `content="${viewportContent}"` : "missing <meta name=\"viewport\">"
  );

  // landmarks
  for (const tag of ["header", "nav", "main", "footer"]) {
    const found = new RegExp(`<${tag}\\b`, "i").test(src);
    add(`<${tag}> landmark`, found, found ? "present" : `no <${tag}> element`);
  }

  // headings
  const headings = [...src.matchAll(/<h([1-6])\b[^>]*>/gi)].map((m) => ({ level: Number(m[1]), line: lineOf(src, m.index) }));
  const h1s = headings.filter((h) => h.level === 1);
  add("exactly one <h1>", h1s.length === 1, `found ${h1s.length}`);

  const jumps = [];
  let previous = 0;
  for (const h of headings) {
    if (previous > 0 && h.level > previous + 1) jumps.push(`h${previous} -> h${h.level} (line ${h.line})`);
    previous = h.level;
  }
  add("heading order without jumps", jumps.length === 0, jumps.length ? jumps.join(", ") : "no jumps");

  // inline on* handlers
  const inline = [];
  for (const m of src.matchAll(/<[a-zA-Z][^>]*>/g)) {
    const found = m[0].match(/\s(on[a-z]+)\s*=/gi);
    if (found) inline.push(`${found.map((f) => f.trim().replace(/\s*=$/, "")).join(", ")} (line ${lineOf(src, m.index)})`);
  }
  add("no inline on* handlers", inline.length === 0, inline.length ? inline.join("; ") : "none");

  // images without alt (alt="" is valid for decorative images)
  const noAlt = [...src.matchAll(/<img\b[^>]*>/gi)]
    .filter((m) => attr(m[0], "alt") === null)
    .map((m) => `line ${lineOf(src, m.index)}`);
  add("images have alt", noAlt.length === 0, noAlt.length ? `<img> without alt at ${noAlt.join(", ")}` : "all images have alt");

  // buttons without text
  const emptyButtons = [...src.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/gi)]
    .filter((m) => {
      const hasLabel = (attr(m[0], "aria-label") ?? "").trim() || (attr(m[0], "aria-labelledby") ?? "").trim();
      const hasImgAlt = /<img\b[^>]*\salt\s*=\s*["'][^"']+["']/i.test(m[2]);
      return !hasLabel && !hasImgAlt && strip(m[2]) === "";
    })
    .map((m) => `line ${lineOf(src, m.index)}`);
  add("buttons have text", emptyButtons.length === 0, emptyButtons.length ? `empty <button> at ${emptyButtons.join(", ")}` : "all buttons have text");

  for (const r of results) {
    if (!r.ok) failed = true;
    console.log(`${file} | ${r.ok ? "PASS" : "FAIL"} | ${r.check} | ${r.detail}`);
  }
}

process.exit(failed ? 1 : 0);
