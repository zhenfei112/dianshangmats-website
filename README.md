# DIANSHANGMATS B2B Commerce Website

Local-first rebuild for DIANSHANGMATS as an English single-supplier B2B commerce website.

This version follows a supplier-store model:

- Customers can select products into a Quote Basket and submit one factory inquiry.
- Samples, stock products, custom products and large wholesale orders all use the inquiry workflow.
- Every product can use inquiry labels such as stock inquiry, custom quote or sample + bulk inquiry.
- Admin, product management, inquiry management and order management are scaffolded for phase-two database work.

## Stack

- Next.js
- TypeScript
- Tailwind CSS
- Prisma ORM
- MySQL
- Hostinger Node.js Web App compatible

## Local Development

```bash
npm install
npm run dev
```

Local URL:

```text
http://localhost:3000
```

## Build

```bash
npm run build
npm start
```

## Environment

Copy `.env.example` to `.env.local` for local work.

Required later for real persistence:

- `DATABASE_URL`
- `AUTH_SECRET`
- SMTP settings
- SMTP settings for inquiry notifications

No online payment flow is used in this inquiry-first version.

## Hostinger Node.js Web App

Suggested setup after local approval:

- Build command: `npm install && npm run build`
- Start command: `npm start`
- Node.js app root: project root
- Environment variables: configure in Hostinger panel

Do not deploy to the formal domain until local review is approved.

## Key Local Routes

- `/`
- `/products`
- `/category/placemats`
- `/products/pu-leather-restaurant-placemat`
- `/customization`
- `/oem-odm-services`
- `/request-quote`
- `/quote-basket`
- `/submit-inquiry`
- `/admin`
- `/admin/login`

## Notes

- Current product/content data lives in `lib/site-data.ts` as reviewable seed data.
- Prisma database schema lives in `prisma/schema.prisma`.
- Imported/reference content must include `contentSource` and `needsReview`.
- Product and category images should be converted to local WebP assets before production.
