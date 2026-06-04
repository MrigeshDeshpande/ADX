# Branding Inventory — Skillyards References

> **Phase 1:** Complete brand discovery across all files
> **Date:** June 4, 2026
> **Total Findings:** 135+ unique references across 45+ files

---

## 1. Package Names & Identifiers

| # | File | Line | Current Value | Risk | Action |
|---|------|------|-------------|------|--------|
| 1 | `package.json` | 2 | `"name": "skillyards"` | MEDIUM | Rename to `adhyayanx` |
| 2 | `apps/website/package.json` | 2 | `"name": "skillyards-next-app"` | MEDIUM | Rename to `adx-website` |
| 3 | `apps/cms/package.json` | 2 | `"name": "skillyards-cms"` | MEDIUM | Rename to `adx-cms` |
| 4 | `apps/api/next.config.mjs` | 3 | `transpilePackages: ["@skillyards/db"]` | HIGH | Fix to `@repo/db` (broken ref) |
| 5 | `script/seed-enquiries.js` | 2 | `import { db } from "@skillyards/db"` | HIGH | Fix to `@repo/db` |
| 6 | `apps/website/package-lock.json` | 2 | `"name": "skillyards-next-app"` | LOW | Auto-regenerated |
| 7 | `package-lock.json` | 2,7,385,880 | `"name": "skillyards"`, `"skillyards-cms"`, `"skillyards-next-app"` | LOW | Auto-regenerated |
| 8 | `apps/website/public/images/favicons/manifest.json` | 3 | `"name": "SkillYards"` | HIGH | Web app manifest name |

---

## 2. Domain References (skillyards.in)

| # | File | Line | Current Value | Risk | Action |
|---|------|------|-------------|------|--------|
| 9 | `apps/api/src/utils/cors.js` | 5-9 | `"https://skillyards.in"`, `"https://www.skillyards.in"`, `"https://admin.skillyards.in"` | HIGH | Update to adhyayanx domains |
| 10 | `apps/api/src/utils/cors.js` | 18 | Fallback: `"https://skillyards.in"` | HIGH | Update fallback |
| 11 | `apps/website/next.config.mjs` | ~60 | `host: "skillyards.in"` redirect source | HIGH | Update host |
| 12 | `apps/website/next.config.mjs` | 61 | `destination: "https://www.skillyards.in/:path*"` | HIGH | Update destination |
| 13 | `apps/website/next.config.mjs` | 82,87 | `hostname: "admin.skillyards.in"` (image patterns) | MEDIUM | Update hostname |
| 14 | `apps/website/next.config.mjs` | ~71 | CSP: `skillyards-backend.vercel.app` | MEDIUM | Update connect-src |
| 15 | `apps/pdf-service/src/server.js` | 26 | `API_URL` default: `"https://api.skillyards.in"` | HIGH | Update fallback |
| 16 | `apps/admin/src/actions/auth.js` | 62 | Cookie domain: `.skillyards.in` | HIGH | Update cookie domain |
| 17 | `apps/website/src/app/careers/[slug]/page.jsx` | 161 | `https://admin.skillyards.in/qrcodes/...` | MEDIUM | Update QR code URLs |
| 18 | `apps/website/src/app/careers/[slug]/page.jsx` | 165 | `https://admin.skillyards.in/storage/qrcodes/...` | MEDIUM | Update image URLs |

---

## 3. SEO & Metadata

| # | File | Line | Current Value | Risk | Action |
|---|------|------|-------------|------|--------|
| 19 | `apps/website/src/lib/seo/seo.config.js` | 2 | `siteName: "SkillYards"` | CRITICAL | Change to "AdhyayanX" |
| 20 | `apps/website/src/lib/seo/seo.config.js` | 3 | `baseUrl: "https://www.skillyards.in"` | CRITICAL | Change to new domain |
| 21 | `apps/website/src/lib/seo/seo.config.js` | 4 | `titleTemplate: "%s | SkillYards"` | CRITICAL | Change to "%s | AdhyayanX" |
| 22 | `apps/website/src/lib/seo/seo.config.js` | 6 | `defaultDescription: "SkillYards helps students..."` | CRITICAL | Update description |
| 23 | `apps/website/src/app/page.js` | 27 | `title: "SkillYards | IT Training..."` | CRITICAL | Update homepage title |
| 24 | `apps/website/src/app/page.js` | 32 | `homeKeywords` contains "SkillYards Agra" | HIGH | Update keywords |
| 25 | `apps/website/src/app/page.js` | 45 | `name: "SkillYards – IT Training..."` (webPageSchema) | CRITICAL | Update schema name |
| 26 | `apps/website/src/app/sitemap.ts` | 7 | `BASE_URL = "https://www.skillyards.in"` | CRITICAL | Update base URL |
| 27 | `apps/website/src/app/robots.js` | 12 | `sitemap: "https://www.skillyards.in/sitemap.xml"` | CRITICAL | Update sitemap URL |

---

## 4. Static Data Files (Website Content)

| # | File | ~Count | Current Value Pattern | Risk | Action |
|---|------|--------|---------------------|------|--------|
| 28 | `apps/website/src/data/courses.js` | 10+ | SEO titles/descriptions with "SkillYards" | CRITICAL | Replace all "SkillYards" → "AdhyayanX" |
| 29 | `apps/website/src/data/faqs.js` | 50+ | FAQ content mentions "SkillYards" | CRITICAL | Replace all "SkillYards" → "AdhyayanX" |
| 30 | `apps/website/src/data/student-testimonials.json` | 11 | Testimonials mention "SkillYards" | CRITICAL | Replace testimonials |
| 31 | `apps/website/src/data/home-slides.json` | 1 | Description contains "SkillYards" | HIGH | Update slide content |
| 32 | `apps/website/src/data/aboutpage/hero.json` | 2 | Tagline & location mention "SkillYards" | CRITICAL | Update hero content |
| 33 | `apps/website/src/data/aboutpage/whychoose.json` | 1 | Description mentions "SkillYards" | CRITICAL | Update why-choose content |
| 34 | `apps/website/src/data/teamProfiles.js` | 5 | Organization: "Skillyards Versatility Pvt. Ltd." | CRITICAL | Update org name |

---

## 5. Admin App

| # | File | Line | Current Value | Risk | Action |
|---|------|------|-------------|------|--------|
| 35 | `apps/admin/src/app/layout.js` | 17 | `title: "Skillyards Admin"` | CRITICAL | Update to "AdhyayanX Admin" |
| 36 | `apps/admin/src/app/layout.js` | 18 | `description: "Skillyards ERP + CRM"` | CRITICAL | Update description |
| 37 | `apps/admin/src/app/(authenticated)/users/page.js` | 12 | `"Manage staff access... Skillyards administration."` | MEDIUM | Update text |
| 38 | `apps/admin/src/app/(authenticated)/users/UserManagementClient.jsx` | 160 | `placeholder="john@skillyards.com"` | LOW | Update placeholder |
| 39 | `apps/admin/src/components/layout/Sidebar.jsx` | 31 | `alt="Skillyards"` (logo) | HIGH | Update alt text |
| 40 | `apps/admin/src/components/layout/Logo.jsx` | 22 | `alt="Skillyards"` (logo) | HIGH | Update alt text |

---

## 6. Email Templates

| # | File | Line | Current Value | Risk | Action |
|---|------|------|-------------|------|--------|
| 41 | `apps/api/src/modules/notifications/email.template.js` | 1 | `LOGO_URL` — GitHub raw Skillyards logo | CRITICAL | Replace logo URL |
| 42 | `apps/api/src/modules/notifications/email.template.js` | 12 | `alt="Skillyards"` | CRITICAL | Update alt text |
| 43 | `apps/api/src/modules/notifications/email.template.js` | 66 | `"Automated alert from Skillyards"` | CRITICAL | Update footer |
| 44 | `apps/api/src/modules/notifications/email.template.js` | 100 | `"support@skillyards.in"` | CRITICAL | Update support email |
| 45 | `apps/api/src/modules/notifications/email.template.js` | 116 | `"© ${year} Skillyards. All rights reserved."` | CRITICAL | Update copyright |
| 46 | `apps/api/src/modules/notifications/email.template.js` | 155 | LinkedIn/Instagram/Facebook Skillyards URLs | HIGH | Update social links |
| 47 | `apps/api/src/modules/notifications/email.template.js` | 181 | `"© ${year} Skillyards. All rights reserved."` | CRITICAL | Update copyright |
| 48 | `apps/api/src/modules/notifications/email.service.js` | 19 | `from: "Skillyards <admin@skillyards.in>"` | CRITICAL | Update sender |
| 49 | `apps/api/src/modules/notifications/email.service.js` | 26 | `to: ["staff@skillyards.in"]` | MEDIUM | Update test recipient |
| 50 | `apps/api/src/modules/notifications/email.service.js` | 28 | `subject: "Skillyards Email Test"` | MEDIUM | Update subject |
| 51 | `apps/api/src/modules/notifications/email.service.js` | 15 | `subject: "New enquiry from Skillyards website"` | CRITICAL | Update subject |
| 52 | `apps/api/src/modules/notifications/email.service.js` | 37 | `from` fallback: `"Skillyards <admin@skillyards.in>"` | CRITICAL | Update fallback |

---

## 7. PDF Receipt Templates

| # | File | Line | Current Value | Risk | Action |
|---|------|------|-------------|------|--------|
| 53 | `apps/api/src/modules/payments/receipt.service.js` | 38 | `alt="Skillyards Versatility Pvt. Ltd."` (logo) | CRITICAL | Update company name |
| 54 | `apps/api/src/modules/payments/receipt.service.js` | 179 | `<strong>Skillyards Versatility Pvt. Ltd.</strong>` | CRITICAL | Update company name |
| 55 | `apps/api/src/modules/payments/receipt.service.js` | 180-182 | Address block | CRITICAL | Verify/update address |
| 56 | `apps/api/src/modules/payments/receipt.service.js` | 183 | `GSTIN: 09ABMCS4605B1ZF` | CRITICAL | Verify GSTIN |
| 57 | `apps/api/src/modules/payments/receipt.service.js` | 184 | `support@skillyards.in` | CRITICAL | Update support email |
| 58 | `apps/api/src/modules/payments/receipt.service.js` | 185 | `+91 70601 00561` | MEDIUM | Verify phone |
| 59 | `apps/api/src/modules/payments/receipt.service.js` | 323 | `Skillyards Versatility Pvt. Ltd.` (signature) | CRITICAL | Update company name |

---

## 8. Receipt Number Format

| # | File | Line | Current Value | Risk | Action |
|---|------|------|-------------|------|--------|
| 60 | `apps/api/src/modules/payments/payment.repository.js` | 6 | `startsWith = "SY-${currentYear}-"` | HIGH | Change to `"ADX-${currentYear}-"` |
| 61 | `packages/db/src/schema/payments.js` | 28 | Comment: `// SY-2026-0001 format` | LOW | Update comment |
| 62 | `packages/db/scripts/backfill-receipts.js` | 38 | `receiptNumber = \`SY-${year}-...\`` | HIGH | Change to ADX prefix |

---

## 9. Security & Auth Files

| # | File | Line | Current Value | Risk | Action |
|---|------|------|-------------|------|--------|
| 63 | `apps/api/src/lib/auth.js` | 3 | JWT secret fallback: `"skillyards_secret_key_change_me_in_prod"` | CRITICAL | Replace comment/fallback |
| 64 | `apps/api/src/lib/auth.js` | 3 | Variable name hint in fallback comment | MEDIUM | Update comment |
| 65 | `apps/api/src/lib/permissions.js` | 2 | Comment: `SKILLYARDS AUTHORIZATION POLICY ENGINE` | LOW | Update comment |
| 66 | `apps/api/src/lib/middleware.js` | 6 | Comment: `SKILLYARDS STRUCTURAL ENFORCEMENT WRAPPER` | LOW | Update comment |

---

## 10. Script Files

| # | File | Line | Current Value | Risk | Action |
|---|------|------|-------------|------|--------|
| 67 | `tmp/seed-admin.js` | 20 | `"admin@skillyards.com"` | MEDIUM | Update seed email |
| 68 | `tmp/test-delete.js` | 13 | `"admin@skillyards.com"` | MEDIUM | Update test email |
| 69 | `apps/api/scripts/test-receipt-auth.mjs` | 3 | `SECRET = "skillyards_secret_key_change_me_in_prod"` | HIGH | Remove hardcoded secret |
| 70 | `apps/api/scripts/test-internal-bypass.mjs` | 41 | `x-internal-key: "skillyards-secret-123"` | HIGH | Remove hardcoded secret |
| 71 | `apps/cms/scripts/migrate-faqs.mjs` | 42+ | FAQ content with "SkillYards" | MEDIUM | Update FAQ content |
| 72 | `apps/cms/scripts/seed-program-faqs.mjs` | 48+ | FAQ content with "SkillYards" | MEDIUM | Update FAQ content |

---

## 11. Health & Internal Service

| # | File | Line | Current Value | Risk | Action |
|---|------|------|-------------|------|--------|
| 73 | `apps/api/src/app/api/health/route.js` | 12 | `service: "skillyards-api"` | LOW | Update to "adx-api" |

---

## 12. Sanity CMS

| # | File | Line | Current Value | Risk | Action |
|---|------|------|-------------|------|--------|
| 74 | `apps/cms/sanity.config.js` | 9 | `title: 'skillyards-cms'` | LOW | Update title |
| 75 | `apps/cms/schemaTypes/post.js` | 288 | Comment: `SKILLYARDS TIMES GROUP` | LOW | Update comment |

---

## 13. CMS Script FAQs

| # | File | ~Count | Current Value | Risk | Action |
|---|------|--------|-------------|------|--------|
| 76 | `apps/cms/scripts/migrate-faqs.mjs` | 50+ | FAQ content references "SkillYards" throughout | MEDIUM | Update all FAQ content |
| 77 | `apps/cms/scripts/seed-program-faqs.mjs` | 20+ | FAQ content references "SkillYards" throughout | MEDIUM | Update all FAQ content |

---

## 14. Website Components

| # | File | Line | Current Value | Risk | Action |
|---|------|------|-------------|------|--------|
| 78 | `apps/website/src/components/blog/NewsArticleTemplate.jsx` | 48 | `<span>SKILLYARDS NEWSROOM</span>` | MEDIUM | Update newsroom label |

---

## 15. Log Files & Cache Files

| # | File | Line | Current Value | Risk | Action |
|---|------|------|-------------|------|--------|
| 79 | `apps/pdf-service/pdf-service.log` | 7,12,17,22,27,32 | `bucket: 'skillyards-documents'` | LOW | Log file — no action needed |
| 80 | `homepage-validation.html` | 1 | Full Skillyards HTML snapshot | LOW | Static snapshot — no action needed |

---

## 16. Documentation Files (docs/)

| # | File | Current Value Pattern | Risk | Action |
|---|------|---------------------|------|--------|
| 81 | `docs/BACKEND_ARCHITECTURE.md` | "Skillyards" throughout | LOW | Content documentation |
| 82 | `docs/V2_SCOPE_AND_TODOS.md` | "Skillyards" throughout | LOW | Content documentation |
| 83 | `docs/SENIOR_BACKEND_ENGINEERING_ANALYSIS.md` | "Skillyards" throughout | LOW | Content documentation |
| 84 | `docs/CODEBASE_DISCOVERY_REPORT.md` | "Skillyards" throughout | LOW | Content documentation |
| 85 | `docs/INTERVIEW_QUESTIONS.md` | "Skillyards" throughout | LOW | Content documentation |
| 86 | `docs/FRONTEND_INTERVIEW_QUESTIONS.md` | "Skillyards" throughout | LOW | Content documentation |
| 87 | `docs/SANITY_GUIDE.md` | "SkillYards" throughout | LOW | Content documentation |
| 88 | `docs/pdf_service_guide.md` | "SkillYards" throughout | LOW | Content documentation |
| 89 | `docs/openapi.yaml` | `title: SkillYards API` | LOW | API spec title |
| 90 | `apps/docs/FAQ_SEO_CHANGES.md` | "SkillYards" throughout | LOW | Content documentation |
| 91 | `apps/cms/Insights/cms_build_failure.md` | "Skillyards" references | LOW | Internal note |

---

## Summary by Risk Level

| Risk Level | Count | Action |
|------------|-------|--------|
| CRITICAL | 28 | User-visible: SEO, receipts, emails, logos, company name |
| HIGH | 15 | Domain configs, CORS, security, receipt format |
| MEDIUM | 19 | FAQ content, script files, component text |
| LOW | 29 | Documentation, comments, log files, lock files |
| **TOTAL** | **91** | All unique findings |

---

## Excluded from Search (False Positives)

- **`homepage-validation.html`**: Static HTML snapshot of the homepage — will be regenerated by Next.js, no action needed.
- **`package-lock.json`**: Auto-generated by npm — will be regenerated when package names change.
- **`apps/website/package-lock.json`**: Same as above.
- **`apps/pdf-service/pdf-service.log`**: Runtime log file.
