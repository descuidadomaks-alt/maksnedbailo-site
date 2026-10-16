# Purchasing V3 contract — 3.0.0

V3 is an owner-review tool, not an automatic supplier order. KeyCRM remains the record of sales, reservations and stock. The current web interface reads a saved CRM snapshot; scheduled CRM refresh and supplier submission are not implemented.

## Boundaries

- `engine.js`: pure deterministic calculation and input validation, independent of browser, Telegram, storage and LLM.
- `patterns.js`: migration and proposals from previous owner decisions. Repeated comments are evidence for review, not automatically adopted global policy.
- `parser.js`: whole-document adapters, identity matching, saved approved name/SKU mappings. An unconfirmed suggestion is never a match.
- `server.js`: authentication, compare-and-swap saves, immutable recovery copies, original documents and version exports.
- `app.js`: owner review, grouped decisions and explanations. A future Telegram adapter can call the same contract. Planned Python implementation must reproduce the tested contract before switching engines.

## Inputs and calculation

Daily baseline is `(observed sales over 28 complete days - explicitly excluded one-off historical units) / 28`. Recurring wholesale is not removed automatically. Missing current stock is unknown, not zero. Free CRM stock already excludes reservations.

Parameters are review interval, new-order lead time, delay-buffer days and positive-order minimum. For every day through lead + review + delay buffer, apply one effective demand multiplier, dated incremental commitments and inbound quantities arriving by that day. Compute the largest inventory gap from the new delivery date onward. A shortage before that date is a separate urgency warning, not a promise that the normal delivery fixes it.

An assortment floor is a minimum free-stock target during the regular lead + review interval. Take the maximum of that requirement and the buffered baseline requirement; do not blindly add both safety allowances. Floor semantics must be confirmed with the owner for each relevant policy.

Positive-order minimum is 5 by default: 0 remains 0; 1–4 becomes 5; 6 remains 6. SKU/category exceptions are explicit rules. It is not rounding to multiples of five, a supplier MOQ, or a warehouse-stock floor. An owner can choose a different current-order quantity with a reason.

## Separate layers

1. Baseline demand and free inventory.
2. Dated season/promotion demand multiplier, scoped to SKU/category/brand.
3. Delivery lead time and actual purchase ETA. Unknown ETA remains visible and is not guaranteed timely inventory.
4. Dated confirmed incremental B2B demand, not already represented by ordinary demand or CRM reservation.
5. Optional wholesale-risk reserve, shown outside the primary recommendation until the owner chooses it.
6. Assortment floor, positive-order minimum and explicit purchasing prohibition.
7. Human decision, separate from the recommendation and from permanent rules.

For the same rule component and date, SKU > category > brand > global; within equal specificity, highest explicit priority wins. Equal-priority conflicting values block the affected recommendation. Demand multipliers do not silently compound. No multiplier is applied to a separately dated B2B commitment.

## Identity and already ordered stock

One purchase number per brand, one remaining quantity = ordered - received already represented in the CRM snapshot - cancelled. A form and invoice for the same batch replace/update that purchase, never add a second batch. Different warehouse orders may legitimately contain the same products; overlapping batches require explicit confirmation. A file hash cannot count twice.

Receiving after the snapshot date requires a refreshed CRM snapshot before treating inventory as current. A paid/proforma invoice alone proves neither shipment nor ETA. Unknown/overdue ETA is shown separately; a new approval for an affected product requires explicit acknowledgement of duplicate-purchase risk.

Base.com/Cosmetic Hub text PDF is read across all pages. Quantity is identified geometrically, line price × quantity is checked, service/freight rows and totals are excluded. Original files are archived first. Exact unique SKU/EAN, exact unique name, or previously approved mapping may match. Suggested names require user action. Scanned or unsupported layouts return an actionable message and retain the original.

Old/new SKU pairs found in owner comments are pending proposals. Confirming a pair requires one total current-order quantity; the old purchasing record is disabled, historical decisions archived, mappings remembered, and already recorded inbound moved to the chosen identity. Different products can explicitly reject the proposed pair.

## Review and persistence

- V2 is not modified. Its complete state is privately archived; quantities/comments and version links migrate to V3 as previous decisions, not fabricated fresh approvals.
- Quick OK accepts the visible current quantity. Changed quantities need a reason. A group can confirm selected products for the current purchase; it does not create a standing seasonal quantity.
- Review fingerprint belongs to one product's actual numerical inputs, dated effects and stock. Notes, tab changes, completeness flags and unrelated products do not invalidate it. An actual input change marks only affected approvals for review, while keeping quantities and reasons.
- Debounced autosave, serialized requests, server ETag compare-and-swap, local recovery draft, and immutable server recovery copies. A concurrent-device conflict stops overwrite and preserves the local draft for download/review.
- Explicit versions contain dataset, inputs, result, engine version, rulebook fingerprint and comparison; an XLSX copy is saved privately on the server. Email/Drive delivery is not automatically connected.
- Version history is append-only; no automatic deletion/retention job. Runtime updates are explicit releases; old source is preserved in Git and old calculation snapshots retain their engine version.

## Validation and future changes

Tests cover actual baseline, timely/late/undated/part-received inbound, rule conflicts, minimum exceptions, floor versus buffer, optional risk, reservation deduplication, affected-SKU review, migration, original document totals, file deduplication, multi-device conflict, server persistence and UI scroll behavior. These are implementation checks, not proof of predictive accuracy.

Changes follow: evidence/owner decision → draft rule with scope/dates/source → test representative and boundary cases → save immutable before/after version → owner review → release/version change. One outlier is not a universal rule. Backtesting uses only data known at the historical decision date.

Daily anomaly monitoring is a separate future agent workflow. A provisional large-order threshold is an alert criterion, not a rule to remove all wholesale demand. Recent 7/14-day trends, customer repeat cadence and stockout-adjusted demand require order-level and availability history; the current 28-day aggregate cannot establish those patterns.
