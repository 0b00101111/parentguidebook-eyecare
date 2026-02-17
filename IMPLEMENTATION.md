# eyecare.parentguidebook.org — Implementation Guide

> **Purpose:** This file is the single source of truth for building the site. Feed it to Cursor, OpenCode, or any AI coding tool to get started.

---

## 1. Project Overview

**Site:** eyecare.parentguidebook.org
**Type:** Static bilingual content site (English + Chinese)
**Goal:** Help parents learn about children's eye health with evidence-based, emotionally supportive content
**Hosting:** Cloudflare Pages (free CDN, auto-deploy from Git)
**Domain:** parentguidebook.org (already on Cloudflare)
**Content:** 8 bilingual articles + 3 pages (landing, about, sources), all written as Markdown files with frontmatter

---

## 2. Tech Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | **Astro** (static site generator) | Fast, content-focused, excellent Markdown support, outputs pure static HTML |
| Styling | **Tailwind CSS** | Utility-first, fast to iterate, easy to implement design system |
| Content | **Astro Content Collections** | Type-safe Markdown with frontmatter schema validation |
| Language | **TypeScript** | Type safety for components |
| Fonts | **Inter** (EN) + **Noto Sans SC** (ZH) via Google Fonts | Excellent readability, free, great CJK support |
| Icons | **Lucide** (line icons) | Clean, simple, matches "Calm Authority" aesthetic |
| Deployment | **Cloudflare Pages** | Free, global CDN, auto-deploy from Git |
| Analytics | **Cloudflare Web Analytics** (optional) | Privacy-friendly, no cookies, free |

---

## 3. Design System — "Calm Authority"

### Color Palette

```css
/* Light Mode */
--color-bg-primary: #FDFAF6;        /* warm cream */
--color-bg-secondary: #F5F0EB;      /* slightly deeper cream */
--color-bg-card: #FFFFFF;            /* white for cards */
--color-text-primary: #2D3748;       /* warm dark gray, not pure black */
--color-text-secondary: #5A6577;     /* muted gray for secondary text */
--color-text-muted: #8B95A5;         /* lighter gray for metadata */
--color-accent-blue: #5B9BD5;        /* soft sky blue — trust */
--color-accent-green: #7BAE7F;       /* sage green — health */
--color-accent-coral: #E8856C;       /* soft coral — CTA warmth */
--color-accent-amber: #D4A853;       /* amber — gentle attention */
--color-border: #E8E2DA;             /* warm light border */

/* Urgency indicators */
--color-urgency-critical: #D9534F;   /* red — see doctor within days */
--color-urgency-important: #D4A853;  /* amber — mention to doctor soon */
--color-urgency-routine: #7BAE7F;    /* green — follow regular schedule */

/* Dark Mode */
--color-dark-bg-primary: #1A1D23;    /* deep warm dark */
--color-dark-bg-secondary: #23272F;  /* slightly lighter */
--color-dark-bg-card: #2A2F38;       /* card background */
--color-dark-text-primary: #E8E2DA;  /* warm light text */
--color-dark-text-secondary: #A0A8B4;
--color-dark-border: #3A3F48;
```

### Typography

```css
/* Body text */
font-family: 'Inter', 'Noto Sans SC', system-ui, sans-serif;
font-size: 17px;            /* slightly larger than default for readability */
line-height: 1.8;           /* generous — tired parents skim */
letter-spacing: 0.01em;

/* Chinese body text */
font-size: 17px;
line-height: 1.9;           /* Chinese needs slightly more line height */

/* Headings — friendly, not clinical */
font-family: 'Inter', 'Noto Sans SC', system-ui, sans-serif;
font-weight: 600;           /* semibold, not heavy */

/* H1 */ font-size: 2rem;   line-height: 1.3;
/* H2 */ font-size: 1.5rem; line-height: 1.4;
/* H3 */ font-size: 1.25rem; line-height: 1.4;
```

### Component Styles

**TLDR Card (top of each article):**
```
- Warm cream background (#F5F0EB) with soft border
- Left border stripe: 4px, colored by urgency (red/amber/green)
- Padding: generous (24px)
- Contains: urgency badge, quick summary, action steps
- Always visible at top — not collapsible
```

**Article Cards (landing page):**
```
- White card on cream background
- Subtle shadow (0 1px 3px rgba(0,0,0,0.08))
- Hover: slight lift + shadow increase
- Category badge in top-left (colored dot + text)
- Title + 1-line description
```

**Urgency Badges:**
```
- 🔴 Critical: red dot + "See a doctor within days" / "几天内就医"
- 🟡 Important: amber dot + "Mention to your doctor soon" / "尽快告诉医生"
- 🟢 Routine: green dot + "Follow regular schedule" / "按常规时间表"
- Styled as inline pill/badge, not emoji (use colored circle + text)
```

**Blockquote / Reassurance boxes (fear-addressing inserts):**
```
- Soft blue-gray background
- Left border: 3px sage green
- Slightly smaller font
- Italic intro line (e.g., "A note about fear:" / "关于恐惧，我们想说几句：")
```

**Source citations in text:**
```
- Small, muted text: [Source: src1]
- On hover/tap: show full source title (tooltip or expandable)
- Or: simply link to the sources section at bottom
```

### Layout Principles

- Max content width: **720px** (optimal reading width)
- Generous padding: **24-32px** on mobile, **48px+** on desktop
- Section spacing: **48px** between major sections
- Soft gradients for hero/header backgrounds (sunrise sky feel, not flat blocks)
- Mobile-first: content must read beautifully on a phone (most parents browse on mobile)
- Dark mode toggle in header (parents read at night)

---

## 4. Project Structure

```
eyecare-parent-guidebook/
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
├── package.json
├── public/
│   ├── favicon.svg
│   ├── robots.txt                    # Allow all crawlers
│   ├── sitemap.xml                   # Auto-generated by Astro
│   └── llms.txt                      # Describe site for LLM crawlers
├── src/
│   ├── content/
│   │   ├── config.ts                 # Content collection schema
│   │   ├── articles/
│   │   │   ├── en/                   # English articles
│   │   │   │   ├── white-pupil-leukocoria.md
│   │   │   │   ├── misaligned-eyes-strabismus.md
│   │   │   │   ├── signs-of-vision-problems.md
│   │   │   │   ├── newborn-eyes-first-year.md
│   │   │   │   ├── toddler-preschool-eye-care.md
│   │   │   │   ├── school-age-eye-health.md
│   │   │   │   ├── eye-exam-schedule.md
│   │   │   │   └── what-happens-eye-exam.md
│   │   │   └── zh/                   # Chinese articles (mirror structure)
│   │   │       ├── white-pupil-leukocoria.md
│   │   │       └── ... (same slugs as EN)
│   │   └── pages/
│   │       ├── en/
│   │       │   ├── about.md
│   │       │   └── sources.md
│   │       └── zh/
│   │           ├── about.md
│   │           └── sources.md
│   ├── components/
│   │   ├── Layout.astro              # Main layout with header/footer
│   │   ├── Header.astro              # Navigation + language toggle + dark mode
│   │   ├── Footer.astro              # Disclaimer, links, language switch
│   │   ├── LanguageToggle.astro      # EN/ZH switcher
│   │   ├── DarkModeToggle.astro      # Light/dark mode
│   │   ├── TLDRCard.astro            # Quick summary card at top of articles
│   │   ├── UrgencyBadge.astro        # 🔴🟡🟢 urgency indicator
│   │   ├── ArticleCard.astro         # Card for landing page article list
│   │   ├── ReassuranceBox.astro      # Styled blockquote for fear-addressing
│   │   ├── SourceReference.astro     # Inline source citation
│   │   ├── RegionalTable.astro       # Responsive table for regional comparison
│   │   ├── SEO.astro                 # Meta tags, Open Graph, structured data
│   │   └── MedicalDisclaimer.astro   # Reusable disclaimer block
│   ├── layouts/
│   │   ├── BaseLayout.astro          # HTML head, fonts, global styles
│   │   ├── ArticleLayout.astro       # Article page layout (TLDR + content + sources)
│   │   └── PageLayout.astro          # Static page layout (about, sources)
│   ├── pages/
│   │   ├── index.astro               # Language selector redirect
│   │   ├── en/
│   │   │   ├── index.astro           # EN landing page
│   │   │   ├── about.astro           # EN about page
│   │   │   ├── sources.astro         # EN sources page
│   │   │   ├── emergency-signs/
│   │   │   │   ├── white-pupil.astro
│   │   │   │   ├── misaligned-eyes.astro
│   │   │   │   └── signs-of-vision-problems.astro
│   │   │   ├── guides/
│   │   │   │   ├── newborn-eyes.astro
│   │   │   │   ├── toddler-preschool.astro
│   │   │   │   └── school-age.astro
│   │   │   └── eye-exams/
│   │   │       ├── schedule.astro
│   │   │       └── what-happens.astro
│   │   └── zh/                       # Mirror structure for Chinese
│   │       ├── index.astro
│   │       └── ... (same structure as EN)
│   ├── styles/
│   │   └── global.css                # Tailwind imports + custom styles
│   └── utils/
│       └── i18n.ts                   # Language helper functions
└── CLAUDE.md                         # AI assistant context file
```

---

## 5. Content Integration

### Splitting the bilingual Markdown files

The current content files contain both EN and ZH in a single file, separated by `---` dividers. When integrating:

1. Split each file into separate EN and ZH Markdown files
2. The EN section starts after the frontmatter and `# [EN]` heading
3. The ZH section starts after `# [ZH]` heading
4. Both share the same frontmatter (sources, metadata)
5. Place EN files in `src/content/articles/en/` and ZH files in `src/content/articles/zh/`

### Content Collection Schema (src/content/config.ts)

```typescript
import { defineCollection, z } from 'astro:content';

const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    category: z.enum(['emergency-signs', 'guides', 'eye-exams']),
    age_groups: z.array(z.string()),
    urgency: z.enum(['critical', 'important', 'good-to-know']),
    last_updated: z.string(),
    sources: z.array(z.object({
      id: z.string(),
      type: z.string(),
      title: z.string(),
      authors: z.string().optional(),
      journal: z.string().optional(),
      year: z.number().or(z.string()).optional(),
      url: z.string().optional(),
    })).optional(),
  }),
});

export const collections = { articles };
```

### Article file mapping

| Content file | EN article path | ZH article path | URL (EN) | URL (ZH) |
|---|---|---|---|---|
| 01-white-pupil-leukocoria-v2.md | en/white-pupil-leukocoria.md | zh/white-pupil-leukocoria.md | /en/emergency-signs/white-pupil/ | /zh/emergency-signs/white-pupil/ |
| 02-misaligned-eyes-strabismus.md | en/misaligned-eyes-strabismus.md | zh/misaligned-eyes-strabismus.md | /en/emergency-signs/misaligned-eyes/ | /zh/emergency-signs/misaligned-eyes/ |
| 03-signs-of-vision-problems.md | en/signs-of-vision-problems.md | zh/signs-of-vision-problems.md | /en/emergency-signs/signs-of-vision-problems/ | /zh/emergency-signs/signs-of-vision-problems/ |
| 04-newborn-eyes-first-year.md | en/newborn-eyes-first-year.md | zh/newborn-eyes-first-year.md | /en/guides/newborn-eyes/ | /zh/guides/newborn-eyes/ |
| 05-toddler-preschool-eye-care.md | en/toddler-preschool-eye-care.md | zh/toddler-preschool-eye-care.md | /en/guides/toddler-preschool/ | /zh/guides/toddler-preschool/ |
| 06-school-age-eye-health.md | en/school-age-eye-health.md | zh/school-age-eye-health.md | /en/guides/school-age/ | /zh/guides/school-age/ |
| 07-eye-exam-schedule-v2.md + 07-appendix-regional-tables.md | en/eye-exam-schedule.md | zh/eye-exam-schedule.md | /en/eye-exams/schedule/ | /zh/eye-exams/schedule/ |
| 08-what-happens-eye-exam.md | en/what-happens-eye-exam.md | zh/what-happens-eye-exam.md | /en/eye-exams/what-happens/ | /zh/eye-exams/what-happens/ |

### Additional content files

| Content file | Purpose |
|---|---|
| 00-tldr-summaries.md | TLDR blocks — extract and place at top of each article's layout |
| 00-fear-addressing-inserts.md | Fear-addressing guide — the blockquotes in articles already contain these; this file is the reference guide for writing style |
| page-landing.md | Landing page content |
| page-about.md | About page content |
| page-sources.md | Sources/bibliography page content |

---

## 6. Key Features to Implement

### Language Switching
- Every page links to its counterpart in the other language
- URL structure: `/en/...` and `/zh/...`
- Root `/` shows a simple language selector or auto-detects from browser
- Language toggle visible in header at all times
- Remember preference in localStorage (no cookies needed)

### Dark Mode
- Toggle in header
- Respects system preference by default
- Stores preference in localStorage
- Smooth transition (not a flash)

### SEO & Discoverability
- `<title>` and `<meta description>` for every page (bilingual)
- Open Graph tags for social sharing (title, description, image)
- Schema.org structured data: `MedicalWebPage` or `Article` with `about: HealthTopicContent`
- `hreflang` tags linking EN and ZH versions of each page
- `sitemap.xml` (Astro generates this with `@astrojs/sitemap`)
- `robots.txt` allowing all crawlers
- `llms.txt` in root describing the site purpose and content structure

### llms.txt content
```
# eyecare.parentguidebook.org
# A free, bilingual (English/Chinese) guide to children's eye health for parents
# Evidence-based content from published medical research and international guidelines
# Topics: leukocoria, strabismus, amblyopia, myopia, vision screening schedules, eye exam guides
# Available in: English (/en/) and Chinese (/zh/)
# Not medical advice — educational resource for parents
```

### Responsive Design
- Mobile-first (most parents browse on phones)
- Breakpoints: 640px (sm), 768px (md), 1024px (lg)
- Tables in articles should be horizontally scrollable on mobile
- Touch-friendly tap targets (min 44px)

### Accessibility
- Proper heading hierarchy (h1 > h2 > h3)
- Alt text for any images added later
- Sufficient color contrast in both light and dark modes
- Focus indicators for keyboard navigation
- `lang="en"` / `lang="zh-Hans"` on html element per page

---

## 7. Deployment

### Cloudflare Pages Setup

1. Push code to a Git repository (GitHub or GitLab)
2. Connect to Cloudflare Pages:
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Node version: 18+
3. Set custom domain: `eyecare.parentguidebook.org`
4. Cloudflare handles SSL automatically

### SPA Routing for Astro
Astro generates static HTML files, so no SPA routing issues. Each page is a real HTML file. Cloudflare Pages serves them directly.

### Environment Variables
None needed for the static site. If newsletter is added later:
- `API_URL` — backend API endpoint

---

## 8. CLAUDE.md (for AI coding assistants)

Place this at the project root:

```markdown
# CLAUDE.md — eyecare.parentguidebook.org

## Project
A free bilingual (EN/ZH) static website helping parents learn about children's eye health.
Site: eyecare.parentguidebook.org

## Mission
Help parents — especially new and expecting parents — learn what to watch for with their
children's eye health, so they can catch problems early and act quickly when it matters.

## Architecture
- Static site built with Astro → deployed to Cloudflare Pages
- Content as Markdown files with structured frontmatter
- Bilingual: /en/ and /zh/ routes
- Styled with Tailwind CSS
- No backend (newsletter system planned for later phase)

## Design System
- "Calm Authority" — soft blues, sage greens, warm cream backgrounds
- NOT clinical white or scary medical red
- Fonts: Inter + Noto Sans SC
- Generous line height (1.8 EN, 1.9 ZH)
- Dark mode support
- Mobile-first responsive

## Content Rules
- Every claim cites a published textbook or academic paper
- Warm, caring, jargon-free tone
- Medical terms explained in plain language first, then technical name in parentheses
- Always include "When to see a doctor" guidance
- Always include medical disclaimer
- Chinese content should read naturally, not like a translation
- Use "各地" not "各国" — territory-neutral language
- Fear-addressing inserts woven in at points of peak anxiety
- TLDR summary at top of every article

## URL Structure
/en/emergency-signs/{slug}/
/en/guides/{slug}/
/en/eye-exams/{slug}/
/zh/emergency-signs/{slug}/
/zh/guides/{slug}/
/zh/eye-exams/{slug}/

## Commands
- Dev: npm run dev
- Build: npm run build
- Preview: npm run preview
- Deploy: git push (auto-deploys via Cloudflare Pages)

## Key Components
- TLDRCard: urgency-colored summary card at top of articles
- UrgencyBadge: red/amber/green indicator
- ReassuranceBox: styled blockquote for fear-addressing content
- LanguageToggle: EN/ZH switcher
- DarkModeToggle: light/dark mode
- RegionalTable: responsive table for eye screening by region
- MedicalDisclaimer: reusable disclaimer block
```

---

## 9. Build Sequence (step-by-step prompts for your AI coding tool)

### Step 1: Project Initialization
> Initialize an Astro project with TypeScript and Tailwind CSS. Set up the project structure as described in this implementation guide. Include Inter and Noto Sans SC from Google Fonts. Create the base layout with header (language toggle + dark mode toggle) and footer (disclaimer + links). Set up the color palette CSS variables for both light and dark modes.

### Step 2: Content Collections & Layouts
> Set up Astro Content Collections for articles with the schema defined in this guide. Create the ArticleLayout that renders: TLDR card at top (with urgency badge), article body from Markdown, sources list at bottom, medical disclaimer, and a link to the alternate language version. Create the PageLayout for static pages (about, sources).

### Step 3: Split & Import Content
> Split the bilingual Markdown files into separate EN and ZH files. Place them in the correct content collection directories. Each file should have proper frontmatter matching the schema. Test that all 8 articles render correctly in both languages.

### Step 4: Landing Page
> Build the landing page using the content from page-landing.md. Include: hero section with headline and CTA buttons, "Why This Site Exists" narrative section, featured articles grid organized by category (Emergency Signs, Guides by Age, Eye Exams), and footer. Both EN and ZH versions. The root / page should be a language selector.

### Step 5: Static Pages
> Build the About page and Sources page using content from page-about.md and page-sources.md. Both bilingual.

### Step 6: Component Polish
> Style the TLDR cards with left-border urgency colors. Style the reassurance/fear-addressing blockquotes with sage green left border and soft blue-gray background. Make tables responsive (horizontally scrollable on mobile). Add smooth dark mode transitions. Test on mobile viewports.

### Step 7: SEO & Meta
> Add SEO component with per-page title, description, Open Graph tags, and hreflang tags. Create robots.txt, llms.txt, and configure @astrojs/sitemap for auto-generated sitemap. Add Schema.org structured data for medical/health articles.

### Step 8: Deploy
> Configure for Cloudflare Pages deployment. Test the build. Push to Git. Connect to Cloudflare Pages with the custom domain eyecare.parentguidebook.org.

---

## 10. Post-Launch (Phase 2)

After the static site is live and content is reaching parents:

1. **Newsletter system** — FastAPI backend on Mac Mini, email subscription by child's age, scheduled reminders
2. **Batch 2 articles** — Screen time deep-dive, myopia management, amblyopia detailed guide, eye safety, nutrition, premature babies
3. **Additional languages** — with professional verification
4. **Community stories** — parent-submitted experiences with moderation
5. **Analytics review** — which articles get the most traffic, what parents search for
