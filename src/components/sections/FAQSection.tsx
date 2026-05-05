"use client";

import { ChevronRight } from "lucide-react";
import { useState } from "react";

import RevealOnScroll from "@/components/RevealOnScroll";
import { cn } from "@/lib/utils";

const focus =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy";

const faqItems = [
  {
    question: "What exactly is in The Complete Book?",
    answer:
      "The Complete Book is a physical copy of 'Life Gives You What You Settle For' which includes both the full content/principles section AND the complete Execution Section — daily trackers, weekly templates, monthly scorecards, quarterly deep-review templates, and the yearly master review. It's one book, two powerful sections.",
  },
  {
    question: "What's in the Toolkit that isn't in the book?",
    answer:
      "The Full Toolkit includes the book, plus a standalone Execution Plan Book (the tracker section printed as its own workbook so you can write in it without marking up the main book), a set of 5 laminated Quick Reference Cards, a 90-Day Launch Challenge Workbook to help you get momentum immediately, and a printable A3 Habit Streak Poster.",
  },
  {
    question: "Is this a physical book or digital?",
    answer:
      "Both options are physical products. You will receive printed, physical copies delivered to your location. Digital/PDF versions are not currently available.",
  },
  {
    question: "How does delivery work? Where do you deliver?",
    answer:
      "We currently deliver within Kenya. Delivery details and timelines will be confirmed once you place your order. Enter your location at checkout and we'll arrange delivery to you.",
  },
  {
    question:
      "I've read many self-help books and nothing has worked. Why is this different?",
    answer:
      "Most books give you inspiration without implementation. This book gives you a complete execution system — daily trackers, habit scorecards, life audits, quarterly reviews — so you don't just feel motivated after reading, you have a repeatable process to actually do the work, measure it, and improve.",
  },
  {
    question:
      "Is this relevant if I'm a student / young professional / entrepreneur?",
    answer:
      "Yes. The framework is designed for anyone with goals they haven't achieved yet. Whether you're a student building your foundation, a professional climbing your career, or an entrepreneur scaling your business — the system adapts to your goals.",
  },
  {
    question: "How do I order?",
    answer:
      "Click any 'Order Now' or 'Get the Book' button on this page. You'll be directed to a simple order form. Once submitted, we'll confirm your order via WhatsApp or email and arrange payment and delivery.",
  },
  {
    question: "Do you offer a guarantee?",
    answer:
      "Yes. If you read the book, apply the system for 30 days, and don't feel it made a meaningful difference in how you operate — reach out to us and we'll make it right. We stand behind this work.",
  },
] as const;

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  function toggle(index: number) {
    setOpenIndex((current) => (current === index ? null : index));
  }

  return (
    <section
      id="faq"
      className="bg-navy py-14 text-white md:py-20 lg:py-24"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto max-w-6xl px-6">
        <header className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
          <RevealOnScroll>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-gold">
              QUESTIONS & ANSWERS
            </p>
            <h2
              id="faq-heading"
              className="font-heading text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-[2.5rem]"
            >
              Everything You Need to Know Before You Order
            </h2>
          </RevealOnScroll>
        </header>

        <ul className="mx-auto max-w-3xl border-b border-gray-700">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            const panelId = `faq-panel-${index}`;
            const triggerId = `faq-trigger-${index}`;

            return (
              <li key={item.question} className="border-t border-gray-700">
                <h3 className="text-base font-semibold md:text-lg">
                  <button
                    type="button"
                    id={triggerId}
                    className={cn(
                      "flex min-h-11 w-full items-center gap-4 py-4 text-left transition-colors md:min-h-[3rem] md:py-5",
                      focus,
                    )}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(index)}
                  >
                    <ChevronRight
                      className={cn(
                        "h-5 w-5 shrink-0 text-gold transition-transform duration-300 ease-out",
                        isOpen && "rotate-90",
                      )}
                      strokeWidth={2.25}
                      aria-hidden
                    />
                    <span
                      className={cn(
                        "flex-1 text-white",
                        isOpen && "text-gold",
                      )}
                    >
                      {item.question}
                    </span>
                  </button>
                </h3>
                <div
                  className={cn(
                    "grid transition-[grid-template-rows] duration-300 ease-out",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                  )}
                  aria-hidden={!isOpen}
                >
                  <div className="min-h-0 overflow-hidden">
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={triggerId}
                      className={cn(
                        "border-l-2 border-transparent pb-5 pl-9 text-sm leading-relaxed text-gray-300 md:pb-6 md:text-base",
                        isOpen && "border-gold",
                      )}
                    >
                      {item.answer}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
