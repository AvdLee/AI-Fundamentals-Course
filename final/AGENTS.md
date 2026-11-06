# Agents

This is the landing page for Looply, a fictional habit-tracking app used in the AI Fundamentals course.

## Project Overview

- Plain HTML, CSS, and JavaScript. No frameworks, no build step.
- Pages live in the project root (`index.html`, `features.html`).
- Shared styles live in `src/main.css`; shared scripts in `src/main.js`.
- Run locally by opening `index.html` in a browser, or via `npm start`.

## Conventions

### HTML

- Use semantic elements: `header`, `nav`, `main`, `section`, `footer`.
- Every page must include: `lang="en"`, a viewport meta tag, a unique `title`, a `meta description`, and Open Graph tags.
- Headings must follow a logical order (`h1` → `h2` → `h3`) with exactly one `h1` per page.
- Decorative emoji icons must use `aria-hidden="true"`.
- Every page includes the shared navigation with a link to all other pages. Mark the current page with `aria-current="page"`.

### Copy

- Headlines describe a benefit, not the product ("Build tiny habits that stick", not "Welcome to Looply").
- Body copy is concrete and specific. Avoid filler like "a lot of features" or "very good".
- Every page has exactly one primary call to action with a descriptive label ("Start your first habit", never "Click here").
- Tone: encouraging and calm. No pressure, no guilt.

### CSS

- Use the custom properties defined in `:root` for colors and sizing.
- Text colors must meet WCAG AA contrast against their background.
- Keep the layout responsive; verify pages at mobile width.

### JavaScript

- Keep JavaScript minimal and progressive: pages must work without it.
- No `console.log` statements in committed code.
- No inline event handlers (`onclick="..."`); use `addEventListener`.

## Adding a New Page

Follow the `new-marketing-page` skill in `.agents/skills/new-marketing-page/`.

## Validation

Before finishing a task:

1. Open every changed page in a browser and verify it renders correctly.
2. Check the required meta tags are present and unique per page.
3. Verify navigation links between all pages still work.
4. Check heading order and contrast when HTML or CSS changed.
