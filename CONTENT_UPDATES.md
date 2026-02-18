# Content to update for Parent Guidebook (multi-domain)

These are the parts of the site that still read as “eyecare-only” or need to be updated to reflect Parent Guidebook (four categories, ~20 domains, Eyes as first available domain). Update the copy as you see fit; this file is a checklist.

---

## 1. About — English

**File:** `src/content/pages/en/about.md`

| Section | Current (summary) | Suggestion |
|--------|-------------------|------------|
| **Title** | "About This Project" | Could stay, or "About Parent Guidebook". |
| **Our Mission — first paragraph** | "eyecare.parentguidebook.org exists for one reason: to help parents protect their children's eyes." | Reframe as Parent Guidebook: one guide for raising a whole, healthy, resilient child; multiple areas (body, mind, daily life, heart & soul). **Eyes** is the first domain we’ve published; more are in progress. |
| **Our Mission — second paragraph** | "We believe that every parent ... should have access to clear, accurate, and trustworthy information about **children's eye health**." | Broaden to “information about children’s health and development” (or similar), and mention that each domain (e.g. eyes) follows the same standards. |
| **Our Mission — third paragraph** | "Too many childhood **eye** problems are caught late ... A child with amblyopia ... A baby with a cataract ... A white glow in a photo ..." | Keep as an example of why we started with Eyes, or shorten and add “We started with eyes because …” |
| **Our Mission — fourth paragraph** | "This site is here to close that knowledge gap." | “Parent Guidebook is here to close that knowledge gap—starting with eyes, and expanding to other areas over time.” (or similar) |
| **Who Is Behind This** | "This project was created by a parent who, while reading about **children's eye health**, realized that this information should be more accessible to every family." | Broaden: e.g. “while building a guide for raising a whole, healthy child” and “the first area we published is children’s eye health.” |
| **Contact** | "Contact: **eyecare@parentguidebook.org**" | Decide: keep for eyes-specific feedback, or switch to a general **contact@parentguidebook.org** (and optionally keep eyecare for eyes content). |
| **Medical Disclaimer** | Refers to "eye care professional", "vision or eye health". | Fine to keep for About (Eyes is live). If you add a general site disclaimer later, you can broaden it. |

---

## 2. About — Chinese

**File:** `src/content/pages/zh/about.md`

Same sections as English, with equivalent wording in Chinese:

| Section | Current (summary) | Suggestion |
|--------|-------------------|------------|
| **我们的使命 — 第一段** | "eyecare.parentguidebook.org 的存在只有一个理由：帮助家长保护孩子的眼睛。" | 改为家长指南的定位：一个面向全面、健康、有韧性的孩子的指南，包含多个领域；眼睛是第一个已上线的领域，其他在建设中。 |
| **我们的使命 — 后续段落** | 仅围绕眼健康。 | 适当泛化为“儿童健康与成长”的信息，并说明每个领域（如眼睛）都遵循相同标准。 |
| **谁在做这件事** | "在阅读关于儿童眼健康的资料时..." | 改为“在整理一份面向孩子全面成长的指南时……首先上线的是儿童眼健康”。 |
| **联系方式** | "eyecare@parentguidebook.org" | 与英文一致：保留或改为通用联系邮箱。 |

---

## 3. Sources — English

**File:** `src/content/pages/en/sources.md`

| Location | Current (summary) | Suggestion |
|----------|-------------------|------------|
| **First paragraph** | "All content **on this site** is based on published medical research, clinical guidelines, and official health authority recommendations." | Clarify scope: e.g. "All content in **the Eyes section** of this site (and all future domains) is based on …" or "All content on this site is based on … Currently the Eyes domain is published; sources for other domains will be added as those sections launch." |
| **Intro** | "Below is the complete list of sources **referenced across our articles** …" | Optionally: "… referenced across our **Eyes** articles" so it’s clear this page is domain-specific for now. |
| **Contact at bottom** | "please contact us at **eyecare@parentguidebook.org**" | Same as About: keep or move to a general contact. |

---

## 4. Sources — Chinese

**File:** `src/content/pages/zh/sources.md`

| Location | Current (summary) | Suggestion |
|----------|-------------------|------------|
| **第一段** | "本网站所有内容均基于..." | 与英文一致：说明“本网站「眼睛」领域（及今后各领域）的内容均基于……”。 |
| **底部联系** | "eyecare@parentguidebook.org" | 与英文一致。 |

---

## 5. Footer (site-wide)

**File:** `src/components/Footer.astro`

| Item | Current | Suggestion |
|------|---------|------------|
| **Contact line** | "Contact: eyecare@parentguidebook.org" | Keep for now, or change to a general contact (e.g. contact@parentguidebook.org) and add a note like “For eyes content: eyecare@…” if you want both. |

---

## 6. Other copy (optional)

| Location | Note |
|----------|------|
| **Root index** (`src/pages/index.astro`) | Title is "Parent Guidebook"; no change needed. |
| **Hub** (`src/pages/[lang]/index.astro`) | Hero and “Explore by area” are already generic; Eyes section uses existing eyes-specific i18n. No change required for the flattening. |
| **i18n** (`src/i18n/ui.ts`) | `landing.hero.headline` / `subheadline` are eyes-specific and are only used in the Eyes block on the hub and on `/body/eyes/`. Fine as is. |
| **404** | Uses generic “Go to homepage”; no change needed. |

---

## Summary checklist

- [ ] About (EN): mission section and “Who Is Behind This”; contact if changing.
- [ ] About (ZH): same sections.
- [ ] Sources (EN): first paragraph (and optionally contact).
- [ ] Sources (ZH): same.
- [ ] Footer: contact line if you want a general address.

No code changes are required for these—only edit the markdown and the footer component text.
