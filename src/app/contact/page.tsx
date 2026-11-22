import type { Metadata } from 'next';
import { Contact } from '../../views/Contact';
import { getRouteMeta } from '../../seo/routes';
import { routeToMetadata, breadcrumbJsonLd } from '../../seo/head';

const meta = getRouteMeta('/contact')!;
export const metadata: Metadata = routeToMetadata(meta);

export default function Page() {
  const crumbs = breadcrumbJsonLd('/contact');
  return (
    <>
      {crumbs && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }}
        />
      )}
      <Contact />
    </>
  );
}
