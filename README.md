Whop ROI Tracker — MVP

Stack
- Next.js 14 (App Router), TypeScript
- Prisma + SQLite

Getting Started
1. Create `.env` file with: `DATABASE_URL="file:./prisma/dev.db"`
2. Sync schema to DB: `npx prisma db push` (or `npx prisma migrate dev` in local dev)
3. Generate Prisma Client: `npx prisma generate`
4. Start dev server: `npm run dev`

Routes
- `/dashboard` — Core KPIs (Revenue, Cost, ROI, CPA, ROAS)
- `/utm` — UTM Builder + save to DB
- `/campaigns` — campaigns list
- `/costs` — add campaign costs
- `POST /api/webhooks/whop` — Whop events webhook stub

Notes
- Webhook payload (minimal): `{ type, campaign, fullUrl, valueCents?, customerId?, metadata? }`
- Currency defaults to USD; adjust formatting if needed
