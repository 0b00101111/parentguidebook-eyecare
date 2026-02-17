import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import rehypeSourceCitations from './src/plugins/rehype-source-citations.ts';

export default defineConfig({
  site: 'https://eyecare.parentguidebook.org',
  integrations: [tailwind()],
  markdown: {
    rehypePlugins: [rehypeSourceCitations],
  },
});

