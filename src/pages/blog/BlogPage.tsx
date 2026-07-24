import { useState } from "react";
import { BlogPostCard } from "@/pages/blog/components/BlogPostCard";
import { FeaturedPostCard } from "@/pages/blog/components/FeaturedPostCard";
import { usePublishedPosts } from "@/hooks/usePosts";

export default function BlogPage() {
  const [page, setPage] = useState(0);
  const { data, isLoading } = usePublishedPosts(page, 9);
  const posts = data?.content ?? [];
  const totalPages = data?.totalPages ?? 1;
  const featured = posts.length > 0 ? posts[0] : null;
  const isEmpty = !isLoading && posts.length === 0;

  return (
    <div className="container mx-auto px-4 py-16">
      {isEmpty ? (
        <p className="text-center text-muted-foreground py-16">
          Ainda nao ha posts publicados.
        </p>
      ) : (
        <>
          {featured && <FeaturedPostCard post={featured} />}

          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {posts.slice(page === 0 ? 1 : 0).map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  className={`w-9 h-9 flex items-center justify-center rounded-none text-sm font-medium transition-colors ${
                    page === i ? "bg-d3-purple text-white" : "text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
