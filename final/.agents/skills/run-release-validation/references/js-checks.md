# JavaScript checks

Read only when a `.js` file changed. Report each check below as PASS or FAIL for the changed files, with file and line for every FAIL.

- **Debug output**: no `console.log`, `console.debug`, `debugger`, or `alert`. `console.error` and `console.warn` in real error handling are fine.
- **Unused code**: no unused variables, functions, parameters, or imports, and no commented-out code blocks.
- **Leftover markers**: no `TODO`, `FIXME`, or `XXX`.
- **Selectors exist**: every `querySelector`, `getElementById`, or similar call targets an id or class that exists in the project's HTML.
- **Safe DOM updates**: no `innerHTML` with dynamic content, no `eval`, no `document.write`.
- **Error handling**: network calls and `JSON.parse` have error handling.
- **Declarations**: no `var`, and no implicit globals.
