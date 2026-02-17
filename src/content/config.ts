import { defineCollection, z } from 'astro:content';

const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    lang: z.enum(['en', 'zh-Hans']),
    category: z.enum(['emergency-signs', 'guides', 'eye-exams']),
    urgency: z.enum(['critical', 'important', 'good-to-know']),
    last_updated: z.string(),
    age_groups: z.array(z.string()).default([]),
  }),
});

const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    lang: z.enum(['en', 'zh-Hans']),
  }),
});

export const collections = { articles, pages };

