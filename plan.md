## Portfolio website plan

This is the direction I’d recommend for your site: a dark, soft, indie-cute portfolio that feels editorial and a little dreamy, while still being polished and modern. The mood should be close to your favorite references: grainy textures, lowercase typography, layered cards, and a playful but calm feel.

### 1. Best stack for a beginner
I’d suggest:
- React + TypeScript with Vite
- Tailwind CSS for styling
- Framer Motion for smooth animations
- Local JSON or Markdown files for blog posts first
- Vercel for easy deployment

This gives you a professional-looking site without making the setup too complicated.

### 2. Suggested layout
I’d structure it like this:

1. Home / About
- Short intro
- Who you are
- Quick contact links
- A cute visual or portrait section

2. Journal / Blog
- A grid of milestone cards
- Each entry includes image, title, date, short text, and tags
- Filter chips for categories like crochet, travel, robotics, competitions, volunteering, nonprofit, life, birthdays

3. Experience / Roles
- A LinkedIn-style timeline or card list of organizations and roles you’ve had over the years

4. Contact
- Email, socials, and a simple final note

### 3. Visual direction
Your site should feel:
- dark mode
- soft and feminine
- indie and a little whimsical
- slightly editorial and textured

### 4. Color palette
A good starting palette would be:
- Background: deep charcoal / espresso — #17141A
- Main text: soft cream — #F5EBDD
- Secondary text / muted blush: #D9B9B2
- Accent rose: muted pink — #C9838D
- Accent lilac: dusty purple — #8F7AA8
- Accent sage: soft green — #8FA08A
- Accent warm gold: subtle glow — #CBA36A
- Card surface / panel: #201B24
- Border / subtle outline: #3A2E3A
- Highlight glow: #E9C3A6 with 20–30% opacity

That keeps it easy on the eyes while still feeling cute and thoughtful.

### 5. Design choices that will make it feel special
- Add a subtle grain/noise overlay for that tactile, aesthetic look
- Use lowercase typography with a soft serif for headings and a rounded sans-serif for body text
- Make the layout a little asymmetrical and collage-like
- Add a custom cursor that feels playful and theme-matching
- Use hover effects with glow, soft movement, and button emphasis
- Add gentle scroll reveals and tiny animations so it feels alive without being overwhelming

### 6. Build plan
1. Set up the project and basic navigation
2. Build the home/about page and contact section
3. Create the blog card system and tag filters
4. Add the experience/roles section
5. Add the custom cursor, hover polish, and motion effects
6. Test responsiveness and publish

### 7. Phase structure
#### Phase 0: Get everything installed
- Tools: Node.js, npm or pnpm, VS Code, Vite, Tailwind CSS, Framer Motion
- What to do:
  - Install Node.js if you do not already have it
  - Create the Vite React + TypeScript app
  - Install Tailwind, Framer Motion, and any icon package you want
  - Make sure the project runs locally before styling anything

#### Phase 1: Basic design foundation
- Tools: Tailwind CSS, Google Fonts, Figma or Canva for moodboarding
- What to do:
  - Set up the dark mode color system using the hex palette above
  - Create the page shell with a sticky nav and simple section layout
  - Pick your fonts: a soft serif for headings and a rounded sans-serif for body text
  - Build the first version of the hero/about section and the contact section
  - Add the grainy background texture and soft card styling

#### Phase 2: Make the site functional
- Tools: React components, local JSON or Markdown files, TypeScript
- What to do:
  - Create reusable components for the hero, blog cards, filter chips, and experience cards
  - Build the blog section with sample entries and category tags
  - Add filtering so visitors can click crochet, travel, robotics, volunteering, life, and other tags
  - Create the experience/roles section with a timeline or card layout
  - Make sure the content is easy to edit later

#### Phase 3: Add the fun interactive details
- Tools: CSS, Framer Motion, custom React hooks
- What to do:
  - Build a custom cursor that matches the vibe of the site
  - Add hover states to buttons, cards, and links with highlight glow and motion
  - Add scroll reveal animations and subtle transitions between sections
  - Add tiny decorative details like floating shapes, soft blur effects, or sparkly accents
  - Keep the motion intentional so it feels cute and polished instead of chaotic

#### Phase 4: Polish and publish
- Tools: Vercel, browser dev tools, Lighthouse
- What to do:
  - Check mobile responsiveness and fix layout issues
  - Make sure the text is readable and the contrast is comfortable
  - Optimize images and animations so the site loads smoothly
  - Deploy the site to Vercel and share the link
  - Add your real content, photos, and contact info

### 8. My recommendation
Start with a polished single-page version first. That will already look impressive and be much easier to build than jumping straight into a huge multi-page CMS setup.
