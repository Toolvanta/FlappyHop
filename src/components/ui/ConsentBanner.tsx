'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { CONSENT_EVENT, getConsent, setConsent, type ConsentChoice } from '../../lib/consent';

/** A small notice, not a wall: analytics is on unless you opt out, and the choice is remembered. */
export const ConsentBanner: React.FC = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (getConsent() === null) {
      setOpen(true);
    }
    const reopen = () => setOpen(true);
    window.addEventListener(CONSENT_EVENT, reopen);
    return () => window.removeEventListener(CONSENT_EVENT, reopen);
  }, []);

  if (!open) return null;
  const choose = (c: ConsentChoice) => {
    setConsent(c);
    setOpen(false);
  };

  return (
    <div role="region" aria-label="Analytics notice" className="lily animate-rise-in fixed inset-x-3 bottom-3 z-50 mx-auto max-w-md p-4 sm:inset-x-auto sm:bottom-5 sm:right-5">
      <p className="text-sm leading-6 text-ink-2">
        We count visits with Google Analytics to see which modes people enjoy. No ads, nothing sold.{' '}
        <Link href="/privacy" className="font-bold text-ink underline underline-offset-2">
          Privacy policy
        </Link>
      </p>
      <div className="mt-3 flex gap-2">
        <button type="button" onClick={() => choose('granted')} className="btn btn-glow btn-sm min-h-[44px]">
          Sounds good
        </button>
        <button type="button" onClick={() => choose('denied')} className="btn btn-ghost btn-sm min-h-[44px]">
          Opt out
        </button>
      </div>
    </div>
  );
};
