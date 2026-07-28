# Indie Portfolio Website Plan

## What you're building

A multi-page portfolio blending your favorite references:

- **Alazanto in 2005.jpeg** — red / blue / tan contrast, 3-column journal layout, keyword filter sidebar, italic serif post titles
- **_.jpeg** and **_ (3).jpeg** — modular scrapbook cards, sticker-style photos, lowercase nav, dark cozy panels
- **_ (4).jpeg** — grainy texture, retro-cute personality, changelog-style updates

Start fresh with dark + Alazanto design (old light-mode prototype was removed in "restarted" commit).

## Stack

| Tool | Why |
|------|-----|
| React + TypeScript + Vite | Fast dev, industry standard |
| Tailwind CSS v4 | Quick styling |
| Framer Motion | Animations |
| React Router | Pages: home, journal, experience, contact, admin |
| Supabase | DB + image storage + auth for `/admin` |
| Vercel | Free hosting |

## Site layout

1. **Home** — about me, contact, 3-column (red decor | tan content | blue sidebar), mouse-following orb
2. **Journal** — milestone cards with image/title/date/tags, filter sidebar
3. **Experience** — roles, leadership, certifications (tabs)
4. **Contact** — email, socials
5. **Admin** (`/admin`) — password-protected upload: image, text, date, tags

## Color palette

| Role | Hex | Usage |
|------|-----|-------|
| Page background | `#1A1614` | Dark canvas |
| Content panel | `#E8DCC8` | Tan cards |
| Panel text | `#2A2018` | Body on tan |
| Left accent | `#9E3B30` | Red sidebar |
| Right accent | `#5B7FA3` | Blue sidebar |
| Dark card | `#241F1C` | Nav, dark sections |
| Muted text | `#A89888` | Secondary |
| Glow | `#CBA36A` | Hover states |

## Typography

- Titles: **Cormorant Garamond** or **Lora** — *italic serif*
- Body: **Lora** — regular serif
- Nav/tags/buttons: **IBM Plex Mono** — lowercase monospace

## Supabase tables

**journal_posts:** id, title, body, image_url, date, tags (text[]), created_at

**experience_roles:** id, title, organization, start_date, end_date, description, type (`role`|`leadership`|`certification`), sort_order

RLS: public read, authenticated write.

## Project structure

```
portfolio/
├── portfolio-design/
├── portfolio-site/
│   ├── public/
│   ├── src/
│   │   ├── lib/supabase.ts
│   │   ├── pages/ (Home, Journal, Experience, Contact, Admin)
│   │   └── components/
│   └── supabase/schema.sql
├── plan.md
└── README.md
```

## Build phases

### Phase 0 — Setup
1. Node.js v20+
2. Scaffold Vite React + TS app
3. Install Tailwind, Framer Motion, React Router, Supabase
4. Create Supabase project, run schema.sql, create storage bucket
5. Confirm `npm run dev` works

### Phase 1 — Design foundation (~2–3 hrs)
CSS variables, grain overlay, nav, 3-column home shell, fonts

### Phase 2 — Core pages (~3–4 hrs)
Journal + filters, Experience tabs, Contact, sample data

### Phase 3 — Admin (~2–3 hrs)
Supabase Auth, `/admin` login, post + experience forms

### Phase 4 — Polish (~2–3 hrs)
Custom cursor, floating orb, hovers, scroll reveals, sticker photos

### Phase 5 — Deploy (~1–2 hrs)
Real content, responsive test, Vercel + env vars

## Env vars

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Store in `portfolio-site/.env.local` (never commit).

## Images to provide later

Profile photo, decorative sidebar graphic, journal photos, cert badges, favicon.

## Estimated time: ~12–16 hours total
