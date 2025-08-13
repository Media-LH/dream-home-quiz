# Loudermilk — Dream Home Exterior Quiz (Next.js)

A ready-to-deploy app that collects leads, generates an exterior image via OpenAI Images, emails the result, and rate-limits by phone/week.

## Deploy (Option A)

1) Create a GitHub repo and upload these files (or unzip and drag/drop).  
2) Create accounts: Vercel (hosting), OpenAI (API key), Resend (email), Supabase (DB), Vercel KV (Redis).  
3) Import the repo into **Vercel** (New Project → Import).  
4) In Vercel → Project → **Environment Variables**, add:

```
OPENAI_API_KEY=sk-...
RESEND_API_KEY=...
SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
KV_REST_API_URL=...
KV_REST_API_TOKEN=...
NEXT_PUBLIC_APP_URL=https://<your-vercel-url>
```

5) In **Supabase** → SQL editor, run:

```sql
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  email text not null,
  phone_e164 text not null,
  spec jsonb not null,
  created_at timestamptz not null default now()
);
create table if not exists public.renders (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads(id) on delete cascade,
  image_url text not null,
  prompt text not null,
  created_at timestamptz not null default now()
);
```

6) In **Resend**, add your sender domain and use something like `designs@your-domain.com` in `/app/api/generate/route.ts`.

7) Deploy. Visit `/` to try it. The app emails users a copy of their render and shows your logo/CTAs on the result page.

## Editing Content (no code)
- `content/brand.json` — subject, logo path, links, weekly limit.  
- `content/quiz.json` — questions, options, order.  
- Replace placeholder tile images in `/public/quiz/tiles/**` with your images.

## Local dev (optional)
```
npm install
npm run dev
```
Create `.env.local` with the same variables for local testing.
