# Repository Understanding — AdhyayanX (ADX)

> **Phase 0:** Complete repository analysis before migration
> **Date:** June 4, 2026
> **Status:** Pre-migration

---

## 1. Repository Overview

### Monorepo Structure

```
adhyayanx/
├── apps/
│   ├── website/          # Public marketing website (Next.js 16)
│   ├── admin/            # Internal ERP / Admin panel (Next.js 16)
│   ├── api/              # Centralized backend API (Next.js 16 Route Handlers)
│   ├── cms/              # Sanity CMS Studio v5
│   └── pdf-service/      # PDF generation microservice (Express + Puppeteer)
├── packages/
│   └── db/               # Shared database schema + client (@repo/db)
├── docs/                 # Architecture & product documentation
├── script/               # Utility scripts
├── tmp/                  # Migration/test scripts
├── package.json          # Root workspace (npm workspaces)
├── package-lock.json
└── drizzle.config.js
```

### Package Manager
- **npm workspaces** (no Turborepo/Nx)
- Workspace roots: `apps/*`, `packages/*`
- Root package name: `"skillyards"`

### Applications

| App | Framework | Port | Type | Dependencies |
|-----|-----------|------|------|-------------|
| `website` | Next.js 16.1.6 | 3001 | SSR + Static (Vercel) | Sanity, framer-motion, Tailwind, shadcn |
| `admin` | Next.js 16.2.3 | 3002 | SSR (Vercel) | jose, bcryptjs, drizzle-orm, shadcn |
| `api` | Next.js 16.1.6 | 3000 | Serverless Routes (Vercel) | drizzle-orm, neon, jose, resend, S3 |
| `cms` | Sanity v5 | - | Static Studio (Sanity) | sanity, @sanity/vision |
| `pdf-service` | Express 4 | 3001 | Container (Railway) | puppeteer, express, S3 |

---

## 2. Architecture

### System Interactions

```
Website (3001) ──GROQ──→ Sanity CMS (content)
Website (3001) ──POST──→ API (enquiries)
Admin (3002) ────CRUD──→ API (students, payments, plans)
API (3000) ──────ORM───→ Neon PostgreSQL
API (3000) ──────S3────→ Cloudflare R2 (PDFs)
API (3000) ──────POST──→ PDF Service (async generation)
PDF Service ─────S3────→ Cloudflare R2 (upload PDFs)
PDF Service ─────POST──→ API (callback on complete)
API (3000) ──────API───→ Resend (transactional emails)
API (3000) ──────API───→ Google reCAPTCHA (bot check)
```

### Key Architectural Patterns

1. **3-layer module pattern**: Route Handler → Service → Repository
2. **Centralized security**: `createProtectedRoute` middleware enforces auth/authz/rate-limiting
3. **Async PDF generation**: Fire-and-forget with job ownership (`receiptJobId`) preventing race conditions
4. **Parallel mega-fetch**: `Promise.all` for independent DB queries (student detail endpoint)
5. **In-memory queue**: PDF generation queue with max 5 concurrent, 2 retries, 25s timeout

---

## 3. External Services

| Service | Purpose | Auth Method | Cost Model |
|---------|---------|-------------|------------|
| **Neon PostgreSQL** | Primary database | Connection string | Usage-based |
| **Cloudflare R2** | PDF document storage | Access/Secret keys | Storage + egress |
| **Resend** | Transactional email | API key | 100 emails/day free |
| **Google reCAPTCHA v2** | Bot protection | Secret key | Free |
| **Sanity** | Content management | Project ID + dataset | Usage-based |
| **PDFShift** (optional) | Alternative PDF gen | API key | Per-request |
| **Vercel** | Hosting (api, admin, website) | - | Usage-based |
| **Railway** | Hosting (pdf-service) | - | Usage-based |

---

## 4. Authentication & Security

### Auth Flow
- Login → bcrypt password verify → JWT (HS256, jose library) → httpOnly cookie ("session")
- Cookie domain: `.skillyards.in` (production)
- Cookie expiry: 7 days
- Default JWT secret: `"skillyards_secret_key_change_me_in_prod"` (⚠️ MUST CHANGE)

### Authorization (RBAC)
| Role | Access |
|------|--------|
| ADMIN | Full system access |
| MANAGER | Same as ADMIN |
| STAFF | Restricted operational access |
| SALES | Blocked (`SALES_UNASSIGNED_DENY`) — not yet implemented |
| STUDENT | Ownership-based access |
| INTERNAL | Service-to-service (x-internal-key header) |

### Rate Limiting
- Sliding window: 15s window, burst limit 3
- In-memory Map (resets on cold start ⚠️)
- Max 5,000 keys with auto-cleanup

---

## 5. Database Schema

### Tables (12 implemented, 6 empty)

| Table | Records | Purpose | Key Columns |
|-------|---------|---------|-------------|
| `users` | Admin/staff accounts | Auth | id, email, password, role |
| `students` | Enrolled students | Core entity | id, name, total_fee, final_fee |
| `plans` | Fee plans | Financial | id, student_id, total_amount, type |
| `installments` | Payment schedules | Financial | id, plan_id, amount_due, due_date, status |
| `payments` | Payment records | Financial | id, student_id, amount, receipt_number |
| `payment_allocations` | Payment→Installment linking | Financial | id, payment_id, installment_id, amount |
| `enquiries` | Web contact submissions | CRM | id, first_name, email, message, status |
| `test_leads` | Assessment registrations | Assessment | id, name, email, phone |
| `test_sessions` | Test attempts | Assessment | id, lead_id, score, status |
| `test_questions` | Question bank | Assessment | id, topic, question, options |
| `pdf_failures` | PDF error log | Operations | id, payment_id, error_message |
| *(empty)* `notifications` | — | Not implemented | — |
| *(empty)* `programmes` | — | Not implemented | — |
| *(empty)* `analytics` | — | Not implemented | — |
| *(empty)* `qr` | — | Not implemented | — |
| *(empty)* `job` | — | Not implemented | — |

### Receipt Number Format
- Pattern: `SY-{YEAR}-{SEQ}` (e.g., `SY-2026-0042`)
- Generated via `SELECT COUNT(*)` (non-atomic ⚠️)
- **This will be changed to `ADX-` prefix**

---

## 6. API Endpoints

| Method | Path | Auth | Purpose |
|--------|------|------|---------|
| GET | `/api/students` | ADMIN/MANAGER | List students |
| POST | `/api/students` | ADMIN/MANAGER | Create student |
| GET | `/api/students/[id]` | ADMIN/MANAGER/STUDENT | Student detail + ledger |
| GET | `/api/students/stats` | ADMIN/MANAGER | Dashboard stats |
| GET | `/api/students/[id]/payments` | ADMIN/MANAGER | Payment history |
| POST | `/api/students/[id]/payments` | ADMIN/MANAGER | Record payment |
| GET | `/api/students/[id]/plan` | ADMIN/MANAGER | Get plan + installments |
| POST | `/api/students/[id]/plan` | ADMIN/MANAGER | Create plan |
| GET | `/api/students/[id]/ledger` | ADMIN/MANAGER | Financial ledger |
| GET | `/api/payments/[id]` | ADMIN/MANAGER | Payment detail |
| GET | `/api/payments/[id]/receipt` | ADMIN/MANAGER/STUDENT | Receipt (HTML/PDF) |
| GET | `/api/enquiries` | ADMIN/MANAGER | List enquiries |
| POST | `/api/enquiries` | PUBLIC (recaptcha) | Submit enquiry |
| GET | `/api/test/questions` | PUBLIC | Get test questions |
| POST | `/api/test/register` | PUBLIC | Register for test |
| POST | `/api/test/start` | PUBLIC | Start test session |
| POST | `/api/test/submit` | PUBLIC | Submit test answers |
| GET | `/api/test/result` | PUBLIC | Get test results |
| POST | `/api/internal/receipt/complete` | INTERNAL | PDF callback |
| GET | `/api/health` | PUBLIC | Health check |

---

## 7. PDF Generation Flow

```
1. Admin requests receipt → API generates HTML + claims payment (status: "generating", jobId)
2. API sends POST with HTML to PDF service (Railway) — FIRE AND FORGET
3. API returns 202 Accepted to admin
4. PDF service (Puppeteer) generates PDF → uploads to R2
5. PDF service calls back POST /api/internal/receipt/complete
6. API validates jobId ownership → updates payment (status: "ready", receiptKey)
7. Admin retries request → API serves PDF from R2
```

---

## 8. CMS Integration

- **Sanity Studio** at `apps/cms/`
- **Content types**: post, author, tag, batch, faq, faqCategory
- **Read-only public client**: `@sanity/client` (no token, CDN enabled)
- **Queries**: GROQ via `apps/website/src/lib/sanity/queries.js`
- **ISR**: Blog revalidates every 3600s (1h), static pages every 86400s (24h)
- **No on-demand revalidation** — no Sanity webhook endpoint

---

## 9. SEO System

- **SEO config**: `apps/website/src/lib/seo/seo.config.js` — siteName, baseUrl, titleTemplate
- **Meta builder**: `buildSEO()` — generates Next.js metadata with OG, Twitter cards, canonical
- **JSON-LD schemas**: Organization, Website, Course, BlogPosting, FAQPage, BreadcrumbList, Person, WebPage
- **Sitemap**: Dynamic sitemap at `/sitemap.xml`
- **Robots.txt**: `/robots.txt` — allows all, disallows /api/, /admin/, etc.

---

## 10. Environment Variables

See full inventory in [branding-inventory.md](./branding-inventory.md). Key variables with brand references:

| Variable | Current Value/Brand Reference |
|----------|-------------------------------|
| JWT_SECRET | Fallback: `"skillyards_secret_key_change_me_in_prod"` |
| PDF_SERVICE_API_KEY | `"skillyards-secret-123"` |
| EMAIL_FROM | `"admin@skillyards.in"` |
| API_URL (pdf-service) | Fallback: `"https://api.skillyards.in"` |
| Cookie domain | `.skillyards.in` |
| R2 Bucket | `skillyards-documents` |

---

## 11. Risk Assessment for Migration

### What Can Be Safely Renamed
- Company/organization names in display text
- SEO metadata (title, description, site name, etc.)
- Email templates (brand name, copyright, links)
- PDF receipt templates (company name, address, logo alt)
- Receipt number prefix (`SY-` → `ADX-`)
- Comments and documentation
- Package `name` fields (works with npm links)
- Logo alt text and image references
- CORS origins (code changes, not env vars)
- Health check service identifier

### What MUST Stay the Same
- **Environment variable names** (they're set in production and changing them requires deployment coordination)
- **Database column names** and schema definitions (migration required)
- **API route paths** (breaking change for admin app)
- **Sanity project ID and dataset** (external service reference)
- **S3/R2 bucket names** (configured in cloud dashboard)

### What Needs Careful Handling
- **Domain references in CORS config**: Update code but keep old domains as fallbacks during transition
- **Package names**: Update `package.json` name fields but preserve workspace references
- **Import paths**: `@skillyards/db` in `next.config.mjs` is already broken — fix to `@repo/db`
- **Cache/artifact files**: `package-lock.json` will need regeneration
