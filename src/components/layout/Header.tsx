'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CircleHelp, Menu, Moon, Settings, Sun, X } from 'lucide-react';
import { Logo } from './Logo';
import { HEADER_LINKS, INFO_LINKS, LEARN_LINKS, PLAY_LINKS } from './nav';
import { useApp } from '../../context/AppContext';

const iconBtn =
  'flex h-11 w-11 items-center justify-center rounded-full text-ink-2 transition-colors hover:bg-leaf hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-firefly';

export const Header: React.FC = () => {
  const { openModal, isDark, toggleTheme, stats } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-rim bg-pond/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-3 sm:px-6">
        <Logo />
        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {HEADER_LINKS.map((l) => {
            const isActive = pathname === l.to;
            return (
              <Link
                key={l.to}
                href={l.to}
                aria-current={isActive ? 'page' : undefined}
                className={`rounded-full px-4 py-2 font-display font-medium transition-colors ${
                  isActive ? 'bg-leaf text-ink shadow-sm' : 'text-ink-2 hover:text-ink'
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-1">
          <Link
            href="/stats"
            className="chip !h-10 hover:!border-muted"
            title="Fireflies caught in total"
            aria-label={`${stats.totalFlies} fireflies. View your stats`}
          >
            <span className="h-2 w-2 rounded-full bg-firefly-glow shadow-[0_0_8px_var(--color-firefly-glow)]" aria-hidden="true" />
            <span suppressHydrationWarning>{stats.totalFlies.toLocaleString('en-US')}</span>
          </Link>
          <button
            type="button"
            className={`${iconBtn} hidden sm:flex`}
            onClick={() => openModal('help')}
            aria-label="How to play guide"
            title="How to play"
          >
            <CircleHelp className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            className={iconBtn}
            onClick={() => openModal('settings')}
            aria-label="Game settings"
            title="Settings"
          >
            <Settings className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            className={iconBtn}
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to day pond' : 'Switch to night pond'}
            title={isDark ? 'Switch to day pond' : 'Switch to night pond'}
          >
            {isDark ? <Sun className="h-5 w-5" aria-hidden="true" /> : <Moon className="h-5 w-5" aria-hidden="true" />}
          </button>
          <button
            type="button"
            className={`${iconBtn} md:hidden`}
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {menuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <nav id="mobile-menu" aria-label="Mobile Navigation" className="animate-fade-in border-t border-rim bg-pond md:hidden">
          <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-2 px-3 py-4">
            {[...PLAY_LINKS, ...LEARN_LINKS, INFO_LINKS[0]].map((l) => {
              const isActive = pathname === l.to;
              return (
                <li key={l.to}>
                  <Link
                    href={l.to}
                    onClick={() => setMenuOpen(false)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`block rounded-2xl border px-4 py-3 font-display font-medium min-h-[44px] flex items-center ${
                      isActive ? 'border-firefly bg-leaf text-ink shadow-sm' : 'border-rim bg-leaf/60 text-ink-2 hover:bg-leaf'
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
};
