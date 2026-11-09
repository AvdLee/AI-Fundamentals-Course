import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// Add every page of your project here.
const pages = ["index.html", "features.html"];

const titles = [];

for (const page of pages) {
  const html = readFileSync(page, "utf8");
  titles.push(html.match(/<title>(.*?)<\/title>/)?.[1]);

  test(`${page} has exactly one h1`, () => {
    assert.equal(html.match(/<h1[\s>]/g)?.length, 1, "expected exactly one h1");
  });

  test(`${page} has the required metadata`, () => {
    assert.ok(/<html[^>]*\slang="en"/.test(html), 'missing lang="en" on html');
    assert.ok(/<meta[^>]*name="viewport"/.test(html), "missing viewport meta tag");
    assert.ok(/<meta[^>]*name="description"/.test(html), "missing meta description");
    assert.ok(/<meta[^>]*property="og:title"/.test(html), "missing Open Graph title");
    assert.ok(/<meta[^>]*property="og:description"/.test(html), "missing Open Graph description");
  });

  test(`${page} has no inline event handlers`, () => {
    assert.ok(!/\son[a-z]+\s*=/i.test(html), "found an inline event handler");
  });
}

test("every page has a unique title", () => {
  assert.ok(titles.every(Boolean), "a page has no title");
  assert.equal(new Set(titles).size, pages.length, "page titles are not unique");
});
