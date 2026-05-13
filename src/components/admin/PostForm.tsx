"use client";

import { useEffect, useState, useTransition } from "react";
import { createPost, updatePost } from "@/app/admin/actions";
import slugify from "slug";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Tag = { id: number; slug: string; name: string };

type PostFormProps = {
  initial?: {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    coverImageUrl: string | null;
    status: "draft" | "published" | "archived";
    tags: Tag[];
  };
  allTags: Tag[];
};

export default function PostForm({ initial, allTags }: PostFormProps) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [slugManual, setSlugManual] = useState(!!initial?.id);
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [content, setContent] = useState(initial?.content ?? "");
  const [coverImageUrl, setCoverImageUrl] = useState(
    initial?.coverImageUrl ?? ""
  );
  const [tagInput, setTagInput] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>(
    initial?.tags.map((t) => t.name) ?? []
  );
  const [tab, setTab] = useState<"write" | "preview">("write");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  const storageKey = initial?.id
    ? `post-draft-${initial.id}`
    : "post-draft-new";

  useEffect(() => {
    if (initial?.id) return;
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.content) setContent(data.content);
        if (data.title) setTitle(data.title);
        if (data.excerpt) setExcerpt(data.excerpt);
      } catch {}
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem(
        storageKey,
        JSON.stringify({ title, content, excerpt })
      );
    }, 1000);
    return () => clearTimeout(timer);
  }, [title, content, excerpt, storageKey]);

  useEffect(() => {
    if (!slugManual) {
      setSlug(slugify(title, { lower: true }));
    }
  }, [title, slugManual]);

  const isPublished = initial?.status === "published";

  function addTag(name: string) {
    const trimmed = name.trim();
    if (trimmed && !selectedTags.includes(trimmed)) {
      setSelectedTags((prev) => [...prev, trimmed]);
    }
    setTagInput("");
  }

  function removeTag(name: string) {
    setSelectedTags((prev) => prev.filter((t) => t !== name));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    const fd = new FormData();
    fd.append("title", title);
    fd.append("slug", slug);
    fd.append("excerpt", excerpt);
    fd.append("content", content);
    fd.append("coverImageUrl", coverImageUrl);
    fd.append("tagNames", selectedTags.join(","));

    startTransition(async () => {
      if (initial?.id) {
        const result = await updatePost(initial.id, fd);
        if (result && "error" in result) {
          setError(result.error ?? "Unknown error");
        } else {
          setSuccess(true);
          localStorage.removeItem(storageKey);
        }
      } else {
        await createPost(fd);
        localStorage.removeItem(storageKey);
      }
    });
  }

  const inputClass =
    "w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gold";

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      {error && (
        <div className="rounded bg-red-900/40 border border-red-500/40 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}
      {success && (
        <div className="rounded bg-green-900/40 border border-green-500/40 px-4 py-3 text-sm text-green-300">
          Saved successfully.
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Title
        </label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Slug{" "}
          {isPublished && (
            <span className="text-yellow-400 text-xs ml-1">
              (locked — post is published)
            </span>
          )}
        </label>
        <input
          value={slug}
          onChange={(e) => {
            setSlug(e.target.value);
            setSlugManual(true);
          }}
          disabled={isPublished}
          className={`${inputClass} disabled:opacity-50`}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Excerpt
        </label>
        <textarea
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          rows={3}
          required
          className={`${inputClass} resize-y`}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Cover Image URL
        </label>
        <input
          value={coverImageUrl}
          onChange={(e) => setCoverImageUrl(e.target.value)}
          type="url"
          placeholder="https://..."
          className={inputClass}
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-sm font-medium text-gray-300">
            Content (Markdown)
          </label>
          <div className="flex gap-1">
            {(["write", "preview"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`px-3 py-1 text-xs rounded transition-colors ${
                  tab === t
                    ? "bg-gold text-white"
                    : "bg-white/5 text-gray-300 hover:bg-white/10"
                }`}
              >
                {t === "write" ? "Write" : "Preview"}
              </button>
            ))}
          </div>
        </div>
        {tab === "write" ? (
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={20}
            required
            className={`${inputClass} font-mono text-sm resize-y`}
          />
        ) : (
          <div className="prose prose-invert max-w-none rounded-md bg-white/5 border border-white/10 px-4 py-3 min-h-40">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content || "*Nothing to preview*"}
            </ReactMarkdown>
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Tags
        </label>
        <div className="flex flex-wrap gap-2 mb-2">
          {selectedTags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 rounded-full bg-gold/20 px-3 py-1 text-xs text-gold"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="ml-1 text-gold/70 hover:text-gold"
                aria-label={`Remove tag ${tag}`}
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTag(tagInput);
              }
            }}
            placeholder="Type tag name, press Enter"
            list="tag-suggestions"
            className="flex-1 rounded-md bg-white/5 border border-white/10 px-3 py-2 text-white placeholder:text-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
          />
          <datalist id="tag-suggestions">
            {allTags.map((t) => (
              <option key={t.id} value={t.name} />
            ))}
          </datalist>
          <button
            type="button"
            onClick={() => addTag(tagInput)}
            className="px-3 py-2 rounded-md bg-white/5 text-sm text-gray-300 hover:bg-white/10 border border-white/10"
          >
            Add
          </button>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="btn-gold px-6 py-2.5 text-sm disabled:opacity-50"
        >
          {isPending
            ? "Saving…"
            : initial?.id
            ? "Save Changes"
            : "Create Post"}
        </button>
      </div>
    </form>
  );
}
