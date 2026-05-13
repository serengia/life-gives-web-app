import { getPublishedPosts } from "@/lib/db/queries";
import { AUTHOR, SITE_META } from "@/lib/constants";

export const dynamic = "force-dynamic";

export async function GET() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://jamesserengia.com";
  const { posts } = await getPublishedPosts(1);

  const items = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${siteUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${siteUrl}/blog/${post.slug}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${post.publishedAt ? new Date(post.publishedAt).toUTCString() : ""}</pubDate>
      <author>hello@jamesserengia.com (${AUTHOR.name})</author>
    </item>`
    )
    .join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title><![CDATA[${AUTHOR.name} — Blog]]></title>
    <link>${siteUrl}/blog</link>
    <description><![CDATA[${SITE_META.description}]]></description>
    <language>en</language>
    <atom:link href="${siteUrl}/blog/feed.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
