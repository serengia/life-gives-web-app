"use client";

import Image from "next/image";
import SiteHeader from "@/components/SiteHeader";
import { NAV_LINKS } from "@/lib/constants";

const linkFocus =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="flex min-h-screen flex-col overflow-x-hidden bg-navy text-white"
    >
      <SiteHeader links={NAV_LINKS} variant="transparent-over-hero" />

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
