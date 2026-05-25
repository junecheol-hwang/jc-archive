import { defineConfig } from "tinacms";

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        path: "src/content/blog",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "제목",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "설명 (한 줄 요약)",
            required: true,
          },
          {
            type: "datetime",
            name: "pubDate",
            label: "날짜",
            required: true,
          },
          {
            type: "string",
            name: "category",
            label: "카테고리",
            required: true,
            options: [
              { value: "vibe coding", label: "vibe coding" },
              { value: "photos", label: "photos" },
              { value: "books", label: "books" },
              { value: "thoughts", label: "thoughts" },
            ],
          },
          {
            type: "string",
            name: "template",
            label: "템플릿",
            required: true,
            options: [
              { value: "A", label: "A — 전면 이미지형" },
              { value: "B", label: "B — 좌우 분할형" },
              { value: "C", label: "C — 본문 중간 이미지형" },
              { value: "D", label: "D — 타이포그래피 중심형" },
            ],
          },
          {
            type: "image",
            name: "heroImage",
            label: "대표 이미지",
          },
          {
            type: "rich-text",
            name: "body",
            label: "본문",
            isBody: true,
          },
        ],
      },
    ],
  },
});