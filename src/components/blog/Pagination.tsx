import Link from "next/link";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  basePath: string;
};

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-center gap-2 mt-12"
    >
      {currentPage > 1 && (
        <Link
          href={
            currentPage === 2 ? basePath : `${basePath}?page=${currentPage - 1}`
          }
          className="px-4 py-2 rounded-md border border-white/10 text-sm text-gray-300 hover:border-gold/40 hover:text-gold transition-colors"
        >
          ← Previous
        </Link>
      )}
      <span className="text-sm text-gray-400 px-4">
        Page {currentPage} of {totalPages}
      </span>
      {currentPage < totalPages && (
        <Link
          href={`${basePath}?page=${currentPage + 1}`}
          className="px-4 py-2 rounded-md border border-white/10 text-sm text-gray-300 hover:border-gold/40 hover:text-gold transition-colors"
        >
          Next →
        </Link>
      )}
    </nav>
  );
}
