import React, { Suspense, lazy, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Home } from './views/Home';

const page = <K extends string>(load: () => Promise<Record<K, React.ComponentType>>, name: K) =>
  lazy(() => load().then((m) => ({ default: m[name] })));

// The home page ships in the main bundle; everything else loads on demand.
const Daily = page(() => import('./views/Daily'), 'Daily');
const Frogs = page(() => import('./views/Frogs'), 'Frogs');
const StatsPage = page(() => import('./views/StatsPage'), 'StatsPage');
const HowToPlay = page(() => import('./views/HowToPlay'), 'HowToPlay');
const Tips = page(() => import('./views/Tips'), 'Tips');
const Faq = page(() => import('./views/Faq'), 'Faq');
const About = page(() => import('./views/About'), 'About');
const Contact = page(() => import('./views/Contact'), 'Contact');
const Privacy = page(() => import('./views/Privacy'), 'Privacy');
const Terms = page(() => import('./views/Terms'), 'Terms');
const Sitemap = page(() => import('./views/Sitemap'), 'Sitemap');
const NotFound = page(() => import('./views/NotFound'), 'NotFound');

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Loading = () => <div className="min-h-[70vh]" aria-busy="true" />;

export const App: React.FC = () => {
  const { pathname } = useLocation();

  // The page loaded fine, so a later stale-file error may reload again.
  useEffect(() => {
    try {
      sessionStorage.removeItem('flappyhop.chunk-reload');
    } catch {
      // storage blocked
    }
  }, []);

  return (
    <AppLayout>
      <ScrollToTop />
      <ErrorBoundary resetKey={pathname}>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/daily" element={<Daily />} />
            <Route path="/frogs" element={<Frogs />} />
            <Route path="/stats" element={<StatsPage />} />
            <Route path="/how-to-play" element={<HowToPlay />} />
            <Route path="/tips" element={<Tips />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/sitemap" element={<Sitemap />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </AppLayout>
  );
};
