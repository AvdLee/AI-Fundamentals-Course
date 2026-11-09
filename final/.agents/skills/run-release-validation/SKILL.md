---
name: run-release-validation
description: Validates a web project before release by checking only the HTML, CSS, and JavaScript files that changed compared to main, then reports pass, fail, or skipped per check and an overall go or no-go. Use when the user says "run release validation", "is this ready to release", or asks for a pre-release check.
disable-model-invocation: true
---

# Run release validation

Read-only: never edit, create, format, or delete project files, and do not run tests or builds.

## 1. Find changed files

```bash
git diff --name-only main...HEAD; git diff --name-only HEAD; git ls-files --others --exclude-standard
```

Combine and deduplicate the output. Ignore `node_modules/`, `.git/`, and `.agents/`. Group the rest by extension: `.html`, `.css`, `.js`. Other types are out of scope. If none of the three types changed, report every check as skipped and the result as **GO** (nothing to validate).

## 2. Run only the matching checks

Each type runs only when a file of that type changed. Otherwise mark all its checks as skipped.

- **`.html` changed**: run `node .agents/skills/run-release-validation/scripts/html-checks.mjs <changed .html files>`. Each output line is one check with PASS or FAIL. Only then read [references/html-checks.md](references/html-checks.md) for the judgement checks the script cannot do.
- **`.css` changed**: only then read [references/css-checks.md](references/css-checks.md) and apply it to the changed `.css` files.
- **`.js` changed**: only then read [references/js-checks.md](references/js-checks.md) and apply it to the changed `.js` files.

Do not read a reference file whose file type did not change.

## 3. Report

One line per check, using exactly these statuses: `PASS`, `FAIL`, `SKIPPED`. Add file and line for every FAIL.

```
HTML  PASS    title length 10-60
HTML  FAIL    heading order without jumps (index.html:27, h1 -> h3)
CSS   SKIPPED no .css file changed
JS    SKIPPED no .js file changed

Overall: NO-GO (1 failing check)
```

Overall is **NO-GO** if any check is FAIL, otherwise **GO**. SKIPPED never blocks a GO. End with the list of failing checks and the files to fix, without applying fixes.
