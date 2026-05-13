import type { Metadata } from "next";
import { getPublishedPosts } from "@/lib/db/queries";
import BlogList from "@/components/blog/BlogList";
import { SITE_META } from "@/lib/constants";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: `Blog | James Serengia`,
  description:
    "Practical insights on personal development, goal execution, and building your best life — by James Serengia.",
  keywords: [...SITE_META.keywords],
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = Math.max(1, parseInt(searchParams.page ?? "1", 10));
  const { posts, total } = await getPublishedPosts(page);

  return (
    <div className="bg-navy min-h-screen text-white section-padding">
      <div className="container-max">
        <div className="mb-12 text-center">
          <h1 className="font-heading text-4xl font-bold text-white sm:text-5xl">
            Blog
          </h1>
          <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
            Practical insights on personal development, goal execution, and
            building your best life.
          </p>
        </div>
        {posts.length === 0 ? (
          <p className="text-center text-gray-400">
            No posts yet. Check back soon.
          </p>
        ) : (
          <BlogList
            posts={posts}
            total={total}
            currentPage={page}
            basePath="/blog"
          />
        )}
      </div>
    </div>
  );
}
