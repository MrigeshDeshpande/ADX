# AdhyayanX (ADX)

> Modern Education Operations Platform for Coaching Institutes, Training Centers, and Educational Organizations.

AdhyayanX (ADX) is a comprehensive education management platform built to streamline student operations, fee management, assessments, content publishing, and institutional workflows through a unified ecosystem.

The platform combines a public-facing website, administrative ERP, centralized API layer, content management system, and supporting automation services to help educational institutions operate efficiently at scale.

---

## Vision

To build a modern, technology-driven ecosystem that simplifies educational operations while enabling institutions to focus on delivering exceptional learning experiences.

---

## Core Capabilities

### Student Management
- Student enrollment and onboarding
- Student profile management
- Course and batch allocation
- Student lifecycle tracking

### Fee & Financial Operations
- Flexible fee plans
- Installment-based payment schedules
- Payment tracking
- Financial ledger management
- Outstanding balance monitoring

### Receipt Automation
- Automated PDF receipt generation
- Receipt versioning
- Cloud-based document storage
- Receipt delivery via email

### Assessment System
- Online assessments
- Timed tests
- Automated scoring
- Result tracking
- Certificate generation

### Lead & Enquiry Management
- Website enquiry capture
- Lead tracking
- Automated notifications
- CRM-style intake workflow

### Content Management
- Blog publishing
- FAQ management
- Program management
- Author management
- SEO content workflows

### Academic Operations
- Administrative workflows
- Reporting capabilities
- Staff management
- Role-based access control

---

## Architecture

ADX follows a modular monorepo architecture.

```text
apps/
├── website         # Public marketing website
├── admin           # Internal ERP/Admin panel
├── api             # Centralized backend API
├── cms             # Sanity CMS Studio
├── pdf-service     # PDF generation microservice

packages/
├── db              # Shared database schema and client
```
---

## Applications

### Website

Public-facing platform responsible for:

- Program pages
- Blog system
- SEO landing pages
- FAQs
- Contact forms
- Marketing campaigns
- Lead generation

### Admin ERP

Internal platform used by staff for:

- Student management
- Payment collection
- Fee planning
- Ledger tracking
- User management
- Operational reporting

### API Platform

Central business layer responsible for:

- Authentication
- Authorization
- Business logic
- Database operations
- Assessment workflows
- Payment processing
- Receipt generation

### CMS

Sanity-powered content management system used for:

- Blog publishing
- FAQ management
- Program content
- Authors and tags
- SEO content operations

### PDF Service

Dedicated microservice responsible for:

- Receipt rendering
- PDF generation
- Document storage integration
- Background processing

---

## Technology Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion

### Backend

- Node.js
- Next.js API Routes
- REST APIs
- Zod Validation

### Database

- PostgreSQL
- Drizzle ORM
- Neon Database

### Content Platform

- Sanity CMS
- GROQ

### Infrastructure

- Cloudflare R2
- Resend
- Puppeteer
- npm Workspaces

---

## Key Features

### Financial Ledger System

A real-time ledger engine that provides:

- Total fee tracking
- Amount paid tracking
- Outstanding balance calculations
- Installment allocation visibility
- Student payment history

### Automated Receipt Pipeline

Every payment can trigger:

1. Receipt creation
2. PDF generation
3. Cloud storage upload
4. Email delivery
5. Status tracking

### Assessment Engine

Supports:

- Question banks
- Session tracking
- Automated evaluation
- Certificate workflows
- Result reporting

### SEO Infrastructure

Built-in SEO tooling including:

- Structured data generation
- Dynamic sitemap generation
- Canonical URL management
- FAQ schema
- Open Graph metadata
- Content optimization workflows

---

## Security

- JWT Authentication
- Role-Based Access Control (RBAC)
- Password Hashing (bcrypt)
- Protected API Routes
- Rate Limiting
- Internal Service Authentication
- CAPTCHA Verification

---

## User Roles

| Role | Access |
|--------|--------|
| ADMIN | Full platform access |
| MANAGER | Operational management |
| STAFF | Restricted operational access |
| SALES | Lead and enquiry workflows |
| STUDENT | Student-specific access |
| INTERNAL | Service-to-service communication |

---

## Development Philosophy

ADX is built around:

- Modular Architecture
- Separation of Concerns
- Shared Schema Management
- Automation-First Workflows
- Scalability
- Maintainability
- Operational Reliability

---

## Future Roadmap

Planned areas of expansion include:

- AI-powered academic workflows
- Teacher productivity tools
- Academic analytics
- Student self-service portal
- Attendance management
- Communication automation
- Learning insights and reporting
- Intelligent assessment systems

---

## Project Status

Active Development

ADX serves as the foundation for building next-generation educational operations software and academic workflow automation.

---

## License

Copyright © AdhyayanX
