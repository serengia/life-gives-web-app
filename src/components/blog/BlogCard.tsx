import Link from "next/link";
import { format } from "date-fns";
import TagPill from "./TagPill";
import RevealOnScroll from "@/components/RevealOnScroll";
import type { PostSummary } from "@/lib/db/queries";

export default function BlogCard({ post }: { post: PostSummary }) {
  return (
    <RevealOnScroll>
      <article className="group rounded-xl border border-white/10 bg-white/[0.03] overflow-hidden hover:border-gold/40 transition-all duration-300 flex flex-col h-full">
        {post.coverImageUrl && (
          <div className="relative aspect-[16/9] overflow-hidden shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.coverImageUrl}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}
        <div className="p-5 flex flex-col flex-1">
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {post.tags.map((tag) => (
                <TagPill key={tag.slug} slug={tag.slug} name={tag.name} />
              ))}
            </div>
          )}
          <h2 className="font-heading text-lg font-semibold text-white group-hover:text-gold transition-colors leading-snug mb-2">
            <Link
              href={`/blog/${post.slug}`}
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
            >
              {post.title}
            </Link>
          </h2>
          <p className="text-sm text-gray-300 line-clamp-2 mb-4 flex-1">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between text-xs text-gray-400 mt-auto">
            <span>
              {post.publishedAt
                ? format(new Date(post.publishedAt), "MMM d, yyyy")
                : ""}
            </span>
            <span>{post.readingTimeMin} min read</span>
          </div>
        </div>
      </article>
    </RevealOnScroll>
  );
}
