export type CaseDecision = {
  title: string;
  body: string;
};

export type CaseStudyContent = {
  slug: string;
  problem: string[];
  architectureIntro: string;
  architecture: string[];
  decisions: CaseDecision[];
  results: string[];
  change: string;
};

export const caseStudies: Record<string, CaseStudyContent> = {
  "campaign-engine": {
    slug: "campaign-engine",
    problem: [
      "SMS marketing platforms in the Nigerian market charge for sending volume whether campaigns succeed or not. There's rarely a clear audit trail between fund ingestion, credit balance, and delivery outcome. The system needed to show that a backend can own that entire flow — from payment confirmation through delivery receipt — without data loss between any two steps.",
    ],
    architectureIntro:
      "One backend process serves HTTP requests, runs the BullMQ delivery worker, and fans out real-time status updates over SSE. Postgres is the durable source of truth; Redis is the ephemeral queue. The browser renders contract shapes and holds a JWT — it decides nothing. The flow divides cleanly into three sub-systems: funding, dispatch, and receipts.",
    architecture: [
      "Funding: A client initiates a payment plan. The backend creates a PENDING payment row and returns a Paystack checkout URL. No credits move. When Paystack confirms via webhook, the backend verifies the HMAC-SHA512 signature against the raw request body, deduplicates on a UNIQUE(event_id) constraint, and credits the workspace inside a single transaction. The UI receives a credit_updated SSE event.",
      "Dispatch: When a campaign is submitted, the backend acquires a FOR UPDATE row lock on the workspace to check and deduct credits atomically — priced on contacts × SMS segments before any row is written. The campaign and contacts are inserted, and the BullMQ job is enqueued only after the transaction commits. The worker picks it up, locks the campaign row, transitions it from PENDING to PROCESSING, and sends each contact through Africa's Talking (capped at 10 sends/second by the worker limiter). Every state change fires an SSE event.",
      "Receipts: Africa's Talking posts delivery receipts back via webhook. The backend matches on at_message_id, advances the contact status, and recomputes campaign-level counts from the database — never from memory across attempts.",
    ],
    decisions: [
      {
        title: "Raw body for Paystack HMAC.",
        body: "The webhook route registers express.raw() before the global JSON parser. A parsed-then-reserialized body produces a different byte sequence and breaks the signature. Scoped to a single route to avoid affecting anything else.",
      },
      {
        title: "Credits move only on verified webhook, never on initiate.",
        body: "Initiating a charge does not touch balances. The charge.success webhook is the only write path for credits. This prevents phantom credit on failed or abandoned payments.",
      },
      {
        title: "Pessimistic locking where money moves.",
        body: "SELECT … FOR UPDATE on the workspace row for credit deduction; FOR UPDATE on the campaign row for status transitions. Optimistic locking was rejected: a double-transition on a campaign would send duplicate SMS to real handsets.",
      },
      {
        title: "Insert-as-check idempotency.",
        body: "Paystack redeliveries are deduplicated on UNIQUE(event_id) — no check-then-act that could race. Campaign double-submits resolve via Idempotency-Key → UNIQUE(key, workspace). Replays return the original campaign with 200, zero new charges.",
      },
      {
        title: "Job enqueued post-commit only.",
        body: "The BullMQ job is enqueued only after the database transaction commits. A boot-time sweeper re-queues any PENDING campaigns older than 60 seconds to recover from commit→crash→missed-enqueue. Duplicate jobs no-op via the campaign status gate. Jobs run with 3 attempts and exponential backoff from 5 seconds; exhausted retries recount the database into an honest terminal state instead of trusting memory.",
      },
      {
        title: "Segment-aware billing.",
        body: "GSM-7 (160 chars per segment, 153 in multi-part) vs UCS-2 (70/67 UTF-16 units). Unicode messages cost more per recipient because carriers charge per segment. The server computes this; the frontend mirrors it for display only — the server decides.",
      },
      {
        title: "Webhook response semantics.",
        body: "Paystack gets 401 on bad signatures. Africa's Talking gets 200 for everything including bad secrets — AT retries any non-200 response as a recoverable failure, which would cause duplicate delivery state transitions. The rule: return 200 to any provider that retries non-200 as deliverable.",
      },
    ],
    results: [
      "48 tests (Vitest): 43 API specs + 1 end-to-end test + 4 frontend segment tests, covering auth, workspace, payment, campaign, delivery, and webhook flows",
      "Zero blocking operations on the campaign send path — queue absorbs all dispatch work",
      "Idempotent across: webhook redelivery, campaign double-submit, worker retries, and pod restarts",
      "Full delivery audit trail: every contact state transition timestamped and SSE-broadcast in real time",
    ],
    change:
      "The SSE service is in-memory, which means a second API replica would miss events meant for connections on the other instance. The correct fix is a Redis pub/sub fan-out — a thin SseGateway subscribed to a channel per workspace. I left it single-instance intentionally for prototype scope, but it's the first thing that breaks under horizontal scale. Refresh tokens and per-campaign credit refund policy are the other two documented next steps. Per-IP request throttling is also still open — the worker's 10/sec limiter guards the SMS provider, but API-level rate limiting is tracked as follow-up work.",
  },
  ideaforge: {
    slug: "ideaforge",
    problem: [
      "Enterprise AI adoption rarely fails on the technology — it fails on prioritization. Teams generate more use case ideas than they can evaluate, with no consistent way to rank them against business value, urgency, feasibility, and risk. The result is either top-down selection bias or ideas lost in a spreadsheet. The system needed to model an end-to-end innovation pipeline: structured capture, algorithmic scoring, ranked visibility, and human governance at every stage transition.",
    ],
    architectureIntro:
      "The system follows Clean Architecture with four layers enforcing a strict inward dependency rule: Domain has zero external dependencies; Application depends only on Domain and an interface; Infrastructure implements that interface using EF Core; API wires everything together via dependency injection.",
    architecture: [
      "A team member submits an idea with four self-assessed scores (Value, Feasibility, Urgency, Risk on a 1–5 scale). The Domain layer's PriorityScoreEngine computes a weighted priority score immediately — this is pure business logic with zero framework dependencies and is trivially testable in isolation. The scored Idea entity moves through a defined status pipeline (Captured → Evaluated → In Build → Live) with a reviewer governing each transition. Stages cannot be skipped. Live and Rejected are terminal. The leaderboard returns all ideas ranked by priority score descending, with optional department, status, and search filters — the database does the sorting via ORDER BY PriorityScore DESC.",
      "Every HTTP request follows the same path: Controller receives → MediatR.Send() dispatches → ValidationBehavior runs FluentValidation before the handler touches it → Handler executes → Response envelope {success, data, message} wraps the result. Controllers are deliberately thin; they receive, dispatch, and return.",
      "The API is live on Render with Neon Postgres and is consumed by a separate React + Vite SPA holding the leaderboard, submit, and governance screens. That client previews scores for display only and trusts server order — the formula and transition guards have exactly one source of truth. EF Core here is v9 on .NET 8, taken deliberately because the Npgsql provider skipped v8.",
    ],
    decisions: [
      {
        title: "Scoring formula lives in Domain, not a controller.",
        body: "PriorityScore = (Value × 2.0) + (Urgency × 1.5) + (Feasibility × 1.0) − (Risk × 1.5), floored at zero. Business value dominates; risk penalizes heavily. It's a pure static function — no database, no HTTP, no framework. A unit test checks the formula, the clamp behavior, and the effect of high risk in under a millisecond.",
      },
      {
        title: "Clean Architecture enforced at the project reference level.",
        body: "Each layer is a separate C# project. Domain references nothing. Application references Domain only. Infrastructure references Domain and Application. API references Application and Infrastructure. EF Core and Npgsql packages appear only in Infrastructure — Domain entities have no data annotations.",
      },
      {
        title: "CQRS via MediatR with pipeline validation.",
        body: "One focused file per operation: CreateIdeaCommand, CreateIdeaHandler, CreateIdeaValidator. The validator runs as a MediatR pipeline behavior — invalid data never reaches a handler. Controllers stay at three to four lines each.",
      },
      {
        title: "Enums stored as strings.",
        body: '"InBuild" in the database rather than 0. Human-readable without a lookup table, and immune to silent bugs caused by enum reordering across migrations.',
      },
      {
        title: "GUID primary keys.",
        body: "No exposed record counts, no sequential ID enumeration, safe in distributed systems.",
      },
      {
        title: "PATCH for status transitions, not PUT.",
        body: "A status update is a partial change — PATCH is semantically correct. PUT would imply replacing the entire resource.",
      },
      {
        title: "Auto-migrate on startup with retries.",
        body: "The host has no EF CLI access. Migrations apply at boot with five retries to handle Neon's idle suspend delay. No manual migration step on deploy.",
      },
    ],
    results: [
      "12 tests, all green: scoring formula correctness and boundary conditions (Domain), handler behavior via mocked repository (Application), validator acceptance and rejection paths (Application), database URL normalization for hosted Postgres (Infrastructure)",
      "Clean Architecture dependency rule enforced by the compiler — no accidental cross-layer imports possible",
      "Status pipeline with transition validation catches illegal moves at the handler level before any database write",
      "Hosting-ready at build time: PORT, DATABASE_URL, CORS origins, HTTPS redirect toggle, and auto-migration all driven by environment variables",
    ],
    change:
      "The prototype has no authentication — any client can submit ideas and advance pipeline stages. In production, the first step is [Authorize(Roles=\"Admin\")] on the status endpoint and a proper identity layer for submitters. The scoring formula and its weights are a reasonable starting point, but a real platform would surface the weights as configurable parameters rather than constants, so each organization can reflect their own prioritization criteria without a code change.",
  },
  zeedle: {
    slug: "zeedle",
    problem: [
      "Nigerian fintech hiring managers need proof that a backend can move money safely, not just serve CRUD. Registration, wallet provisioning, Paystack funding, peer-to-peer transfers, and settlement have to behave as one auditable flow — with an immutable trail between every kobo in and every kobo out — under PCI-DSS, NDPA, and CBN record-keeping expectations. The system needed to model that entire pipeline the way a licensed PSSP would run it.",
    ],
    architectureIntro:
      "One NestJS process with a modular monolith serves HTTP, backed by Postgres as the durable source of truth and Redis for ephemeral state. Two Next.js frontends — consumer wallet and operations console — render contract shapes and hold the JWT in memory; they decide nothing. The flow divides into funding, transfer, and oversight.",
    architecture: [
      "Funding: The API creates a Paystack checkout session with an env-driven callback_url. The user pays on Paystack's hosted page — card data never touches Zeedle. Paystack signs the webhook with HMAC-SHA512 against the live secret (there is no separate webhook secret), the backend verifies against the raw body captured in Fastify preParsing, and credits the wallet exactly once per reference. Frozen wallets are refused at webhook time and Paystack retries later.",
      "Transfer: The UI resolves the human input first — 10-digit number passes local check-digit validation, then resolves to a name — and POST /transfers only ever sees UUIDs. The backend checks an x-idempotency-key in Redis, verifies the bcrypt PIN (3 failures lock for 30 minutes), then runs a TypeORM QueryRunner transaction: sender debited, recipient credited, two ledger rows sharing one referenceId. Any failure rolls everything back — a debit without its credit is impossible by construction.",
      "Oversight: Freeze is enforced at five checkpoints (transfer service and row-lock recheck, fund init, webhook credit, recipient resolve), each flip requiring a written reason and writing an audit_logs row atomically. Settlement batches aggregate unsettled SUCCESS transactions over a window and complete in a single transaction; the admin console runs them behind a type-CONFIRM modal with full history.",
    ],
    decisions: [
      {
        title: "Money in kobo integers, always.",
        body: "All storage and arithmetic is integer kobo; requests take naira integers and display divides by 100 at the edges. Floating-point money accumulates rounding drift — a known source of ledger discrepancies. Fees are an explicit zero constant, a policy decision rather than an accident.",
      },
      {
        title: "Modular monolith over microservices.",
        body: "One deployable with strongly bounded modules (auth, wallets, transfers, payments, settlements, admin). Distributed-system overhead buys nothing at this scale; the module boundaries are drawn so extraction later is straightforward.",
      },
      {
        title: "Fastify over Express.",
        body: "Higher throughput, smaller CVE surface, and schema validation by default. For a payment API where performance and security both sit on the critical path, the maintained NestJS Fastify adapter is the correct default.",
      },
      {
        title: "TypeORM with explicit migrations, synchronize off everywhere.",
        body: "Synchronize can silently drop columns on entity drift — catastrophic in a ledger. Four hand-written SQL migrations, auto-run on boot, reviewed like code. QueryRunner gives explicit control over the double-entry pair.",
      },
      {
        title: "Custom RS256 JWT guard, no Passport.",
        body: "JWT-only auth needs no strategy abstraction. A 30-line guard is fully auditable: asymmetric signing so the public key can be shared, 15-minute access tokens, rotating 7-day refresh tokens stored hashed, generic auth errors to block user enumeration.",
      },
      {
        title: "Insert-only transactions table.",
        body: "No UPDATE, no DELETE — state changes create new rows, reversals are new REVERSED rows. An editable audit trail is worthless; this mirrors core-banking practice and is a CBN/PCI-DSS expectation.",
      },
      {
        title: "Same-origin auth bridge instead of cross-site cookies.",
        body: "Browsers silently dropped the API's cross-site Set-Cookie — login 200'd then bounced with no error. Session cookies are now set through Next.js /api/auth route handlers so they are first-party: allowlisted paths, status-gated bridging, 15s timeout with problem-shaped 502s. Bearer tokens stay in memory; nothing else is proxied.",
      },
    ],
    results: [
      "13 unit tests (Vitest) + 16/16 end-to-end green: transfers with double-entry balance proven in the database, full freeze cycle with audit trail, settlement exact totals with re-run rejection, summary math, boot/health",
      "Zero partial-state transfers possible — QueryRunner pairs debit and credit atomically, and idempotency keys make client retries return the cached response without re-executing",
      "Every privileged action lands in audit_logs with actor and reason; the suite itself caught real bugs (TypeORM boot crash, FK teardown order, cross-site cookie loss) before production did",
      "Live on three surfaces: consumer wallet, operations console, and API — with dashboards backed by dedicated summary endpoints instead of paging history for totals",
    ],
    change:
      "Settlement runs are manual admin-triggered batches; the next step is a scheduled cron using the same single-transaction batch guard so the 2am run is as safe as the clicked one. The free-tier hosts also impose documented constraints — Render spin-down and Neon idle suspend add cold-start latency that a paid tier or in-region hosting would remove. Cosmetic gaps (favicon, an unwired QR button) are tracked openly and intentionally last.",
  },
};
