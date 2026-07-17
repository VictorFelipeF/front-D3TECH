export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  client: string;
  excerpt: string;
  content: string;
  tag: string;
  publishedAt: string;
  status: "published" | "draft";
}