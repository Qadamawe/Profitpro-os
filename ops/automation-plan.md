# ProfitPro OS Automation Plan

## Minimum automation set

### 1. Repository production health check

- **Mechanism:** GitHub Actions workflow `health-check.yml`.
- **Frequency:** After every push to `main`, every six hours, and on demand.
- **Purpose:** Detect homepage, public asset, calculator-data, MailerLite wiring, checkout-routing, price-label, and mobile-CSS regressions without writing customer data.
- **Failure behavior:** Mark the workflow failed so the daily operator can diagnose and repair it.
- **Deployment status:** Deployed to `main`; local and live health checks pass.

### 2. Daily autonomous operator

- **Mechanism:** One Codex automation attached to the ProfitPro operating thread.
- **Frequency:** Daily.
- **Purpose:** Read `AGENTS.md`, inspect deployment and health results, verify the live funnel, repair safe failures, maintain status/incident records, and pursue approved vendor/fallback work.
- **Notifications:** Meaningful outcomes and failures only.
- **Configuration status:** Configured for 08:00 local time with failed-run-only notifications.

No separate hourly checkout, deployment, MailerLite, and security automations are needed. A single daily operator plus the lightweight six-hour health workflow minimizes duplication and notification noise.
