# Premium Onboarding Flow — "Start Your Setup"

Replace the direct WhatsApp redirect with a 5-step cinematic onboarding modal that captures the lead, verifies them via email OTP, creates a real Supabase auth account + client + draft case, and only then offers WhatsApp / dashboard / booking.

---

## 1. Database (single migration)

New tables:

- **`otp_codes`** — `email` (citext-style text), `code_hash` (sha256 hex), `expires_at`, `used_at`, `attempts` (int, default 0), `created_at`, `purpose` ('onboarding'). Index on `(email, created_at desc)`.
- **`onboarding_submissions`** — stores Step 1 + Step 3 + Step 4 payload server-side so the flow survives a refresh and gives admins a single record. Columns: `email`, `full_name`, `whatsapp`, `nationality`, `business_activity`, `preferred_jurisdiction`, `number_of_visas`, `residency_required`, `bank_account_required`, `tax_registration_required`, `website_required`, `office_requirement`, `setup_goals` (text[]), `status` ('draft' | 'verified' | 'completed'), `client_id` (nullable, set after account creation), `created_at`, `updated_at`.

RLS:
- `otp_codes` — no client access; only `service_role` (server fns use admin client).
- `onboarding_submissions` — `service_role` full; `authenticated` read own by matching `email` to `auth.email()`.

Grants follow the standard pattern. Existing `clients` / `cases` / `profiles` triggers (`handle_new_user`, `seed_case_stages`) already provision a profile + client + case on signup, so the flow only needs to call `supabase.auth.admin.createUser` (or signUp) and then patch the freshly-created `clients` + `cases` rows with the onboarding data.

## 2. Server functions (`src/lib/onboarding.functions.ts`)

All public (no auth middleware) — they're the pre-account flow.

1. **`startOnboarding`** — validates Step 1 with Zod (name, email, whatsapp, nationality), upserts an `onboarding_submissions` row keyed by email, generates a 6-digit code, stores SHA-256 hash + `expires_at = now() + 10min`, sends OTP email via existing Resend helper, logs in `email_log`. Rate-limits: max 1 OTP per email per 60s, max 5 per hour.
2. **`verifyOtp`** — input `{ email, code }`. Looks up latest non-expired, non-used row. Increments `attempts`; rejects after 5. On success: marks `used_at`, flips submission `status='verified'`, calls `supabaseAdmin.auth.admin.createUser({ email, email_confirm: true, user_metadata: { full_name, phone } })` (idempotent — if user already exists, reuse). Generates a magic-link / sets a password-less session using `supabaseAdmin.auth.admin.generateLink({ type: 'magiclink' })` and returns the action link so the client can `exchangeCodeForSession` or open it. Simpler: return `{ verified: true, email }` and have the client call `supabase.auth.signInWithOtp` afterwards — but cleaner is to use `generateLink({ type: 'magiclink' })` and call `supabase.auth.verifyOtp({ token_hash, type })` client-side to establish a session without a second email.
3. **`resendOtp`** — same as start but only for an email already in `onboarding_submissions`.
4. **`completeOnboarding`** — `requireSupabaseAuth`. Input = Step 3 + Step 4. Updates `onboarding_submissions`, patches the user's `clients` row (business activity, jurisdiction, etc. → repurpose `notes` / extend `clients` with new columns), patches/creates `cases` row with business_activity, jurisdiction, setup_goals stored in `expected_next_step` or a new `setup_goals` column. Sends Welcome + "Setup Request Received" emails to client + internal notification to admin inbox.

`src/start.ts` already wires `attachSupabaseAuth`.

## 3. Email templates (`src/lib/email/templates.tsx`)

Extend with:
- `OtpEmail` — dark luxury, Soft Bridge logo block (SB monogram), client name, 6-digit code in spaced mono, 10-minute expiry notice, security disclaimer, registration number footer.
- `WelcomeEmail` — "Welcome to Your Soft Bridge Client Portal".
- `SetupReceivedEmail` — "We Received Your UAE Business Setup Request" with summary of submitted answers + next steps.
- `AdminNewSetupEmail` — internal, full payload dump, link to admin panel.

All reuse the existing branded shell.

## 4. Frontend: `OnboardingDialog` component

`src/components/site/OnboardingDialog.tsx` — full-screen Dialog (Radix) with glassmorphism shell:

- **Step header** — animated progress dots 1–5 with labels (Info → Verify → Business → Goals → Ready).
- **Step 1**: Full Name, Email, WhatsApp (intl input), Nationality (Select with common UAE-relevant nationalities + search). "Continue" → `startOnboarding`.
- **Step 2**: 6-digit OTP using existing `InputOTP` component; resend countdown (60s); "Change email" link returns to Step 1; on submit → `verifyOtp` → exchange magic-link token for session client-side → auto-advance.
- **Step 3**: Business Activity (textarea), Preferred Jurisdiction (Select: Dubai Mainland, IFZA, DMCC, Meydan, RAKEZ, SHAMS, Abu Dhabi Mainland, ADGM, Other / Not sure), Number of Visas (number 0–20 with +/-), three radio groups (Residency / Bank / Tax — Yes/No/Later or Yes/No/Not sure), Website Yes/No switch, Office Requirement segmented (Flexi Desk / Ejari / Physical Office / Not Sure).
- **Step 4**: 7 selectable chips, max 2; live counter.
- **Step 5**: Success card with animated check, three CTAs: "Go to My Dashboard" → `/portal`, "Book Consultation" → opens existing `BookingDialog`, "Continue on WhatsApp" → existing `WA_LINK` with pre-filled message including client name.

Animations: Framer Motion (already in project) for step transitions (x-slide + fade); subtle gold glow pulse on active step; soft input focus rings using existing tokens; toast on errors using existing `sonner`.

## 5. Wiring up `Start Your Setup`

Find every CTA labeled "Start Your Setup" (Hero, FloatingActions, possibly Packages). Currently they `href={WA_LINK}`. Replace with `onClick={() => setOnboardingOpen(true)}` and render `<OnboardingDialog />`. Lift state to a small `useOnboarding` context so any button across the page can open it without prop drilling.

## 6. Security details

- OTP hashed (SHA-256) before storage; code itself never logged.
- 10-min expiry, single-use, 5-attempt cap, 60s resend cooldown, 5/hr per email cap.
- All server fns use Zod with length caps (name ≤200, email ≤320, etc.).
- Admin client used only inside server fns; no service role on the client.
- No PII returned beyond `{ verified: true }`.

## 7. Out of scope

- Phone OTP (email only this round).
- Admin UI for `onboarding_submissions` (data is queryable in admin shell already).
- Payment.

---

If you approve, the order is: **migration → server fns + email templates → OnboardingDialog UI → swap CTAs**. The migration runs first and pauses for your confirmation.