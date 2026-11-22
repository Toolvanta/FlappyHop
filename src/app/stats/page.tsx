import type { Metadata } from 'next';
import { StatsPage } from '../../views/StatsPage';
import { getRouteMeta } from '../../seo/routes';
import { routeToMetadata } from '../../seo/head';

const meta = getRouteMeta('/stats')!;
export const metadata: Metadata = routeToMetadata(meta);

export default function Page() {
  return <StatsPage />;
}
