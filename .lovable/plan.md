
# Phase 2 — Client Case Tracking + Quote Builder

This builds on the Phase 1 foundation (auth, profiles, clients, consultations, email_log, Resend, magic-link + Google login, premium dark portal shell). It's a large scope, so I'll ship it in one coordinated pass but in clearly-separated layers so you can review piece by piece.

## 1. Database (single migration)

New tables (all with RLS + GRANTs, client-only read of own data, staff/admin full access):

- `cases` — replaces simple `clients.stage` with a real case object: `client_id`, `company_name`, `business_activity`, `jurisdiction`, `assigned_consultant`, `current_stage`, `progress_percentage`, `status`, `expected_next_step`.
- `case_stages` — one row per stage per case, status enum: `not_started | in_progress | waiting_client | under_review | completed | issue`. Seeded automatically on case creation (trigger) with the 14 stages: Consultation → Lifetime Support.
- `activity_logs` — `case_id`, `action_title`, `action_description`, `status`, `created_by`, timestamp.
- `documents` — `case_id`, `document_type`, `status` (`pending | uploaded | approved | rejected`), `file_url`, `admin_note`. Storage bucket `client-documents` (private, per-case folder policy).
- `quotes` — full quote record incl. `quote_number` (auto), `selected_jurisdiction`, `number_of_visas`, `included_services jsonb`, `optional_addons jsonb`, `estimated_government_fees`, `service_fees`, `total_estimated_cost_min/max`, `status`, `recommended_structure`, `pdf_url`.
- `quote_requests` — public-insert (anon) intake form data, before account exists.
- Extend existing `email_log` with `email_type`, `case_id`, `client_id` columns.

Triggers:
- On `INSERT INTO cases` → seed 14 `case_stages` rows.
- On `UPDATE case_stages.status → completed` → recompute `cases.progress_percentage`, insert `activity_logs` row, enqueue status-update email via server fn.

## 2. Server functions (TanStack `createServerFn`)

- `src/lib/quote.functions.ts` — `submitQuoteRequest` (public, no auth): validates with Zod, computes estimated range from rules (jurisdiction × visas × add-ons), inserts `quote_requests` + `quotes`, sends branded Resend email to client + internal notification to Soft Bridge inbox, returns summary for on-screen display.
- `src/lib/case.functions.ts` — `getMyCase`, `getMyStages`, `getMyDocuments`, `getMyActivity` (all `requireSupabaseAuth`, RLS-scoped).
- `src/lib/admin.functions.ts` — `listAllCases`, `updateStageStatus`, `addActivityLog`, `addDocumentRequest`, `approveDocument` (all gated by `has_role(auth.uid(),'admin'|'consultant')`). Each stage update triggers the right Resend template.
- `src/lib/document.functions.ts` — signed upload URL issuance for the Storage bucket.

## 3. Email templates (React Email, dark premium)

Extend `src/lib/email/templates.tsx` with:
- `QuoteEmail` — branded quote summary with cost range, included services, jurisdiction recommendation, CTAs (dashboard + book consultation), disclaimer.
- `StageUpdateEmail` — generic stage-change template parameterised by stage label, "what was completed", "what's next", dashboard link.
- `DocumentApprovedEmail` / `DocumentRejectedEmail`.
- `CaseCompletedEmail` — "Lifetime Support Active".

A `sendStageEmail(caseId, newStage)` helper picks the right copy per stage (Initial Approval, Trade Name Reserved, License Issued, … Banking Assistance, Case Completed).

## 4. Public Quote Builder

- New route `src/routes/quote.tsx` — multi-step glassmorphism wizard (4 steps: Contact → Business → Services → Review). Live cost estimate in sidebar.
- Submission → calls `submitQuoteRequest` → success screen with quote summary card + CTAs ("Book consultation", "Create account to track").
- Header CTA added: "Get a Quote".

## 5. Client Dashboard (rebuild `/_authenticated/portal`)

New layout, mobile-first:

- **Hero overview**: "Your UAE Business Setup Progress" — company, assigned consultant, animated radial progress ring, current stage badge, expected next step.
- **Vertical timeline** (`CaseTimeline.tsx`) — 14 stages with animated status indicators (green/blue/amber/red/grey), completion dates, public notes, "action required" call-outs.
- **Pending actions panel** — only stages with `waiting_client` status, prominent.
- **Documents grid** (`DocumentsPanel.tsx`) — required docs, status chips, drag-and-drop upload zone (wired to Storage signed URLs), admin comments.
- **Activity log** — reverse-chronological feed, grouped by day.
- **Quotes & invoices card** — list of quotes with status + "view" link.
- **Lifetime Support card** — appears when stage = `lifetime_support`, with WhatsApp + email buttons.

All cards use existing `glass-strong`, gold gradient, and Sora/Inter tokens — visually consistent with the rest of the site.

## 6. Admin shell (`/_authenticated/admin`)

Gated by `has_role(... 'admin')`. Phase-2 scope:
- Cases table (search, filter by stage/status, assigned consultant).
- Case detail drawer: update stage status, add public/internal notes, request document, approve/reject docs, send manual status email.
- Quotes inbox.

Polished but functional — not the marketing-grade UI of the client side.

## 7. Security

- RLS: clients see only rows where `case.client_id` resolves to their `clients.id`. Staff/admin override via `has_role`.
- Storage bucket `client-documents` — private, path `client-documents/{case_id}/...`; policies check case ownership or staff role.
- All server fns validate input with Zod, including length/format limits.
- Quote intake (public) rate-limited via per-IP unique constraint window + Zod max lengths to keep abuse surface small.

## 8. Out of scope (flagged for Phase 3)

- Payments / Stripe (per your earlier choice).
- Real-time chat between client and consultant (currently WhatsApp handoff).
- Full-featured admin (bulk actions, analytics) — only essentials this phase.
- AI advisor inside portal (already exists at `/advisor`, linked from dashboard).

---

If this looks right I'll execute in this order: **DB migration → server fns + email templates → quote builder route → rebuilt client dashboard → admin shell**. The migration runs first and pauses for your approval before the rest goes in.
