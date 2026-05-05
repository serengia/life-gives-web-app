import { Check, Shield } from "lucide-react";

import RevealOnScroll from "@/components/RevealOnScroll";

const focus =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy";

const bookFeatures = [
  'Full "Life Gives You What You Settle For" book',
  "Complete Execution Section (all 5 levels)",
  "Daily Morning & Evening Trackers",
  "Weekly, Monthly, Quarterly & Yearly Templates",
  "The Goals Integrity Pledge",
  "Quick Reference Rhythm Cards",
  "Score Interpretation Guide",
] as const;

const toolkitFeatures = [
  "Everything in The Complete Book",
  'BONUS: Condensed "Quick-Start" Content Guide',
  "BONUS: Standalone Execution Plan Book (separate companion)",
  "BONUS: Laminated Quick Reference Card Set (5 cards)",
  "BONUS: 90-Day Launch Challenge Workbook",
  "BONUS: Habit Streak Poster (A3 printable)",
] as const;

export default function PricingSection() {
  return (
    <section
      id="pricing"
      className="bg-navy py-14 text-white md:py-20 lg:py-24"
      aria-labelledby="pricing-heading"
    >
      <div className="mx-auto max-w-6xl px-6">
        <header className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
          <RevealOnScroll>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-gold">
              CHOOSE YOUR PATH
            </p>
            <h2
              id="pricing-heading"
              className="font-heading text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-[2.5rem]"
            >
              Invest in the Version of You That Stops Settling
            </h2>
            <p className="mt-4 text-base text-gray-300 md:text-lg">
              Two options. Both life-changing. Pick what fits your season.
            </p>
          </RevealOnScroll>
        </header>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
          {/* Card 1 — Complete Book */}
          <article className="flex flex-col rounded-2xl border border-white/15 bg-navy p-6 shadow-lg transition-transform duration-300 ease-out hover:scale-[1.02] motion-reduce:transition-none motion-reduce:hover:scale-100 md:p-8">
            <div className="mb-6">
              <h3 className="font-heading text-2xl font-semibold text-white">
                The Complete Book
              </h3>
              <p className="mt-1 text-gray-300">
                The book + full execution system in one
              </p>
              <p className="mt-4 font-heading text-4xl font-semibold text-white">
                Ksh 2,000
              </p>
            </div>

            <ul className="mb-8 flex flex-1 flex-col gap-3 text-sm text-gray-200 md:text-base">
              {bookFeatures.map((line) => (
                <li key={line} className="flex gap-3">
                  <Check
                    className="mt-0.5 h-5 w-5 shrink-0 text-white"
                    strokeWidth={2.5}
                    aria-hidden
                  />
                  <span>{line}</span>
                </li>
              ))}
            </ul>

            <a
              href="#order"
              className={`inline-flex w-full items-center justify-center rounded-lg border-2 border-gold bg-transparent px-6 py-3.5 text-center text-sm font-bold text-gold transition-colors hover:bg-gold hover:text-white md:w-auto ${focus}`}
            >
              Get the Book
            </a>
            <p className="mt-3 text-center text-xs text-gray-400 md:text-left">
              Physical copy · Delivered to your location
            </p>
          </article>

          {/* Card 2 — Full Toolkit */}
          <article className="relative flex flex-col rounded-2xl border border-amber-500/40 bg-navy p-6 shadow-xl shadow-amber-900/10 ring-2 ring-amber-500 transition-transform duration-300 ease-out hover:scale-[1.02] motion-reduce:transition-none motion-reduce:hover:scale-100 md:p-8">
            <span className="absolute right-4 top-4 rounded-md bg-gold px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-navy md:right-5 md:top-5">
              BEST VALUE
            </span>

            <div className="mb-6 pr-16 md:pr-24">
              <h3 className="font-heading text-2xl font-semibold text-white">
                The Full Toolkit
              </h3>
              <p className="mt-1 text-gray-300">
                For people who are serious about transformation
              </p>
              <p className="mt-4 font-heading text-4xl font-semibold text-white">
                Ksh 5,000
              </p>
              <p className="mt-2 text-sm text-gray-400">
                <span className="line-through">Valued at Ksh 8,500</span>
                <span className="ml-2 font-semibold text-gold">
                  You save Ksh 3,500
                </span>
              </p>
            </div>

            <ul className="mb-8 flex flex-1 flex-col gap-3 text-sm text-gray-200 md:text-base">
              {toolkitFeatures.map((line) => (
                <li key={line} className="flex gap-3">
                  <Check
                    className="mt-0.5 h-5 w-5 shrink-0 text-gold"
                    strokeWidth={2.5}
                    aria-hidden
                  />
                  <span>{line}</span>
                </li>
              ))}
            </ul>

            <a
              href="#order"
              className={`inline-flex w-full items-center justify-center rounded-lg bg-gold px-6 py-3.5 text-center text-sm font-bold text-white shadow-md transition-colors hover:bg-amber-600 ${focus}`}
            >
              Get the Full Toolkit
            </a>
            <p className="mt-3 text-center text-xs text-gray-400 md:text-left">
              Physical bundle · Delivered to your location
            </p>
          </article>
        </div>

        <div className="mt-12 flex flex-col gap-4 rounded-xl bg-gray-800 px-6 py-6 md:flex-row md:items-start md:gap-6 md:px-8 md:py-7">
          <div className="flex shrink-0 justify-center md:justify-start">
            <Shield
              className="h-10 w-10 text-gold md:h-11 md:w-11"
              strokeWidth={1.75}
              aria-hidden
            />
          </div>
          <div className="text-center md:text-left">
            <p className="font-heading text-lg font-semibold text-white md:text-xl">
              30-Day Satisfaction Guarantee
            </p>
            <p className="mt-2 text-sm leading-relaxed text-gray-300 md:text-base">
              If you read the book, do the work, and don&apos;t feel it changed
              how you operate — reach out. We&apos;ll make it right.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
