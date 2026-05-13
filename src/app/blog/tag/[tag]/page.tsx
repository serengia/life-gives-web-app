import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostsByTag } from "@/lib/db/queries";
import BlogList from "@/components/blog/BlogList";

export const dynamic = "force-static";

export async function generateMetadata({
  params,
}: {
  params: { tag: string };
}): Promise<Metadata> {
  const { tag: tagData } = await getPostsByTag(params.tag);
  if (!tagData) return {};
  return {
    title: `${tagData.name} | Blog | James Serengia`,
    description: `All posts tagged "${tagData.name}" by James Serengia.`,
  };
}

export default async function TagPage({
  params,
  searchParams,
}: {
  params: { tag: string };
  searchParams: { page?: string };
}) {
  const page = Math.max(1, parseInt(searchParams.page ?? "1", 10));
  const { posts, total, tag: tagData } = await getPostsByTag(params.tag, page);
  if (!tagData) notFound();

  return (
    <div className="bg-navy min-h-screen text-white section-padding">
      <div className="container-max">
        <div className="mb-12">
          <p className="text-sm text-gold mb-2 uppercase tracking-wide font-medium">
            Tag
          </p>
          <h1 className="font-heading text-4xl font-bold text-white sm:text-5xl">
            {tagData.name}
          </h1>
          <p className="mt-3 text-gray-400">
            {total} post{total !== 1 ? "s" : ""}
          </p>
        </div>
        {posts.length === 0 ? (
          <p className="text-gray-400">No posts found.</p>
        ) : (
          <BlogList
            posts={posts}
            total={total}
            currentPage={page}
            basePath={`/blog/tag/${params.tag}`}
          />
        )}
      </div>
    </div>
  );
}
