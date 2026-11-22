import type { MetadataRoute } from 'next';
import { ROUTES } from '../seo/routes';
import { absoluteUrl } from '../seo/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.filter((r) => !r.noindex).map((r) => ({
    url: absoluteUrl(r.path),
    lastModified: new Date(r.dateModified),
    changeFrequency: r.changefreq,
    priority: r.priority,
  }));
}
