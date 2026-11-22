import type { Metadata } from 'next';
import { Terms } from '../../views/Terms';
import { getRouteMeta } from '../../seo/routes';
import { routeToMetadata, breadcrumbJsonLd } from '../../seo/head';

const meta = getRouteMeta('/terms')!;
export const metadata: Metadata = routeToMetadata(meta);

export default function Page() {
  const crumbs = breadcrumbJsonLd('/terms');
  return (
    <>
      {crumbs && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }}
        />
      )}
      <Terms />
    </>
  );
}
