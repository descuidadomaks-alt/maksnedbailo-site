## Next purchasing cycle

A completed owner review is an archive, not a new order. Preparing the next cycle preserves owner comments as knowledge, saves old quantities in history, resolves explicit SKU corrections, carries forward confirmed policies and open supplier purchases, and clears the new order decisions. The homepage waits for a strictly newer CRM snapshot. A preparation does not create another forecast from the old data.

Snapshot updates use immutable dataset files and a single conditional meeting-head pointer. Archiving, refresh and calculation are separate transitions. A refresh keeps open purchases and policy; the calculation is re-enabled only with a newer validated source date and explicit reconciliation of received versus outstanding purchase quantities against that date. This prevents already-received stock being counted again as inbound. Missing old catalogue records are retained as unverified history rather than silently replaced by zero. Automatic CRM fetching is not implemented by this endpoint.

All physical quantities on a supplier invoice are retained, including rows not yet assigned to a CRM SKU. Only identified rows affect that SKU. In-transit status may be an explicit owner planning assumption; it does not imply verified shipment or a known ETA. Undated identified inbound reduces the primary **quantity planning** gap; a separate timed scenario without those arrivals and pre-delivery shortage remain visible. The reduced quantity is conditional on arrival, not a guarantee of timely stock. The owner has explicitly accepted using undated inbound for planning.

The catalogue includes relevant products from the complete saved stock report, with current CRM names and legacy aliases. Replaced and excluded records are separated from active assortment. Coverage counts decompose into active, replaced, excluded and genuinely missing inputs; filtered recommendations never imply the rest of the catalogue is fine without a calculation.

# Purchasing V3 contract — 3.1.0

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

## Review interface — 19 October 2026
A fresh dataset can be previewed while receipt reconciliation is pending. This does not confirm receipt status or enable a final version; server-side cycle guards still apply. Review is paginated in groups of 20, and selecting visible rows selects only the current page. Changing brand, filter, search or page clears selections. Early shortage risks remain visible even when undated inbound reduces a new purchase to zero. Prior owner comments are dated and old quantities remain historical. Receipt evidence distinguishes a registered incoming document from an assumed in-transit purchase.


## Owner navigation — 19 October 2026
Overview, Supply and Order are distinct URL-addressable views (#overview, #supply, #order). Native browser history and visible overview links work in both directions. Routing does not modify business state; existing filters, page and table position survive view changes. Rules/history remain available as secondary links. The overview shows only the next actions, not migration diagnostics. Supply confirmation and invoice details precede optional uploads and evidence. Existing version guards remain active until receipt review is confirmed. Meaningful receipt/cancellation changes invalidate that review; merely opening a view or editing an unrelated delivery date does not. Calculation version and data remain unchanged.

## V3.1 · 2026-10-20: receipt and persistence contract
- The existing V3 address remains stable; the interface and new saved versions display V3.1.
- A visible “Received all” action fills every source line, including unmatched lines. Partial receipts remain editable.
- Receipt quantities are whole, nonnegative, and cannot exceed ordered minus cancelled. A fully received status cannot contain outstanding quantities.
- Increasing received quantities requires explicit confirmation that they are included in the current CRM stock snapshot. A later arrival requires refreshed stock first; CRM itself is never changed.
- Modal save actions close only after a successful server acknowledgement. Validation/network/conflict errors remain visible in the dialog; pending data keeps a local recovery copy.
- Refresh may atomically apply explicit receipt updates with a new immutable dataset and a compare-and-swap meeting head. Source receipt identifiers and receipt history are retained.
- Repeating full receipt is idempotent. Old owner comments, product links, rules, decisions and historical versions are preserved.
- “Save plan + Excel” persists an immutable version and starts the Excel download. History retains the same export.
