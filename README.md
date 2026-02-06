# Remember

A serene minimalist wellness site: choose how you feel, get a tailored ritual (meditation, self-care, journaling), reflect, and optionally save a Mood Card.

**Repository:** [github.com/KhashayarHamedi/Remember](https://github.com/KhashayarHamedi/Remember)

---

## Architecture

- **Browser → Next.js (same origin) → static assets.** Relative paths only; no Docker hostnames.
- **Layout:** `app/layout.tsx` (fonts, metadata); `Header` (fixed, scroll tint, mobile menu); `Footer`.
- **Sections:** Hero, **FeelingsSection** (picker + ritual + journaling + mood card), About, Benefits, Guided Experience, Testimonials, Call to Action. Interactive product UI lives in client components under `app/components/sections/`.
- **Animations:** Framer Motion only; springs in `app/lib/motion.ts` (stiffness 80–120, damping 15–25). Scroll reveals via `useInView` once; no parallax or scroll-jacking.
- **Env:** Only `NEXT_PUBLIC_*` on client if needed; none required for current MVP.

---

## What was broken and why (Begin bug)

- **Symptom:** “Begin” did nothing useful: no scroll, no navigation, no modal.
- **Cause:**  
  - Hero and nav linked to `#begin`, which targeted the **CTA section** at the bottom (“Join the journey”) — not the product entry.  
  - CTA’s own “Begin” used `href="#"` (no-op).  
  - There was **no “Feelings” section**; the product flow (choose feeling → ritual) didn’t exist.
- **Classification:** Wrong assumption (Begin should lead to “How do you feel?”) plus missing target and smooth scroll. Not a single-line code typo.

**Fix applied:** Added a **Feelings** section with `id="feelings"`, smooth scroll and `scroll-padding-top` for the fixed header, and pointed all “Begin” links to `#feelings`. Implemented the full flow: feelings picker → ritual → journaling (localStorage autosave) → “Save my ritual” → Mood Card with “Copy text”.

---

## What changed (file list)

| File | Change |
|------|--------|
| `app/globals.css` | `scroll-behavior: smooth`, `scroll-padding-top: 5.5rem` |
| `app/page.tsx` | Insert `FeelingsSection` after Hero |
| `app/components/sections/Hero.tsx` | `href="#feelings"`, `data-testid="begin-button"`, aria-label |
| `app/components/sections/FeelingsSection.tsx` | **New.** Picker, ritual block, journal textarea (autosave), Save ritual, Mood Card + Copy |
| `app/components/sections/CallToAction.tsx` | `href="#feelings"` for Begin |
| `app/components/layout/Header.tsx` | Nav “Begin” → `#feelings` |
| `app/components/layout/Footer.tsx` | “Begin” → `#feelings` |
| `app/lib/rituals.ts` | **New.** Types + `FEELINGS`, `getRitualForFeeling()` (static mapping) |
| `package.json` | `"typecheck": "tsc --noEmit"` |

---

## Tech stack

- Next.js 15+ (App Router), TypeScript (strict), Tailwind CSS, Framer Motion. No UI kits. Safe for Vercel.

---

## Green path (from fresh clone)

1. **Clone and install**
   ```bash
   git clone https://github.com/KhashayarHamedi/Remember.git
   cd Remember
   npm install
   ```
   **Expected:** `added N packages` (or similar), no errors. (Use `pnpm install` if you have pnpm.)

2. **Run dev**
   ```bash
   npm run dev
   ```
   **Expected:** `▲ Next.js 15.x.x`, `Local: http://localhost:3000`, `Ready in X.Xs`.

3. **Open**
   **URL:** [http://localhost:3000](http://localhost:3000)

4. **Verification checklist**
   - **Begin opens modal:** Click “Begin” (hero or nav) → full-screen modal “How do you feel today?” with grouped feeling pills; Escape or Close dismisses.
   - **Feeling select → ritual:** In modal, click a pill (e.g. “Calm”) → modal closes, page scrolls to “Your ritual”; ritual card appears with meditation, self-care, journaling prompt, Spotify link (staggered calm animation).
   - **Feelings section:** On page, pills in “Your ritual” also select/change feeling; ritual updates instantly.
   - **Reflection:** Type in “Your reflection” → draft autosaves to localStorage (debounced). Click “Save Reflection” → entry saved to My Journey, textarea clears, checkmark animation; “My Journey” appears in nav.
   - **My Journey:** Open `/journey` or click “My Journey” in nav → “Your Remembered Moments”, wavy viz, insight cards (most remembered feeling, recent reflections, quiet streak), timeline of entries; “Start a new moment” → home with modal open; “Copy summary” → clipboard.
   - **Animations:** Modal and ritual use calm springs; no layout shift; 60fps feel.

5. **Scripts**
   ```bash
   npm run typecheck   # tsc --noEmit
   npm run lint        # next lint
   npm run build       # next build
   npm run start       # serve production
   ```
   Optional: `pnpm install` and `pnpm dev` work the same.

---

## Project structure (relevant)

```
Remember/
├── app/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   └── sections/
│   │       ├── Hero.tsx
│   │       ├── FeelingsSection.tsx   # Picker + ritual + journal + mood card
│   │       ├── About.tsx
│   │       ├── Benefits.tsx
│   │       ├── GuidedExperience.tsx
│   │       ├── Testimonials.tsx
│   │       └── CallToAction.tsx
│   ├── lib/
│   │   ├── motion.ts
│   │   └── rituals.ts                # Types + feeling → ritual map
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── tailwind.config.ts
├── next.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

**Test IDs:** `begin-button` (Hero), `feelings-section`, `feelings-picker`, `ritual-output`, `journal-input`, `mood-card`.

---

## Next upgrades (optional)

- **Spotify:** Replace static playlist links with Spotify API (auth + user playlists or recommendations by mood).
- **Auth:** Optional sign-in to persist rituals and journal across devices.
- **Community:** Shared mantras or anonymous “today I chose…” (moderated).
- **Real meditation audio:** Short guided tracks or timer instead of text-only suggestion.
- **Mood Card image:** Server-side or client canvas to generate a shareable image (e.g. OG-style card).
