# Making the site discoverable (search engines & LLMs)

## What’s already in place

- **robots.txt** — Allows all crawlers and points to the sitemap.
- **sitemap.xml** — Generated at build time by `src/pages/sitemap.xml.ts`; lists all pages with full URLs for indexing.
- **llms.txt** — Describes the site and links to key pages for LLM crawlers (at `/llms.txt`).
- **Meta & SEO** — Each page has `<title>`, `<meta name="description">`, `<link rel="canonical">`, Open Graph tags, and `hreflang` for EN/ZH.

## Search engines

### 1. Google

1. Go to [Google Search Console](https://search.google.com/search-console).
2. Add property: **eyecare.parentguidebook.org** (domain or URL prefix).
3. Verify ownership (DNS TXT record or HTML file — Cloudflare can add the TXT).
4. After verification: **Sitemaps** → Add **https://eyecare.parentguidebook.org/sitemap.xml** → Submit.
5. Use **URL Inspection** to request indexing for the homepage and a few key pages if you want them indexed sooner.

### 2. Bing (and Yahoo)

1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters).
2. Add site **eyecare.parentguidebook.org** and verify (e.g. DNS or file).
3. **Sitemaps** → Submit **https://eyecare.parentguidebook.org/sitemap.xml**.

### 3. Let crawlers run

- New sites often take days to a few weeks to appear in search. Submitting the sitemap and having a clean `robots.txt` is enough; no code change needed.
- Keep the site live and linked (e.g. from parentguidebook.org if you have it).

## LLMs and AI crawlers

- **llms.txt** at **https://eyecare.parentguidebook.org/llms.txt** follows the [llms.txt](https://txt-llms.com/documentation) style: H1, short summary, and grouped links so models can discover and cite your content.
- You can list the site in community directories (e.g. [directory.llmstxt.cloud](https://directory.llmstxt.cloud)) if they accept submissions.
- Some AI products crawl the open web (similar to search engines); having clear HTML, good titles, and llms.txt improves the chance they use your content.

## Optional later

- **JSON-LD** — Add `WebSite` or `Organization` (and per-article `Article`) structured data in the layout for richer search results.
- **More backlinks** — Links from parentguidebook.org, health forums, or partner sites can help both search and discovery.
