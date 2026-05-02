import { sanityClient } from "@/lib/sanity/client";
import { POSTS_BY_TAG_QUERY } from "@/lib/sanity/queries";
import BlogCard from "@/components/blog/BlogCard";

export const revalidate = 3600;

export default async function TagPage({ params }) {
    const resolvedParams = await params;
    const slug = resolvedParams.slug;

    const posts = await sanityClient.fetch(POSTS_BY_TAG_QUERY, { slug }, { next: { revalidate: 3600 } });

    return (
        <div className="max-w-6xl mx-auto px-4 pt-34 pb-10">
            <h1 className="text-2xl font-semibold mb-8 capitalize text-primary"> 
                               {slug.replace("-", " ")}
            </h1>

            {posts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map(post => (
                        <BlogCard key={post._id} post={post} />
                    ))}
                </div>
            ) : (
                <p>No posts found for this tag.</p>
            )}
        </div>
    );
}