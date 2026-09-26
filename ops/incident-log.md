# ProfitPro OS Incident Log

Record meaningful service failures, revenue-impacting problems, provider switches, rollbacks, and security findings. Do not record customer data, credentials, or routine successful checks.

| Date (America/Chicago) | Problem/impact | Action | Result/follow-up |
| --- | --- | --- | --- |
| 2026-09-09 | Lemon Squeezy store activation submitted; Core checkout could not accept live payments while review remained pending. | Completed identity/business/product setup and submitted activation. | Store remained in Test Mode. |
| 2026-09 (earlier) | Lemon Squeezy approval remained stalled after submission. | Submitted an official support escalation with the live ProfitPro site. | No activation; follow-up required. |
| 2026-09-20 | Lemon Squeezy remained a single point of failure and public checkout was still in Test Mode. | Added provider routing through `checkout-config.js`; began Gumroad fallback preparation; verified paid files were never present in public Git history. | Site behavior preserved. Gumroad qualification is blocked on owner signup/verification. Lemon follow-up is prepared but not yet submitted. |
| 2026-09-20 | The autonomous operations framework initially could not deploy because the local Git client had no GitHub credential. | Used the existing authorized GitHub repository connection to publish the tested commits, then verified GitHub Pages and the live funnel. | Resolved. Pages deployment succeeded and the live health check passed. |
| 2026-09-23 | No checkout provider was production-ready, so Core still could not accept live payments. | Created an unpublished Gumroad Core product at $59, saved the approved description, and uploaded the four private delivery files directly to Gumroad. | Gumroad setup is preserved privately. Owner must connect a payout method before publishing and end-to-end checkout/delivery testing; the public site remains unchanged. |
| 2026-09-25 | Lemon Squeezy remained in Test Mode, preventing live Core sales. | Connected the owner-completed Gumroad payout setup, published the identical $59 Core product, completed Gumroad's no-charge creator test purchase, verified all four files on the customer delivery page, and routed `checkout-config.js` to Gumroad. | Gumroad qualified as the active provider; deploy and production verification completed. Lemon Squeezy remains an inactive, unqualified backup. |
