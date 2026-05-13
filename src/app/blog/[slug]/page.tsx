import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { getPostBySlug, getPublishedPosts } from "@/lib/db/queries";
import BlogPostBody from "@/components/blog/BlogPostBody";
import TagPill from "@/components/blog/TagPill";
import { AUTHOR } from "@/lib/constants";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://jamesserengia.com";

export async function generateStaticParams() {
  const { posts } = await getPublishedPosts(1);
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return {};
  const ogImageUrl = `${SITE_URL}/blog/${params.slug}/opengraph-image`;
  return {
    title: `${post.title} | James Serengia`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt?.toISOString(),
      modifiedTime: post.updatedAt?.toISOString(),
      authors: [AUTHOR.name],
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [ogImageUrl],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    author: { "@type": "Person", name: AUTHOR.name },
    datePublished: post.publishedAt?.toISOString(),
    dateModified: post.updatedAt?.toISOString(),
    image: post.coverImageUrl ?? `${SITE_URL}/book-cover.jpg`,
    publisher: {
      "@type": "Organization",
      name: "James Serengia",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/book-cover.jpg`,
      },
    },
  };

  return (
    <article className="bg-navy min-h-screen text-white">
      <div className="container-max section-padding">
        <div className="max-w-3xl mx-auto">
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <TagPill key={tag.slug} slug={tag.slug} name={tag.name} />
              ))}
            </div>
          )}
          <h1 className="font-heading text-3xl font-bold text-white sm:text-4xl md:text-5xl leading-tight mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-400 mb-8 pb-8 border-b border-white/10 flex-wrap">
            <span>{AUTHOR.name}</span>
            {post.publishedAt && (
              <span>{format(new Date(post.publishedAt), "MMMM d, yyyy")}</span>
            )}
            <span>{post.readingTimeMin} min read</span>
          </div>
          {post.coverImageUrl && (
            <div className="mb-8 rounded-xl overflow-hidden aspect-[16/9] relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.coverImageUrl}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <BlogPostBody content={post.content} />
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </article>
  );
}
