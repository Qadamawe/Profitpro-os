# ProfitPro OS Incident Log

Record meaningful service failures, revenue-impacting problems, provider switches, rollbacks, and security findings. Do not record customer data, credentials, or routine successful checks.

| Date (America/Chicago) | Problem/impact | Action | Result/follow-up |
| --- | --- | --- | --- |
| 2026-09-09 | Lemon Squeezy store activation submitted; Core checkout could not accept live payments while review remained pending. | Completed identity/business/product setup and submitted activation. | Store remained in Test Mode. |
| 2026-09 (earlier) | Lemon Squeezy approval remained stalled after submission. | Submitted an official support escalation with the live ProfitPro site. | No activation; follow-up required. |
| 2026-09-20 | Lemon Squeezy remained a single point of failure and public checkout was still in Test Mode. | Added provider routing through `checkout-config.js`; began Gumroad fallback preparation; verified paid files were never present in public Git history. | Site behavior preserved. Gumroad qualification is blocked on owner signup/verification. Lemon follow-up is prepared but not yet submitted. |
| 2026-09-20 | The autonomous operations framework could not be deployed because the local Git client had no GitHub credential. | Completed local tests and attempted a direct push to `main`. | Push was rejected before any remote change. Connect GitHub authentication once, then push the two tested commits. |
