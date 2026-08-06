# Wikipedia Playwright Reference Project

[![Playwright Smoke](https://github.com/testomut/WikiAutoTestsPlaywright/actions/workflows/playwright.yml/badge.svg)](https://github.com/testomut/WikiAutoTestsPlaywright/actions/workflows/playwright.yml)

This repository is the Playwright counterpart of my [Cypress Wikipedia reference project](https://github.com/testomut/WikiAutoTestsCypress). Both projects use the same functional scenarios to demonstrate how test structure, locators, configuration, reporting, debugging, and CI differ between Cypress and Playwright.

## Related implementation

Cypress version: [testomut/WikiAutoTestsCypress](https://github.com/testomut/WikiAutoTestsCypress) - same scenarios (navigation, search, authentication, sandbox editing, language switching), the same functional scope and the same principle of separating stable smoke checks from live-site examples, implemented with Cypress instead.

## Cypress vs. Playwright, as implemented here

Specific, code-level differences between the two repos - not a general framework comparison:

- **Chaining vs. async/await** - Cypress specs read as `cy.get(...).should(...)` chains; this repo's page objects are plain `async`/`await` with explicit `Locator`/`expect` calls.
- **Auto-waiting** - Playwright's `Locator` actions auto-wait for actionability, but it isn't a silver bullet: this repo still has one fixed `waitForTimeout` for a dialog's render timing, same as the Cypress project's own fixed `cy.wait()` calls for the same kind of problem.
- **Debugging artifacts** - Cypress here relies on video/screenshot capture plus a Mochawesome HTML report; this repo uses Playwright's trace viewer (`retain-on-failure`) plus screenshots and its own HTML report - a full step-by-step DOM/network/console recording, not just a video.
- **Configuration** - the Cypress project stays in JS with JSDoc (documented as a deliberate size-based choice in its `ARCHITECTURE.md`); this one uses TypeScript directly with `tsc --noEmit` as its own CI step.
- **CI** - the Cypress workflow caches the Cypress binary via `actions/cache` before `npm ci`; this one installs browsers with Playwright's own `npx playwright install --with-deps`, which is the tool's standard CI setup rather than a cacheable binary download.

## What this project demonstrates

- Page Object Model with Playwright's own `test.extend()` fixtures, instead of a separate test-setup layer
- A small deterministic smoke suite kept apart from live-site examples
- Environment-based configuration (`baseURL`, credentials) instead of hardcoded URLs
- Trace and screenshot capture wired for failure triage, not just a default reporter
- A CI workflow that only runs what's actually stable

## Stack

Playwright, TypeScript, ESLint + Prettier, GitHub Actions.

## Project structure

```
e2e/
  smoke/      navigation + search - runs in CI, no credentials needed
  examples/   authentication, editing, language switching - run manually
pageObjects/  one class per page/feature area
fixtures/     Playwright fixtures wiring page objects into tests
```

## Smoke tests versus examples

`e2e/smoke/` is what runs in CI on every push: navigation and search, both credential-free and stable enough to gate on. `e2e/examples/` covers login, sandbox editing, and language switching - these are real, working Playwright tests, but they depend on things this repo doesn't control: a Wikipedia account, Wikipedia's own login flow (which may ask for email verification), anti-abuse checks on the shared `Wikipedia:Sandbox` page, and a language-switcher widget that's more prone to UI drift than plain navigation. A red run in `test:examples` may be caused by Wikipedia UI changes, authentication requirements, anti-abuse checks, shared state, or a regression in the test code. These scenarios are therefore reviewed manually rather than used as a CI gate.

## Installation

```bash
git clone https://github.com/testomut/WikiAutoTestsPlaywright.git
cd WikiAutoTestsPlaywright
npm ci
npx playwright install chromium
```

## Environment setup

Copy `.env.example` to `.env` and fill in a disposable Wikipedia account if you want to run the examples suite:

```bash
cp .env.example .env
```

`e2e/smoke` needs none of this.

## Commands

| Command                                 | What it does                                                |
| --------------------------------------- | ----------------------------------------------------------- |
| `npm test`                              | Smoke suite, headless                                       |
| `npm run test:smoke`                    | Same as above, explicit                                     |
| `npm run test:examples`                 | Login, editing, language examples (needs `.env`)            |
| `npm run test:all`                      | Everything                                                  |
| `npm run test:headed`                   | Smoke suite, headed                                         |
| `npm run test:debug`                    | Smoke suite, Playwright inspector                           |
| `npm run test:ui`                       | Playwright's UI mode                                        |
| `npm run lint` / `format` / `typecheck` | ESLint / Prettier / `tsc --noEmit`                          |
| `npm run test:ci`                       | Lint + format check + typecheck + smoke suite, what CI runs |

## Reports and traces

Each run writes an HTML report to `playwright-report/` (`npx playwright show-report` to open it). Traces and screenshots are kept on failure only (`retain-on-failure` / `only-on-failure` in `playwright.config.ts`) - open a trace with `npx playwright show-trace <path>`.

## Live-site limitations

This isn't a Wikipedia QA suite. Wikipedia is a live third-party system I don't control, and the examples suite can fail for reasons that have nothing to do with this code: UI changes, CAPTCHA, rate limits, other anti-abuse mechanisms, or shared state on the sandbox page. The smoke suite is scoped to what stays stable.

## Author

Stanislav Mokshyn - [github.com/testomut](https://github.com/testomut)

## License

[MIT](./LICENSE)
