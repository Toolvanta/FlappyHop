import type { Metadata } from 'next';
import { Faq } from '../../views/Faq';
import { getRouteMeta } from '../../seo/routes';
import { routeToMetadata, faqJsonLd, breadcrumbJsonLd } from '../../seo/head';
import { FAQ_ITEMS } from '../../data/faq';

const meta = getRouteMeta('/faq')!;
export const metadata: Metadata = routeToMetadata(meta);

export default function Page() {
  const crumbs = breadcrumbJsonLd('/faq');
  const faqData = faqJsonLd(FAQ_ITEMS);
  return (
    <>
      {crumbs && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />
      <Faq />
    </>
  );
}
