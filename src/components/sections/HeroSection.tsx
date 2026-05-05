"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

const linkFocus =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy";

const mobileNavLink =
  `flex min-h-11 items-center px-4 py-3 text-base font-medium text-white/95 transition-colors hover:bg-white/5 hover:text-white ${linkFocus}`;

export default function HeroSection() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    const onChange = () => {
      if (mql.matches) setMobileMenuOpen(false);
    };
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileMenuOpen]);

  // Always reserve border width so sticking the bar doesn't cause a 1px layout shift when it becomes visible
  const navShell =
    scrolled || mobileMenuOpen
      ? "border-b border-white/10 bg-navy/95 backdrop-blur-sm"
      : "border-b border-transparent bg-transparent";

  return (
    <section
      id="home"
      className="flex min-h-screen flex-col overflow-x-hidden bg-navy text-white"
    >
      <header
        className={`sticky top-0 z-50 w-full transition-colors duration-300 ${navShell}`}
      >
        <div className="relative">
          <nav
            aria-label="Primary"
            className="relative mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6"
          >
            <a
              href="#home"
              onClick={closeMobileMenu}
              className={`relative z-10 min-w-0 text-sm font-bold tracking-wider text-gold md:text-base ${linkFocus} shrink-0 rounded-sm`}
            >
              JAMES SERENGIA
            </a>

            <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-8 md:flex">
              <a
                href="#author"
                className={`text-sm text-white/90 transition-colors hover:text-white ${linkFocus} rounded-sm`}
              >
                About
              </a>
              <a
                href="#inside"
                className={`text-sm text-white/90 transition-colors hover:text-white ${linkFocus} rounded-sm`}
              >
                What&apos;s Inside
              </a>
              <a
                href="#pricing"
                className={`text-sm text-white/90 transition-colors hover:text-white ${linkFocus} rounded-sm`}
              >
                Pricing
              </a>
            </div>

            <div className="relative z-10 flex items-center gap-2 sm:gap-3">
              <a
                href="#pricing"
                className={`inline-flex rounded-lg bg-gold px-4 py-2 text-sm font-bold text-white shadow-md transition-colors hover:bg-amber-600 ${linkFocus}`}
              >
                Order Now
              </a>
              <button
                type="button"
                aria-expanded={mobileMenuOpen}
                aria-controls="primary-mobile-panel"
                aria-label={
                  mobileMenuOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
                }
                className={`inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-md text-white md:hidden ${linkFocus}`}
                onClick={() => setMobileMenuOpen((o) => !o)}
              >
                {mobileMenuOpen ? (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden
                  >
                    <path
                      d="M18 6L6 18M6 6l12 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                ) : (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden
                  >
                    <path
                      d="M4 7h16M4 12h16M4 17h16"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
              </button>
            </div>
          </nav>

          <div
            id="primary-mobile-panel"
            className={`absolute left-0 right-0 top-full border-b border-white/10 bg-navy/[0.98] shadow-lg md:hidden ${mobileMenuOpen ? "block" : "hidden"}`}
          >
            <div className="mx-auto flex max-w-6xl flex-col px-4 pb-3 pt-1 sm:px-6">
              <a href="#author" className={mobileNavLink} onClick={closeMobileMenu}>
                About
              </a>
              <a href="#inside" className={mobileNavLink} onClick={closeMobileMenu}>
                What&apos;s Inside
              </a>
              <a href="#pricing" className={mobileNavLink} onClick={closeMobileMenu}>
                Pricing
              </a>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 flex-col justify-center">
        <div className="mx-auto grid min-w-0 max-w-6xl flex-1 grid-cols-1 items-center gap-8 px-4 py-10 sm:gap-10 sm:px-6 sm:py-12 lg:grid-cols-2 lg:gap-12 lg:py-16">
          <div className="order-1 min-w-0 space-y-5 sm:space-y-6 lg:order-none animate-hero-in">
            <span className="inline-block rounded-full border border-gold/50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gold">
              NEW RELEASE
            </span>

            <h1 className="font-heading text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
              Stop Settling. Start Living the Life You Actually Want.
            </h1>

            <p className="max-w-prose text-base text-slate-300 lg:text-lg">
              A practical blueprint by James Serengia that gives you the
              mindset, the plan, and the daily execution system to build your
              best life — starting today.
            </p>

            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-gray-200">
                Daily Execution System
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-gray-200">
                Proven Life Audit Framework
              </span>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="#pricing"
                className={`inline-flex w-full items-center justify-center rounded-lg bg-gold px-6 py-3 text-center text-sm font-bold text-white shadow-lg transition-colors hover:bg-amber-600 sm:w-auto ${linkFocus}`}
              >
                Get the Book — Ksh 2,000
              </a>
              <a
                href="#pricing"
                className={`inline-flex w-full items-center justify-center rounded-lg border-2 border-gold bg-transparent px-6 py-3 text-center text-sm font-bold text-gold transition-colors hover:bg-gold hover:text-white sm:w-auto ${linkFocus}`}
              >
                See Full Toolkit — Ksh 5,000
              </a>
            </div>

            <p className="text-sm text-gray-400">
              ★★★★★ Trusted by ambitious Kenyans ready to stop drifting
            </p>
          </div>

          <div className="order-2 flex min-w-0 justify-center lg:order-none lg:justify-end">
            <div className="relative aspect-[1909/1374] w-full max-w-md -rotate-2 overflow-hidden rounded-lg border-2 border-white shadow-lg shadow-black/35 ring-2 ring-white/35">
              <Image
                src="/book-cover.jpg"
                alt="Life Gives You What You Settle For — book cover by James Serengia"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 448px"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
