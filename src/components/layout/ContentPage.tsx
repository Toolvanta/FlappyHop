'use client';

import React from 'react';
import Link from 'next/link';
import { SeoMeta } from '../seo/SeoMeta';
import { getRouteMeta } from '../../seo/routes';
import type { JsonLd } from '../../seo/head';

interface ContentPageProps {
  path: string;
  eyebrow?: string;
  intro?: React.ReactNode;
  structuredData?: JsonLd | JsonLd[];
  children: React.ReactNode;
  wide?: boolean;
}

/** Shared frame for the text pages. */
export const ContentPage: React.FC<ContentPageProps> = ({ path, eyebrow, intro, structuredData, children, wide = false }) => {
  const meta = getRouteMeta(path);
  return (
    <article className={`mx-auto w-full pt-4 ${wide ? 'max-w-5xl' : 'max-w-3xl'}`}>
      <SeoMeta canonicalPath={path} structuredData={structuredData} />
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted">
        <ol className="flex items-center flex-wrap gap-1.5" itemScope itemType="https://schema.org/BreadcrumbList">
          <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            <Link href="/" className="hover:text-ink transition-colors" itemProp="item">
              <span itemProp="name">Pond</span>
            </Link>
            <meta itemProp="position" content="1" />
          </li>
          <li aria-hidden="true" className="text-muted">·</li>
          <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            <span aria-current="page" className="text-ink-2 font-medium" itemProp="name">
              {meta?.label}
            </span>
            <meta itemProp="position" content="2" />
          </li>
        </ol>
      </nav>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h1 className="text-4xl font-bold leading-[1.1] sm:text-5xl">{meta?.heading}</h1>
      {intro && <p className="mt-5 max-w-2xl text-lg leading-8 text-ink-2">{intro}</p>}
      <div className="mt-10">{children}</div>
    </article>
  );
};
