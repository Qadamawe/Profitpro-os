# Repository Review Against the Operating Contract

Reviewed: 2026-09-20

## Compliant now

- Static GitHub Pages deployment exists on pushes to `main` and supports manual reruns.
- The free calculator loads its public job dataset and has a fallback dataset.
- MailerLite capture is independent of checkout routing and does not store email addresses locally.
- The Core CTA is routed from one public configuration file and uses HTTPS/new-tab protections.
- The $19 and $129 products remain disabled as Coming Soon.
- Paid delivery files and secrets are absent from the working tree and public commit history.
- Ignore rules now block the known paid filenames, workbooks, secrets, keys, and archives.
- Status, runbook, incident, and automation documentation now exist.

## Remaining gaps

- Lemon Squeezy is not production-ready because the checkout remains in Test Mode.
- Gumroad is not configured or tested and cannot yet serve as automatic failover.
- Automatic delivery cannot be tested until at least one provider is live or the owner completes Gumroad signup.
- The MailerLite five-step workflow has not been conclusively verified as active in the provider UI.

## Safe next actions

1. Submit the prepared Lemon Squeezy follow-up after owner contact confirmation.
2. Complete owner-controlled Gumroad signup/verification.
3. Create the private $59 Gumroad product, upload the four paid files, test purchase/delivery, and mark it qualified before any routing change.
4. Verify the MailerLite workflow contains exactly five steps and is active on the free plan.

