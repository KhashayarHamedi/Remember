# Remember

A premium minimalist meditation and wellness website. Serene, intentional, and production-ready.

**Repository:** [github.com/KhashayarHamedi/Remember](https://github.com/KhashayarHamedi/Remember)

---

## Tech stack

- **Next.js 15+** (App Router only)
- **TypeScript** (strict)
- **Tailwind CSS** (custom theme in `tailwind.config.ts`)
- **Framer Motion** (spring-based animations)
- No external UI kits; safe for Vercel deployment

---

## Architecture

- **Browser → Next.js server (same origin) → static assets.** All paths are relative; no hardcoded hostnames.
- **Layout:** `app/layout.tsx` (fonts, metadata) + `app/components/layout/Header.tsx` (fixed, scroll tint, mobile menu) and `Footer.tsx`.
- **Sections:** Hero, About, Benefits, Guided Experience, Testimonials, Call to Action — each in `app/components/sections/`.
- **Design tokens:** Colors (HSL), spacing, typography in `tailwind.config.ts`; shared motion config in `app/lib/motion.ts`.

---

## Installation and run

From a fresh clone of the repo:

```bash
git clone https://github.com/KhashayarHamedi/Remember.git
cd Remember
npm install
npm run dev
```

**Expected terminal output (after install):**

```
▲ Next.js 15.x.x
- Local:        http://localhost:3000
- Ready in X.Xs
```

**Browser:** Open [http://localhost:3000](http://localhost:3000).

---

## Green path (deterministic)

1. **Clone and install**
   ```bash
   git clone https://github.com/KhashayarHamedi/Remember.git
   cd Remember
   npm install
   ```
   Expect: `added N packages` and no errors.

2. **Run dev server**
   ```bash
   npm run dev
   ```
   Expect: `Ready in X.Xs` and `Local: http://localhost:3000`.

3. **Open in browser**  
   Navigate to **http://localhost:3000**.

4. **Success checks**
   - Hero headline “Return to the present.” and tagline visible.
   - Fixed header; scrolling adds slight tint/backdrop.
   - Sections: About, Benefits, Experience, Testimonials, CTA and Footer load with no layout shift.
   - Scroll reveals animate subtly (opacity + small y); no flashy or distracting motion.
   - Mobile: hamburger opens/closes menu smoothly.
   - No console errors; page feels calm and 60fps-friendly.
   - Lighthouse: suitable for Performance, Accessibility, Best Practices (no blocking resources, semantic HTML, readable contrast).

5. **Production build**
   ```bash
   npm run build
   npm run start
   ```
   Expect: build completes; `npm run start` serves on port 3000. Same URL and visual/UX checks as above.

---

## Project structure

```
Remember/
├── app/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   └── sections/
│   │       ├── Hero.tsx
│   │       ├── About.tsx
│   │       ├── Benefits.tsx
│   │       ├── GuidedExperience.tsx
│   │       ├── Testimonials.tsx
│   │       └── CallToAction.tsx
│   ├── lib/
│   │   └── motion.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── tailwind.config.ts
├── next.config.ts
├── tsconfig.json
├── postcss.config.mjs
├── package.json
└── README.md
```

---

## Deploy (Vercel)

Connect the GitHub repo to Vercel; use default Next.js settings. Build command: `npm run build`. Output: default Next.js output. No env vars required for the current static/landing setup.
