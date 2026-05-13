export type Product = {
  id: string;
  name: string;
  priceKsh: number;
  priceLabel: string;
  description: string;
  features: string[];
  badge?: string;
};

export const PRODUCTS: Product[] = [
  {
    id: "complete-book",
    name: "The Complete Book",
    priceKsh: 2000,
    priceLabel: "Ksh 2,000",
    description:
      "The full book — Life Gives You What You Settle For — bundled with the complete Execution Section: daily, weekly, monthly, quarterly, and yearly trackers.",
    features: [
      "Full content book by James Serengia",
      "Daily, weekly, monthly, quarterly, yearly trackers",
      "Life Audit Framework",
      "Ready-to-use execution templates",
    ],
    badge: "MOST POPULAR",
  },
  {
    id: "full-toolkit",
    name: "The Full Toolkit",
    priceKsh: 5000,
    priceLabel: "Ksh 5,000",
    description:
      "Everything you need to actually execute on the blueprint: a condensed content book, a standalone Execution Plan Book, a laminated Quick Reference Card Set, and the 90-Day Launch Challenge Workbook.",
    features: [
      "Condensed content book",
      "Execution Plan Book (standalone)",
      "Quick Reference Laminated Card Set",
      "90-Day Launch Challenge Workbook",
    ],
    badge: "BEST VALUE",
  },
];

/** WhatsApp business number (digits only, no +), used for wa.me links. */
// TODO: Replace with production WhatsApp business number (digits only) — verify wa.me
export const WHATSAPP_BUSINESS_E164 = "254701534450";

export const AUTHOR = {
  name: "James Serengia",
  tagline: "Author · Personal Development Coach · Practitioner",
} as const;

export const SITE_META = {
  title:
    "Life Gives You What You Settle For | James Serengia — Personal Development Book",
  description:
    "Stop drifting. Start executing. James Serengia's complete personal development blueprint gives you the mindset, the plan, and a 5-level execution system to build your best life. Available in Kenya.",
  keywords: [
    "personal development Kenya",
    "self help book Kenya",
    "life goals tracker",
    "James Serengia",
    "execution system",
    "habit tracker Kenya",
  ],
} as const;

export const NAV_LINKS = [
  { label: "The Book", href: "#home" },
  { label: "Why It Works", href: "#problem" },
  { label: "What's Inside", href: "#inside" },
  { label: "About", href: "#author" },
  { label: "Blog", href: "/blog" },
] as const;
