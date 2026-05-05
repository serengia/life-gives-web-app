"use client";

import { ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";

const focus =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy";

export default function FloatingOrderButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function heroBottom(): number {
      const hero = document.getElementById("home");
      return hero?.offsetHeight ?? window.innerHeight;
    }

    function sync() {
      setVisible(window.scrollY > heroBottom() - 48);
    }

    sync();
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync, { passive: true });
    return () => {
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, []);

  return (
    <a
      href="#order"
      aria-label="Order now"
      className={`fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gold text-white shadow-lg transition-opacity duration-200 hover:bg-amber-600 md:hidden ${focus} ${visible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
    >
      <ShoppingBag className="h-6 w-6" aria-hidden strokeWidth={2} />
    </a>
  );
}
