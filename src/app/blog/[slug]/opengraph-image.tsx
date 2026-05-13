import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/db/queries";

export const runtime = "edge";
export const alt = "Blog post";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlug(params.slug);

  return new ImageResponse(
    (
      <div
        style={{
          background: "#0f172a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "60px",
        }}
      >
        <div
          style={{
            width: "60px",
            height: "4px",
            background: "#d97706",
            marginBottom: "24px",
          }}
        />
        <div
          style={{
            fontSize: "52px",
            fontWeight: "700",
            color: "#ffffff",
            lineHeight: "1.2",
            maxWidth: "900px",
            marginBottom: "24px",
          }}
        >
          {post?.title ?? "Blog"}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{ fontSize: "20px", color: "#d97706", fontWeight: "600" }}
          >
            James Serengia
          </div>
          {post?.readingTimeMin && (
            <div style={{ fontSize: "16px", color: "#94a3b8" }}>
              {post.readingTimeMin} min read
            </div>
          )}
        </div>
      </div>
    ),
    { ...size }
  );
}
