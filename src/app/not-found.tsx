import type { Metadata } from 'next';
import { NotFound } from '../views/NotFound';

export const metadata: Metadata = {
  title: 'Page not found | FlappyHop',
  description: 'This page doesn’t exist.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFoundPage() {
  return <NotFound />;
}
