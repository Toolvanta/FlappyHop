import type { Metadata } from 'next';
import { HowToPlay } from '../../views/HowToPlay';
import { getRouteMeta } from '../../seo/routes';
import { routeToMetadata, breadcrumbJsonLd } from '../../seo/head';

const meta = getRouteMeta('/how-to-play')!;
export const metadata: Metadata = routeToMetadata(meta);

export default function Page() {
  const crumbs = breadcrumbJsonLd('/how-to-play');
  return (
    <>
      {crumbs && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }}
        />
      )}
      <HowToPlay />
    </>
  );
}
