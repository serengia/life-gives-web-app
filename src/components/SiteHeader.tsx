"use client";

import { useCallback, useEffect, useState } from "react";

type NavLink = { label: string; href: string };

type SiteHeaderProps = {
  links: readonly NavLink[];
  variant: "transparent-over-hero" | "solid";
  hrefPrefix?: string;
};

const linkFocus =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy rounded-sm";

function applyPrefix(href: string, prefix: string) {
  return href.startsWith("#") ? `${prefix}${href}` : href;
}

export default function SiteHeader({
  links,
  variant,
  hrefPrefix = "",
}: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);

  useEffect(() => {
    if (variant !== "transparent-over-hero") return;
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [variant]);

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

  const isTransparent =
    variant === "transparent-over-hero" && !scrolled && !mobileMenuOpen;

  const navShell = isTransparent
    ? "border-b border-transparent bg-transparent"
    : "border-b border-white/10 bg-navy/95 backdrop-blur-sm";

  const mobileNavLink = `flex min-h-11 items-center px-4 py-3 text-base font-medium text-white/95 transition-colors hover:bg-white/5 hover:text-white ${linkFocus}`;

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-colors duration-300 ${navShell}`}
    >
      <div className="relative">
        <nav
          aria-label="Primary"
          className="relative mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6"
        >
          <a
            href={applyPrefix("#home", hrefPrefix) || "/"}
            onClick={closeMobileMenu}
            aria-label="Home"
            className={`relative z-10 shrink-0 ${linkFocus}`}
          >
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              aria-hidden
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Outer ring */}
              <circle cx="18" cy="18" r="16" stroke="#d97706" strokeWidth="2.5" fill="none" />
              {/* Middle ring */}
              <circle cx="18" cy="18" r="10" stroke="#d97706" strokeWidth="2.5" fill="none" />
              {/* Inner ring */}
              <circle cx="18" cy="18" r="4" fill="#d97706" />
              {/* Crosshair lines */}
              <line x1="18" y1="2" x2="18" y2="8" stroke="#d97706" strokeWidth="2" strokeLinecap="round" />
              <line x1="18" y1="28" x2="18" y2="34" stroke="#d97706" strokeWidth="2" strokeLinecap="round" />
              <line x1="2" y1="18" x2="8" y2="18" stroke="#d97706" strokeWidth="2" strokeLinecap="round" />
              <line x1="28" y1="18" x2="34" y2="18" stroke="#d97706" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </a>

          <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-8 md:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={applyPrefix(link.href, hrefPrefix)}
                className={`text-sm text-white/90 transition-colors hover:text-white ${linkFocus}`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="relative z-10 flex items-center gap-2 sm:gap-3">
            <a
              href={applyPrefix("#pricing", hrefPrefix) || "/#pricing"}
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
          className={`absolute left-0 right-0 top-full border-b border-white/10 bg-navy/[0.98] shadow-lg md:hidden ${
            mobileMenuOpen ? "block" : "hidden"
          }`}
        >
          <div className="mx-auto flex max-w-6xl flex-col px-4 pb-3 pt-1 sm:px-6">
            {links.map((link) => (
              <a
                key={link.href}
                href={applyPrefix(link.href, hrefPrefix)}
                className={mobileNavLink}
                onClick={closeMobileMenu}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
