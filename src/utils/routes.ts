import type { CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n/ui';

export const ARTICLE_ROUTE_SEGMENT_BY_SLUG: Record<string, string> = {
  'white-pupil-leukocoria': 'white-pupil',
  'misaligned-eyes-strabismus': 'misaligned-eyes',
  'signs-of-vision-problems': 'signs-of-vision-problems',
  'newborn-eyes-first-year': 'newborn-eyes',
  'toddler-preschool-eye-care': 'toddler-preschool',
  'school-age-eye-health': 'school-age',
  'eye-exam-schedule': 'schedule',
  'what-happens-eye-exam': 'what-happens',
};

export function getBaseSlugFromId(id: string): string {
  const cleaned = id.replace(/\.mdx?$/i, '');
  const parts = cleaned.split('/');
  return parts[parts.length - 1] || cleaned;
}

export function getArticleRouteSegment(entry: CollectionEntry<'articles'>): string {
  const slug = getBaseSlugFromId(entry.id);
  return ARTICLE_ROUTE_SEGMENT_BY_SLUG[slug] ?? slug;
}

export function getArticlePath(lang: Lang, entry: CollectionEntry<'articles'>): string {
  const category = entry.data.category;
  const route = getArticleRouteSegment(entry);
  return `/${lang}/${category}/${route}/`;
}

