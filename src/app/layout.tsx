import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { SITE_META } from "@/lib/constants";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://jamesserengia.com",
  ),
  title: SITE_META.title,
  description: SITE_META.description,
  keywords: [...SITE_META.keywords],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://jamesserengia.com",
  },
  openGraph: {
    title: SITE_META.title,
    description: SITE_META.description,
    type: "website",
    locale: "en_KE",
    siteName: "James Serengia",
    images: [
      {
        url: "/book-cover-spread.jpg",
        width: 2000,
        height: 1334,
        alt: SITE_META.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_META.title,
    description: SITE_META.description,
    images: ["/book-cover-spread.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} bg-navy`}
    >
      <body className="bg-navy font-body antialiased">
        <main>{children}</main>
      </body>
    </html>
  );
}
