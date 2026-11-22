import type { Metadata } from 'next';
import { Home } from '../views/Home';
import { getRouteMeta } from '../seo/routes';
import { routeToMetadata, websiteJsonLd, organizationJsonLd, appJsonLd } from '../seo/head';

const meta = getRouteMeta('/')!;
export const metadata: Metadata = routeToMetadata(meta);

export default function Page() {
  const website = websiteJsonLd();
  const organization = organizationJsonLd();
  const app = appJsonLd('/', meta.title, meta.description);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(app) }}
      />
      <Home />
    </>
  );
}
