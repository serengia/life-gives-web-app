import BlogCard from "./BlogCard";
import Pagination from "./Pagination";
import type { PostSummary } from "@/lib/db/queries";

const PAGE_SIZE = 8;

type BlogListProps = {
  posts: PostSummary[];
  total: number;
  currentPage: number;
  basePath: string;
};

export default function BlogList({
  posts,
  total,
  currentPage,
  basePath,
}: BlogListProps) {
  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        basePath={basePath}
      />
    </div>
  );
}
