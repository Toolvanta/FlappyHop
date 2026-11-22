import type { Metadata } from 'next';
import { Frogs } from '../../views/Frogs';
import { getRouteMeta } from '../../seo/routes';
import { routeToMetadata, breadcrumbJsonLd } from '../../seo/head';

const meta = getRouteMeta('/frogs')!;
export const metadata: Metadata = routeToMetadata(meta);

export default function Page() {
  const crumbs = breadcrumbJsonLd('/frogs');
  return (
    <>
      {crumbs && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }}
        />
      )}
      <Frogs />
    </>
  );
}
