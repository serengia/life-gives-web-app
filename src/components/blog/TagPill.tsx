import Link from "next/link";

export default function TagPill({
  slug,
  name,
  active,
}: {
  slug: string;
  name: string;
  active?: boolean;
}) {
  return (
    <Link
      href={`/blog/tag/${slug}`}
      className={`inline-block rounded-full px-3 py-1 text-xs font-medium transition-colors ${
        active
          ? "bg-gold text-white"
          : "border border-gold/40 text-gold/80 hover:bg-gold/10 hover:text-gold"
      }`}
    >
      {name}
    </Link>
  );
}
