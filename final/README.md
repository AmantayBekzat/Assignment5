# Pocket Ledger - Assignment 5

Small local expense tracker with fictional sample data, monthly USD budget, category totals, add/remove and month filtering. This project was created for Assignment5, preserved as a working baseline, then audited; no older student repository was supplied.

## Run and check
Node >=20 and npm. Verified here: Node v25.9.0, npm11.12.1. No third-party dependencies or environment variables.
```
npm ci --ignore-scripts --offline
npm test
npm run check
node --check src/moneyInputAdapter.mjs
npm run build
```
Open dist/Pocket_Ledger.html directly in a browser. Top-level ../Pocket_Ledger.html is the same final build. No server required. Clean offline install, syntax checks and build passed. Tests: baseline14/14, final31/31; browser12/12. No linter/static type checker or CI configured.

## Map
index.html/style.css -> src/app.mjs -> src/domain.mjs -> src/moneyInputAdapter.mjs.
Tests: test/*.test.mjs. Build: build.mjs inlines native modules into one offline HTML file. Read AGENTS.md before any agent edits.

## Behavior and limits
Amounts: canonical unsigned decimal text, at most2 decimal places, USD0.01..1,000,000.00 per expense. Budget permits zero. Whitespace, exponent, comma and negative input rejected. Calculations use integer cents. Description is literal text, max80characters. Data persists for the current page session only; refresh resets to three samples. No payments, external services or account data.
Date input is a browser date control; direct domain calls still accept impossible dates matching YYYY-MM-DD. Imports/API expansion is blocked pending R3 repair. This is a fictional classroom demo, not a financial archive.

## Audit
../docs/: risk register, criteria, pattern, mitigation records, readiness Level2, background safeguards, conditional release and reflection.
../evidence/: actual before/after logs, browser screenshots/script, baseline hashes and diff. Student verified three UI cases and requested the implemented red error alert. Independent approval of the complete audit remains pending. No deployment or submission performed.
