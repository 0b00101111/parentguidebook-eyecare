import { defaultLang, ui, type Lang } from './ui';

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang === 'en' || lang === 'zh') return lang;
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]): string {
    return (ui[lang] as any)[key] || (ui[defaultLang] as any)[key] || String(key);
  };
}

export function otherLang(lang: Lang): Lang {
  return lang === 'en' ? 'zh' : 'en';
}

export function localizePath(pathname: string, lang: Lang): string {
  // Ensures /en/... and /zh/...; if unprefixed, prefixes it.
  if (pathname.startsWith('/en/') || pathname === '/en') return pathname.replace(/^\/en\b/, `/${lang}`);
  if (pathname.startsWith('/zh/') || pathname === '/zh') return pathname.replace(/^\/zh\b/, `/${lang}`);
  return `/${lang}${pathname.startsWith('/') ? '' : '/'}${pathname}`;
}

