import { and, desc, eq, inArray, sql } from "drizzle-orm";
import { db } from "./client";
import { posts, tags, postTags } from "./schema";

const PAGE_SIZE = 8;

export type PostSummary = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  coverImageUrl: string | null;
  readingTimeMin: number;
  publishedAt: Date | null;
  updatedAt: Date;
  tags: { slug: string; name: string }[];
};

export type PostFull = PostSummary & { content: string };

export type AdminPost = {
  id: number;
  slug: string;
  title: string;
  status: "draft" | "published" | "archived";
  publishedAt: Date | null;
  updatedAt: Date;
  tags: { id: number; slug: string; name: string }[];
};

async function withTags(
  postRows: (typeof posts.$inferSelect)[]
): Promise<PostSummary[]> {
  if (postRows.length === 0) return [];
  const postIds = postRows.map((p) => p.id);
  const tagRows = await db
    .select({
      postId: postTags.postId,
      slug: tags.slug,
      name: tags.name,
    })
    .from(postTags)
    .innerJoin(tags, eq(postTags.tagId, tags.id))
    .where(inArray(postTags.postId, postIds));

  const tagMap = new Map<number, { slug: string; name: string }[]>();
  for (const row of tagRows) {
    const arr = tagMap.get(row.postId) ?? [];
    arr.push({ slug: row.slug, name: row.name });
    tagMap.set(row.postId, arr);
  }

  return postRows.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    coverImageUrl: p.coverImageUrl,
    readingTimeMin: p.readingTimeMin,
    publishedAt: p.publishedAt,
    updatedAt: p.updatedAt,
    tags: tagMap.get(p.id) ?? [],
  }));
}

export async function getPublishedPosts(
  page = 1
): Promise<{ posts: PostSummary[]; total: number }> {
  const offset = (page - 1) * PAGE_SIZE;
  const [postRows, countRow] = await Promise.all([
    db
      .select()
      .from(posts)
      .where(eq(posts.status, "published"))
      .orderBy(desc(posts.publishedAt))
      .limit(PAGE_SIZE)
      .offset(offset),
    db
      .select({ count: sql<number>`cast(count(*) as int)` })
      .from(posts)
      .where(eq(posts.status, "published")),
  ]);
  const summaries = await withTags(postRows);
  return { posts: summaries, total: countRow[0]?.count ?? 0 };
}

export async function getPostBySlug(slug: string): Promise<PostFull | null> {
  const rows = await db
    .select()
    .from(posts)
    .where(and(eq(posts.slug, slug), eq(posts.status, "published")))
    .limit(1);
  if (!rows[0]) return null;
  const [summary] = await withTags([rows[0]]);
  return { ...summary, content: rows[0].content };
}

export async function getAllPostsAdmin(): Promise<AdminPost[]> {
  const postRows = await db
    .select()
    .from(posts)
    .orderBy(desc(posts.updatedAt));
  if (postRows.length === 0) return [];
  const postIds = postRows.map((p) => p.id);
  const tagRows = await db
    .select({
      postId: postTags.postId,
      id: tags.id,
      slug: tags.slug,
      name: tags.name,
    })
    .from(postTags)
    .innerJoin(tags, eq(postTags.tagId, tags.id))
    .where(inArray(postTags.postId, postIds));

  const tagMap = new Map<number, { id: number; slug: string; name: string }[]>();
  for (const row of tagRows) {
    const arr = tagMap.get(row.postId) ?? [];
    arr.push({ id: row.id, slug: row.slug, name: row.name });
    tagMap.set(row.postId, arr);
  }

  return postRows.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    status: p.status,
    publishedAt: p.publishedAt,
    updatedAt: p.updatedAt,
    tags: tagMap.get(p.id) ?? [],
  }));
}

export async function getAllTags() {
  return db.select().from(tags).orderBy(tags.name);
}

export async function getPostsByTag(
  tagSlug: string,
  page = 1
): Promise<{
  posts: PostSummary[];
  total: number;
  tag: { slug: string; name: string } | null;
}> {
  const tagRow = await db
    .select()
    .from(tags)
    .where(eq(tags.slug, tagSlug))
    .limit(1);
  if (!tagRow[0]) return { posts: [], total: 0, tag: null };

  const offset = (page - 1) * PAGE_SIZE;
  const [postRows, countRow] = await Promise.all([
    db
      .select({ posts })
      .from(posts)
      .innerJoin(postTags, eq(postTags.postId, posts.id))
      .where(
        and(
          eq(postTags.tagId, tagRow[0].id),
          eq(posts.status, "published")
        )
      )
      .orderBy(desc(posts.publishedAt))
      .limit(PAGE_SIZE)
      .offset(offset)
      .then((rows) => rows.map((r) => r.posts)),
    db
      .select({ count: sql<number>`cast(count(*) as int)` })
      .from(posts)
      .innerJoin(postTags, eq(postTags.postId, posts.id))
      .where(
        and(eq(postTags.tagId, tagRow[0].id), eq(posts.status, "published"))
      ),
  ]);

  const summaries = await withTags(postRows);
  return {
    posts: summaries,
    total: countRow[0]?.count ?? 0,
    tag: { slug: tagRow[0].slug, name: tagRow[0].name },
  };
}

export async function getPostByIdAdmin(id: number) {
  const rows = await db
    .select()
    .from(posts)
    .where(eq(posts.id, id))
    .limit(1);
  if (!rows[0]) return null;
  const tagRows = await db
    .select({ id: tags.id, slug: tags.slug, name: tags.name })
    .from(postTags)
    .innerJoin(tags, eq(postTags.tagId, tags.id))
    .where(eq(postTags.postId, id));
  return { ...rows[0], tags: tagRows };
}

export async function getPostCount() {
  const rows = await db
    .select({ count: sql<number>`cast(count(*) as int)` })
    .from(posts)
    .where(eq(posts.status, "published"));
  return rows[0]?.count ?? 0;
}
