import RevealOnScroll from "@/components/RevealOnScroll";
import { AUTHOR } from "@/lib/constants";

const linkFocus =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-white md:focus-visible:ring-offset-light";

const badges = [
  { label: "📖 Author" },
  { label: "🎯 Coach" },
  { label: "🇰🇪 Nairobi, Kenya" },
] as const;

export default function AuthorSection() {
  return (
    <section
      id="author"
      className="bg-white py-14 text-navy md:bg-light md:py-20 lg:py-24"
      aria-labelledby="author-heading"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="mx-auto w-full max-w-[400px] lg:col-span-5 lg:mx-0">
            {/* TODO: Replace with actual author headshot — recommended: 600x700px JPG, professional, light background */}
            {/* When replacing: use next/image with width/height; loading="lazy" for below-fold is fine */}
            <div
              className="flex aspect-[4/5] w-full flex-col items-center justify-center border-2 border-gold bg-navy px-6 text-center"
              role="img"
              aria-label="Author photo placeholder for James Serengia"
            >
              <p className="font-heading text-lg font-semibold tracking-wide text-white sm:text-xl">
                {AUTHOR.name.toUpperCase()}
              </p>
              <p className="mt-2 text-sm text-gray-400">Author Photo</p>
            </div>
            <div className="mt-5 flex flex-wrap justify-center gap-2 lg:justify-start">
              {badges.map((b) => (
                <span
                  key={b.label}
                  className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm"
                >
                  {b.label}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <RevealOnScroll>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-gold">
                ABOUT THE AUTHOR
              </p>
              <h2
                id="author-heading"
                className="font-heading text-3xl font-semibold leading-tight text-navy sm:text-4xl"
              >
                {AUTHOR.name}
              </h2>
              <p className="mt-2 text-lg italic text-amber-600">
                {AUTHOR.tagline}
              </p>
            </RevealOnScroll>

            <div className="mt-6 space-y-4 text-base leading-relaxed text-gray-700">
              <p>
                James Serengia is not a theorist. He is a practitioner —
                someone who has lived the principles in this book, tested every
                framework, and refined the execution system through years of
                real-world application.
              </p>
              <p>
                He wrote &apos;Life Gives You What You Settle For&apos; because
                he got tired of watching talented, intelligent people drift
                through life — not because they lacked potential, but because
                they lacked a system. This book is that system.
              </p>
              <p>
                His message is simple and uncompromising: Stop settling for a
                version of your life that you know is below your capability.
                You were built for more. Now go build it.
              </p>
            </div>

            <blockquote className="mt-8 border-l-4 border-gold py-1 pl-5 text-base italic text-gray-700">
              <p>
                &quot;I am not a self-made man. I was shaped by pain, by
                mentors, by books, and by every goal I almost quit on. This book
                is everything I wish I had at 25.&quot;
              </p>
              <footer className="mt-3 not-italic text-sm font-medium text-navy">
                — {AUTHOR.name}
              </footer>
            </blockquote>

            <a
              href="#pricing"
              className={`mt-8 inline-flex w-full items-center justify-center rounded-lg bg-gold px-6 py-3 text-center text-sm font-bold text-white shadow-md transition-colors hover:bg-amber-600 md:w-auto ${linkFocus}`}
            >
              Read the Book
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
