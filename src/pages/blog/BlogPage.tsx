import { BlogPostCard } from "@/pages/blog/components/BlogPostCard";
import { FeaturedPostCard } from "@/pages/blog/components/FeaturedPostCard";
import { usePublishedPosts } from "@/hooks/usePosts";

export default function BlogPage() {
  const { data: posts = [], isLoading } = usePublishedPosts();
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
            {posts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
