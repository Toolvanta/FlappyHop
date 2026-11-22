import type { Metadata } from 'next';
import { Daily } from '../../views/Daily';
import { getRouteMeta } from '../../seo/routes';
import { routeToMetadata, appJsonLd } from '../../seo/head';

const meta = getRouteMeta('/daily')!;
export const metadata: Metadata = routeToMetadata(meta);

export default function Page() {
  const jsonLd = appJsonLd('/daily', meta.title, meta.description);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Daily />
    </>
  );
}
