# Post-Migration Verification — Brand Migration Report

> **Phase 3:** Repository-wide scan after brand migration
> **Date:** June 4, 2026
> **Verification Method:** `grep` + `ripgrep` across all source files (excludes `node_modules`, `.git`, `.next`, `dist`)

---

## Summary

| Metric | Value |
|--------|-------|
| Files modified during migration | ~40 files |
| Files with remaining Skillyards references | ~20 files |
| Total remaining references | ~146 |
| False positives (docs, logs, lock files) | ~30 |
| **True remaining references needing action** | **~116** |

---

## What Was Migrated (Completed)

### ✅ Package Names (5 files)
- `package.json` → `"name": "adhyayanx"`
- `apps/website/package.json` → `"name": "adx-website"`
- `apps/cms/package.json` → `"name": "adx-cms"`
- `apps/api/next.config.mjs` — removed broken `@skillyards/db` reference
- `script/seed-enquiries.js` — fixed `@skillyards/db` → `@repo/db`

### ✅ SEO & Metadata (7 files)
- `seo.config.js` — siteName, baseUrl, titleTemplate, defaultDescription
- `sitemap.ts` — base URL
- `robots.js` — sitemap URL
- `page.js` (homepage) — title, description, schema name
- `constants/ids.js` — BASE_URL
- `orgData.js` — organization name, description, social links

### ✅ Admin App (5 files)
- `layout.js` — title, description
- `Sidebar.jsx` — logo alt text
- `Logo.jsx` — logo alt text
- `users/page.js` — description
- `users/UserManagementClient.jsx` — placeholder
- `auth.js` — cookie domain

### ✅ Email System (2 files)
- `email.template.js` — logo URL, alt text, copyright, social links
- `email.service.js` — sender, subject lines

### ✅ PDF Receipt (1 file)
- `receipt.service.js` — company name, address, email, signature

### ✅ API Infrastructure (6 files)
- `utils/cors.js` — CORS origins
- `payment.repository.js` — receipt number prefix `SY-` → `ADX-`
- `lib/auth.js` — removed hardcoded fallback secret (with guard)
- `lib/permissions.js` — comment update
- `lib/middleware.js` — comment update
- `health/route.js` — service name

### ✅ Data Files (5 files)
- `courses.js` — all SEO titles/descriptions
- `faqs.js` — all FAQ content (50+ SkillYards → AdhyayanX)
- `student-testimonials.json` — 11 testimonials
- `home-slides.json` — slide description
- `aboutpage/hero.json` — tagline, location
- `aboutpage/whychoose.json` — description
- `teamProfiles.js` — organization name, company name
- `manifest.json` — PWA name

### ✅ Domain & Config (3 files)
- `pdf-service/server.js` — API callback URL default
- `next.config.mjs` — added ADX host redirect (kept old for compatibility)
- `packages/db/backfill-receipts.js` — SY- → ADX-

### ✅ Scripts (3 files)
- `tmp/seed-admin.js` — admin email
- `tmp/test-delete.js` — admin email
- `apps/cms/sanity.config.js` — studio title

### ✅ JSX Components (1 file)
- `NewsArticleTemplate.jsx` — newsroom label

---

## What Still Has Remaining Skillyards References

### ⚠️ HIGH Priority Remaining

| # | File | References | Reason Not Migrated |
|---|------|-----------|---------------------|
| 1 | `apps/api/src/modules/test/certificate.service.js` | 3 | Certificate email system — sender, subject, filename |
| 2 | `apps/api/src/modules/test/certificate.template.js` | ~15 | Full certificate HTML template — logo, name, copyright, social |
| 3 | `apps/cms/scripts/migrate-faqs.mjs` | ~50 | CMS FAQ seed script — references the INSTITUTION name in FAQ content |
| 4 | `apps/cms/scripts/seed-program-faqs.mjs` | ~20 | CMS FAQ seed script — references INSTITUTION name in FAQ content |
| 5 | `apps/website/src/data/teamProfiles.js` | ~20 | Remaining bio/description references (SEO descriptions, role titles) |
| 6 | `apps/website/src/data/teamData.js` | 1 | Bio reference |
| 7 | `apps/admin/src/lib/auth.js` | 2 | Separate auth file — fallback secret + cookie domain |

### MEDIUM Priority Remaining

| # | File | References | Reason |
|---|------|-----------|--------|
| 8 | `apps/website/src/data/videos.json` | 9 | Video titles "SkillYards Session" |
| 9 | `apps/website/src/app/gallery/images/page.jsx` | ~10 | Gallery page SEO metadata |
| 10 | `apps/website/src/app/gallery/videos/page.jsx` | ~6 | Gallery page SEO metadata |
| 11 | `apps/website/src/app/gallery/page.jsx` | ~8 | Gallery index SEO metadata |
| 12 | `apps/website/src/app/gallery/videos/GalleryVideosContent.jsx` | ~4 | Gallery component metadata |
| 13 | `apps/website/src/app/faqs/page.jsx` | ~8 | FAQ page SEO metadata |
| 14 | `apps/website/src/components/landingPageBBA/Hero.jsx` | 1 | Image alt text |
| 15 | `apps/website/src/components/landingPageBBA/WhyNotRegular.jsx` | ~3 | Component text references |
| 16 | `apps/website/src/components/landingPageBBA/Benefits.jsx` | 1 | Component title |

### LOW Priority Remaining (Dead Code / Legacy)

| # | File | References | Reason |
|---|------|-----------|--------|
| 17 | `apps/website/src/components/NavigationSchema.jsx` | ~8 | DEAD CODE — not imported anywhere |
| 18 | `apps/website/src/components/supportpage/SupportChannels.jsx` | ~3 | Support email fallback |
| 19 | `apps/website/public/sw.js` | 2 | Service worker cache name + notification title |
| 20 | `apps/cms/schemaTypes/post.js` | 2 | Schema option title + comment |
| 21 | `apps/api/scripts/test-receipt-auth.mjs` | 1 | Test script with hardcoded secret |
| 22 | `apps/api/scripts/test-internal-bypass.mjs` | 1 | Test script with hardcoded key |

### EXCLUDED (False Positives / Intentional Skips)

| File | Reason |
|------|--------|
| `docs/*.md` | Content documentation — not source code. Updated separately. |
| `homepage-validation.html` | Static snapshot — will be regenerated by Next.js |
| `package-lock.json` | Auto-generated by npm |
| `apps/pdf-service/pdf-service.log` | Runtime log file |
| `apps/website/next.config.mjs` (old redirect) | Intentional — keeps backward compatibility during transition |

---

## Critical Issue Fixed Post-Review

### Auth.js JWT_SECRET Guard
**Issue:** Removing the fallback `"skillyards_secret_key_change_me_in_prod"` could cause `jose.jwtVerify()` to receive an undefined key, producing a cryptic runtime error.

**Fix Applied:** 
```javascript
const rawKey = process.env.JWT_SECRET;
if (!rawKey) {
  console.error("FATAL: JWT_SECRET environment variable is not set.");
  throw new Error("CRITICAL_CONFIG_MISSING: JWT_SECRET must be set.");
}
const secretKey = rawKey;
```

---

## Required Manual Actions

| # | Action | Priority |
|---|--------|----------|
| 1 | Replace `apps/api/src/modules/payments/assets/logo.png` with ADX logo | CRITICAL — Receipts will show old logo |
| 2 | Replace `apps/api/src/modules/payments/assets/stamp.png` with ADX stamp | CRITICAL — Receipts will show old stamp |
| 3 | Create ADX logo image files for website, admin, and email | CRITICAL — Brand visuals |
| 4 | Update `apps/admin/src/lib/auth.js` — remove fallback secret + update cookie domain | HIGH |
| 5 | Update certificate templates (`.certificate.template.js` + `.certificate.service.js`) | HIGH — Student-facing |
| 6 | Update CMS seed scripts (`migrate-faqs.mjs`, `seed-program-faqs.mjs`) | MEDIUM — Internal scripts |
| 7 | Update remaining gallery pages SEO metadata | MEDIUM |
| 8 | Update landing page component text references | MEDIUM |
| 9 | Update PWA service worker cache name | LOW |
| 10 | Generate new `package-lock.json` after package name changes | LOW |
| 11 | Verify Sanity projectId (`2it7abok`) and dataset strategy (shared or new) | MEDIUM |
| 12 | Deploy new ADX domains and configure DNS + Vercel | CRITICAL — Pre-launch |
| 13 | Generate new production JWT_SECRET and internal API keys | CRITICAL — Security |
| 14 | Update S3/R2 bucket for ADX (or reuse with configuration) | MEDIUM |
