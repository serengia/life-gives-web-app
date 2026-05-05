import { Check } from "lucide-react";

import OrderFormSection from "@/components/sections/OrderFormSection";
import RevealOnScroll from "@/components/RevealOnScroll";
import { PRODUCTS, WHATSAPP_BUSINESS_E164 } from "@/lib/constants";

const focus =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-[#1e293b]";

function whatsappUrl(message: string) {
  return `https://wa.me/${WHATSAPP_BUSINESS_E164}?text=${encodeURIComponent(message)}`;
}

const [completeBook, fullToolkit] = PRODUCTS;

export default function OrderSection() {
  const bookBullets = completeBook.features.slice(0, 3);
  const toolkitBullets = fullToolkit.features.slice(0, 3);

  return (
    <section
      id="order"
      className="bg-gradient-to-b from-navy to-[#1e293b] py-14 text-white md:py-20 lg:py-24"
      aria-labelledby="order-heading"
    >
      <div className="mx-auto max-w-6xl px-6">
        <header className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
          <RevealOnScroll>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-gold">
              READY TO START?
            </p>
            <h2
              id="order-heading"
              className="font-heading text-3xl font-semibold leading-tight text-white sm:text-5xl md:text-6xl"
            >
              Life Gives You What You Settle For.
            </h2>
            <p className="mt-4 font-heading text-xl italic text-gold">
              What are you settling for right now?
            </p>
            <p className="mx-auto mt-6 max-w-xl text-center text-gray-300">
              This is your moment. Not next Monday. Not January. Now. Pick the
              option that fits and let&apos;s get to work.
            </p>
          </RevealOnScroll>
        </header>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
          <article className="flex flex-col rounded-2xl border border-white/15 bg-navy/50 p-6 shadow-lg backdrop-blur-sm md:p-8">
            <h3 className="font-heading text-2xl font-semibold text-white">
              {completeBook.name}
            </h3>
            <p className="mt-4 font-heading text-4xl font-semibold text-white">
              {completeBook.priceLabel}
            </p>
            <ul className="mb-8 mt-6 flex flex-1 flex-col gap-2.5 text-sm text-gray-200 md:text-base">
              {bookBullets.map((line) => (
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
              href={whatsappUrl(
                `Hello! I'd like to order: ${completeBook.name} (${completeBook.priceLabel}).`,
              )}
              className={`inline-flex w-full items-center justify-center rounded-lg border-2 border-gold bg-transparent px-6 py-3.5 text-center text-sm font-bold text-gold transition-colors hover:bg-gold hover:text-white md:w-auto ${focus}`}
            >
              Order Now
            </a>
          </article>

          <article className="relative flex flex-col rounded-2xl border border-gold/50 bg-gold p-6 shadow-xl md:p-8">
            <span className="absolute right-4 top-4 rounded-md bg-navy px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-gold md:right-5 md:top-5">
              BEST VALUE
            </span>
            <h3 className="pr-20 font-heading text-2xl font-semibold text-navy md:pr-24">
              {fullToolkit.name}
            </h3>
            <p className="mt-4 font-heading text-4xl font-semibold text-navy">
              {fullToolkit.priceLabel}
            </p>
            <ul className="mb-8 mt-6 flex flex-1 flex-col gap-2.5 text-sm text-navy/90 md:text-base">
              {toolkitBullets.map((line) => (
                <li key={line} className="flex gap-3">
                  <Check
                    className="mt-0.5 h-5 w-5 shrink-0 text-navy"
                    strokeWidth={2.5}
                    aria-hidden
                  />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <a
              href={whatsappUrl(
                `Hello! I'd like to order: ${fullToolkit.name} (${fullToolkit.priceLabel}).`,
              )}
              className={`inline-flex w-full items-center justify-center rounded-lg bg-navy px-6 py-3.5 text-center text-sm font-bold text-white shadow-md transition-colors hover:bg-navy/90 md:w-auto ${focus}`}
            >
              Order the Toolkit
            </a>
          </article>
        </div>

        <div className="mt-14">
          <OrderFormSection />
        </div>

        <p className="mt-10 text-center text-sm text-gray-300 md:text-base">
          📦 Physical copy · Kenya delivery · 30-day guarantee
        </p>

        <div className="mt-8 flex justify-center px-1">
          <a
            href={`https://wa.me/${WHATSAPP_BUSINESS_E164}`}
            className={`inline-flex w-full max-w-md items-center justify-center gap-2 rounded-lg bg-green-600 px-6 py-3.5 text-sm font-bold text-white shadow-md transition-colors hover:bg-green-700 sm:w-auto ${focus} focus-visible:ring-offset-[#1e293b]`}
          >
            💬 Have questions? Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
