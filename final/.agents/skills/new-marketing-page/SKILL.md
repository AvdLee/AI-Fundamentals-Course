---
name: new-marketing-page
description: Create a new marketing page for the Looply landing site following the project conventions. Use when asked to add a new page, such as a press page, team page, or campaign page.
---

# New Marketing Page

Create a new page for the Looply landing site that matches the existing pages in structure, tone, and quality.

## Required Inputs

Before creating the page, make sure you know:

- **Page goal** -- what should a visitor understand or do after reading it?
- **Audience** -- new visitors, existing users, press, or something else?
- **Primary call to action** -- one action, with a descriptive label.

If any of these are missing, ask for them first.

## Workflow

1. Read `AGENTS.md` and one existing page (`index.html` or `features.html`) to match conventions.
2. Create `<page-name>.html` in the project root.
3. Include everything required by `AGENTS.md`:
   - `lang="en"`, viewport meta, unique `title`, `meta description`, and Open Graph tags.
   - Semantic structure: `header` with shared navigation, `main` with sections, `footer`.
   - One `h1` with a benefit-driven headline and a logical heading order below it.
   - Exactly one primary call to action.
4. Reuse `src/main.css` classes. Only add new styles when no existing class fits.
5. Add the new page to the navigation of **all** existing pages, and mark it with `aria-current="page"` on the new page itself.

## Validation

- Open the new page in a browser and verify layout at desktop and mobile width.
- Verify all navigation links work in both directions.
- Check the copy against the tone rules in `AGENTS.md`: concrete, benefit-driven, no filler.
