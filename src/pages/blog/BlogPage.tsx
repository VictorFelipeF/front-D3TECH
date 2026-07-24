import { useState, useEffect } from "react";
import { BlogPostCard } from "@/pages/blog/components/BlogPostCard";
import { FeaturedPostCard } from "@/pages/blog/components/FeaturedPostCard";
import { getPublishedPosts } from "@/services/posts.service";
import type { PostBackend } from "@/services/posts.service";

export default function BlogPage() {
  const [posts, setPosts] = useState<PostBackend[]>([]);
  const [featured, setFeatured] = useState<PostBackend | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getPublishedPosts().then((all) => {
      setPosts(all);
      setFeatured(all.length > 0 ? all[0] : null);
      setLoaded(true);
    });
  }, []);

  const isEmpty = loaded && posts.length === 0;

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
