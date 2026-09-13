# docs/brief.md — Bima Abiyasa · "The Agentic Studio"

> **Status:** ⏸ **Awaiting your approval** (Process step 2). Nothing has been installed or built yet.
> **Owner:** Bima Abiyasa · **Repo:** `zevilent/Portofolio-Bima-Abiyasa` (Public, empty at session 1) → live at https://zevilent.github.io/Portofolio-Bima-Abiyasa/ · **Stack:** Astro + TypeScript + Tailwind CSS, static export.
> **Deploy target (decided in session 1, D4):** GitHub Pages **project site**, so `site: 'https://zevilent.github.io'` and `base: '/Portofolio-Bima-Abiyasa'`. Every internal href/src/asset/route goes through one `withBase()` helper (`src/lib/url.ts`) so nothing hardcodes the prefix and a future move to a clean URL or custom domain is a one-line change.
> **Docs language:** technical docs in English, all site copy and the README in Bahasa Indonesia. Say the word if you want the docs in Indonesian too.
> **Source of truth:** `docs/prompt.md` (your original prompt). If anything here contradicts it, the prompt wins.
> **Verified environment:** Node v26.5.0 (arm64), npm 11.17.0, ffmpeg + ffprobe present at `/opt/homebrew/bin`, registry versions checked on the day of writing (Astro 7.3.2, Tailwind 4.3.3, GSAP 3.15.0, Lenis 1.3.26, Three 0.186.0, Vitest 5.0.0, Playwright 1.63.0, `@fontsource-variable/geist` 5.3.0, `@fontsource/instrument-serif` 5.3.0).

---

## 0. Decisions already taken (from your answers)

| # | Question | Your answer | Consequence in this brief |
|---|---|---|---|
| D1 | Photo `public/images/bima.jpg` | Design first without a photo; you'll send it later | No portrait anywhere. The site is built from type + WebGL + case studies. A single `<AuthorMark>` slot is prepared (OG image + footer monogram area) that activates automatically when the file exists. No placeholder, no silhouette, no fake avatar. |
| D2 | Bug warranty duration | **30–60 hari** | One value, used identically in pricing cards, terms accordion, FAQ answer, JSON-LD `offers`, and the generated PDF. A unit test asserts the string is identical in all five places (see §12.1). |
| D3 | Price list PDF | Generate from the pricing data with a script | `scripts/generate-price-list.ts` renders the PDF with Playwright print-to-PDF from the *same* config that renders the web page, so PDF and page can never disagree. CI re-generates and fails if the committed PDF is stale. |

### Decisions I am proposing (need your yes/no — see §14)

| # | Proposal | Default if you don't answer |
|---|---|---|
| P1 | Keep pricing on the home page for v1; split to `/harga` only if the section outgrows ~1.5 desktop screens (decision point at end of M4) | Keep on home page |
| P2 | Add a small `/privasi` page (Indonesian, short) so the cookie-consent bar has an honest "what we load and why" link | Consent bar links to an anchor in the FAQ instead |
| P3 | **No stats/counter row** — you gave no real metrics, and inventing them is forbidden | No stats row |
| P4 | Hide the "year" label on project cards until you give real years | Year fields stay empty and hidden |
| P5 | Draft each case study from your live sites with `draft: true`, then you verify | Drafts ship only after you verify (CI blocks `draft: true` at M6) |
| P6 | Service → case study mapping (§5.6 is my proposed mapping) | Use my mapping |
| P7 | Marquee list (§5.3 is my proposed list) | Use my list |
| P8 | Budget ranges in the brief form (§5.9) | Use my ranges |

---

## 1. Creative concept, in my own words

**"The Agentic Studio" is a private atelier with a control room behind it.**

Picture a watchmaker's bench: one lamp, one surface, tools laid out at exact intervals, everything in its place, nothing shouting. Now put a second screen next to it showing a build running — a terminal calmly reporting steps, a status dot quietly burning orange, a diagram of lines connecting nodes as work moves forward. Nothing on either screen moves faster than it needs to.

That is the whole design thesis in one image, and it produces four concrete rules I will hold myself to:

1. **Light is the luxury, not the decoration.** Luxury on a dark canvas comes from restraint: an obsidian ground, warm ivory type, hairline rules, and gold used as *light* (a glow that tracks your cursor, a rule under an active number, a highlighted metric) — never as a fill. If a surface needs a border, it gets a 1px hairline, not a shadow. Gold covers maybe 2% of the pixels on screen; that is what makes it read as gold.
2. **Order is the message.** The product I'm selling is *structure delivered*: scope written down, milestones, tests, review before release. So the site is drawn like an architect's plate — a visible column grid, mono coordinate labels (`01 / SELECTED WORK`, `STATUS: SHIPPED`), and a hero whose particles literally reorganise from a scattered constellation into a strict grid as you scroll. That transition *is* the pitch: an idea becoming structure.
3. **The agents are visible, the human is in charge.** A dark, quiet site with a live terminal in the hero says the interesting thing without ever writing it in a slogan: work is being executed continuously, in parallel, by machines; the decisions have names and they are mine.
4. **Nothing moves unless it means something.** Motion is used to explain (structure forming, lines drawing, a step lighting up) or to confirm (a card responding under the cursor), never to entertain. Every animation must survive the question: *what does the visitor understand after this that they didn't before?* If the answer is "nothing", it gets cut.

**Emotional target in the first 10 seconds:** *"This person is expensive, and worth it."* Then, by second 30: *"…and they show me exactly how the work is done, in writing, with tests."* Calm authority reads as trustworthy; spectacle alone reads as junior.

**What it must never feel like:** a hacker terminal theme, a robot/AI-themed site, an agency template with the logo swapped, or a "creative developer" experiment where the visuals get in the way of reading about the work. The tech in the hero is a *quiet* flex — a background, not a hero image.

**Anti-generic checklist** (applied to every screen before I report a milestone): no purple/blue gradient, no blur-glass panels, no floating blobs, no brain/robot drawings, no emoji, no skill bars, no "Hi, I'm…", no stock laptop photo, no particle explosion, no `Lorem ipsum`, no invented number.

---

## 2. Moodboard (written)

### 2.1 Colour

Reference feel: an unlit gallery at night, brass fittings catching one warm light, a single red-orange LED on a rack — Instrument Serif italic and oxidized gold on black stone. Think *Aman Resorts after dark meets a spacecraft telemetry console*, not neon.

| Token | Hex | Where it goes | Contrast on canvas | Notes |
|---|---|---|---|---|
| `bg` (obsidian) | `#0A0A0B` | page canvas | — | your specified base; never lightened globally |
| `surface-1` | `#121113` | cards, terminal, section panels | — | +1 step of lift, still near-black |
| `surface-2` | `#1A1815` | elevated cards, hovered bento tiles | — | warm undertone (R>G>B) begins here |
| `surface-3` | `#221F1B` | pressed/active, palette rows on hover | — | hottest neutral in the ramp |
| `ivory` | `#F2EEE6` | headlines, primary text | **17.1:1** | warm ivory — never `#FFFFFF` |
| `ivory-2` | `#A9A49A` | body, secondary text | **7.9:1** | passes AA even for small text |
| `ivory-muted` | `#86827A` | mono metadata on canvas/surface-1 | **5.0:1** | the quietest text allowed on any surface |
| `ivory-muted-hi` | `#98938A` | mono metadata on `surface-2`/`surface-3` | **5.3:1** | muted text is *not* allowed on elevated surfaces at the darker value |
| `gold` | `#C8A96C` | hairline rules, hover states, active numbers, links | **8.8:1** | champagne, matte — no metallic gradient |
| `gold-bright` | `#E6CBA0` | the one emphasised word in a headline, key figures | **12.6:1** | used at most once per screen |
| `ember` | `#FF5A24` | **live states only**: availability dot, active agent step, cursor "Buka" label | **6.4:1** | your Phoenix Signal nod; never a background, never a large area |
| `hairline` | `rgba(242,238,230,.08)` → `.14` hover → `.24` focus | borders, dividers, grid overlay | — | one family, three steps |
| `hairline-gold` | `rgba(200,169,108,.35)` | emphasis rule under an active item | — | never a full card outline |

Ratios above are computed from the actual hex values (WCAG 2.1 relative luminance), not estimated. M6 adds a unit test that recomputes every text/background pair in the token file and fails the build below AA — so these can't silently drift.

Discipline rules: ember never appears twice in the same viewport; gold never fills an area larger than a hairline or a single word; no gradient background except the two approved glows (`--glow-gold` cursor spotlight, hero vignette).

### 2.2 Type

Three voices, each with one job — no fourth font, ever.

| Role | Face | Specimen | Job |
|---|---|---|---|
| Display / UI | **Geist Variable** (400–600) | `Build smarter.` at `clamp(2.5rem, 6.4vw+0.6rem, 7.5rem)`, weight 500, tracking −0.03em, line-height 0.94 | Big, tight, confident statements. Reads technical, not editorial. |
| Accent | **Instrument Serif 400 Italic** | *smarter* — one word only, same optical size as its headline, tracking −0.01em, colour `gold-bright` | A hand-signed word inside a machine-set sentence. This single italic is the entire personality of the site. |
| Mono | **Geist Mono Variable** | `01 / SELECTED WORK` · `STATUS: SHIPPED` · `Rp3.900.000` · terminal log | Labels, coordinates, numbers, terminal, metadata. Uppercase at 0.14em tracking. |

The hierarchy trick: **grotesk states, serif italic feels, mono files the paperwork.** Never italicise a whole headline; never put serif in body copy; never use mono for a sentence.

The **one** emphasised word per page headline, chosen for meaning:
- Hero: "Build **smarter**. Ship faster." → italicising *smarter* (the differentiator: how I work) while leaving *faster* in grotesk (the outcome, stated plainly) says exactly what you sell. Reversing them would sell speed over judgement.
- Works: "Karya **terpilih**." · Process: "Dibangun dengan **AI agent**." · CTA: "Let's turn your **idea** into a product."

### 2.3 Texture & detail

- **Film grain:** one inline SVG `feTurbulence` data-URI over the whole page at 3.5% opacity, `pointer-events: none`, never animated. It kills the "flat CSS gradient" tell and makes the black feel printed rather than plastic. Disabled under `prefers-reduced-data`.
- **Hairlines:** every division is 1px ivory at 8% — cards are *ruled*, not boxed. On focus, the hairline steps to 24% + gold.
- **Architect grid:** in the hero and the AI-agent process section, a 12-column rule overlay at 4.5% opacity is visible from 1024px up. Static, drawn once — an engineer's drawing plate, not a decoration.
- **Cursor light:** inside bento/case cards, a radial gold glow (`rgba(200,169,108,.14)`) tracks the pointer via two CSS custom properties (`--mx`, `--my`) updated on `pointermove` in a `rAF` batch. On keyboard focus the same glow snaps to the card's top-left — focus gets the luxury too.
- **Metadata labels:** mono micro-labels which are also *real information*: section index and name (`01 / SELECTED WORK`), status (`STATUS: SHIPPED`, `STATUS: CONCEPT`), build/pricing facts (`START: Rp3.900.000`, `REVISI: 2 · 7–12 HARI KERJA`). No decorative fake coordinates (inventing them would be dishonest); the "plate" numbers come from real content.
- **Imagery:** only real material — screenshots of the four real projects, captured by `scripts/capture.ts`. No stock photography, no 3D renders, no abstract AI art. Until the capture runs, cards show a typographic plate (project number, name, category, stack in mono) which looks deliberate rather than broken.
- **Video:** short muted screen recordings of the live sites (≤ 1.5 MB), played only inside a hovered card, with a real AVIF poster.

### 2.4 Motion personality

*"Slow to arrive, quick to respond."*

- **Arriving motion is slow and cinematic** (900–1200 ms, `--ease-luxe`) because it carries meaning: a headline unmasking line by line, particles finding structure, an orchestration line drawing between nodes.
- **Responding motion is immediate** (120–200 ms) because it must feel mechanical: hover rules, cursor label swaps, palette rows, button presses.
- Nothing bounces or overshoots except the magnetic buttons (±12 px, `--ease-spring`), and only on desktop pointers — the one place where a hint of physicality communicates "this element is attached to your hand".
- There is always a **long, quiet pause**: the marquee drifts, the terminal types, the availability dot breathes. Slowness is the flex; a site that moves constantly reads as nervous.
- Reduced motion is a first-class branch, not a degraded one: the static composition is designed to be just as good (terminal log fully displayed, particles as a still constellation, all content visible).

---

## 3. Design tokens (to be implemented as `src/styles/tokens.css` + Tailwind v4 `@theme`)

### 3.1 Colour

See the table in §2.1 — the hex values there *are* the token values. Semantic names used in code:

```
--color-bg / --color-surface-1 / --color-surface-2 / --color-surface-3
--color-text / --color-text-2 / --color-text-muted / --color-text-muted-hi
--color-gold / --color-gold-bright / --color-ember
--color-line / --color-line-strong / --color-line-focus / --color-line-gold
--color-error: --color-ember        (errors use ember + an icon + text, never colour alone)
```

### 3.2 Fluid type scale (clamp)

| Token | Value | Line-height / tracking | Used for |
|---|---|---|---|
| `--fs-display-xl` | `clamp(2.5rem, 6.4vw + 0.6rem, 7.5rem)` | 0.94 / −0.03em | hero headline, final CTA statement |
| `--fs-display-l` | `clamp(2rem, 4.2vw + 0.5rem, 4.5rem)` | 1.0 / −0.025em | section headlines |
| `--fs-display-m` | `clamp(1.625rem, 2.6vw + 0.5rem, 3rem)` | 1.06 / −0.02em | case study h2, big card titles |
| `--fs-h3` | `clamp(1.25rem, 1.2vw + 0.9rem, 1.75rem)` | 1.2 / −0.01em | card titles, step titles |
| `--fs-body-l` | `clamp(1.0625rem, 0.5vw + 0.9rem, 1.25rem)` | 1.55 | hero subheadline, section intros |
| `--fs-body` | `clamp(0.9375rem, 0.25vw + 0.875rem, 1.0625rem)` | 1.6 | paragraphs, lists |
| `--fs-small` | `0.875rem` | 1.5 | captions, footnotes, legal |
| `--fs-mono` | `0.75rem` | 1.2 / 0.14em uppercase | labels, metadata, tags |
| `--fs-mono-micro` | `0.6875rem` | 1.2 / 0.16em uppercase | section indices, plate labels |
| `--track-serif` | `−0.01em` | — | the Instrument Serif accent word |

Measure: prose blocks cap at `62ch`, section intros at `48ch`. Numerals in prices, dates and counters are mono with `font-variant-numeric: tabular-nums` so figures align in columns.

### 3.3 Space, layout, radius, borders, shadows

- **Space scale (4px base):** `4 8 12 16 20 24 32 40 48 64 80 96 128 160 200` → `--space-1 … --space-15`.
- **Section rhythm:** `padding-block: clamp(4.5rem, 9vw, 10rem)`; a hairline rule + mono section index opens every section, giving the "plate" feel.
- **Container:** `max-width: 1320px`, gutter `clamp(1.25rem, 4vw, 4rem)`; grid = 12 col desktop / 6 col tablet (768–1023) / 4 col mobile; gap `clamp(1rem, 2vw, 2rem)`.
- **Radius:** `--r-xs: 2px` (chips/tags) · `--r-sm: 6px` (inputs, small buttons) · `--r-md: 12px` (bento/case cards) · `--r-lg: 20px` (terminal, hero cards, stacked project cards) · `--r-pill: 999px` (availability pill, filter pills). Small radii on purpose: sharp corners read as machined.
- **Borders:** `1px solid var(--color-line)`; hover `--color-line-strong`; `:focus-visible` = `2px solid var(--color-gold)` + `2px` offset; gold hairline only as an accent rule.
- **Shadows:** no decorative shadows on dark. `--shadow-card: 0 24px 60px -32px rgba(0,0,0,.9)` for lifted cards only; `--shadow-stack: 0 40px 120px -50px rgba(0,0,0,.95)` for the pinned card stack; `--glow-gold: radial-gradient(240px circle at var(--mx) var(--my), rgba(200,169,108,.14), transparent 70%)`; `--glow-ember: 0 0 18px rgba(255,90,36,.35)` on live dots only.
- **Grain:** `--grain-opacity: .035`, one static SVG noise layer.

### 3.4 Easing & duration scale (the whole site uses only these)

| Token | Value | Meaning |
|---|---|---|
| `--ease-luxe` | `cubic-bezier(.16,1,.3,1)` | arriving: mask reveals, section entrances, view transitions |
| `--ease-out-quint` | `cubic-bezier(.22,1,.36,1)` | responding: hovers, headers, palette, cursor morph |
| `--ease-in-out-quart` | `cubic-bezier(.76,0,.24,1)` | reversible/state toggles (pricing tab, accordion) |
| `--ease-spring` | `cubic-bezier(.34,1.36,.64,1)` | magnetic buttons only |
| `--ease-none` | `none` | anything scrub-bound to scroll (ScrollTrigger `scrub: 1`) |
| `--dur-1` | `120ms` | micro feedback (cursor label swap, dot pulse step) |
| `--dur-2` | `200ms` | UI response (hover, focus, tab, row) |
| `--dur-3` | `320ms` | small reveals, header hide/show |
| `--dur-4` | `560ms` | standard content reveal |
| `--dur-5` | `900ms` | hero headline, large masks |
| `--dur-6` | `1200ms` | shader/scroll cinematics, orchestration draw |
| `--stagger-1/2/3` | `40ms / 60ms / 90ms` | list staggers (tight / default / large lists) |

Every animated element in §8 maps to one of these tokens — no ad-hoc durations anywhere in the codebase.

---

## 4. Site map and routes

| Route | File | Notes |
|---|---|---|
| `/` | `src/pages/index.astro` | all 10 home sections, §5 |
| `/karya/[slug]` | `src/pages/karya/[slug].astro` | 4 pages generated from the content collection |
| `/karya` | — | *not* a separate page: the "Karya" nav item anchors to `#karya` on home (avoids an empty listing page) |
| `/404` | `src/pages/404.astro` | designed 404 with terminal + particles, works on GitHub Pages |
| `/harga` | *proposal P1* | only if the pricing section outgrows ~1.5 screens |
| `/privasi` | *proposal P2* | short consent/privacy statement for the cookie bar |
| `/og/[route].png` | `src/pages/og/[...route].png.ts` | build-time OG image per page (satori + resvg, 1200×630) |
| `/sitemap-index.xml`, `/robots.txt`, `/manifest.webmanifest`, `/favicon.svg`, `/favicon.ico`, `/apple-touch-icon.png` | public + `@astrojs/sitemap` | indexing is ON |

No other routes. No blog, no `/about` (your bio lives in the footer + case studies + the process section), no backend, no login.

---

## 5. Copy deck — final Bahasa Indonesia copy

Voice rules applied to every line below: short sentences, no hype, no "revolusioner/terbaik/nomor 1/passionate", every claim traceable to a project, a process step, or a number you gave me. Nothing is invented.

### 5.1 Header

| Element | Copy |
|---|---|
| Monogram | `BA` (typographic, mono, gold hairline box, links to `/`) |
| Nav | `Karya` · `Layanan` · `Proses` · `Harga` · `FAQ` |
| Primary button | `Konsultasi` → WhatsApp |
| Availability pill | `● Menerima proyek baru` (`availability.enabled: true`, text from config; hidden when the flag is off) |
| Mobile menu button | `Menu` / `Tutup` (label swaps, mono) |
| Mobile overlay footer | `bima.abiyasa16@gmail.com` + `WhatsApp +62 851-5540-2545` |

### 5.2 Hero

- Eyebrow (mono): `AI AGENTIC FULL STACK WEBSITE DEVELOPER · BOGOR, ID`
- H1: `Build smarter. Ship faster.` — *smarter* in Instrument Serif italic, `gold-bright`. (Rationale in §2.2. English headline is intentional: it is your tagline and your audience reads English tech language naturally.)
- Subheadline (`--fs-body-l`, max 48ch):
  > Website dan web application modern yang dibangun end-to-end: interface, backend, database, automation, hingga integrasi AI.
- Mono line under it: `Bekerja remote dengan klien di seluruh Indonesia.`
- CTA 1: `Lihat Karya` → `#karya` · CTA 2: `Diskusikan Proyek` → WhatsApp, prefilled (see §5.13)
- Agent terminal card (mono, decorative, aria-hidden with a text alternative):
  ```
  $ agent run build --scope tertulis

  → discover   tujuan · pengguna · prioritas
  → scope      proposal · timeline · milestone
  → schema     struktur data · relasi
  → ui         komponen · design system
  → tests      unit · e2e · aksesibilitas   ✓
  → security   dependensi · validasi input ✓
  → review     manusia: Bima
  → deploy     live ✓
  ```
  Loop: types each line, pauses 900 ms on completion, clears, restarts. Hover pauses. No numbers are shown (inventing test counts would be a fake metric). Footnote in mono-micro: `ILUSTRASI PROSES` — honest, and reads as a deliberate design label.
  Screen-reader alternative: *"Ilustrasi alur kerja: riset dan prioritas, scope tertulis, struktur data, antarmuka, pengujian unit dan aksesibilitas, pemeriksaan keamanan, review manusia, lalu deploy."*
- Scroll cue (mono-micro, decorative): `SCROLL ↓`
- LCP: H1 + subheadline are plain HTML in the initial document, visible with JS disabled. The terminal and WebGL are inserted after; nothing above the fold is JS-dependent.

### 5.3 Capability marquee — `02 / KAPABILITAS`

Items (config `src/config/capabilities.ts`; **P7 — please confirm or edit this list**):

`Custom Website` · `Web Application` · `AI Integration` · `Business Automation` · `Admin Panel & CMS` · `Payment Gateway` · `Third-party API` · `Technical SEO` · `Performance Setup` · `Design System` · `Automation Workflow` · `Testing & QA` · `Deployment & CI` · `Astro` · `TypeScript` · `Tailwind CSS` · `Node.js` · `PostgreSQL` · `Three.js` · `GSAP` · `Playwright`

Rule: I will only list a technology here after you confirm you use it (a marquee is a claim). Items with `confirmed: false` in config are shown in the copy deck but flagged in `docs/content-needed.md`.

### 5.4 Karya — `03 / KARYA TERPILIH`

- H2: `Karya *terpilih*.` (italic on *terpilih*)
- Intro: `Empat proyek: tiga sudah live, satu masih konsep.`
- Card fields: index (`01`…`04`), name, category, status plate, short description, stack tags, `Live site ↗` + `Studi kasus`.

| # | Name | Category | Plate | Description (no invented detail) |
|---|---|---|---|---|
| 01 | Hikari Tutor | Web Application | `STATUS: LIVE` | `Platform belajar Bahasa Jepang dengan pengalaman belajar yang terstruktur.` |
| 02 | Phoenix Signal | Web Application | `STATUS: LIVE` | `Aplikasi signal XAUUSD dengan penyajian data yang modern, analisis, dan pengalaman pengguna yang rapi.` |
| 03 | Niaga One | Web Application | `STATUS: LIVE` | `Web application bisnis dengan antarmuka yang bersih dan responsif.` |
| 04 | Teras Kinara Residence | Website · Konsep | `STATUS: KONSEP` | `Landing page konsep untuk proyek residensial fiktif.` (badge `Konsep`; link shows `Segera` until you send the URL) |

Year labels are hidden until you provide real years (**P4**). Stack tags are drafted from the live sites in M3 with `draft: true` and must be verified by you (**P5**). A card with an empty field simply omits that row — the layout is designed to survive missing data without a placeholder.

- Cursor over a card becomes `Lihat` (desktop only).
- Card click → `/karya/{slug}` with a shared-element view transition (image/poster morphs into the case-study hero).

### 5.5 Layanan — `04 / LAYANAN`

- H2: `Layanan` · Intro: `Dua jalur pekerjaan: website dan web application. Harga mulai tertera; angka final mengikuti scope yang disetujui.`
- Shared line: `Semua paket website termasuk: responsive design, source code, basic security, deployment assistance, dan garansi bug 30–60 hari.`

**Group A — Website** *(bento: 3 tiles, `Company Profile` spans two columns)*

| Package | For | Price | Includes | Plate | Example link |
|---|---|---|---|---|---|
| **Landing Page** | `Untuk campaign dan validasi` | `Mulai Rp3.900.000` | 1 halaman, hingga 10 section · custom responsive design · form lead dan WhatsApp · analytics dan Meta Pixel · SEO dasar dan speed setup | `2 REVISI · 7–12 HARI KERJA` | `Lihat contoh: Teras Kinara Residence` (konsep) |
| **Company Profile** ⭐`Terpopuler` | `Untuk bisnis yang berkembang` | `Mulai Rp8.500.000` | hingga 7 halaman · UI custom sesuai brand · admin panel / CMS · blog, galeri, dan leads · SEO teknis dan analytics | `3 REVISI · 2–4 MINGGU` | `Lihat pola: Niaga One` |
| **Corporate** | `Untuk kebutuhan lebih kompleks` | `Mulai Rp15.000.000` | hingga 12 halaman · advanced UI dan interaction · CMS dan multi-role admin · katalog atau artikel · basic third-party API | `3 REVISI · 4–7 MINGGU` | `Lihat pola: Phoenix Signal` |

**Group B — Web Application** *(bento: 5 tiles)*
Intro line (yours): `Sistem full-stack dengan autentikasi, database, dashboard, alur kerja bisnis, dan integrasi layanan.`

| Package | Price | Includes |
|---|---|---|
| **E-commerce Custom** | `Rp18–35 juta` | Katalog, cart, checkout · admin produk dan pesanan · payment dan ongkir dasar |
| **Membership / LMS** | `Rp25–50 juta` | User dashboard dan membership · materi, progress, akses · subscription-ready |
| **Internal Dashboard** | `Rp30–65 juta` | Multi-role dan permission · data, filter, laporan · import dan export |
| **MVP / SaaS** | `Rp40–120 juta` | Auth, billing, dashboard · API dan automation · architecture siap dikembangkan |
| **Sistem kompleks** | `Mulai Rp75 juta` | Marketplace, CRM, ERP, multi-vendor · `Berdasarkan scope` |

Service→case-study mapping is **P6** (proposed above; correct me if a mapping feels off).

### 5.6 Proses — `05 / CARA KERJA` (signature section)

- H2: `Bagaimana saya membangun dengan *AI agent*.` (italic on *AI agent*)
- Intro: `Agent mempercepat pekerjaan. Scope tertulis, pengujian, pemeriksaan keamanan, dan review manusia tetap di saya.`

| # | Step | Yang saya putuskan | Yang dikerjakan agent | Output |
|---|---|---|---|---|
| 1 | **Discovery** | Tujuan bisnis dan ukuran sukses · fitur yang benar-benar dipakai · prioritas | Riset pola umum di industri Anda · merangkum kebutuhan dari brief · draft user flow | `Ringkasan tujuan, pengguna, dan prioritas` |
| 2 | **Scope** | Lingkup final · timeline dan milestone · harga yang disetujui | Draft proposal · memecah pekerjaan jadi task · checklist materi yang perlu Anda siapkan | `Proposal: scope tertulis, timeline, milestone` |
| 3 | **Build** | Arah desain · keputusan arsitektur · review kode yang kritis | Implementasi UI dan backend · struktur database · dokumentasi | `Aplikasi berjalan, bisa ditinjau tiap milestone` |
| 4 | **Review** | Uji manual di perangkat nyata · memutuskan kapan boleh rilis · menolak hasil yang belum layak | Unit test dan e2e test · audit aksesibilitas · security check dependensi dan validasi input | `Laporan hasil test dan daftar perbaikan` |
| 5 | **Launch** | Handover source code dan akses · mendampingi garansi bug 30–60 hari | Menyiapkan deployment dan CI · memantau error setelah rilis · dokumentasi handover | `Situs live, source code dan akses diserahkan` |

- Closing statement (the section's argument, in two sentences):
  > Agent membuat pekerjaan lebih cepat. Yang tidak saya delegasikan: scope tertulis, persetujuan desain, review manusia, dan keputusan rilis — setiap hasil agent melewati pengujian dan pemeriksaan keamanan sebelum masuk produksi.
- Diagram: 5 nodes (Discovery → … → Launch) with the terminal-style monospace step names; lines draw on scroll; the active node gets an ember dot and a `gold` node ring.
- Mobile: vertical timeline, no pin, simple fades.

### 5.7 Harga — `06 / HARGA`

- H2: `Harga` · Intro: `Harga mulai yang bisa Anda bandingkan. Angka akhir mengikuti scope yang disetujui.`
- Tabs: `Website` | `Web Application` (real `role="tablist"`, arrow-key navigable).
- Content: the exact package data from §5.5/§7 of your prompt — same numbers, same wording.
- Add-ons (expandable list, 18 items, mono price column):
  `Halaman statis tambahan Rp750 ribu/halaman` · `Halaman dengan desain unik Rp1,5 juta/halaman` · `Login dan registrasi mulai Rp3,5 juta` · `Social login Rp1,5 juta/provider` · `Role dan permission mulai Rp4 juta` · `Admin panel / CMS mulai Rp6 juta` · `Payment gateway mulai Rp4 juta/provider` · `Integrasi ongkir mulai Rp3 juta/provider` · `Integrasi API eksternal mulai Rp3 juta/API` · `WhatsApp / email notification mulai Rp2 juta/channel` · `Dashboard analytics mulai Rp4 juta` · `Export Excel / PDF mulai Rp1,5 juta` · `Multi-language +25% nilai development` · `Progressive Web App mulai Rp6 juta` · `Real-time data / WebSocket mulai Rp6 juta` · `Migrasi data / website mulai Rp3 juta` · `Technical SEO setup mulai Rp2 juta` · `Deployment assistance mulai Rp1,5 juta`
- Maintenance row: `Basic Rp1 juta/bulan — monitoring dan perbaikan bug ringan` · `Business Rp2,5 juta/bulan — update dan perubahan kecil berkala` · `Priority Rp5 juta/bulan — prioritas support dan pengembangan rutin`
- Note (always visible under the pricing block):
  > Harga final tergantung jumlah halaman, desain, konten, fitur, integrasi, dan kesiapan materi. Perubahan di luar scope dibuatkan estimasi biaya dan timeline baru.
- Actions: `Unduh Price List (PDF)` (→ `public/price-list-bima-abiyasa-2026.pdf`, generated, tracked) + `Diskusikan kebutuhan` (WhatsApp).
- `SHOW_PRICES = false` → every price slot renders `Minta estimasi`, the PDF button hides, and the JSON-LD `offers` block is omitted (a price list with hidden prices would be dishonest).

### 5.8 Ketentuan & FAQ — `07 / KETENTUAN`

- H2: `Ketentuan dan *pertanyaan* umum.`
- **Accordion (6 items, answers = your terms verbatim):**

| Question | Answer (verbatim in spirit, one sentence per rule) |
|---|---|
| `Bagaimana skema pembayaran?` | `Pembayaran 40% saat mulai, 30% setelah fitur utama disetujui, 30% sebelum handover.` |
| `Berapa kali revisi yang saya dapat?` | `Sesuai paket: 2 revisi untuk Landing Page, 3 revisi untuk Company Profile dan Corporate. Harga mencakup jasa development sesuai scope dan jumlah revisi yang disepakati.` |
| `Apa yang dijamin setelah launch?` | `Garansi bug berlaku 30–60 hari untuk fungsi yang tercantum di scope — bukan untuk fitur baru.` |
| `Apa yang belum termasuk?` | `Domain, hosting, server, database managed, lisensi premium, biaya API/AI, payment gateway, WhatsApp provider, email provider, konten, foto, copywriting, dan pajak jika berlaku. Jasa development saja; domain, hosting, server, lisensi dan utilitas pihak ketiga tidak termasuk.` |
| `Kapan timeline mulai dihitung?` | `Timeline dimulai setelah materi, akses, dan keputusan yang dibutuhkan tersedia.` |
| `Kapan source code saya terima?` | `Source code dan akses produksi diserahkan setelah pembayaran lunas.` |

- **FAQ (4 items):**

| Question | Answer |
|---|---|
| `Apakah pakai AI berarti hasilnya asal jadi?` | `Tidak. Agent mempercepat bagian yang berulang, tapi setiap hasil lewat scope tertulis, pengujian, pemeriksaan keamanan, dan review saya sebelum masuk produksi. Yang Anda setujui adalah scope dan hasil akhir — bukan klaim soal AI.` |
| `Siapa yang memegang source code?` | `Anda. Source code dan akses produksi diserahkan setelah pembayaran lunas.` |
| `Berapa lama proyek selesai?` | `Website: 7–12 hari kerja (Landing Page), 2–4 minggu (Company Profile), 4–7 minggu (Corporate). Web application: timeline dan milestone ditulis di proposal setelah scope disetujui. Timeline dimulai setelah materi, akses, dan keputusan yang dibutuhkan tersedia.` |
| `Apakah bisa maintenance setelah launch?` | `Bisa. Garansi bug 30–60 hari menutup fungsi yang tercantum di scope; setelahnya ada tiga plan maintenance bulanan: Basic Rp1 juta, Business Rp2,5 juta, Priority Rp5 juta.` |

- FAQ answers feed the `FAQPage` JSON-LD 1:1 (single source in `src/config/faq.ts` and `terms.ts`).

### 5.9 CTA + project brief — `08 / KONSULTASI`

- Statement: `Let's turn your *idea* into a product.` (italic on *idea*)
- Sub: `Ceritakan proyeknya dalam tiga langkah. Pesan WhatsApp terbentuk otomatis — tidak ada data yang dikirim ke server mana pun.`
- Step 1 — `Jenis proyek`: Landing Page · Company Profile · Corporate · E-commerce Custom · Membership / LMS · Internal Dashboard · MVP / SaaS · Sistem kompleks · `Belum tahu, perlu diskusi`
- Step 2 — `Rentang budget` (**P8**, derived from your real price range): `< Rp5 juta` · `Rp5–15 juta` · `Rp15–35 juta` · `Rp35–75 juta` · `> Rp75 juta` · `Belum ada anggaran tetap`
- Step 3 — `Target mulai`: `Secepatnya` · `1–3 bulan` · `3–6 bulan` · `Masih eksplorasi` + `Nama` (required, 2–60 chars) + `Ceritakan singkat` (textarea, 20–600 chars, live counter) + optional `Email atau WhatsApp` (only used to write the message; never sent anywhere).
- Submit: `Kirim lewat WhatsApp` (magnetic). Also a small `Salin pesan` secondary action for people on desktop WhatsApp Web.
- Validation: inline Indonesian messages, `aria-describedby`, `aria-live="polite"` status, focus moves to the first error. Honeypot: hidden field `website` (off-screen, `tabindex="-1"`, `autocomplete="off"`, `aria-hidden`) — if filled, the submit is silently ignored (tracked as `submit_brief_honeypot`, not sent).
- Success line after opening WhatsApp: `WhatsApp terbuka di tab baru. Kalau tidak terbuka, klik tautan ini.` + the link.

### 5.10 Footer

- Line 1: monogram `BA` + `Bima Abiyasa — AI Agentic Full Stack Website Developer`
- Kolom `Kontak`: `WhatsApp +62 851-5540-2545` · `Salin email` (copies `bima.abiyasa16@gmail.com`, shows `Tersalin`) · `Instagram` · `LinkedIn` · `GitHub`
- Kolom `Navigasi`: `Karya` · `Layanan` · `Proses` · `Harga` · `FAQ` · `Konsultasi`
- Bottom row: `© 2026 Bima Abiyasa` (year computed at build) · `Dibangun dengan AI agent, diarahkan oleh Bima ↗` → repo URL · `Kembali ke atas ↑` · mono hint `⌘K / Ctrl+K — navigasi cepat`

### 5.11 404

- Terminal block: `$ route --resolve /halaman-ini` → `route not found` → `Kode 404 · tidak ada rute yang cocok.`
- Copy: `Halaman yang Anda cari tidak ada atau sudah dipindahkan.`
- Suggestions: `Beranda` · `Karya` · `Layanan` · `Harga` · `FAQ` · `Diskusikan Proyek (WhatsApp)` + the 4 case studies as secondary links.
- Small static-emissive particle field (no interaction, respects reduced motion).

### 5.12 Case study template (`/karya/[slug]`)

Sections and headings (all Indonesian), with a hard rule per section:

| Section | Heading | Content rule |
|---|---|---|
| Hero | — | name, category, year *(hidden if empty)*, `Peran` *(hidden if empty)*, `Lihat live site ↗` *(`Segera` for concept)*, hero image/video with the same `view-transition-name` as its card |
| 1 | `Ringkasan` | 2–4 sentences: what it is, who it's for, what it does |
| 2 | `Masalahnya` | the real problem — no invented pain points; if you haven't told me, it stays `draft` |
| 3 | `Solusinya` | what was built and the decisions behind it |
| 4 | `Fitur utama` | 3–6 items, each with a real screenshot from `scripts/capture.ts` and Indonesian alt text |
| 5 | `Stack dan alasannya` | the stack actually used + one line of *why* per technology |
| 6 | `Dibangun dengan AI agent` | which steps agents did, and **what I checked or corrected** — this is the section that proves the differentiator; it must stay specific |
| 7 | `Hasil` | **only** real results you provide; when there are none, the section is omitted entirely (no "coming soon", no placeholder) |
| 8 | `Proyek berikutnya →` | previous/next project with a smooth transition |

Frontmatter carries fields for all of the above; `draft: true` marks any transcribed/guessed fact. Until you verify, no case study ships as final (CI gate in §12.1).

### 5.13 Fixed strings (single source: `src/config/*`)

- WhatsApp consult message: `Halo Bima, saya ingin mendiskusikan proyek web.`
- WhatsApp case-study message: `Halo Bima, saya tertarik dengan cara Anda mengerjakan {nama proyek}. Saya ingin membahas proyek serupa.`
- WhatsApp brief message (exact template, tested in §12.1):
  ```
  Halo Bima, saya ingin membahas proyek.

  Jenis proyek: {jenis}
  Budget: {budget}
  Target mulai: {mulai}
  Nama: {nama}

  Ringkasan:
  {deskripsi}
  ```
  Lines with empty optional values are omitted (never `undefined`/`null`). Newlines are `%0A`-encoded in the `wa.me` URL.
- Title template: `{page} — Bima Abiyasa` (home: `Bima Abiyasa — AI Agentic Full Stack Website Developer`, 54 chars).
- Meta description (home): `AI Agentic Full Stack Website Developer di Bogor. Website dan web application modern yang dibangun end-to-end: interface, backend, database, automation, integrasi AI. Mulai Rp3.900.000.`
- Meta description (case study): `Studi kasus {nama}: {kategori}. {ringkasan} Dibangun dengan AI agent, direview manusia.`
- Meta description (404): `Halaman tidak ditemukan.`

---

## 6. Wireframes (desktop 1440 · mobile 390)

Grid reminder: 12 col / 6 col / 4 col, gutters `clamp(1.25rem, 4vw, 4rem)`, section padding `clamp(4.5rem, 9vw, 10rem)`.

**01 Header** — *Desktop:* fixed, 72px tall, 1px bottom hairline; left: `BA` monogram in a 32px hairline box; centre-right: 5 nav links in mono/small; right: availability pill + `Konsultasi` button. Background is the canvas colour until 40px of scroll, then a 1px hairline + 92% opacity canvas (no blur-glass). Hides on scroll-down, returns on scroll-up (`--dur-3`). *Mobile:* 64px tall; left `BA`; right: pill dot only (text hidden) + `Menu`; the overlay is full-screen `surface-1`, links at `--fs-display-m` stacked, staggered 90 ms in, with contact block at the bottom and `Tutup` in the top-right; body scroll locked; Esc + focus trap; link click closes and restores focus.

**02 Hero** — *Desktop:* two-column grid, 55/45. Left column: eyebrow (mono-micro) → H1 at `--fs-display-xl` (2 lines: "Build smarter." / "Ship faster.") → subheadline (48ch) → mono location line → two CTAs (primary = gold hairline button with ivory fill text; secondary = WhatsApp with ember dot) → decorative scroll cue. Right column, vertically centred: the terminal card (`surface-1`, `--r-lg`, hairline border, 8 mono log lines, 12px padding, `--shadow-card`), sized ~440×300, slightly raked (0.4° rotate, static) so it reads as an object on the bench. Behind everything, full-bleed WebGL canvas (`z-0`) with particles; a bottom vignette keeps text contrast; never a solid overlay panel. *Mobile:* single column, canvas behind the whole hero at reduced density; H1 `--fs-display-xl` clamps to ~2.5rem and wraps to 3 lines; terminal card sits below the CTAs, full-width, 4 log lines only, static height (no layout shift); scroll cue hidden.

**03 Marquee** — *Desktop:* a 1px top+bottom hairline band, 96px tall, mono-micro items separated by a small gold rule glyph; drifts right-to-left over 60s, pauses on hover/focus-within. *Mobile:* same band at 64px, items at `--fs-mono`, slightly faster (45s); under reduced motion the band wraps into a static two-line wrap list.

**04 Karya** — *Desktop:* section header row (mono index left, H2 + intro right, 40/60). Then a pinned stack: each project card is a full-width-ish (10 of 12 col, centred) 16:9 card, `--r-lg`, hairline, with a left meta rail (index, plate, category, year) and a right content block (title at `--fs-display-m`, description, stack tags as chips, two links); the poster/screenshot fills the card's right half or the whole card as a background at 55% with a left-to-right obsidian scrim (decided per project after capture — whichever keeps text contrast). Pinning: 100vh viewport, 5 cards → ~600vh scroll; the outgoing card scales to 0.94 and dims to 0.5 while the incoming one slides up 100%→0 (`scrub: 1`). Hover: preview video fades in over 200 ms, cursor morphs to `Lihat`. *Mobile:* no pinning — cards stack as full-bleed 4:5 tiles with a 24px reveal on intersection, poster image only (no hover video), `Konsep` badge visible on card 04, tap target = whole card.

**05 Layanan** — *Desktop:* two group blocks. Group A = 3-col bento where `Company Profile` spans 2 columns × 2 rows (its `Terpopuler` badge as a gold hairline chip in the corner), the other two take the remaining cells; Group B = 3-col bento with `Sistem kompleks` spanning 2 columns. Every tile: hairline, `--r-md`, `--glow-gold` on hover/focus, title at `--fs-h3`, `Untuk …` line in `ivory-2`, deliverable list with 1px gold bullet rules, price at the tile's bottom-left in mono with `Mulai` as a mono-micro label, plate line (`2 REVISI · 7–12 HARI KERJA`) in mono-micro, and a `Lihat contoh →` link. Details expand on hover (desktop) / tap (touch) by revealing the list — never hover-only. *Mobile:* single column, tiles at `--r-md`, list collapsed to 3 items + `Selengkapnya` toggle.

**06 Proses** — *Desktop:* sticky/pinned two-zone layout. Left 5 of 12: the SVG orchestration diagram (5 nodes on a gentle arc, hairlines, ember dots) that draws as the section scrolls. Right 7 of 12: the five steps, each a block with the mono step number, the step name at `--fs-h3`, then two labelled columns — `YANG SAYA PUTUSKAN` (gold label) and `YANG DIKERJAKAN AGENT` (ivory-muted label) — each a 3-item list, plus the `OUTPUT` line in mono. As the section scrolls, the matching node lights up and its step block is highlighted with a gold hairline on the left edge. Closing statement spans the full width below, `--fs-display-m`, with the sentence split so `Yang tidak saya delegasikan:` sits on its own line. *Mobile:* no pin; the diagram becomes a 5-node vertical rail on the left of a 1-column timeline; each step reveals on intersection (opacity + 16px rise).

**07 Harga** — *Desktop:* H2 + intro, then a centred tab switcher (2 pills, one hairline container), then a 3-col grid of package cards (Website) or a 3-col grid where the first two rows hold 4 of the 5 web-app packages and `Sistem kompleks` spans full width (Web Application). Each card: name, `Untuk …` line, price block (`Mulai` label + figure at `--fs-display-m` in mono tabular), deliverables, plate line, CTA `Diskusikan`. Add-ons: a full-width expandable panel with 2 columns of mono rows (add-on name left, price right, hairline between rows) and a count label `18 add-on`. Maintenance: a full-width 3-column row with the same treatment. Then the price note in `--fs-small` and the two actions. *Mobile:* tabs full-width sticky under the header while the section is in view; cards single column; add-ons single column; maintenance stacked.

**08 Ketentuan** — *Desktop:* H2 full width, then a 2-col split: left = the 6 accordion items (hairline rows, `+`→`−` gold glyph, one open at a time, 200ms height transition via `grid-template-rows`); right = the 4 FAQ items as a 2×2 card grid with the question at `--fs-h3`. *Mobile:* single column, accordions stacked, FAQ cards full width.

**09 CTA** — *Desktop:* full-bleed section with the `--fs-display-xl` statement, then a 3-step form laid out as a single hairline-framed panel: step 1 = pill radio grid, step 2 = pill radio grid, step 3 = select + two text fields + counter; submit row with the magnetic `Kirim lewat WhatsApp` button + secondary `Salin pesan`; the whole panel is 8 of 12 col, centred. *Mobile:* statement clamps to 3 lines; the panel is full-width, fields 44px min height, pill grids wrap to 2 columns, submit button full-width.

**10 Footer** — *Desktop:* 3-column top row (identity / kontak / navigasi), hairline rule, bottom row with © · built-with · back-to-top · ⌘K hint. *Mobile:* stacked identity → kontakt list → navigasi (2-col) → bottom row centred.

**Case study** — *Desktop:* hero block = title + meta row (category · year · role · live link) over the captured image (or the poster) at 16:9 with a bottom scrim; then a 12-col body where prose occupies columns 3–9 (`62ch`) and screenshots break out to columns 2–11; the `Fitur utama` items alternate text/screenshot rows; `Stack dan alasannya` renders as a 2-col definition list; `Dibangun dengan AI agent` gets `surface-1` + a gold left hairline to set it apart; `Proyek berikutnya` is a full-width card with a `related` view transition to the next slug. Sticky right rail (of 12) shows the section index in mono on desktop ≥1280px. *Mobile:* hero 4:5, body single column, screenshots full-bleed with 12px inset, rail hidden.

**404** — *Desktop:* centred composition — mono `404` plate, then the terminal card showing `route --resolve` → `route not found`, then the copy line, then a link row; particles drift slowly behind. *Mobile:* same, tighter spacing, link row wraps to 2 columns.

## 7. Motion spec

All 13 signature interactions (+ micro-motion), with the exact tokens from §3.4. "RM" = `prefers-reduced-motion: reduce`.

| # | Element | Trigger | Animation | Duration / easing | RM fallback | Mobile (<768px) |
|---|---|---|---|---|---|---|
| 1 | Header bar | scroll direction > 8px | `translateY(-100%)` ↔ `0`, background opacity 0 → .92, hairline fade | 320ms `--ease-out-quint` | always visible, no transform, no background change | same as desktop (no hide on touch-down? keep identical) |
| 2 | Hero H1 words | after fonts ready + `requestIdleCallback` (never blocking LCP) | per-word mask reveal `translateY(110%)`→0 + `opacity` 0→1; the serif gold word fades in 120ms later | 900ms `--ease-luxe`, stagger 60ms | no split, plain visible text, no transform | same animation, 700ms, stagger 40ms |
| 3 | Section headings / generic reveals | IntersectionObserver @25%, once | `opacity` 0→1 + `translateY(16px)`→0 | 560ms `--ease-out-quint`, stagger 60ms | content visible immediately, no transform | same, `translateY(12px)` |
| 4 | Hero WebGL particles | load (idle) · `pointermove` · scroll progress | shader uniforms: `uBreath`, `uPointer`, `uGridMix`, `uScatter`; constellation → grid | 1200ms+ on load, scroll-scrubbed (`scrub: 1`, `--ease-none`) | one static rendered frame (SVG/CSS fallback, no canvas) | lite tier: ~4k particles, no pointer reaction, grid morph kept |
| 5 | Agent terminal | on load, loops | character reveal 22ms/char + 90ms per line; `opacity` swap on completion; caret `opacity` blink 1.4s | per-char 22ms, loop pause 900ms, `--dur-2` line swap | full log rendered, no typing, caret static | same typing, 3 lines, no hover pause |
| 6 | Availability dot | always | `opacity` .35↔1 + `box-shadow` ember glow | 1.6s `--ease-in-out-quart`, infinite | static dot at full opacity | same |
| 7 | Capability marquee | always (paused on hover/focus) | `translateX(0 → -50%)` on a duplicated track | 60s `linear` infinite (45s mobile) | static wrapped list, no animation | same 45s |
| 8 | Project card stack | ScrollTrigger pin | outgoing card `scale` 1→0.94 + `opacity` 1→0.5, incoming `translateY(100%)`→0 | pinned, `scrub: 1`, `--ease-none` | no pin: normal vertical list, cards fully opaque | no pin: intersection reveals only |
| 9 | Card preview video | `pointerenter` (150ms intent delay) | video `opacity` 0→1, `scale` 1.02→1; poster `opacity` 1→0 | 200ms `--ease-out-quint` | poster image only, video never loads | no hover: poster only, tap navigates |
| 10 | Custom cursor | `pointermove` (fine pointer only) | lerp follow (`transform`), size/shape morph per context, label swap | follow rAF lerp .12; morph 250ms `--ease-out-quint`; label 120ms `--dur-1` | not rendered; native cursor untouched | not rendered |
| 11 | Magnetic buttons | pointer within 120px | `translate(x,y)` capped at ±12px | 400ms `--ease-spring`, resets 320ms | not applied | not applied |
| 12 | Gold spotlight on bento/case cards | `pointermove` inside card (rAF-batched CSS vars) | `--glow-gold` `opacity` 0→1, `--mx/--my` update | 300ms `--ease-out-quint` | static gold hairline on hover/focus | static hairline; tap reveals details |
| 13 | SVG orchestration diagram | ScrollTrigger progress | `stroke-dashoffset` draw per edge, node ring `scale` 0.9→1, ember dot `opacity` 0→1 | scrubbed (`scrub: 1`, `--ease-none`), dot `--dur-2` | all edges drawn, all nodes active, no scrubbing | vertical rail, per-step fades (see §7/06) |
| 14 | Card → case study | card click | Astro `ClientRouter` shared element (`view-transition-name: karya-{slug}`), morph + cross-fade | 520ms `--ease-luxe` | instant navigation (transition: none) | same as desktop |
| 15 | Command palette | `⌘K` / `Ctrl+K` / footer hint | overlay `opacity` 0→1 + panel `scale` .98→1, rows stagger | 180ms `--ease-out-quint`, stagger 12ms | no scale, fade only 120ms | available via footer button, same motion |
| 16 | Accordion / pricing tabs | click · arrow keys | `grid-template-rows` 0fr→1fr (accordion), active pill `translateX` + hairline | 200ms `--ease-in-out-quart` | instant open/close, no movement | same |
| 17 | 404 particles | on load | slow drift, `opacity` breathing | 8s loop `linear` | static frame | static frame |
| 18 | Back-to-top / anchor jumps | click | Lenis `scrollTo` (desktop) / native smooth (touch), 900ms | 900ms `--ease-luxe` | instant jump (`scroll-behavior: auto`) | native instant/smooth |

**Motion laws** (enforced in review, M2 and M6):
1. Only `transform`, `opacity`, `filter` on ≤2 small elements, and shader uniforms are animated. Everything else (width/height/top/left/colour) is banned, except the two documented `grid-template-rows` accordions and colour transitions on hairlines (compositor-safe).
2. No preloader, no intro screen, no scroll-jacking: Lenis is configured `syncTouch: false`, `duration ~1.0`, and every anchor link, the back button, and browser find must keep working. Pinned sections add `scroll-margin-top` to their targets.
3. Every `gsap.context()` / Lenis instance / WebGL context is created inside a lifecycle module and torn down on `astro:before-swap` + `pagehide`: `ctx.revert()`, `lenis.destroy()`, `renderer.dispose()`, `cancelAnimationFrame`, `removeEventListener` for every listener (stored in an array). A dev-only assertion logs a warning if init runs twice for the same element.
4. Reduced motion turns *off*: smooth scroll, pinning, scrubbing, split text, cursor, magnetics, marquee drift, WebGL motion, typing. It turns *on*: everything visible, immediate, keyboard-identical.
5. Mobile never gets: custom cursor, magnetics, hover-only reveals, pinned card choreography. It keeps: reveals, marquee drift, terminal typing, lite WebGL.

---

## 8. Performance plan

### 8.1 WebGL (the only expensive thing on the site)

- **Tiering** decided once at init: `full` (desktop, capable), `lite` (mobile/high-DPI phone or low core count), `off` (fallback).
  - `off` if: `prefers-reduced-motion: reduce`, `navigator.connection.saveData`, `effectiveType` in `['slow-2g','2g']`, no WebGL2 (fall back to WebGL1 without custom derivatives, or `off`), `deviceMemory < 4`, or `hardwareConcurrency < 4`.
  - `lite` if: viewport < 768px, or `deviceMemory < 8`, or `hardwareConcurrency <= 4`.
  - Particles: full ≈ 12,000 points, lite ≈ 4,000, one `BufferGeometry` with typed arrays built once, all motion in the vertex shader (no per-frame CPU math beyond uniforms).
- **Loading:** the whole module is a dynamic `import()` inside `requestIdleCallback` (fallback `setTimeout 200ms` after `load`) — never in the critical path, never blocking the H1 LCP. A 1-frame static poster (CSS radial + SVG constellation) is what the visitor sees until the canvas fades in over 400ms.
- **Renderer:** `{ antialias: false, alpha: false, powerPreference: 'high-performance', depth: false, stencil: false }`, `setClearColor(0x0a0a0b)`, `setPixelRatio(Math.min(devicePixelRatio, 2))` (lite: `1.5`), `THREE.Points` with additive blending and a soft round point sprite generated procedurally (no texture download).
- **Lifecycle:** rAF loop pauses when the hero is out of view (`IntersectionObserver`), when `document.visibilityState === 'hidden'`, and when a modal/overlay is open. On navigation it's fully torn down and re-initialised (see §7 law 3). Context loss is handled (`webglcontextlost` → show fallback, `webglcontextrestored` → re-init once).
- **Fallback:** deterministic SVG constellation (seeded, generated at build) + CSS gold glow, same box → zero CLS.**

### 8.2 Fonts

- Self-hosted via `@fontsource` (no Google Fonts request, no third-party dependency, no cookie surface).
- Three files total: **Geist Variable** (latin subset, woff2), **Geist Mono Variable** (latin), **Instrument Serif 400 italic** (latin). Total transfer target **≤ 120 KB** for all three.
- `font-display: swap` + a metric-matched fallback (`@font-face` fallback with `size-adjust`/`ascent-override` measured from the real files) so the swap causes no layout shift → CLS contribution ≈ 0.
- `<link rel="preload" as="font" type="font/woff2" crossorigin>` **only** for the display face actually used above the fold; mono and serif load normally.
- Hard rule: no font file above the fold is loaded with `block`, and no `font-synthesis` surprises (italic is a real file, not a slant of Geist).

### 8.3 Images

- Astro `<Picture>` for every screenshot: `avif` + `webp` sources, `widths={[480, 768, 1200, 1600]}`, `sizes`, `quality ~60` (avif) / 72 (webp), explicit `width`/`height` + `aspect-ratio` → CLS 0.
- Case-study hero: `loading="eager"`, `fetchpriority="high"`, `decoding="async"` because it *is* the LCP element there. Every other image: `loading="lazy"`, `decoding="async"`.
- No image is used above the fold on the home page (the LCP is the HTML headline) — that's a deliberate performance decision, not an accident.
- Total image budget per page: ≤ 450 KB on the home page, ≤ 1.1 MB on a case-study page.

### 8.4 Video

- `scripts/capture.ts`: Playwright records a smooth-scroll session per site → ffmpeg (verified: `/opt/homebrew/bin/ffmpeg`) produces **MP4** (h264, CRF 28, `-an`, `-movflags +faststart`, ≤1280×720, ~8s) and **WebM** (VP9, CRF 34) — **each ≤ 1.5 MB**, enforced: the script fails loudly if a clip exceeds the cap and prints the alternative (shorter duration, lower CRF quality, or poster-only).
- Delivery: `preload="none"`, `muted`, `playsinline`, `loop`, `poster` (AVIF), `src` assigned only on hover intent (desktop ≥1024px, fine pointer, no reduced motion). Videos never load on mobile or reduced motion.
- `docs/screenshots/[milestone]/` holds the review screenshots; the four project screenshots live in `src/assets/karya/{slug}/` and are committed (they're part of the content).

### 8.5 JavaScript and CSS budget

| Chunk | Contents | Target (gzipped) |
|---|---|---|
| Initial | Astro runtime + ClientRouter + app modules (header, reveals, marquee, terminal, palette, form, analytics, consent) | **≤ 60 KB** |
| Motion (initial, shared) | Lenis ≈ 4 KB + GSAP core + ScrollTrigger + SplitText ≈ 40 KB | **≤ 45 KB** |
| WebGL (lazy, excluded from the 120 KB budget) | Three.js + shaders + hero scene | ≈ 160 KB, idle-loaded |
| CSS | Tailwind v4 output | ≤ 30 KB (home), ≤ 22 KB (case study) |
| Fonts | 3 woff2 | ≤ 120 KB |

**Initial JS total ≈ 105 KB gzip → inside your < 120 KB gate** (WebGL excluded, per your spec). Enforced by `scripts/check-budget.ts` in CI, which parses `dist/index.html` + `dist/_astro/*`, sums gzipped sizes of everything in the initial path, and fails the build over the cap. Lighthouse CI carries the same thresholds as a second net.

Rules: GSAP plugins are imported per-plugin (no `gsap/all`), `ScrollTrigger` is registered once, no polyfills shipped to modern browsers, no runtime CSS-in-JS, zero third-party scripts at load (analytics only after consent, loaded `async` after idle).

### 8.6 Rendering / 60fps rules

No layout reads in scroll/pointer handlers (batched in `rAF`, cached rects invalidated on `ResizeObserver`); `will-change: transform` applied only while an element is animating and removed after; `content-visibility: auto` + `contain: layout paint` on offscreen sections where safe; no `backdrop-filter` anywhere (it's the single biggest scroll-killer on mid-range hardware); grain is one static element, never re-rendered; ScrollTrigger instances are created after fonts load and killed on navigation.

---

## 9. Accessibility plan

- **Structure:** `header` / `nav` / `main` / `footer` landmarks, one `h1` per page, strict heading order (h2 per section, h3 per card), `lang="id"`, `<title>` per page.
- **Skip link:** `Lewati ke konten` — visible on first Tab, styled in the site's language (gold hairline, mono).
- **Focus:** `:focus-visible` = 2px gold outline + 2px offset on every interactive element; focus is never hidden, and the custom cursor never replaces or hides the native one for keyboard users (the cursor layer is `pointer-events: none` and rendered only for fine pointers without reduced motion).
- **Components:** header overlay and command palette (`role="dialog"`, `aria-modal`, focus trap, Esc, focus restore, body scroll lock), accordion (`button` + `aria-expanded` + `aria-controls` + region), pricing tabs (`role="tablist"`/`tab`/`tabpanel`, arrow/Home/End keys), command palette listbox with `aria-activedescendant`, form (visible `label`s, `fieldset`/`legend` for the pill groups, `aria-describedby` for hints/errors, `aria-live="polite"` status, focus to first error, no error relies on colour alone).
- **Non-visual equivalents:** WebGL canvas `aria-hidden="true"` + a visually-hidden Indonesian description; terminal `aria-hidden="true"` + a visually-hidden transcript; marquee's duplicated track `aria-hidden` with one real list for AT; decorative hairlines/grain `aria-hidden`.
- **Touch/hover:** every hover-revealed detail (service deliverables) is also reachable by tap and by keyboard focus — verified in Playwright, not assumed.
- **Motion:** `@media (prefers-reduced-motion: reduce)` is honoured in CSS *and* in JS (a single `motion.ts` query object), and Playwright runs a reduced-motion pass.
- **Contrast:** AA minimum everywhere, verified by (a) the token test in §12.1, (b) axe in Playwright, (c) a manual pass on the two elevated surfaces where muted text is allowed. `@media (prefers-contrast: more)` raises hairline opacity and muted text one step.
- **Targets:** all interactive elements ≥ 44×44px on touch; text is never presented in an image-only form (case-study screenshots always have a real heading + alt).
- **Alt text:** Indonesian, descriptive, from content frontmatter; decorative images get `alt=""`. No `alt` is left empty by accident — a build check fails if an image in `src/assets/karya/**` has no alt.

---

## 10. SEO and analytics plan

### 10.1 SEO

- Indexing ON. `@astrojs/sitemap` + hand-written `robots.txt` (`Allow: /`, sitemap URL), `site: 'https://zevilent.github.io'` + `base: '/Portofolio-Bima-Abiyasa'` in `astro.config.mjs`. Canonical URLs, `og:url`, the sitemap, and the OG-image endpoint all derive from `Astro.site` + `Astro.base` through `withBase()` — never from a hardcoded string.
- Per page: unique `<title>` (§5.13), unique meta description, `<link rel="canonical">`, `og:*` + `twitter:card=summary_large_image`, `theme-color: #0A0A0B`.
- **OG images generated at build time** for every route via an Astro endpoint (`satori` + `@resvg/resvg-js`, both build-only deps) at 1200×630: obsidian ground, 12-col hairline grid, mono plate label, the page title in Geist with the accent word in Instrument Serif italic, gold hairline, `zevilent.github.io/Portofolio-Bima-Abiyasa` in mono. Deterministic, cached in `dist`, no runtime service.
- **JSON-LD:** home = `Person` (name, jobTitle, address Bogor/ID, `knowsAbout` = your services, `sameAs` = your 5 links) + `ProfessionalService` (name, areaServed `ID`, `priceRange: 'Rp3.900.000+'`, `makesOffer` per package with `price`/`priceCurrency: 'IDR'`, `availableChannel` → WhatsApp). Case studies = `CreativeWork` (name, about, dateCreated *only if you supply a real date*, author → Person, `url` = live site). FAQ = `FAQPage` from `faq.ts`. **No** `aggregateRating`, **no** `review`, **no** invented `datePublished` — fake structured data is both dishonest and a manual-action risk.
- Favicon set: `favicon.svg` (monogram BA as vector), `favicon.ico`, `apple-touch-icon.png` 180, `icon-192/512.png`, `manifest.webmanifest` (`standalone`, `theme_color #0A0A0B`, `background_color #0A0A0B`, Indonesian `description`).
- Internal linking: every case study links to the next/previous project; each service card links to its matched case study; the 404 lists real routes only.

### 10.2 Analytics (consent-first, no secrets)

- `src/config/analytics.ts`: `{ ga4: '', metaPixel: '' }` — **empty by default**. An empty ID means that script is never loaded, ever (a unit test asserts the loader is a no-op for empty IDs).
- Consent bar (Bahasa Indonesia, bottom-left card, hairline + gold rule, not a modal): text `Situs ini hanya memuat analytics kalau Anda setuju. Tidak ada data dari formulir yang dikirim ke server.` Buttons `Izinkan analytics` / `Tolak`. Decision stored in `localStorage['ba-consent']` (`granted`/`denied`); re-shown only if unset. "Tolak" is a real, equal-weight choice and nothing loads. A `Pelajari` link goes to `/privasi` (P2) or the FAQ anchor.
- Scripts are injected only after consent, `async`, after `requestIdleCallback`, with `anonymize_ip` on for GA4.
- One `track()` helper (`src/lib/track.ts`): no-ops without consent, no-ops in dev unless `?debug-analytics`, and is the only place gtag/fbq is touched.

| Event | Payload | Fired from |
|---|---|---|
| `click_whatsapp` | `{ source }` (`header` · `hero` · `services` · `pricing` · `cta` · `footer` · `404` · `case_study`) | every WhatsApp link |
| `submit_brief` | `{ type, budget, timeline, length }` — no free text, no name | brief form success |
| `open_case_study` | `{ slug, from: 'card' \| 'next' \| 'palette' }` | case-study navigation |
| `click_live_site` | `{ slug }` | live-site links |
| `download_pricelist` | `{ }` | PDF button |
| `open_command_palette` | `{ trigger: 'keyboard' \| 'footer' }` | palette open |
| `toggle_pricing` | `{ tab: 'website' \| 'app' }` | pricing tabs |

---

## 11. Config and content file structure

Your rule: *no data inside components.* Everything below is typed and validated.

```
astro.config.mjs          site, base '/', integrations (sitemap, compress?), vite plugins, View Transitions
tsconfig.json             strict, paths '@/*' → 'src/*'
src/
  config/
    site.ts               identity: name, title, tagline, one-liner, location, contacts, socials, repoUrl, liveUrl, defaultOg
    flags.ts              SHOW_PRICES:true, SHOW_AVAILABILITY:true, ENABLE_ANALYTICS:false, ENABLE_COMMAND_PALETTE:true, SHOW_GRAIN:true
    availability.ts       { enabled, label: 'Menerima proyek baru' }
    nav.ts                primary nav + footer nav
    capabilities.ts       marquee items (label, kind: 'capability'|'tech', confirmed)
    works.ts              card data: slug, name, category, status ('live'|'concept'|'coming-soon'), url, year?, stack[], order, poster, video, description
    services.ts           website[] + webApp[] packages: id, name, forWho, priceFrom|priceRange, deliverables[], revisions, timeline, badge?, caseStudySlug?
    addons.ts             18 add-ons { label, price|priceFrom|percentNote }
    maintenance.ts        3 plans { label, pricePerMonth, includes }
    terms.ts              6 terms, incl. guaranteeDays: '30–60 hari'  ← single source for D2
    faq.ts                4 Q&A (+ optional extra), typed { q, a, category: 'terms'|'general' }
    process.ts            5 steps { index, name, human[3], agent[3], output }
    briefForm.ts          types[], budgets[], timelines[], validation limits
    analytics.ts          { ga4, metaPixel, consentCopy }
    motion.ts             duration/easing tokens mirrored for JS (single source with tokens.css via a generated TS file)
  content.config.ts       Astro content collection 'karya' → zod schema (see §11.1)
  content/karya/*.md      one file per project (+ optional co-located MDX)
  styles/tokens.css       §3 tokens (+ @theme bridge for Tailwind v4)
  styles/global.css       base, grain, focus, prefers-* branches
  layouts/BaseLayout.astro  head, JSON-LD, skip link, header, footer, consent, palette mount
  components/             Header, MobileMenu, AvailabilityPill, Hero, AgentTerminal, CapabilityMarquee,
                          WorkCard, WorkStack, ServiceBento, ProcessDiagram, PricingTabs, AddonList,
                          MaintenanceRow, TermsAccordion, FaqGrid, BriefForm, CommandPalette, CustomCursor,
                          MagneticButton, Footer, ConsentBar, OgImage helpers
  scripts/
    motion.ts             Lenis + GSAP context create/destroy (ClientRouter-aware)
    header.ts, reveals.ts, marquee.ts, terminal.ts, workStack.ts, cursor.ts, magnetic.ts,
    spotlight.ts, processDiagram.ts, palette.ts, form.ts, counters.ts(none), consent.ts, track.ts
    webgl/hero.ts         lazy chunk (three + shaders)
  lib/
    whatsapp.ts           pure builders: consult, caseStudy, brief (tested)
    format.ts             rupiah(), priceFrom(), priceRange() (tested)
    jsonld.ts, og.ts, validation.ts, dom.ts
  pages/
    index.astro, karya/[slug].astro, 404.astro, og/[...route].png.ts, sitemap handled by integration
public/
  robots.txt, favicon.*, apple-touch-icon.png, icon-192.png, icon-512.png, manifest.webmanifest,
  price-list-bima-abiyasa-2026.pdf   ← generated, committed, CI-verified in sync
  images/bima.jpg                    ← optional; slot activates when you add it
  cv/? (not in scope)
scripts/
  capture.ts              Playwright screenshots + preview videos (runs only with your OK)
  generate-price-list.ts  Playwright print-to-PDF from services.ts/addons.ts/maintenance.ts
  check-budget.ts         JS/CSS gzip budget gate
  check-links.ts          external link checker
  og-preview.ts           writes docs/screenshots/og/*.png for review
tests/
  unit/*.test.ts          vitest (§12.1)
  e2e/*.spec.ts           playwright + axe
docs/                     prompt.md, brief.md, content-needed.md, screenshots/, custom-domain.md
.github/workflows/        ci.yml, deploy.yml, lighthouse.yml, links.yml
lighthouserc.json, playwright.config.ts, vitest.config.ts, .gitignore, README.md, REASONIX.md
```

### 11.1 Case-study frontmatter schema (zod, Astro content collection)

```ts
{
  name: string,                    slug from filename,
  category: string,                // 'Web Application' | 'Website'
  status: 'live' | 'concept' | 'coming-soon',
  url: string | null,              // null → 'Segera'
  year: number | null,             // null → label hidden
  role: string | null,             // null → hidden
  order: number,
  summary: string,                 // card + meta description source
  stack: { name: string, why: string }[],
  hero: { image: string | null, video: string | null, alt: string },
  problem: string, solution: string,
  features: { title: string, body: string, image: string | null, alt: string }[],
  agentWork: { agent: string[], checked: string[] },   // the differentiator section
  results: { label: string, value: string }[] | null,  // null → section omitted
  draft: boolean                   // true → not shippable (CI gate)
}
```

Adding a project = creating one `.md` file. No component edits, ever.

### 11.2 Dependency justification (your "justify each in docs/brief.md" rule)

| Package | Why | Cost |
|---|---|---|
| `astro` | The framework you fixed; static output, content collections, view transitions, image pipeline | build-only |
| `typescript` | Typed config/content, schema safety | build-only |
| `tailwindcss` + `@tailwindcss/vite` | Your fixed styling tool; v4 keeps the config in CSS and output small | <30 KB CSS |
| `@astrojs/sitemap` | Sitemap for indexing | build-only |
| `lenis` | Your approved smooth scroll | 4 KB gz |
| `gsap` (core + ScrollTrigger + SplitText) | Your approved motion engine; SplitText is free in 3.13+ and split-text on the hero H1 is a requirement | ~40 KB gz |
| `three` | Your approved WebGL library | lazy chunk only |
| `@fontsource-variable/geist`, `@fontsource/instrument-serif`, `@fontsource-variable/geist-mono` | Self-hosted fonts, no CDN, no cookie surface | ≤120 KB |
| `satori` + `@resvg/resvg-js` | Build-time OG images (there is no other way to do it statically) | build-only |
| `vitest` | Your required unit tests | dev-only |
| `@playwright/test` (+ `@axe-core/playwright`) | Your required e2e, axe, screenshots, capture script, PDF generation | dev-only, browser download needed |
| `@lhci/cli` | Your required Lighthouse CI | dev-only |

No other animation/UI library. No `lodash`, no `framer-motion`, no UI kit, no icon pack (icons are hand-drawn inline SVG, 1.5px stroke, no emoji).

---

## 12. Testing and CI detail

### 12.1 Vitest (unit)

| Test | What it proves |
|---|---|
| `whatsapp.test.ts` | brief message matches the §5.13 template exactly; empty optional fields omitted; special chars/emoji/newlines survive `encodeURIComponent`; 600-char cap; `wa.me/6285155402545?text=…` shape; consult + case-study builders |
| `format.test.ts` | `Rp3.900.000` grouping, ranges `Rp18–35 juta`, `Rp750 ribu/halaman`, `Mulai` prefix, `+25% nilai development`, and the `SHOW_PRICES=false` → `Minta estimasi` path |
| `config.test.ts` | zod parse of every config file; every `caseStudySlug` in services exists in the collection; `terms.guaranteeDays` identical in terms/FAQ/services/JSON-LD/PDF source (D2); analytics loader no-ops for empty IDs; `works.ts` slugs unique and match content files |
| `tokens.test.ts` | recomputes WCAG contrast for every text/background token pair and fails under AA — the §2.1 numbers are thereby locked |
| `content.test.ts` | no `draft: true` (M6 gate); every `features[].image` exists; no image without `alt`; `results` absent rather than empty-fake |
| `jsonld.test.ts` | valid Person/ProfessionalService/CreativeWork/FAQPage shapes, no rating/review fields, `price` values match `services.ts` |

### 12.2 Playwright (e2e + axe)

Navigation (all routes 200, header hide/show, anchor jumps, back button), mobile menu at 390 (open/close/Esc/focus restore/scroll lock), command palette (⌘K open, filter, Enter, Esc, focus restore, all destinations), pricing toggle (Website ↔ Web Application, numbers match config), brief form (validation errors, honeypot silence, WhatsApp URL composition with `window.open` intercepted, no network requests to any origin on submit), case-study pages (all 4 slugs, next-project link, view transition completes without console error), reduced-motion run (no pin, no cursor, content visible, marquee static), no-JS run (`javaScriptEnabled: false` → all copy visible, nav + links work), 404 route, axe scan with **0 violations** on every page (light and dark have no separate mode; both motions covered), and a WebGL-teardown test: navigate home → case study → home 3×, assert no duplicate canvases, one canvas max, and no console errors/warnings.

### 12.3 Lighthouse CI + budget gates (GitHub Actions)

- `ci.yml` (PR + push): install → `astro check` → `astro build` → `vitest run` → `check-budget` → `playwright test` → `lhci autorun`.
- `deploy.yml` (push to `main`): build → `actions/upload-pages-artifact` → `actions/deploy-pages` (`permissions: pages: write, id-token: write`). No secrets.
- `lighthouse.yml`: Lighthouse CI assertions — `categories:performance ≥ 0.90` on `/` and `/karya/**`, `accessibility = 1.0`, `best-practices = 1.0`, `seo = 1.0`, `cumulative-layout-shift < 0.05`, `total-byte-weight < 1.4 MB`, `unused-javascript` warn. Runs against the built `dist/` via a static server (no external service, no tokens).
- `links.yml`: weekly external link check for the 5 social/contact links + 4 project URLs + repo URL; opens an issue on failure (no silent rot).
- Generated-PDF check: `generate-price-list.ts` runs in CI and fails if the committed PDF differs from the config-derived one (D3).

---

## 13. Milestone checklist

Each milestone: implement → build + tests → screenshots at 390/1440 into `docs/screenshots/M#/` → self-critique against this brief → preview instructions → checklist update → commit → **STOP for your approval**.

**M1 — Setup (foundation, live URL working)**
- [ ] `astro create` + TS strict + Tailwind v4 + `@theme` bridge from `tokens.css`
- [ ] tokens.css, global.css (grain, focus, reduced-motion branches), fonts self-hosted + fallback metrics
- [ ] all `src/config/*` files + zod validation + `lib/format.ts`, `lib/whatsapp.ts` with unit tests green
- [ ] `BaseLayout` (head, JSON-LD skeleton, skip link, empty header/footer), 404 stub, `robots.txt`
- [ ] `ci.yml` + `deploy.yml`; you create the repo + enable Pages (click-by-click steps provided)
- [ ] Gate: build green · `vitest run` green · deploy workflow succeeds · live URL responds
- [ ] Docs: `docs/custom-domain.md` (CNAME + DNS steps)

**M2 — Design vertical slice (defines the whole visual quality — iterate with you here)**
- [ ] Header (hide/show, availability pill, mobile overlay with focus trap) + footer skeleton
- [ ] Hero: H1 split-reveal, subheadline, CTAs, agent terminal, WebGL hero in 3 tiers + static fallback
- [ ] Capability marquee (pauses on hover/focus, static under reduced motion)
- [ ] Lifecycle infra: `motion.ts` (Lenis + GSAP context create/destroy), ClientRouter teardown test
- [ ] Gate: no duplicated listeners/canvases after 3 navigations · LCP element is HTML · reduced-motion pass green · axe 0 violations · budget under cap · **your visual approval before M3**

**M3 — Selected Works**
- [ ] 4 project entries in the content collection + schema + graceful-empty rendering
- [ ] Stacking pinned cards (desktop) / reveal list (mobile), hover preview video, `Lihat` cursor label
- [ ] `scripts/capture.ts` (ask you first) → screenshots + MP4/WebM ≤1.5 MB each via ffmpeg
- [ ] Case-study pages with the 8-section template, shared-element view transitions, next-project link
- [ ] Draft rules: `draft: true` on everything transcribed, listed in `content-needed.md`
- [ ] Gate: all 4 pages build + pass axe · transitions error-free · videos inside budget

**M4 — Services, process, pricing, terms**
- [ ] Service bento (2 groups, spotlight, tap-to-reveal), service→case-study links
- [ ] AI-agent process section: pinned SVG orchestration diagram, two-column steps, mobile timeline
- [ ] Pricing: tabs, cards, 18 add-ons, maintenance row, price note, `SHOW_PRICES` branch
- [ ] `generate-price-list.ts` → committed PDF, in sync with config
- [ ] Terms accordion + FAQ grid (answers identical to terms; FAQPage JSON-LD wired)
- [ ] Gate: a test asserts every price/revision/timeline string equals the data in your prompt §7 · guarantee string identical in 5 places

**M5 — Conversion layer**
- [ ] Final CTA statement + 3-step brief form (validation, honeypot, copy-message fallback) → WhatsApp
- [ ] Command palette (⌘K, 12 destinations incl. copy email, WhatsApp, price list, 4 case studies)
- [ ] Custom cursor, magnetic buttons, back-to-top, footer completion
- [ ] Designed 404 (terminal `route not found` + particles + real links)
- [ ] Gate: full keyboard-only flow (form submit included) · WhatsApp message matches the tested template · no-JS pass green

**M6 — SEO, analytics, performance, quality gates**
- [ ] OG images per route, favicon set, manifest, sitemap, robots, JSON-LD, meta per page
- [ ] Analytics + consent bar (+ `/privasi` if P2 approved), `track()` events wired
- [ ] Performance pass (fonts, images, video, budget gate, Lighthouse ≥90/100/100/100 mobile)
- [ ] Accessibility pass (axe 0 violations, manual keyboard + reduced-motion + contrast review)
- [ ] Cross-browser/device QA matrix (Chrome, Safari macOS, iOS Safari, Firefox, Edge; 360/390/768/1024/1440/1920)
- [ ] Link checker green · no `draft: true` anywhere · `README.md` (Bahasa Indonesia) with screenshots + Lighthouse scores
- [ ] Gate: all quality targets from your §11 met, or explicitly reported as not met with evidence

---

## 14. Proposals awaiting your decision

1. **P1 `/harga` page** — recommendation: keep pricing on the home page for v1 (it's your priority-3 conversion block and visitors shouldn't need a second click). If M4 shows the section exceeding ~1.5 desktop screens, split it and leave a 3-card teaser + link on home. Decision point: end of M4.
2. **P2 `/privasi` page** — a 150-word Indonesian statement (what analytics we load, that the form sends nothing to a server, that no cookies are set before consent, contact for questions). Needed to make the consent bar honest once you give me real GA4/Pixel IDs. Low cost. *Recommend: yes.*
3. **P3 no stats row** — you gave no real metrics; a "50+ proyek / 5 tahun pengalaman" row would be fabricated. Counters are therefore not built (your §9.12 explicitly allows this: "if none are provided, do not show a stats row"). If you want one later, give me real numbers and I'll add it in M5.
4. **P4 years hidden** — I will not guess years for the four projects. Card layout omits the year when empty.
5. **P5 case study drafting** — I visit the 4 live sites (with your OK), draft overview/problem/solution/features/stack, mark `draft: true`, and list every claim in `content-needed.md`. You verify or correct; CI blocks `draft: true` from shipping at M6.
6. **P6 service→case-study mapping** — proposed mapping in §5.5. Niaga One appears twice (as a "Company Profile-ish" example and as an Internal Dashboard example) — that's honest as *the closest real example*, but tell me if you'd rather not repeat a project.
7. **P7 marquee list** — confirm/adjust §5.3.
8. **P8 budget ranges** — derived from your own price range (Rp3.9jt–Rp120jt). Adjust if you'd rather not anchor low at `< Rp5 juta`.
9. **Things I deliberately did *not* build** (suggested, waiting on you): an `/about` page or biography section (your sitemap has none — a short "who I am" paragraph could raise trust, but it needs real content from you); a "staging link you can see progress at" claim in the process section (only if it's actually true); a response-time promise ("dibalas dalam X jam" — needs a real number, don't invent one); testimonial section (excluded by your scope limits until you have real ones).

---

## 15. Risks and unknowns (honest list)

| # | Risk | Mitigation |
|---|---|---|
| R1 | **Node 26 is newer than anything the Astro/Tailwind/Vitest toolchains are tested against.** A dependency may warn or fail on it. | M1 verifies the whole toolchain immediately. If it breaks, I'll ask you before pinning a different Node (e.g. via `.nvmrc` + CI matrix on Node 22/24). Never silently downgraded. |
| R2 | **The live URL working in M1 depends on you** (repo must exist, Pages must be enabled with GitHub Actions as the source). | I give click-by-click steps + the exact workflow file; I cannot and will not push for you. |
| R3 | Real content gaps: project years, roles, stack, results, Teras Kinara URL, "Yang saya koreksi" text, GA4/Pixel IDs. | `docs/content-needed.md` is the single tracked list; unknowns are omitted from the UI rather than filled with guesses. |
| R4 | `capture.ts` depends on 4 third-party sites being up and cooperative (cookie banners, lazy-loading, bot walls). | Runs only with your OK; failures are reported per-site with a screenshot of what it saw; a failed capture degrades to the typographic plate, never to a broken card. |
| R5 | Preview videos might not fit 1.5 MB at acceptable quality for a busy site. | Script fails loudly with the measured size and offers three options (shorter, lower CRF quality, poster-only). |
| R6 | Astro View Transitions + GSAP/Lenis/Three teardown is the highest-leak-risk area of this build. | M2 gate includes the 3× navigation leak test; all cleanup lives in one module, not scattered across components. |
| R7 | The pinned card stack + pinned process section are the two places where scroll-jacking bugs (broken anchors, back button, browser find) typically appear. | Both use ScrollTrigger with explicit `scroll-margin-top`, are disabled under reduced motion, and are covered by Playwright anchor/back-button tests. |
| R8 | Tailwind v4 output can grow if utilities are used inconsistently. | `check-budget.ts` gate + a shared component layer so repeated card/plate patterns are one class set. |
| R9 | Installing Playwright downloads browsers (hundreds of MB) — a heavy, one-time, machine-level action. | I ask before installing anything (your rule §13.6). |
| R10 | The generated PDF could drift from the web prices if it's ever edited by hand. | CI regenerates and diffs; the PDF is treated as a build artifact that happens to be committed. |

---

*End of brief. Next action: your approval (Process step 2), then `REASONIX.md`, then M1.*

