import { Check } from "lucide-react";
import Image from "next/image";

import RevealOnScroll from "@/components/RevealOnScroll";

const differentiators = [
  "A proven 5-Level Execution Pyramid (Daily → Weekly → Monthly → Quarterly → Yearly)",
  "Morning and Evening ritual trackers with energy & focus scoring",
  "Life Audit framework — score 8 areas of your life every quarter",
  "Goal Completion Rate tracking — see your progress in numbers",
  "The Goals Integrity Pledge — a commitment framework that changes behavior",
] as const;

const statBadges = [
  { line1: "5 Levels", line2: "Execution System" },
  { line1: "365 Days", line2: "Of Trackers" },
  { line1: "8 Areas", line2: "Life Audit" },
] as const;

export default function SolutionSection() {
  return (
    <section id="book" className="bg-navy py-14 text-white md:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-14 lg:gap-16">
          <div>
            <RevealOnScroll>
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gold">
                THE SOLUTION
              </p>
              <h2 className="font-heading text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
                A Complete Personal Development Blueprint — With Built-In
                Execution
              </h2>
              <p className="mt-5 text-gray-300">
                Most personal development books inspire you, then leave you with
                nothing to do on Monday morning. This book is different. Every
                principle comes with a tracker, a template, or a system you can
                use immediately.
              </p>
            </RevealOnScroll>
            <ul className="mt-8 list-none space-y-4 p-0">
              {differentiators.map((text) => (
                <li key={text} className="flex gap-3">
                  <Check
                    className="mt-0.5 h-5 w-5 shrink-0 text-gold"
                    strokeWidth={2.5}
                    aria-hidden
                  />
                  <span className="text-gray-200">{text}</span>
                </li>
              ))}
            </ul>
            <blockquote className="mt-10 border-l-4 border-gold pl-5">
              <p className="font-heading text-lg italic text-gray-200 md:text-xl">
                Epic life is not built by what we do once in a while. It is
                built by what we consistently do.
              </p>
              <cite className="mt-3 block text-sm font-medium not-italic text-gray-400">
                — James Serengia
              </cite>
            </blockquote>
          </div>

          <div className="flex flex-col items-center md:items-stretch">
            <div className="relative w-full max-w-md overflow-hidden rounded-xl border-2 border-white shadow-[0_0_36px_rgba(255,255,255,0.14)] ring-1 ring-white/45 md:max-w-lg md:self-end lg:max-w-xl">
              <Image
                src="/book-cover-spread.jpg"
                alt="Life Gives You What You Settle For — book preview"
                width={2000}
                height={1334}
                className="h-auto w-full"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 512px, 576px"
              />
            </div>
            <div className="mt-8 flex w-full max-w-md flex-wrap justify-center gap-3 md:max-w-lg md:justify-end md:self-end lg:max-w-xl">
              {statBadges.map(({ line1, line2 }) => (
                <div
                  key={line1}
                  className="min-w-[6.5rem] flex-1 rounded-full bg-gold px-4 py-2 text-center text-navy sm:min-w-0 sm:flex-none"
                >
                  <div className="text-xs font-bold leading-tight sm:text-sm">
                    {line1}
                  </div>
                  <div className="text-[10px] font-semibold leading-tight opacity-90 sm:text-xs">
                    {line2}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
