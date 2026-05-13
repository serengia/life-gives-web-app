"use client";

import Link from "next/link";
import { publishPost, unpublishPost, archivePost } from "@/app/admin/actions";
import type { AdminPost } from "@/lib/db/queries";
import { format } from "date-fns";

export default function PostsTable({ posts }: { posts: AdminPost[] }) {
  if (posts.length === 0) {
    return (
      <p className="text-gray-400 text-sm">
        No posts yet.{" "}
        <Link href="/admin/posts/new" className="text-gold hover:underline">
          Create one.
        </Link>
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/10 text-left text-gray-400">
            <th className="pb-3 pr-4 font-medium">Title</th>
            <th className="pb-3 pr-4 font-medium">Status</th>
            <th className="pb-3 pr-4 font-medium hidden md:table-cell">
              Updated
            </th>
            <th className="pb-3 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id} className="border-b border-white/5">
              <td className="py-3 pr-4">
                <Link
                  href={`/admin/posts/${post.id}/edit`}
                  className="text-white hover:text-gold transition-colors font-medium"
                >
                  {post.title}
                </Link>
                {post.tags.length > 0 && (
                  <span className="ml-2 text-xs text-gray-500">
                    {post.tags.map((t) => t.name).join(", ")}
                  </span>
                )}
              </td>
              <td className="py-3 pr-4">
                <StatusBadge status={post.status} />
              </td>
              <td className="py-3 pr-4 text-gray-400 hidden md:table-cell">
                {format(new Date(post.updatedAt), "MMM d, yyyy")}
              </td>
              <td className="py-3">
                <div className="flex items-center gap-3 flex-wrap">
                  <Link
                    href={`/admin/posts/${post.id}/edit`}
                    className="text-xs text-blue-400 hover:underline"
                  >
                    Edit
                  </Link>
                  {post.status !== "published" && (
                    <form action={publishPost.bind(null, post.id)} className="inline">
                      <button
                        type="submit"
                        className="text-xs text-green-400 hover:underline"
                      >
                        Publish
                      </button>
                    </form>
                  )}
                  {post.status === "published" && (
                    <form action={unpublishPost.bind(null, post.id)} className="inline">
                      <button
                        type="submit"
                        className="text-xs text-yellow-400 hover:underline"
                      >
                        Unpublish
                      </button>
                    </form>
                  )}
                  {post.status !== "archived" && (
                    <form action={archivePost.bind(null, post.id)} className="inline">
                      <button
                        type="submit"
                        className="text-xs text-gray-400 hover:underline"
                      >
                        Archive
                      </button>
                    </form>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: "draft" | "published" | "archived";
}) {
  const classes = {
    draft: "bg-gray-700 text-gray-300",
    published: "bg-green-900/60 text-green-300",
    archived: "bg-red-900/60 text-red-300",
  };
  return (
    <span
      className={`inline-block rounded px-2 py-0.5 text-xs font-medium ${classes[status]}`}
    >
      {status}
    </span>
  );
}
