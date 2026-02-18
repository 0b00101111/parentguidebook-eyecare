/**
 * Parent Guidebook: four categories and their domains.
 * Eyecare is the "eyes" domain under "body". Other domains are placeholders for future content.
 */
export const CATEGORIES = [
  { slug: 'body', labelKey: 'categoryGroup.body' },
  { slug: 'mind', labelKey: 'categoryGroup.mind' },
  { slug: 'daily-life', labelKey: 'categoryGroup.dailyLife' },
  { slug: 'heart-soul', labelKey: 'categoryGroup.heartSoul' },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]['slug'];

export const DOMAINS_BY_CATEGORY: Record<CategorySlug, { slug: string; labelKey: string; ready: boolean }[]> = {
  body: [
    { slug: 'eyes', labelKey: 'domain.eyes', ready: true },
    { slug: 'breathing', labelKey: 'domain.breathing', ready: false },
    { slug: 'bones-movement', labelKey: 'domain.bonesMovement', ready: false },
    { slug: 'teeth', labelKey: 'domain.teeth', ready: false },
    { slug: 'nutrition', labelKey: 'domain.nutrition', ready: false },
  ],
  mind: [
    { slug: 'attention-digital', labelKey: 'domain.attentionDigital', ready: false },
    { slug: 'learning-cognitive', labelKey: 'domain.learningCognitive', ready: false },
    { slug: 'social-emotional', labelKey: 'domain.socialEmotional', ready: false },
    { slug: 'school-life', labelKey: 'domain.schoolLife', ready: false },
  ],
  'daily-life': [
    { slug: 'physical-activity', labelKey: 'domain.physicalActivity', ready: false },
    { slug: 'outdoor-life', labelKey: 'domain.outdoorLife', ready: false },
    { slug: 'home-environment', labelKey: 'domain.homeEnvironment', ready: false },
  ],
  'heart-soul': [
    { slug: 'identity-belonging', labelKey: 'domain.identityBelonging', ready: false },
    { slug: 'gender-confidence', labelKey: 'domain.genderConfidence', ready: false },
    { slug: 'character-strength', labelKey: 'domain.characterStrength', ready: false },
    { slug: 'adaptability', labelKey: 'domain.adaptability', ready: false },
    { slug: 'big-questions', labelKey: 'domain.bigQuestions', ready: false },
    { slug: 'explore-future', labelKey: 'domain.exploreFuture', ready: false },
    { slug: 'how-world-works', labelKey: 'domain.howWorldWorks', ready: false },
  ],
};

export const CATEGORY_SLUGS = CATEGORIES.map((c) => c.slug);
export type DomainSlug = string;

/** Only domain that has content today */
export const EYECARE_CATEGORY: CategorySlug = 'body';
export const EYECARE_DOMAIN: DomainSlug = 'eyes';
