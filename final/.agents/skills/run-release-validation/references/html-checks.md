# HTML judgement checks

Read only when an `.html` file changed. The script already covers lang, title, meta description, viewport, landmarks, h1, heading order, inline handlers, image alt, and empty buttons. Do not repeat those. Report each check below as PASS or FAIL for the changed files.

- **Descriptive link and button text**: no "click here", "read more", or "link" as the only label. FAIL if found.
- **Meaningful alt text**: alt text describes the image's purpose and is not a file name. Decorative images use `alt=""`.
- **Form labels**: every `input`, `select`, and `textarea` has a `label`, `aria-label`, or `aria-labelledby`.
- **Duplicate ids**: no `id` value appears twice in one file.
- **Broken local references**: local `href`, `src`, and `#anchor` targets exist (check with a file listing, do not open a browser).
- **Placeholder content**: no "lorem ipsum", "TODO", or "TBD" in visible text.
