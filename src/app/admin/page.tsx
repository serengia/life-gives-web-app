import Link from "next/link";
import { getAllPostsAdmin } from "@/lib/db/queries";
import PostsTable from "@/components/admin/PostsTable";

export default async function AdminDashboard() {
  const allPosts = await getAllPostsAdmin();
  const published = allPosts.filter((p) => p.status === "published").length;
  const drafts = allPosts.filter((p) => p.status === "draft").length;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-2xl font-bold text-white">Posts</h1>
          <p className="text-sm text-gray-400 mt-1">
            {published} published · {drafts} draft
          </p>
        </div>
        <Link href="/admin/posts/new" className="btn-gold text-sm px-4 py-2">
          New Post
        </Link>
      </div>
      <PostsTable posts={allPosts} />
    </div>
  );
}
