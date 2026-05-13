import Footer from "@/components/sections/Footer";
import SiteHeader from "@/components/SiteHeader";
import { NAV_LINKS } from "@/lib/constants";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader links={NAV_LINKS} variant="solid" hrefPrefix="/" />
      <main>{children}</main>
      <Footer hrefPrefix="/" />
    </>
  );
}
