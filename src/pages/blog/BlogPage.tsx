import { useState, useEffect } from "react";
import { getBlogPosts } from "@/api/blog/getBlogPosts";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { FeaturedPostCard } from "@/components/blog/FeaturedPostCard";
import { getFeaturedPost } from "@/api/blog/getFeaturedPost";
import { LoadMoreButton } from "@/components/shared/LoadMoreButton";
import type { BlogPost } from "@/types/blog";

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [featured, setFeatured] = useState<BlogPost | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    Promise.all([getFeaturedPost(), loadPage(1)]).then(([f]) => {
      setFeatured(f);
      setLoaded(true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadPage(p: number) {
    setLoading(true);
    try {
      const { posts: newPosts, hasMore } = await getBlogPosts(p);
      setPosts((prev) => (p === 1 ? newPosts : [...prev, ...newPosts]));
      setHasMore(hasMore);
      setPage(p);
    } finally {
      setLoading(false);
    }
  }

  const isEmpty = loaded && !featured && posts.length === 0;

  // Se não tiver posts publicados ou disponiveis, mostra essa mensagem
  return (
    <div className="container mx-auto px-4 py-16">
      {isEmpty ? (
        <p className="text-center text-muted-foreground py-16">
          Ainda não há posts publicados.
        </p>
      ) : (
        <>
          {featured && <FeaturedPostCard post={featured} />}

          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {posts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>

          {hasMore && (
            <div className="flex justify-center mt-8">
              <LoadMoreButton
                onClick={() => loadPage(page + 1)}
                isLoading={loading}
                label="Ver mais..."
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
