import type { Metadata } from 'next';
import { SITE, absoluteUrl } from './site';
import { getBreadcrumbs, type RouteMeta } from './routes';

export type JsonLd = Record<string, unknown>;

export interface HeadData {
  title: string;
  description: string;
  canonical: string;
  noindex: boolean;
  meta: { key: 'name' | 'property'; id: string; content: string }[];
  jsonLd: JsonLd[];
}

export const formatTitle = (title: string): string =>
  title.includes(SITE.name) ? title : `${title} | ${SITE.name}`;

const ORG_ID = `${SITE.url}/#organization`;
const WEBSITE_ID = `${SITE.url}/#website`;

export const organizationJsonLd = (): JsonLd => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': ORG_ID,
  name: SITE.name,
  url: absoluteUrl('/'),
  logo: {
    '@type': 'ImageObject',
    url: absoluteUrl('/icon-512.png'),
    width: 512,
    height: 512,
  },
  email: SITE.author.email,
  contactPoint: {
    '@type': 'ContactPoint',
    email: SITE.author.email,
    contactType: 'customer support',
    availableLanguage: 'English',
  },
  founder: {
    '@type': 'Person',
    name: SITE.author.name,
    url: SITE.author.url,
  },
  sameAs: [SITE.author.github, SITE.author.linkedin, SITE.repo],
});

export const websiteJsonLd = (): JsonLd => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  name: SITE.name,
  url: absoluteUrl('/'),
  description: SITE.defaultDescription,
  inLanguage: 'en-US',
  publisher: { '@id': ORG_ID },
});

export const appJsonLd = (path: string, name: string, description: string): JsonLd => ({
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name,
  description,
  url: absoluteUrl(path),
  image: absoluteUrl(SITE.ogImage),
  screenshot: absoluteUrl(SITE.ogImage),
  applicationCategory: 'GameApplication',
  applicationSubCategory: 'Casual Arcade Game',
  operatingSystem: 'Windows, macOS, Linux, iOS, Android (All Modern Browsers)',
  browserRequirements: 'Requires JavaScript and HTML5 Canvas',
  inLanguage: 'en-US',
  isAccessibleForFree: true,
  genre: ['Arcade', 'Casual', 'One-Button'],
  featureList: [
    'One-tap hopping mechanics',
    'Lily pad emergency bounce pads',
    'Chaining fireflies for combo multipliers',
    'Golden glow bug crash shields',
    'Fast-darting dragonflies',
    'Dynamic dusk-to-aurora sky progression',
    'Seven collectible frogs unlocked with fireflies',
    'Daily synchronized pond challenge',
    'Local device progress and privacy',
  ],
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
  },
  author: {
    '@type': 'Person',
    name: SITE.author.name,
    url: SITE.author.url,
  },
  publisher: { '@id': ORG_ID },
});

export const faqJsonLd = (items: { question: string; answer: string }[]): JsonLd => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((i) => ({
    '@type': 'Question',
    name: i.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: i.answer,
    },
  })),
});

export const breadcrumbJsonLd = (path: string): JsonLd | null => {
  const trail = getBreadcrumbs(path);
  if (trail.length < 2) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((m, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: m.label,
      item: absoluteUrl(m.path),
    })),
  };
};

/** Builds every head tag for a page. Shared by the runtime and the prerenderer. */
export const buildHead = (
  route: Pick<RouteMeta, 'path' | 'title' | 'description' | 'noindex'>,
  extraJsonLd: JsonLd[] = []
): HeadData => {
  const title = formatTitle(route.title);
  const canonical = absoluteUrl(route.path);
  const image = absoluteUrl(SITE.ogImage);
  const noindex = Boolean(route.noindex);

  const crumbs = breadcrumbJsonLd(route.path);
  const jsonLd = [
    ...(route.path === '/' ? [websiteJsonLd(), organizationJsonLd()] : []),
    ...(crumbs ? [crumbs] : []),
    ...extraJsonLd,
  ];

  return {
    title,
    description: route.description,
    canonical,
    noindex,
    jsonLd,
    meta: [
      { key: 'name', id: 'description', content: route.description },
      {
        key: 'name',
        id: 'robots',
        content: noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large',
      },
      { key: 'property', id: 'og:site_name', content: SITE.name },
      { key: 'property', id: 'og:locale', content: SITE.locale },
      { key: 'property', id: 'og:type', content: 'website' },
      { key: 'property', id: 'og:title', content: title },
      { key: 'property', id: 'og:description', content: route.description },
      { key: 'property', id: 'og:url', content: canonical },
      { key: 'property', id: 'og:image', content: image },
      { key: 'property', id: 'og:image:width', content: String(SITE.ogImageWidth) },
      { key: 'property', id: 'og:image:height', content: String(SITE.ogImageHeight) },
      { key: 'property', id: 'og:image:alt', content: SITE.ogImageAlt },
      { key: 'name', id: 'twitter:card', content: 'summary_large_image' },
      { key: 'name', id: 'twitter:title', content: title },
      { key: 'name', id: 'twitter:description', content: route.description },
      { key: 'name', id: 'twitter:image', content: image },
      { key: 'name', id: 'twitter:image:alt', content: SITE.ogImageAlt },
    ],
  };
};

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Serialises HeadData to HTML for static prerendering. */
export const headToHtml = (h: HeadData): string =>
  [
    `<title>${esc(h.title)}</title>`,
    `<link rel="canonical" href="${esc(h.canonical)}" />`,
    ...h.meta.map((m) => `<meta ${m.key}="${m.id}" content="${esc(m.content)}" />`),
    ...h.jsonLd.map(
      (j) =>
        `<script type="application/ld+json" data-seo>${JSON.stringify(j).replace(/</g, '\\u003c')}</script>`
    ),
  ].join('\n    ');

/**
 * Converts a RouteMeta definition into standard Next.js Metadata object.
 */
export const routeToMetadata = (
  route: Pick<RouteMeta, 'path' | 'title' | 'description' | 'noindex' | 'keywords' | 'category'>
): Metadata => {
  const title = formatTitle(route.title);
  const canonical = absoluteUrl(route.path);
  const image = absoluteUrl(SITE.ogImage);
  const noindex = Boolean(route.noindex);

  return {
    title,
    description: route.description,
    keywords: route.keywords,
    category: route.category,
    creator: SITE.author.name,
    alternates: {
      canonical,
    },
    robots: {
      index: !noindex,
      follow: true,
      googleBot: {
        index: !noindex,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    openGraph: {
      siteName: SITE.name,
      locale: SITE.locale,
      type: 'website',
      title,
      description: route.description,
      url: canonical,
      images: [
        {
          url: image,
          width: SITE.ogImageWidth,
          height: SITE.ogImageHeight,
          alt: SITE.ogImageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: route.description,
      creator: '@shoaibmarif',
      images: [
        {
          url: image,
          alt: SITE.ogImageAlt,
        },
      ],
    },
  };
};
