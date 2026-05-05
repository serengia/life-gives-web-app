const linkFocus =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-[#080f1a] rounded-sm";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "About the Book", href: "#book" },
  { label: "What's Inside", href: "#inside" },
  { label: "Pricing", href: "#pricing" },
  { label: "About the Author", href: "#author" },
  { label: "FAQ", href: "#faq" },
  { label: "Order Now", href: "#order" },
] as const;

// TODO: Replace with real social profile URLs (Instagram, X, Facebook, YouTube)
const socials = [
  { label: "Instagram", abbr: "[IG]", href: "#home" },
  { label: "Twitter/X", abbr: "[TW]", href: "#home" },
  { label: "Facebook", abbr: "[FB]", href: "#home" },
  { label: "YouTube", abbr: "[YT]", href: "#home" },
] as const;

export default function Footer() {
  return (
    <footer className="bg-[#080f1a] py-12 text-white md:py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-10">
          <div>
            <p className="font-heading text-xl font-bold tracking-wider text-gold md:text-2xl">
              JAMES SERENGIA
            </p>
            <p className="mt-2 text-sm text-gray-400">
              Author · Coach · Practitioner
            </p>
            <p className="mt-4 text-sm leading-relaxed text-gray-300">
              Helping ambitious Kenyans stop settling and start building their
              best life.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 text-sm">
              {socials.map(({ label, abbr, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={`Follow on ${label}`}
                  className={`text-gray-400 transition-colors hover:text-gold ${linkFocus}`}
                >
                  {abbr}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-heading text-lg font-semibold text-white">
              Quick Links
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm text-gray-300">
              {quickLinks.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    className={`transition-colors hover:text-gold ${linkFocus}`}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-lg font-semibold text-white">
              Get in Touch
            </h3>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-gray-300">
              {/* TODO: Replace placeholder email with real contact email */}
              <li>
                <a
                  href="mailto:hello@jamesserengia.com"
                  className={`transition-colors hover:text-gold ${linkFocus}`}
                >
                  📧 hello@jamesserengia.com
                </a>
              </li>
              {/* TODO: Replace with actual WhatsApp number */}
              <li>📱 WhatsApp: +254 XXX XXX XXX</li>
              <li>📍 Nairobi, Kenya</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-center text-xs text-gray-500 md:flex-row md:text-left">
            <p>© 2026 James Serengia. All rights reserved.</p>
            <p className="font-medium text-gray-400">
              LIFE GIVES YOU WHAT YOU SETTLE FOR™
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
