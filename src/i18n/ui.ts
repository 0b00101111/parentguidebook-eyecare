export const languages = {
  en: 'English',
  zh: '中文',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'en';

export const ui = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.sources': 'Sources',
    'nav.emergency': 'Emergency Signs',
    'nav.guides': 'Guides by Age',
    'nav.exams': 'Eye Exams',

    // Language & Theme
    'lang.switch': '中文',
    'lang.switchLabel': 'Switch to Chinese',
    'theme.dark': 'Dark mode',
    'theme.light': 'Light mode',

    // Article components
    'article.lastUpdated': 'Last updated',
    'article.sources': 'Sources',
    'article.readInChinese': '阅读中文版',
    'article.readInEnglish': 'Read in English',
    'article.tldr': 'Quick Summary (30 seconds)',
    'article.backToHome': '← Back to home',

    // Urgency badges
    'urgency.critical': 'See a doctor within days',
    'urgency.important': 'Mention to your doctor soon',
    'urgency.good-to-know': 'Follow regular schedule',

    // Categories
    'category.emergency-signs': 'Emergency Signs',
    'category.guides': 'Guides by Age',
    'category.eye-exams': 'Eye Exams',

    // Landing page
    'landing.hero.headline': "Your child's eyes deserve your attention.",
    'landing.hero.subheadline':
      "A free, evidence-based guide to children's eye health — written for parents, not doctors.",
    'landing.hero.cta.start': 'Start Reading',
    'landing.hero.cta.schedule': 'Eye Exam Schedule',
    'landing.why.title': 'Why This Site Exists',
    'landing.featured.title': 'Featured Articles',

    // Footer
    'footer.disclaimer':
      'All content is for educational purposes only and is not a substitute for professional medical advice.',
    'footer.noAds': 'No ads · No products · No data collection',
    'footer.project': 'A non-profit educational project',
    'footer.contactLabel': 'Contact',

    // Medical disclaimer
    'disclaimer.title': 'Medical Disclaimer',
    'disclaimer.text':
      "This article is for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. If you have concerns about your child's vision or eye health, please consult a qualified eye care professional.",

    // 404
    '404.title': 'Page not found',
    '404.message': "We couldn't find what you're looking for.",
    '404.home': 'Go to homepage',
  },

  zh: {
    // Navigation
    'nav.home': '首页',
    'nav.about': '关于',
    'nav.sources': '参考来源',
    'nav.emergency': '紧急信号',
    'nav.guides': '按年龄指南',
    'nav.exams': '眼科检查',

    // Language & Theme
    'lang.switch': 'English',
    'lang.switchLabel': '切换到英文',
    'theme.dark': '深色模式',
    'theme.light': '浅色模式',

    // Article components
    'article.lastUpdated': '最后更新',
    'article.sources': '参考来源',
    'article.readInChinese': '阅读中文版',
    'article.readInEnglish': 'Read in English',
    'article.tldr': '快速摘要（30秒）',
    'article.backToHome': '← 返回首页',

    // Urgency badges
    'urgency.critical': '请在几天内就医',
    'urgency.important': '请尽快告诉医生',
    'urgency.good-to-know': '按常规时间表',

    // Categories
    'category.emergency-signs': '紧急信号',
    'category.guides': '按年龄指南',
    'category.eye-exams': '眼科检查',

    // Landing page
    'landing.hero.headline': '孩子的眼睛，值得你多一份关注。',
    'landing.hero.subheadline':
      '一份免费的、基于医学证据的儿童眼健康指南——为家长而写，不是为医生而写。',
    'landing.hero.cta.start': '开始阅读',
    'landing.hero.cta.schedule': '检查时间表',
    'landing.why.title': '为什么做这个网站',
    'landing.featured.title': '精选文章',

    // Footer
    'footer.disclaimer': '所有内容仅供教育目的，不能替代专业医疗建议。',
    'footer.noAds': '无广告 · 无产品销售 · 不收集个人数据',
    'footer.project': '非营利教育项目',
    'footer.contactLabel': '联系',

    // Medical disclaimer
    'disclaimer.title': '医疗免责声明',
    'disclaimer.text':
      '本文仅供健康教育目的，不能替代专业医疗建议、诊断或治疗。如果您对孩子的视力或眼睛健康有任何担忧，请咨询合格的眼科专业人员。',

    // 404
    '404.title': '页面未找到',
    '404.message': '我们找不到您要访问的页面。',
    '404.home': '返回首页',
  },
} as const;

