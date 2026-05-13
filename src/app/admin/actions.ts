"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db/client";
import { posts, tags, postTags } from "@/lib/db/schema";
import {
  signSession,
  verifyPassword,
  setSessionCookie,
  clearSessionCookie,
} from "@/lib/auth";
import { computeReadingTime } from "@/lib/blog/readingTime";
import { eq, inArray } from "drizzle-orm";
import slugify from "slug";

function revalidateAll() {
  revalidatePath("/blog");
  revalidatePath("/blog/[slug]", "page");
  revalidatePath("/blog/tag/[tag]", "page");
  revalidatePath("/sitemap.xml");
}

export async function loginAction(formData: FormData) {
  const password = formData.get("password") as string;
  const next = (formData.get("next") as string) || "/admin";
  if (!verifyPassword(password)) {
    redirect(`/admin/login?error=invalid&next=${encodeURIComponent(next)}`);
  }
  const token = await signSession({});
  await setSessionCookie(token);
  redirect(next);
}

export async function logoutAction() {
  await clearSessionCookie();
  redirect("/admin/login");
}

async function syncTags(postId: number, tagNames: string[]) {
  await db.delete(postTags).where(eq(postTags.postId, postId));
  if (tagNames.length === 0) return;

  const tagData = tagNames.map((name) => ({
    slug: slugify(name, { lower: true }),
    name,
  }));
  await db.insert(tags).values(tagData).onConflictDoNothing();
  const tagRows = await db
    .select()
    .from(tags)
    .where(inArray(tags.slug, tagData.map((t) => t.slug)));

  if (tagRows.length > 0) {
    await db
      .insert(postTags)
      .values(tagRows.map((t) => ({ postId, tagId: t.id })))
      .onConflictDoNothing();
  }
}

export async function createPost(formData: FormData) {
  const title = formData.get("title") as string;
  const rawSlug = formData.get("slug") as string;
  const excerpt = formData.get("excerpt") as string;
  const content = formData.get("content") as string;
  const coverImageUrl = (formData.get("coverImageUrl") as string) || null;
  const tagNamesRaw = formData.get("tagNames") as string;
  const tagNames = tagNamesRaw
    ? tagNamesRaw
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
    : [];
  const slug = rawSlug || slugify(title, { lower: true });
  const readingTimeMin = computeReadingTime(content);

  const [post] = await db
    .insert(posts)
    .values({
      title,
      slug,
      excerpt,
      content,
      coverImageUrl,
      readingTimeMin,
      status: "draft",
    })
    .returning();
  await syncTags(post.id, tagNames);
  revalidateAll();
  redirect(`/admin/posts/${post.id}/edit`);
}

export async function updatePost(id: number, formData: FormData) {
  const title = formData.get("title") as string;
  const rawSlug = formData.get("slug") as string;
  const excerpt = formData.get("excerpt") as string;
  const content = formData.get("content") as string;
  const coverImageUrl = (formData.get("coverImageUrl") as string) || null;
  const tagNamesRaw = formData.get("tagNames") as string;
  const tagNames = tagNamesRaw
    ? tagNamesRaw
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
    : [];
  const readingTimeMin = computeReadingTime(content);

  const existing = await db
    .select({ status: posts.status, slug: posts.slug })
    .from(posts)
    .where(eq(posts.id, id))
    .limit(1);
  if (!existing[0]) return { error: "Post not found" };

  const slug =
    existing[0].status === "published"
      ? existing[0].slug
      : rawSlug || slugify(title, { lower: true });

  await db
    .update(posts)
    .set({ title, slug, excerpt, content, coverImageUrl, readingTimeMin, updatedAt: new Date() })
    .where(eq(posts.id, id));
  await syncTags(id, tagNames);
  revalidateAll();
  return { success: true };
}

export async function publishPost(id: number) {
  await db
    .update(posts)
    .set({ status: "published", publishedAt: new Date(), updatedAt: new Date() })
    .where(eq(posts.id, id));
  revalidateAll();
}

export async function unpublishPost(id: number) {
  await db
    .update(posts)
    .set({ status: "draft", updatedAt: new Date() })
    .where(eq(posts.id, id));
  revalidateAll();
}

export async function archivePost(id: number) {
  await db
    .update(posts)
    .set({ status: "archived", updatedAt: new Date() })
    .where(eq(posts.id, id));
  revalidateAll();
}

export async function deletePostHard(id: number, confirmToken: string) {
  if (confirmToken !== "DELETE") return { error: "Confirm with DELETE" };
  await db.delete(posts).where(eq(posts.id, id));
  revalidateAll();
  redirect("/admin");
}
