import { Star } from "lucide-react";

import RevealOnScroll from "@/components/RevealOnScroll";

// TODO: Replace placeholder testimonials with real customer reviews
const placeholders = [
  {
    quote:
      "I've read dozens of self-help books and they all left me feeling motivated but lost. This one handed me a system. Week 3 and I've already tracked more progress than all of last year.",
    name: "M. Wanjiku",
    descriptor: "Entrepreneur, Nairobi",
    initials: "MW",
    avatarBg: "bg-teal-600",
  },
  {
    quote:
      "The Quarterly Review template alone is worth the price. I sat down for 2 hours at the end of Q1 and had more clarity about my life than I've had in years.",
    name: "D. Otieno",
    descriptor: "Engineer, Mombasa",
    initials: "DO",
    avatarBg: "bg-sky-600",
  },
  {
    quote:
      "I bought the toolkit and gave it to my team at work. The execution system changed how we run our weekly reviews. Highly recommend the full toolkit.",
    name: "C. Mutua",
    descriptor: "Team Lead, Kisumu",
    initials: "CM",
    avatarBg: "bg-violet-600",
  },
] as const;

const stats = [
  { label: "5-Level", detail: "Execution System" },
  { label: "8 Areas", detail: "Of Life Tracked" },
  { label: "365 Days", detail: "Of Structure" },
] as const;

function StarRating() {
  return (
    <div className="flex gap-0.5" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="h-4 w-4 fill-amber-500 text-amber-500"
          strokeWidth={0}
          aria-hidden
        />
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="bg-white py-14 text-navy md:py-20 lg:py-24"
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto max-w-6xl px-6">
        <header className="mx-auto mb-12 max-w-3xl text-center md:mb-14">
          <RevealOnScroll>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-gold">
              WHAT READERS SAY
            </p>
            <h2
              id="testimonials-heading"
              className="font-heading text-3xl font-semibold leading-tight text-navy sm:text-4xl md:text-[2.5rem]"
            >
              Real People. Real Results.
            </h2>
            <p className="mt-4 text-base text-gray-600 md:text-lg">
              Join the growing community of Kenyans who stopped drifting and
              started executing.
            </p>
          </RevealOnScroll>
        </header>

        <div
          className="mb-12 rounded-xl border-y border-gray-100 bg-light py-8 md:py-10"
          role="presentation"
        >
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-heading text-2xl font-semibold text-navy sm:text-3xl">
                  {s.label}
                </p>
                <p className="mt-1 text-sm text-gray-600 sm:text-base">
                  {s.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: horizontal scroll; md+: grid */}
        <div className="-mx-6 px-6 md:mx-0 md:px-0">
          <div className="flex gap-6 overflow-x-auto pb-2 snap-x snap-mandatory md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:pb-0 md:snap-none">
            {placeholders.map((item) => (
              <article
                key={item.name}
                className="min-w-[min(100%,20rem)] max-w-[20rem] flex-shrink-0 snap-center rounded-2xl border-t-4 border-amber-500 bg-white p-6 shadow-md md:min-w-0 md:max-w-none md:p-7"
              >
                <blockquote className="italic text-gray-700">
                  <p>&ldquo;{item.quote}&rdquo;</p>
                </blockquote>

                <div className="mt-5 mb-4">
                  <StarRating />
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-bold text-white text-sm ${item.avatarBg}`}
                    aria-hidden
                  >
                    {item.initials}
                  </span>
                  <div>
                    <p className="font-bold text-navy">{item.name}</p>
                    <p className="text-sm text-gray-600">{item.descriptor}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
