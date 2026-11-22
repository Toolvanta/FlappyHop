/**
 * SEO metadata for every page. Used at runtime and at build time
 * for Next.js metadata, sitemap.xml, robots.txt and structured data.
 * All titles are crafted between 45–60 characters; descriptions between 140–160 characters.
 */
export type ChangeFreq = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';

export interface RouteMeta {
  path: string;
  title: string;
  description: string;
  label: string;
  heading: string;
  keywords: string[];
  category: string;
  dateModified: string;
  changefreq: ChangeFreq;
  priority: number;
  noindex?: boolean;
  parent?: string;
  /** Interactive game pages get WebApplication structured data. */
  app?: boolean;
}

const page = (
  r: Omit<RouteMeta, 'changefreq' | 'priority' | 'parent' | 'dateModified'> & {
    priority?: number;
    changefreq?: ChangeFreq;
    dateModified?: string;
  }
): RouteMeta => ({
  changefreq: 'monthly',
  priority: 0.5,
  parent: '/',
  dateModified: '2026-11-22',
  ...r,
});

export const ROUTES: RouteMeta[] = [
  {
    path: '/',
    title: 'FlappyHop - Free One-Tap Frog Game Online',
    description:
      'Tap to hop a little frog through a moonlit pond. Dodge reeds and vines, bounce off lily pads, catch fireflies and unlock new frogs. Free, no download.',
    label: 'Home',
    heading: 'FlappyHop',
    keywords: ['frog game', 'flappy game', 'one tap game', 'casual browser game', 'free online game', 'html5 game', 'flappy bird alternative'],
    category: 'Games',
    dateModified: '2026-11-22',
    changefreq: 'weekly',
    priority: 1.0,
    app: true,
  },
  page({
    path: '/daily',
    title: 'Daily Pond Challenge - New Frog Course Every Day',
    description:
      'Play the daily pond challenge in FlappyHop! Every player hops the same course each day. Reach the gap goal on consecutive days to build your daily hopping streak.',
    label: 'Daily pond',
    heading: 'Daily pond',
    keywords: ['daily game challenge', 'daily course', 'daily streak game', 'frog puzzle', 'daily browser game'],
    category: 'Games',
    priority: 0.9,
    changefreq: 'daily',
    app: true,
  }),
  page({
    path: '/frogs',
    title: 'Unlock Frogs - Collect Fireflies & Choose Your Frog',
    description:
      'Collect seven unique frogs in FlappyHop, from Pip to cosmic Nova. Catch glowing fireflies across the moonlit pond to unlock colorful new frogs for your journey.',
    label: 'Frogs',
    heading: 'Meet the frogs',
    keywords: ['frog characters', 'unlock frogs', 'game skins', 'fireflies rewards', 'collectible frogs'],
    category: 'Games',
    priority: 0.7,
  }),
  page({
    path: '/stats',
    title: 'Your Pond Record & Achievements - FlappyHop Stats',
    description:
      'View your FlappyHop records, all-time best score, firefly count, pad bounces, cause-of-splash breakdown, and achievements saved privately on your device.',
    label: 'Stats',
    heading: 'Your pond record',
    keywords: ['game stats', 'flappy score', 'achievements', 'personal record'],
    category: 'Gaming Records',
    noindex: true,
    priority: 0.3,
  }),
  page({
    path: '/how-to-play',
    title: 'How to Play FlappyHop - Complete Controls & Rules Guide',
    description:
      'Master FlappyHop controls and gameplay rules. Learn how to hop through reeds and vines, bounce off lily pads, collect fireflies, and dodge darting dragonflies.',
    label: 'How to play',
    heading: 'How to play',
    keywords: ['how to play flappyhop', 'game controls', 'frog game rules', 'lily pad mechanic', 'one tap tutorial'],
    category: 'Guide',
    priority: 0.8,
  }),
  page({
    path: '/tips',
    title: 'FlappyHop Tips & Strategies - How to Get a Higher Score',
    description:
      'Proven tips and strategies to achieve higher scores in FlappyHop. Learn rhythm timing, gap positioning, lily pad safety nets, and how to avoid fast dragonflies.',
    label: 'Tips',
    heading: 'Tips for a higher score',
    keywords: ['flappy tips', 'high score strategy', 'frog game tactics', 'gameplay advice', 'dodge dragonflies'],
    category: 'Guide',
    priority: 0.8,
  }),
  page({
    path: '/faq',
    title: 'FlappyHop FAQ - Frequently Asked Questions Answered',
    description:
      'Find answers to common questions about FlappyHop: browser support, touch controls, lily pad bounces, glow bug shields, daily streaks, and local device privacy.',
    label: 'FAQ',
    heading: 'Frequently asked questions',
    keywords: ['flappyhop faq', 'frog game help', 'web game questions', 'flappy hop troubleshooting'],
    category: 'Support',
    priority: 0.6,
  }),
  page({
    path: '/about',
    title: 'About FlappyHop - The One-Tap Frog Web Game Story',
    description:
      'Learn why FlappyHop was created, its lightweight code-drawn art style using HTML Canvas and Web Audio API, and the developer behind this peaceful one-tap game.',
    label: 'About',
    heading: 'About FlappyHop',
    keywords: ['about flappyhop', 'canvas web game', 'web audio game', 'independent game developer', 'Shoaib Arif'],
    category: 'About',
    changefreq: 'yearly',
    priority: 0.5,
  }),
  page({
    path: '/contact',
    title: 'Contact FlappyHop - Feedback, Bug Reports & Ideas',
    description:
      'Get in touch with the creator of FlappyHop. Share feedback, report bugs, suggest new frog skins, or connect directly via GitHub, LinkedIn, or email.',
    label: 'Contact',
    heading: 'Contact',
    keywords: ['contact developer', 'bug report', 'feature suggestion', 'flappyhop support'],
    category: 'Support',
    changefreq: 'yearly',
    priority: 0.4,
  }),
  page({
    path: '/privacy',
    title: 'Privacy Policy - Local Storage and Analytics Notice',
    description:
      'Read the FlappyHop Privacy Policy. Learn how your game progress remains 100% on your local device, what anonymous analytics are gathered, and how to opt out.',
    label: 'Privacy',
    heading: 'Privacy policy',
    keywords: ['privacy policy', 'cookie consent', 'local storage game', 'privacy rights'],
    category: 'Legal',
    changefreq: 'yearly',
    priority: 0.3,
  }),
  page({
    path: '/terms',
    title: 'Terms and Conditions - Free Online Game Usage Terms',
    description:
      'Review the terms and conditions for playing FlappyHop online. Clear, simple terms regarding free personal use, open-source code, and browser-saved game progress.',
    label: 'Terms',
    heading: 'Terms and conditions',
    keywords: ['terms of service', 'terms and conditions', 'disclaimer', 'game license'],
    category: 'Legal',
    changefreq: 'yearly',
    priority: 0.3,
  }),
  page({
    path: '/sitemap',
    title: 'Sitemap - All Pages, Games and Guides Directory',
    description:
      'Browse the complete sitemap of FlappyHop. Access the endless pond game, daily challenge, frog unlocks, gameplay guides, pro tips, FAQ, and legal documentation.',
    label: 'Sitemap',
    heading: 'Sitemap',
    keywords: ['sitemap', 'page directory', 'all routes', 'navigation index'],
    category: 'Directory',
    priority: 0.3,
  }),
];

/** Old or likely URLs, permanently redirected to their page. */
export const REDIRECTS: Record<string, string> = {
  '/play': '/',
  '/game': '/',
  '/daily-challenge': '/daily',
  '/skins': '/frogs',
  '/achievements': '/stats',
  '/help': '/how-to-play',
};

const byPath = new Map(ROUTES.map((m) => [m.path, m]));
export const getRouteMeta = (path: string): RouteMeta | undefined => byPath.get(path);

export const getBreadcrumbs = (path: string): RouteMeta[] => {
  const trail: RouteMeta[] = [];
  let current = byPath.get(path);
  const seen = new Set<string>();
  while (current && !seen.has(current.path)) {
    seen.add(current.path);
    trail.unshift(current);
    current = current.parent ? byPath.get(current.parent) : undefined;
  }
  return trail;
};
