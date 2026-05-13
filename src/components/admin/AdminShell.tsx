"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/app/admin/actions";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="flex">
        <aside className="hidden w-56 shrink-0 border-r border-white/10 bg-navy/80 lg:block min-h-screen">
          <div className="px-6 py-5">
            <p className="font-heading text-base font-bold text-gold tracking-wider">
              ADMIN
            </p>
            <p className="text-xs text-gray-400 mt-0.5">James Serengia</p>
          </div>
          <nav className="px-3">
            <SideLink href="/admin" label="Dashboard" active={pathname === "/admin"} />
            <SideLink
              href="/admin/posts/new"
              label="New Post"
              active={pathname === "/admin/posts/new"}
            />
          </nav>
        </aside>

        <div className="flex-1 flex flex-col">
          <header className="flex items-center justify-between border-b border-white/10 bg-navy/80 px-6 py-3">
            <Link
              href="/admin"
              className="font-heading text-sm font-bold text-gold lg:hidden"
            >
              ADMIN
            </Link>
            <div className="flex items-center gap-4 ml-auto">
              <Link
                href="/"
                className="text-xs text-gray-400 hover:text-white transition-colors"
              >
                ← View Site
              </Link>
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="text-xs text-gray-400 hover:text-white transition-colors"
                >
                  Log out
                </button>
              </form>
            </div>
          </header>
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}

function SideLink({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`block px-3 py-2 rounded-md text-sm mb-1 transition-colors ${
        active
          ? "bg-gold/20 text-gold"
          : "text-gray-300 hover:bg-white/5 hover:text-white"
      }`}
    >
      {label}
    </Link>
  );
}
