import { notFound } from "next/navigation";
import PostForm from "@/components/admin/PostForm";
import { getPostByIdAdmin, getAllTags } from "@/lib/db/queries";
import { publishPost, unpublishPost, archivePost } from "@/app/admin/actions";

export default async function EditPostPage({
  params,
}: {
  params: { id: string };
}) {
  const [post, allTags] = await Promise.all([
    getPostByIdAdmin(Number(params.id)),
    getAllTags(),
  ]);
  if (!post) notFound();

  return (
    <div>
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <h1 className="font-heading text-2xl font-bold text-white">
          Edit Post
        </h1>
        <div className="flex items-center gap-3 flex-wrap">
          {post.status !== "published" && (
            <form action={publishPost.bind(null, post.id)}>
              <button type="submit" className="btn-gold text-sm px-4 py-2">
                Publish
              </button>
            </form>
          )}
          {post.status === "published" && (
            <>
              <a
                href={`/blog/${post.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-400 hover:underline"
              >
                View live ↗
              </a>
              <form action={unpublishPost.bind(null, post.id)}>
                <button
                  type="submit"
                  className="text-sm text-yellow-400 hover:underline"
                >
                  Unpublish
                </button>
              </form>
            </>
          )}
          {post.status !== "archived" && (
            <form action={archivePost.bind(null, post.id)}>
              <button
                type="submit"
                className="text-sm text-gray-400 hover:underline"
              >
                Archive
              </button>
            </form>
          )}
        </div>
      </div>
      <PostForm
        initial={{
          id: post.id,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          coverImageUrl: post.coverImageUrl,
          status: post.status,
          tags: post.tags,
        }}
        allTags={allTags}
      />
    </div>
  );
}
