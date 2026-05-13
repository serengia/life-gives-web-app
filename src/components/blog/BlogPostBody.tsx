import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSanitize from "rehype-sanitize";

export default function BlogPostBody({ content }: { content: string }) {
  return (
    <div className="prose prose-invert prose-lg max-w-none prose-a:text-amber-500 prose-headings:scroll-mt-24">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug, rehypeAutolinkHeadings, rehypeSanitize]}
        components={{
          a({ href, children, ...props }) {
            const isExternal = href?.startsWith("http");
            return (
              <a
                href={href}
                {...(isExternal
                  ? {
                      target: "_blank",
                      rel: "noopener noreferrer nofollow ugc",
                    }
                  : {})}
                {...props}
              >
                {children}
              </a>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
