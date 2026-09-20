# ProfitPro OS Operating Contract

## Scope

These instructions apply to this repository and every path below it. They are the standing operating policy for humans and automation working on ProfitPro OS. Platform safety rules and runtime permission boundaries still apply.

## Mission

Keep ProfitPro OS live, functional, secure, capable of capturing leads, and capable of selling and automatically delivering its products with minimal human supervision.

## Normal authority

Proceed without asking the owner when the action is reversible, tested, and within this repository or an already-approved connected service:

- Diagnose and fix repository bugs, responsive issues, calculator defects, and MailerLite integration failures.
- Run local tests, production browser checks, and deployment checks.
- Make small, safe code and documentation improvements.
- Commit and push tested fixes to `main`.
- Re-run or repair failed GitHub Pages deployments.
- Roll back the smallest relevant deployment when production is broken and rollback is safer than a forward fix.
- Maintain `ops/system-status.md` and `ops/incident-log.md`.
- Follow up on existing vendor support cases using wording already approved by the owner.
- Maintain and test the checkout-provider abstraction.
- Switch to an already-configured and already-tested backup checkout when the active provider is unavailable, but only when the product and price are identical.

## Owner approval required

Stop and request owner action or approval for:

- Banking or payout-destination changes.
- Tax, legal, or identity-verification decisions.
- Passwords, passkeys, 2FA, CAPTCHA, recovery codes, or account recovery.
- Spending money or starting/upgrading a paid subscription.
- Product price changes. ProfitPro OS Core remains **$59 one-time** unless the owner explicitly changes it.
- Creating a materially different paid product.
- Refunds, chargebacks, or disputes requiring judgment.
- Domain ownership transfers.
- Deleting customer records or paid product data.
- Destructive changes that cannot be safely rolled back.
- Low-confidence actions that could harm money, customer data, access, or deliverability.

## Non-negotiable boundaries

- Never commit API keys, passwords, tokens, customer data, private keys, paid files, or delivery bundles.
- The public repository contains only the marketing site, free calculator data, public configuration, tests, workflows, and operational documentation.
- MailerLite remains independent of checkout providers. Changing checkout routing must not change `#leadForm` or its MailerLite endpoint.
- Keep the $19 Script Vault and $129 ProfitPro Pro disabled as **Coming Soon** unless the owner explicitly authorizes launch.
- Do not activate an untested provider or an unpublished product.
- Do not treat a test-mode checkout as a production-capable provider.

## Standard operating loop

1. Read `ops/system-status.md`, the newest entries in `ops/incident-log.md`, and the current diff.
2. Reproduce the issue and identify the smallest reversible fix.
3. Run syntax/static checks and the production health check in `scripts/health-check.mjs`.
4. Test the affected behavior in a browser. For deployments, verify desktop and a mobile viewport.
5. Confirm that no secrets or paid assets are staged.
6. Commit with a concise outcome-focused message and push `main`.
7. Verify the GitHub Pages workflow and the production URL.
8. After every deployment verify:
   - homepage loads;
   - calculator loads job data and recalculates;
   - MailerLite form is still wired correctly without storing addresses locally;
   - the $59 Core checkout resolves to the configured provider in a secure new tab;
   - both Coming Soon products remain disabled;
   - the mobile layout has no horizontal overflow or unusable controls.
9. Update `ops/system-status.md`. Add an incident-log entry only for meaningful failures, provider changes, rollbacks, security findings, or revenue-impacting events.

## Checkout failover policy

- The single public routing source is `checkout-config.js`.
- `provider` identifies the active provider and `coreUrl` contains its HTTPS checkout URL.
- A backup may be activated only after its account, $59 one-time product, delivery files, checkout, and customer delivery have been tested successfully.
- Record successful qualification in `ops/system-status.md` before switching.
- A switch changes only `provider` and `coreUrl`; it must not modify price, product copy, MailerLite, calculator logic, or paid files.
- After switching, deploy and perform the complete post-deployment verification loop.
- If neither provider is safe, disable the Core CTA, preserve lead capture, log the incident, and notify the owner.

## Incident response

- Prefer forward fixes for isolated bugs and rollback for broad or unclear production regressions.
- Never rewrite public history to recover production.
- Use `git revert` for rollback unless there is a documented reason not to.
- Record date/time, impact, diagnosis, action, result, and follow-up in `ops/incident-log.md`.
- Report only meaningful outcomes, blockers, revenue-impacting incidents, or owner decisions.

## Vendor support

- Existing approved escalation wording may be reused for follow-ups.
- Do not alter identity, payout, tax, product price, or legal information while following up.
- If a vendor remains blocked, continue qualification of the configured backup instead of waiting indefinitely.

