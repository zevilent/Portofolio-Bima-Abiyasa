# docs/prompt.md — Brief asli dari Bima

> **Status:** transkripsi setia dari prompt yang dikirim Bima pada sesi pertama (431 baris).
> Wording tidak diubah. Hanya normalisasi whitespace: beberapa baris yang tergabung saat
> paste (mis. `...then wait.1. Write docs/brief.md`) dikembalikan ke baris terpisah.
> Dokumen ini adalah sumber kebenaran tertinggi. Jika ada konflik dengan file lain,
> prompt ini menang.

---

You are a world-class creative developer and art director: the kind of person who builds Awwwards "Site of the Day" portfolios. You combine luxury brand design, advanced motion (GSAP, WebGL) and strict engineering quality (performance, accessibility, SEO, tests). Design and build my personal portfolio website. Make it the best work you can possibly produce: luxurious, professional, memorable, and clearly "next level" for a web developer in the AI era. At the same time, it must be fast, accessible, honest, and something a real client trusts enough to pay for a Rp40 million project.

## 1. Who I am

- Name: Bima Abiyasa
- Title: AI Agentic Full Stack Website Developer
- Tagline: "Build smarter. Ship faster."
- One-liner: Website dan web application modern yang dibangun end-to-end: interface, backend, database, automation, hingga integrasi AI.
- Services: custom website, web application, AI integration, business automation.
- Location: Bogor, Indonesia. I work with clients remotely.
- Contact:
  - WhatsApp: +6285155402545
  - Email: bima.abiyasa16@gmail.com
  - Instagram: https://www.instagram.com/zevilents.ventus
  - LinkedIn: https://www.linkedin.com/in/bima-abiyasa/
  - GitHub: https://github.com/zevilent
- Photo of me: [yes, file at public/images/bima.jpg / no photo]

## 2. Goals of the website

In priority order:

1. Make a potential client trust me within 10 seconds.
2. Show my best work as rich case studies.
3. Explain my services and starting prices clearly.
4. Show what makes me different: I build with AI agents, fast, but with a human-controlled, quality-checked process.
5. Convert visitors into WhatsApp conversations with a short, qualified project brief.

Primary audience: Indonesian business owners, UMKM, startups and companies who need a website or web app. Secondary audience: agencies and recruiters.

## 3. Hosting and tech (fixed)

- GitHub Pages user site: repository `zevilent.github.io`, live at https://zevilent.github.io/, Astro `base` = "/".
- Document how to add a custom domain later (CNAME file + DNS steps).
- Static site: no database, no server, no secrets.
- Framework: Astro + TypeScript + Tailwind CSS.
- Case studies: Astro Content Collections (Markdown/MDX with a typed schema), so I can add a new project by adding one file.
- All personal data, prices, services, links, feature flags and analytics IDs live in typed config/content files, never hardcoded inside components.
- Motion and 3D libraries allowed:
  - GSAP (free, including ScrollTrigger and SplitText)
  - Lenis (smooth scroll)
  - Three.js (WebGL)
  - No other animation or UI kit libraries without asking me.
- Page transitions: Astro View Transitions (ClientRouter). Make sure GSAP, Lenis and WebGL are cleaned up and re-initialized correctly on every navigation, with no memory leaks or duplicated listeners.
- Deploy with a GitHub Actions workflow on every push to main.
- Keep dependencies minimal and justify each one in docs/brief.md.

## 4. Creative concept: "The Agentic Studio"

The site should feel like the private studio of an elite engineer who directs a team of AI agents: calm, precise, luxurious, and quietly powerful. Not a hacker theme, not a robot theme. Think luxury watchmaking meets mission control.

### Visual identity

- Dark luxury base: obsidian near-black (#0A0A0B range) with subtle warm undertones.
- Text: warm ivory, not pure white.
- Primary accent: champagne gold, used sparingly for highlights, lines, hover states and key numbers.
- Signal accent: a single ember orange used only for "live" states (status dots, active agent steps, cursor highlights). It is a quiet nod to the Phoenix Signal project.
- Keep WCAG AA contrast for all text.

### Typography (self-hosted via @fontsource, font-display swap)

- Display: a modern grotesk (e.g. Geist) at very large, tight, confident sizes.
- Elegant accent: a high-contrast serif italic (e.g. Instrument Serif) for single emphasized words inside headlines.
- Mono: Geist Mono or JetBrains Mono for terminal, labels, numbers and metadata.
- Build a clear fluid type scale with clamp().

### Texture and detail

- Very subtle film grain.
- Fine 1px hairline borders in low-opacity ivory.
- Soft radial light (gold glow) that follows the cursor inside cards.
- Precise grid lines that appear like an architect's drawing.
- Small mono metadata labels (e.g. "01 / SELECTED WORK", "STATUS: SHIPPED", coordinates of the section).

### Brand voice (Bahasa Indonesia, with natural English tech terms)

- Confident, calm, precise. Short sentences. Show, don't tell.
- Never use hype or empty claims: no "revolusioner", "terbaik", "nomor 1", "passionate developer".
- Every claim must be backed by a project, a process step, or a real number I provide.

### Inspiration level

The polish of Linear, Vercel and Stripe marketing sites, and the motion craft of award-winning studio portfolios. Take inspiration only; never copy layouts, text or assets.

### Avoid the generic AI look

- no purple/blue gradients, no glassmorphism everywhere, no floating 3D blobs, no robot or brain illustrations
- no emoji icons, no skill bars with percentages
- no "Hi, I'm Bima" hero cliché
- no stock laptop photos, no lorem ipsum
- no fake testimonials, fake client logos, fake numbers or invented years of experience

## 5. Site map

1. Home (/)
2. Case study pages (/karya/[slug])
3. Custom 404 page
4. Optional /harga page only if the pricing section becomes too long for the home page; propose this in the brief.

Language: Bahasa Indonesia only.

## 6. Home page sections

### 01. Header

- Monogram logo "BA" and a minimal nav: Karya, Layanan, Proses, Harga, FAQ.
- "Konsultasi" button.
- Availability pill with a live ember dot, e.g. "Menerima proyek baru". The text comes from config; hidden if the flag is off.
- Hide the header on scroll down, show it on scroll up.
- Mobile menu: full-screen overlay with large staggered links.

### 02. Hero

- Headline: "Build smarter. Ship faster." with one word in the serif italic accent, revealed with split-text animation.
- Indonesian subheadline based on the one-liner.
- Two CTAs: "Lihat Karya" and "Diskusikan Proyek" (WhatsApp).
- Background: a real-time WebGL scene (Three.js, custom shaders):
  - a field of thousands of fine particles forming a slowly breathing constellation/network in champagne gold
  - reacts softly to the cursor
  - on scroll, the particles reorganize into a clean grid, like an idea becoming structure
- Foreground detail: a compact, realistic "agent terminal" card that types a build log, for example:
  plan → schema → UI → tests passed → security check → deployed ✓
  - loops calmly and pauses on hover
  - decorative for screen readers, with a proper text alternative
- The headline and subheadline are real HTML, visible immediately without JavaScript. They are the LCP element; WebGL must never block them.

### 03. Capability marquee

- Slow, elegant infinite marquee of the technologies and capabilities I actually use. Get the list from config; I will confirm it.
- Pauses on hover. Static list when reduced motion is on.

### 04. Selected Works

Projects (details in section 8):

- Hikari Tutor
- Phoenix Signal
- Niaga One
- Teras Kinara Residence (concept project)

Presentation:

- Large immersive project cards in a pinned, stacking scroll sequence on desktop: each card scales and dims slightly as the next one arrives.
- On hover (desktop): a short muted preview video or image sequence of the real site plays inside the card, and the custom cursor changes to a "Lihat" label.
- Each card shows: number, name, category, year, short result-oriented description, stack tags, and "Live site" + "Case study" links.
- Clicking a card opens the case study with a shared-element View Transition: the card image morphs into the case study hero.
- Concept projects carry a clear "Concept" badge.

### 05. Services

Bento grid with two groups: Website and Web Application (data in section 7).

- Cards reveal details on hover or tap, with the gold spotlight effect.
- Each card shows who it is for, key deliverables, and "Mulai dari" price if prices are enabled.
- Link each service to the most relevant case study when one exists.

### 06. How I build with AI agents (signature section)

Pinned, scroll-driven section using my real workflow: Discovery → Scope → Build → Review → Launch.

- An SVG orchestration diagram: as you scroll, lines draw between nodes and each step lights up with an ember dot.
- For each step, show two columns:
  - "Yang saya putuskan" (human decisions: goals, scope, design approval, final review)
  - "Yang dikerjakan agent" (research, drafts, code, tests, checks)
- Key message: AI agents make the work faster; I stay responsible for quality, security, and the final result. Mention written scope, tests, security checks and human review.
- Mobile: a vertical timeline with simple reveals.

### 07. Pricing

- Toggle between "Website" and "Web Application".
- Package cards with "Mulai" prices, deliverables, revisions and timeline; "Terpopuler" badge on Company Profile.
- Expandable "Add-ons" list and a "Maintenance" plan row.
- Price note: final price depends on pages, design, content, features, integrations and material readiness.
- "Download Price List (PDF)" button, file at public/price-list-bima-abiyasa-2026.pdf.
- Config flag SHOW_PRICES (default true). When false, show "Minta estimasi" instead of prices.

### 08. Terms and FAQ

- Accordion covering:
  - payment terms
  - revisions
  - warranty
  - what is not included
  - timeline start
  - source code handover
  - plus common questions: "Apakah pakai AI berarti hasilnya asal jadi?", "Siapa yang memegang source code?", "Berapa lama proyek selesai?", "Apakah bisa maintenance setelah launch?"
- Answers must match the terms in section 7 exactly.

### 09. Final CTA + project brief

- Huge typographic statement: "Let's turn your idea into a product." with a magnetic button.
- A 3-step mini brief form:
  1. project type (from the package list)
  2. budget range
  3. timeline + name + short description
- Submitting composes a well-formatted WhatsApp message and opens WhatsApp to my number. No data is sent to any server.
- Validate inputs and include a honeypot field.

### 10. Footer

- Contact links, social links, © current year.
- "Built with AI agents, directed by Bima" with a link to the GitHub repo of this site.
- Back-to-top button.

## 7. Services, prices and terms (use exactly this data)

### Website Packages

All packages include: responsive design, source code, basic security, deployment assistance, bug warranty.

- **Landing Page**: "Untuk campaign dan validasi". Mulai Rp3.900.000.
  - 1 halaman, hingga 10 section
  - custom responsive design
  - form lead dan WhatsApp
  - analytics dan Meta Pixel
  - SEO dasar dan speed setup
  - 2 revisi, 7–12 hari kerja
- **Company Profile** (Terpopuler): "Untuk bisnis yang berkembang". Mulai Rp8.500.000.
  - hingga 7 halaman
  - UI custom sesuai brand
  - admin panel / CMS
  - blog, galeri, dan leads
  - SEO teknis dan analytics
  - 3 revisi, 2–4 minggu
- **Corporate**: "Untuk kebutuhan lebih kompleks". Mulai Rp15.000.000.
  - hingga 12 halaman
  - advanced UI dan interaction
  - CMS dan multi-role admin
  - katalog atau artikel
  - basic third-party API
  - 3 revisi, 4–7 minggu

### Web Application

Full-stack systems with authentication, database, dashboard, business workflows and service integrations.

- **E-commerce Custom**: Rp18–35 juta. Katalog, cart, checkout; admin produk dan pesanan; payment dan ongkir dasar.
- **Membership / LMS**: Rp25–50 juta. User dashboard dan membership; materi, progress, akses; subscription-ready.
- **Internal Dashboard**: Rp30–65 juta. Multi-role dan permission; data, filter, laporan; import dan export.
- **MVP / SaaS**: Rp40–120 juta. Auth, billing, dashboard; API dan automation; architecture siap dikembangkan.
- **Sistem kompleks** (marketplace, CRM, ERP, multi-vendor): mulai Rp75 juta, berdasarkan scope.

### Add-ons

- Halaman statis tambahan: Rp750 ribu/halaman
- Halaman dengan desain unik: Rp1,5 juta/halaman
- Login dan registrasi: mulai Rp3,5 juta
- Social login: Rp1,5 juta/provider
- Role dan permission: mulai Rp4 juta
- Admin panel / CMS: mulai Rp6 juta
- Payment gateway: mulai Rp4 juta/provider
- Integrasi ongkir: mulai Rp3 juta/provider
- Integrasi API eksternal: mulai Rp3 juta/API
- WhatsApp / email notification: mulai Rp2 juta/channel
- Dashboard analytics: mulai Rp4 juta
- Export Excel / PDF: mulai Rp1,5 juta
- Multi-language: +25% nilai development
- Progressive Web App: mulai Rp6 juta
- Real-time data / WebSocket: mulai Rp6 juta
- Migrasi data / website: mulai Rp3 juta
- Technical SEO setup: mulai Rp2 juta
- Deployment assistance: mulai Rp1,5 juta

### Maintenance plans

- Basic: Rp1 juta/bulan (monitoring dan perbaikan bug ringan)
- Business: Rp2,5 juta/bulan (update dan perubahan kecil berkala)
- Priority: Rp5 juta/bulan (prioritas support dan pengembangan rutin)

### Workflow

1. Discovery: tujuan, pengguna, fitur, dan prioritas.
2. Scope: proposal, timeline, dan milestone.
3. Build: UI, frontend, backend, dan database.
4. Review: testing, revisi, dan penyempurnaan.
5. Launch: deployment dan handover source code.

### Terms

- Pembayaran 40% saat mulai, 30% setelah fitur utama disetujui, 30% sebelum handover.
- Harga mencakup jasa development sesuai scope dan jumlah revisi yang disepakati.
- Perubahan fitur atau konsep di luar scope dibuatkan estimasi biaya dan timeline baru.
- Garansi bug berlaku untuk fungsi yang tercantum di scope, bukan fitur baru. Duration: [30–60 / 30–90] hari. Use one value consistently everywhere.
- Source code dan akses produksi diserahkan setelah pembayaran lunas.
- Timeline dimulai setelah materi, akses, dan keputusan yang dibutuhkan tersedia.
- Belum termasuk: domain, hosting, server, database managed, lisensi premium, biaya API/AI, payment gateway, WhatsApp provider, email provider, konten, foto, copywriting, dan pajak jika berlaku.
- Jasa development saja; domain, hosting, server, lisensi dan utilitas pihak ketiga tidak termasuk.

## 8. Case studies

Known projects:

1. **Hikari Tutor**: Japanese learning platform. Structured Japanese learning experience. https://hikaritutor.web.id
2. **Phoenix Signal**: XAUUSD signal application. Trading signal app with modern data presentation, analysis and user experience. https://phoenixsignal.app
3. **Niaga One**: business web application with a clean, responsive interface. https://niaga-one.vercel.app
4. **Teras Kinara Residence**: concept landing page for a fictional residential project. Link: [GitHub Pages URL]. Config flag: show "Coming soon" until I provide the link.

Case study page template (/karya/[slug]):

- hero image or video, name, category, year, my role, live link
- overview
- the problem
- the solution
- key features with screenshots
- tech stack and why
- "Dibangun dengan AI agent": how agents were used and what I checked or corrected
- results: only real results I provide; otherwise omit the section
- next project link with a smooth transition

Content rules:

- You may visit the live sites to draft descriptions, but mark every drafted fact as `draft: true` in the frontmatter and list it in docs/content-needed.md for me to verify.
- Never invent metrics, client names, testimonials, dates or results.
- Screenshots and previews:
  - write a Playwright script (scripts/capture.ts) that captures desktop and mobile screenshots of each live site and records a short smooth-scroll preview video
  - convert the videos to optimized, muted MP4/WebM under 1.5 MB each (use ffmpeg if available, otherwise tell me)
  - run the script only after asking me

## 9. Signature interactions (build all, with quality)

1. WebGL particle hero with custom shaders:
   - lazy-loaded after first paint and only when the device can handle it (check prefers-reduced-motion, Save-Data, deviceMemory/hardwareConcurrency)
   - devicePixelRatio capped at 2
   - pauses when off-screen or the tab is hidden
   - elegant static fallback (CSS/SVG or poster image)
2. Agent terminal typing simulation in the hero.
3. Split-text and mask reveal animations for headings.
4. Lenis smooth scroll on desktop; native scroll on touch devices.
5. Pinned stacking project cards with hover video previews.
6. Custom cursor that morphs into context labels ("Lihat", "Buka", "Geser"), desktop only, hidden for keyboard users.
7. Magnetic buttons on desktop.
8. Gold spotlight hover effect on bento cards.
9. Scroll-driven SVG orchestration diagram in the AI process section.
10. Shared-element View Transitions from project card to case study hero.
11. Command palette (Ctrl+K / ⌘K):
    - jump to sections and case studies, copy email, open WhatsApp, download price list
    - fully keyboard accessible
    - a subtle hint in the footer
12. Animated counters, only for real numbers from config; if none are provided, do not show a stats row.
13. Designed 404 page: the agent terminal shows "route not found", with suggested links and a small particle effect.

### Motion rules

- Animate transform, opacity and shader uniforms only. No layout-thrashing animations.
- Use consistent easing and a documented duration scale.
- prefers-reduced-motion: no smooth scroll, no pinning, no parallax, no WebGL motion (static frame), no cursor effects. All content fully readable.
- Mobile (< 768px): simplified versions of pinned effects, no custom cursor, no magnetic buttons, lighter WebGL or static fallback.
- Everything works with keyboard only, and the site is fully usable without JavaScript: content visible, links work.
- No preloader or intro screen that delays content.
- No scroll-jacking that breaks anchor links, the back button or browser find.

## 10. Analytics and SEO

### Analytics

- Optional Google Analytics 4 and Meta Pixel; IDs in config. If an ID is empty, that script is not loaded.
- Scripts load only after consent via a small, elegant cookie consent bar in Bahasa Indonesia.
- One `track()` helper. Events:
  - `click_whatsapp` (with source section)
  - `submit_brief`
  - `open_case_study`
  - `click_live_site`
  - `download_pricelist`
  - `open_command_palette`
  - `toggle_pricing`

### SEO

- Indexing ON (this is my real business).
- Indonesian `lang`, unique title and meta description per page, canonical URLs.
- Sitemap, robots.txt, favicon set and web manifest.
- Open Graph + Twitter cards. Generate a custom OG image per page at build time, in the site's visual style.
- JSON-LD: Person + ProfessionalService on home; CreativeWork per case study; FAQPage for the FAQ.

## 11. Quality targets

### Lighthouse (mobile)

- Performance ≥ 90 on home and case study pages
- Accessibility, Best Practices, SEO = 100

### Core Web Vitals and budgets

- LCP < 2.5s, CLS < 0.05, INP < 200ms on a slow 4G + mid-range Android profile
- Initial JavaScript < 120 KB gzipped, excluding the lazily loaded WebGL chunk
- Hero WebGL chunk loaded on idle
- Images in AVIF/WebP with responsive sizes; videos lazy-loaded

### Rendering

- 60fps scrolling on a mid-range laptop
- Correct layouts at 360, 390, 768, 1024, 1440 and 1920px widths
- Works in the latest Chrome, Safari (macOS and iOS), Firefox and Edge

### Accessibility

- Semantic landmarks and logical heading order
- Visible focus styles that match the luxury design
- Accessible menu, accordion, tabs, command palette and form: focus trap, Esc, ARIA
- Meaningful Indonesian alt text

### Tests

- Vitest: WhatsApp brief message builder, price formatting, config schema validation
- Playwright: navigation, command palette, mobile menu, pricing toggle, brief form, case study pages, reduced-motion mode, no console errors
- axe accessibility checks in Playwright
- Lighthouse CI in GitHub Actions with the targets above
- Link checker for all external links

No secrets in the repo.

## 12. Scope limits

- Do not add: a blog, CMS, backend, login, dark/light toggle, multi-language, sound effects, chatbot, or testimonials (unless I later provide real ones).
- If you believe something important is missing, suggest it in docs/brief.md and wait for my decision.

## 13. Process

0. Ask me up to 8 clarifying questions if critical information is missing, then wait.
1. Write docs/brief.md with:
   - creative concept in your own words and a written moodboard (colors with hex, type specimens, texture, imagery, motion personality)
   - design tokens: colors, fluid type scale, spacing, radius, borders, shadows, easing and duration scale
   - site map and full Indonesian copy for every section and the case study template
   - desktop and mobile wireframe description per section
   - motion spec table: element | trigger | animation | duration/easing | reduced-motion fallback | mobile behavior
   - performance plan for WebGL, fonts, images and video
   - config/content file structure
   - docs/content-needed.md: everything I must provide or verify
   - milestone checklist
2. STOP and wait for my approval.
3. After approval, create REASONIX.md with the key rules (tech, creative concept, tokens, motion rules, honesty rules, scope limits, quality targets, milestone workflow). Keep it short and stable.
4. Build in milestones. For each milestone:
   - implement it
   - run the build and tests
   - take Playwright screenshots at 390px and 1440px into docs/screenshots/[milestone]/
   - review them against docs/brief.md if you can view images; otherwise tell me to review them
   - self-critique honestly: list what still looks generic or unpolished and fix it before reporting
   - tell me exactly how to preview locally
   - update the checklist
   - commit with a clear message
   - STOP and wait for my approval

   Milestones:
   - M1. Setup: Astro, Tailwind, tokens, fonts, config schema, base layout, GitHub Actions deploy (live URL working)
   - M2. Design vertical slice: header, hero with WebGL + agent terminal + split-text headline, capability marquee. This defines the visual quality of the whole site; iterate with me until I approve the look.
   - M3. Selected Works: stacking cards, preview capture script, case study pages, shared-element View Transitions
   - M4. Services bento, AI agent process section, pricing with toggle/add-ons/maintenance, terms + FAQ
   - M5. Final CTA + brief form, command palette, custom cursor, magnetic buttons, footer, 404 page
   - M6. SEO + OG images, analytics with consent, performance and accessibility pass, Playwright + axe + Lighthouse CI, cross-browser and device QA, README

5. At the start of every new session, read REASONIX.md, docs/brief.md and docs/content-needed.md first, then continue from the next unfinished milestone.
6. Ask before installing packages, running capture scripts that visit external sites, pushing to GitHub, deleting files, or running destructive commands.
7. For anything I must do myself on GitHub (create repo, enable Pages, settings, custom domain), give me click-by-click steps.

## 14. README

Write README.md in Bahasa Indonesia:

- Live link and screenshots/GIF (desktop + mobile) with Lighthouse scores.
- Concept and design decisions: colors, typography, motion.
- Tech stack and why.
- How to add a new case study (one Markdown file) and how to update prices and availability (config).
- "Dibangun dengan AI agent": agent and model used, this prompt (saved in docs/prompt.md), milestones, and a "Yang saya koreksi" section that I will fill in.
- How to run locally, test, and deploy.
- Credits and licenses for fonts and libraries.
