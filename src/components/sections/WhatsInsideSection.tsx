"use client";

import { useCallback, useState } from "react";

import RevealOnScroll from "@/components/RevealOnScroll";

const tabFocus =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-light";

type TabId = "book" | "execution";

const bookChapters = [
  {
    icon: "\u{1f9e0}",
    title: "Mindset Reset",
    description:
      "Break the beliefs keeping you stuck and rebuild your identity as an achiever",
  },
  {
    icon: "\u{1f3af}",
    title: "Vision & Purpose",
    description:
      "Clarify your WHY and write a Vision Statement that pulls you forward",
  },
  {
    icon: "\u{1f4d0}",
    title: "Goal Architecture",
    description:
      "Set goals the right way — layered from yearly down to daily",
  },
  {
    icon: "\u26a1",
    title: "The Execution Strategy",
    description:
      "The exact process for turning plans into consistent daily action",
  },
  {
    icon: "\u{1f525}",
    title: "Habit Engineering",
    description:
      "Build morning routines and keystone habits that compound over time",
  },
  {
    icon: "\u{1f6e1}\u{fe0f}",
    title: "The 5 Enemies of Success",
    description:
      "Identify and defeat wrong beliefs, procrastination, lack of focus, and more",
  },
  {
    icon: "\u{1f4b0}",
    title: "Financial Intentionality",
    description:
      "Align your financial behavior with your life goals",
  },
  {
    icon: "\u{1f91d}",
    title: "Relationships & Contribution",
    description:
      "Build the connections and legacy that make life meaningful",
  },
] as const;

const pyramidLevels = [
  {
    label: "YEARLY",
    summary: "Annual Master Review + Next Year Vision",
    duration: "Full day",
    widthClass:
      "w-[55%] max-w-md px-4 py-3 text-sm md:px-5 md:py-3.5 md:text-base border border-navy/20 bg-white shadow-sm",
  },
  {
    label: "QUARTERLY",
    summary: "Deep Review + Reset + Next Quarter Plan",
    duration: "2–3 hrs",
    widthClass:
      "w-[68%] max-w-lg px-4 py-3.5 text-sm md:px-5 md:py-4 md:text-base border border-navy/25 bg-white shadow-md",
  },
  {
    label: "MONTHLY",
    summary: "Progress Scorecard + Life Audit",
    duration: "45–60 min/month",
    widthClass:
      "w-[80%] max-w-xl px-5 py-3.5 text-sm md:px-6 md:py-4 md:text-base border border-gold/30 bg-white shadow-md ring-1 ring-gold/20",
  },
  {
    label: "WEEKLY",
    summary: "Week Opener + Week Closer",
    duration: "30–45 min every Sunday",
    widthClass:
      "w-[90%] max-w-2xl px-5 py-4 text-sm md:px-6 md:py-4.5 md:text-base border border-gold/40 bg-gradient-to-br from-white to-light shadow-lg ring-2 ring-gold/25",
  },
  {
    label: "DAILY",
    summary: "Morning Page + Evening Review",
    duration: "10 min/day",
    widthClass:
      "w-full max-w-3xl px-6 py-5 text-base md:px-8 md:py-6 md:text-lg font-semibold border-2 border-gold bg-navy text-white shadow-xl shadow-navy/20 ring-2 ring-gold/50",
  },
] as const;

const comparisonRows = [
  {
    area: "Daily Tracker",
    original: "Missing",
    upgraded: "Full Morning + Evening Page",
  },
  {
    area: "Monthly Review",
    original: "Missing",
    upgraded: "Full Progress Scorecard",
  },
  {
    area: "Yearly Review",
    original: "Missing",
    upgraded: "Annual Master Review",
  },
  {
    area: "Habit Tracking",
    original: "Tick-boxes",
    upgraded: "Streaks + Monthly Averages",
  },
  {
    area: "Goal Progress",
    original: "No measurement",
    upgraded: "% Completion Tracking",
  },
] as const;

export default function WhatsInsideSection() {
  const [tab, setTab] = useState<TabId>("book");

  const onTabKeyDown = useCallback(
    (e: React.KeyboardEvent, current: TabId) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setTab(current);
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        setTab("execution");
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setTab("book");
      }
    },
    [],
  );

  return (
    <section id="inside" className="bg-light py-14 text-navy md:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto mb-10 max-w-3xl text-center md:mb-14">
          <RevealOnScroll>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gold">
              WHAT&apos;S INSIDE
            </p>
            <h2 className="font-heading text-3xl font-semibold leading-tight text-navy sm:text-4xl lg:text-5xl">
              Everything You Need to Go From Dreaming to Doing
            </h2>
            <p className="mt-4 text-base text-gray-600 md:text-lg">
              Two powerful components. One complete system.
            </p>
          </RevealOnScroll>
        </div>

        <div
          className="mx-auto mb-10 flex max-w-md justify-center rounded-full border border-navy/10 bg-white p-1 shadow-sm md:max-w-lg"
          role="tablist"
          aria-label="What&apos;s inside content"
        >
          <button
            type="button"
            role="tab"
            id="whats-inside-tab-book"
            aria-selected={tab === "book"}
            aria-controls="whats-inside-panel-book"
            tabIndex={tab === "book" ? 0 : -1}
            onClick={() => setTab("book")}
            onKeyDown={(e) => onTabKeyDown(e, "book")}
            className={`${tabFocus} w-1/2 rounded-full px-4 py-3 text-center text-sm font-bold transition-colors md:text-base ${tab === "book" ? "bg-navy text-white shadow-md" : "text-navy hover:bg-light"}`}
          >
            The Book
          </button>
          <button
            type="button"
            role="tab"
            id="whats-inside-tab-execution"
            aria-selected={tab === "execution"}
            aria-controls="whats-inside-panel-execution"
            tabIndex={tab === "execution" ? 0 : -1}
            onClick={() => setTab("execution")}
            onKeyDown={(e) => onTabKeyDown(e, "execution")}
            className={`${tabFocus} w-1/2 rounded-full px-4 py-3 text-center text-sm font-bold transition-colors md:text-base ${tab === "execution" ? "bg-navy text-white shadow-md" : "text-navy hover:bg-light"}`}
          >
            Execution Section
          </button>
        </div>

        <div className="relative min-h-[12rem]">
          <div
            id="whats-inside-panel-book"
            role="tabpanel"
            aria-labelledby="whats-inside-tab-book"
            hidden={tab !== "book"}
            className={tab === "book" ? "block" : "hidden"}
          >
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {bookChapters.map(({ icon, title, description }) => (
                <li
                  key={title}
                  className="rounded-xl border border-navy/10 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex gap-4">
                    <span
                      className="flex h-12 w-12 shrink-0 items-center justify-center text-2xl"
                      aria-hidden
                    >
                      {icon}
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-heading text-lg font-semibold text-navy">
                        {title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-gray-600 md:text-[15px]">
                        {description}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div
            id="whats-inside-panel-execution"
            role="tabpanel"
            aria-labelledby="whats-inside-tab-execution"
            hidden={tab !== "execution"}
            className={tab === "execution" ? "block" : "hidden"}
          >
            <div className="rounded-2xl border border-navy/10 bg-white p-6 md:p-10 shadow-sm">
              <h3 className="font-heading text-center text-2xl font-semibold text-navy md:text-3xl">
                The 5-Level Execution Pyramid
              </h3>
              <div className="mx-auto mt-10 flex max-w-3xl flex-col items-center gap-3 md:gap-4">
                {pyramidLevels.map((level) => {
                  const isBase = level.label === "DAILY";
                  return (
                    <div
                      key={level.label}
                      className={`mx-auto rounded-lg text-center transition-transform ${level.widthClass} ${isBase ? "scale-[1.02]" : ""}`}
                    >
                      <p
                        className={`font-heading tracking-wide ${isBase ? "text-gold text-lg md:text-xl" : "font-bold text-navy"}`}
                      >
                        {level.label}
                      </p>
                      <p
                        className={`mt-1 ${isBase ? "text-white/90 font-normal md:text-base" : "font-medium text-gray-700"}`}
                      >
                        {level.summary}{" "}
                        <span
                          className={
                            isBase
                              ? "text-gold/90 block sm:inline mt-1 sm:mt-0"
                              : "text-gray-500"
                          }
                        >
                          ({level.duration})
                        </span>
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-12 border-t border-navy/10 pt-10">
                <h4 className="mb-4 text-center font-heading text-xl font-semibold text-navy">
                  What&apos;s NEW vs the original book trackers
                </h4>
                <div className="-mx-1 overflow-x-auto px-1">
                  <table className="w-full min-w-[280px] border-collapse text-left text-sm md:text-[15px]">
                    <caption className="sr-only">
                      Comparison of original book trackers and upgraded Execution
                      Section
                    </caption>
                    <thead>
                      <tr className="border-b-2 border-navy/20 bg-navy text-white">
                        <th className="rounded-tl-lg px-4 py-3 font-semibold">
                          Area
                        </th>
                        <th className="px-4 py-3 font-semibold">
                          Original Book
                        </th>
                        <th className="rounded-tr-lg px-4 py-3 font-semibold">
                          Upgraded Execution Section
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonRows.map((row, index) => (
                        <tr
                          key={row.area}
                          className={
                            index % 2 === 0 ? "bg-light/80" : "bg-white border-b border-navy/10"
                          }
                        >
                          <td className="border-b border-navy/10 px-4 py-3 font-semibold text-navy">
                            {row.area}
                          </td>
                          <td className="border-b border-navy/10 px-4 py-3 text-gray-600">
                            {row.original}
                          </td>
                          <td className="border-b border-navy/10 px-4 py-3 font-medium text-navy">
                            {row.upgraded}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
