# CSS checks

Read only when a `.css` file changed. Report each check below as PASS or FAIL for the changed files.

- **Text contrast (WCAG AA)**: for every rule that sets `color`, find the background it renders on (same rule, parent rule, or `body`). Calculate the contrast ratio. Normal text needs at least 4.5:1, large text (24px, or 18.66px bold) at least 3:1. FAIL with the selector, both colors, and the ratio. Check hover and focus states too.
- **Visible focus**: no `outline: none` or `outline: 0` without a replacement focus style.
- **Readable sizes**: body text is at least 16px (1rem), and font sizes are not smaller than 12px.
- **Responsive layout**: fixed pixel widths on containers have a `max-width` or a media query so nothing overflows on mobile.
- **Leftovers**: no `!important` without a reason, empty rules, or commented-out blocks.
- **Unused selectors**: class selectors that match no class in the project's HTML. Report these as FAIL only when all HTML files were searched.
