import PostForm from "@/components/admin/PostForm";
import { getAllTags } from "@/lib/db/queries";

export default async function NewPostPage() {
  const allTags = await getAllTags();
  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-white mb-8">
        New Post
      </h1>
      <PostForm allTags={allTags} />
    </div>
  );
}
