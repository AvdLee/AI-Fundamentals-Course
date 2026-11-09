# Changelog

## November 2026

- Added a validation loop to `final/`: ESLint and Prettier configuration (including a `no-console` rule), a test for the pages (`tests/pages.test.js`), `scripts/validate.sh`, and a matching validation step in `AGENTS.md`. The module 7 lesson on lint, format, test, and fix walks through setting this up in your own project.
- Added the `run-release-validation` skill to `final/.agents/skills/`, and updated the `new-marketing-page` skill to add new pages to the tests.
- Added the missing `aria-current="page"` on the home page link in `final/index.html`, and a rule in `final/AGENTS.md` about not adding new dependencies.
- Initial public release of the Looply sample project with a `starter/` and `final/` version of the landing page, including `AGENTS.md` and example agent skills.
