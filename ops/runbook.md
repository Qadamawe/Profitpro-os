# ProfitPro OS Operations Runbook

## Routine production check

1. Run `node scripts/health-check.mjs` from the repository root.
2. Check the latest GitHub Pages deployment on `main`.
3. Open the live site on desktop and at approximately 390×844.
4. Change calculator inputs and confirm the quote and profit outputs update.
5. Confirm the lead form still posts to the configured MailerLite public form endpoint and no code uses `localStorage` for email addresses. Do not create synthetic subscribers unless a designated test address exists.
6. Confirm the Core CTA opens an HTTPS checkout in a secure new tab and shows the exact $59 Core product.
7. Confirm Script Vault and ProfitPro Pro remain disabled as Coming Soon.
8. Update `ops/system-status.md` only when state changes.

## Deployment

1. Sync `main` and inspect the diff.
2. Run:
   - `node --check app.js`
   - `node --check checkout-config.js`
   - `node scripts/health-check.mjs http://127.0.0.1:4173/` while a local static server is running
3. Perform browser checks on desktop and mobile.
4. Scan the staged file list for secrets, workbooks, paid filenames, archives, and customer data.
5. Commit and push `main`.
6. Verify GitHub Pages succeeds and repeat the production check.

## Failed deployment recovery

1. Inspect the failed workflow step and recent commit diff.
2. Re-run a transient failure once.
3. If failure is deterministic, fix forward when the cause is small and clear.
4. If production is broken or the cause is broad, revert the smallest offending commit and push.
5. Verify production and log the incident.

## Checkout provider switch

1. Confirm the backup is marked safe in the qualified-provider registry in `ops/system-status.md`.
2. Confirm the backup checkout displays the same product and **$59 one-time** price and automatically delivers all four Core files.
3. Edit only `provider` and `coreUrl` in `checkout-config.js`.
4. Run local desktop/mobile checks and the health script.
5. Deploy, verify checkout end to end, and update status/incident records.
6. If validation fails, revert the routing commit immediately.

## Lead-capture recovery

- MailerLite is independent from checkout routing.
- Preserve the form field name `email`, asynchronous submission, processing-state button lock, success/error messages, and the rule against local email storage.
- Do not place MailerLite API keys in client code. Use only the public form endpoint intended for browser submissions.

## Vendor escalation

- Reuse only previously approved case wording and verified dates/status.
- Include the live site URL and exact observed blocker.
- Never change identity, payout, tax, pricing, or product files as part of a support follow-up.
- Human completion is required for login, password, passkey, 2FA, CAPTCHA, identity, or final-send confirmation when the platform requires it.

## Sensitive asset boundary

The paid Core bundle consists of:

- `customer-scripts.md`
- `job-pricing-database.csv`
- `ProfitPro-OS-Core.xlsx`
- `START-HERE.md`

These files belong only in approved private delivery systems. Never copy them into this repository, a GitHub issue, logs, screenshots, or public build artifacts.

