# Portfolio Site

React + TypeScript portfolio (see [plan.md](../plan.md)).

## Phase 0 — run locally

```bash
cd portfolio-site
npm install
npm run dev
```

Open http://localhost:5173/

## Supabase setup

1. Create a project at [supabase.com](https://supabase.com)
2. Run [`supabase/schema.sql`](supabase/schema.sql) in SQL Editor
3. Create Storage bucket `journal-images` (public)
4. Copy `.env.example` → `.env.local` and add your URL + anon key
5. In Authentication, create your admin user (email + password)

## Scripts

- `npm run dev` — local dev server
- `npm run build` — production build
- `npm run preview` — preview production build
