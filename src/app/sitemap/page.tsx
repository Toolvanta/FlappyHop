import type { Metadata } from 'next';
import { Sitemap } from '../../views/Sitemap';
import { getRouteMeta } from '../../seo/routes';
import { routeToMetadata, breadcrumbJsonLd } from '../../seo/head';

const meta = getRouteMeta('/sitemap')!;
export const metadata: Metadata = routeToMetadata(meta);

export default function Page() {
  const crumbs = breadcrumbJsonLd('/sitemap');
  return (
    <>
      {crumbs && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }}
        />
      )}
      <Sitemap />
    </>
  );
}
