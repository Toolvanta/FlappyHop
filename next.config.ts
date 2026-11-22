import type { NextConfig } from 'next';

const isDev = process.env.NODE_ENV !== 'production';

// Strict CSP that allows GTM and self-hosted assets while protecting users
const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  img-src 'self' blob: data: https://www.googletagmanager.com https://www.google-analytics.com;
  font-src 'self' data: https://fonts.gstatic.com;
  connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://www.googletagmanager.com;
  frame-src 'self' https://www.googletagmanager.com;
  frame-ancestors 'self';
  base-uri 'self';
  form-action 'self';
`.replace(/\s{2,}/g, ' ').trim();

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  trailingSlash: false,
  async redirects() {
    return [
      { source: '/play', destination: '/', permanent: true },
      { source: '/game', destination: '/', permanent: true },
      { source: '/daily-challenge', destination: '/daily', permanent: true },
      { source: '/skins', destination: '/frogs', permanent: true },
      { source: '/achievements', destination: '/stats', permanent: true },
      { source: '/help', destination: '/how-to-play', permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()' },
          ...(isDev ? [] : [{ key: 'Content-Security-Policy', value: cspHeader }]),
        ],
      },
      {
        source: '/(apple-touch-icon.png|favicon-.*|icon-.*|favicon.ico)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' },
        ],
      },
    ];
  },
};

export default nextConfig;
