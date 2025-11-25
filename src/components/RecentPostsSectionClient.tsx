"use client";
import { useState } from "react";
import HeadlineCard from "./HeadlineCard";
import HeroAdBox from "./HeroAdBox";
import PopularList from "./PopularList";

type Post = {
    id: string;
    category: string;
    title: string;
    excerpt: string;
    imageSrc?: string;
    date: string;
    slug: string;
};

type Pagination = {
    currentPage: number;
    totalPages: number;
    totalPosts: number;
    hasNextPage: boolean;
};

type RecentPostsSectionClientProps = {
    initialPosts: Post[];
    initialPagination: Pagination;
    popularCategoriesSlot: React.ReactNode;
    popularListSlot: React.ReactNode;
};

export default function RecentPostsSectionClient({
    initialPosts,
    initialPagination,
    popularCategoriesSlot,
    popularListSlot,
}: RecentPostsSectionClientProps) {
    const [posts, setPosts] = useState<Post[]>(initialPosts);
    const [pagination, setPagination] = useState<Pagination>(initialPagination);
    const [loading, setLoading] = useState(false);

    const handleLoadMore = async () => {
        if (!pagination.hasNextPage || loading) return;

        setLoading(true);
        try {
            const nextPage = pagination.currentPage + 1;
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/posts?page=${nextPage}&limit=9`
            );
            const data = await res.json();

            if (data.success) {
                // Map new posts
                const newPosts = data.posts.map((post: any) => ({
                    id: post._id,
                    category: post.categorySlug || "News",
                    title: post.blogContent?.title || "Untitled",
                    excerpt: post.blogContent?.summary || post.blogContent?.metaDescription || "",
                    imageSrc: post.firebaseImages?.[0]?.url || undefined,
                    date: new Date(post.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    }),
                    slug: post.slug,
                }));

                // Append new posts to existing ones
                setPosts((prev) => [...prev, ...newPosts]);
                setPagination(data.pagination);
            }
        } catch (error) {
            console.error("Error loading more posts:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="bg-white">
            <div className="mx-auto max-w-7xl px-4 py-8">
                {/* Section Header */}
                <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-semibold text-[#0e1d3d]">Publicaciones Recientes</h2>
                    <div className="h-[2px] flex-1 bg-red-500" />
                </div>

                {/* 70/30 layout */}
                <div className="mt-6 grid grid-cols-1 lg:grid-cols-[7fr_3fr] gap-8">
                    {/* Left: 70% with 3 equal columns */}
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {posts.map((post) => (
                                <HeadlineCard
                                    key={post.id}
                                    imageSrc={post.imageSrc}
                                    category={post.category}
                                    title={post.title}
                                    date={post.date}
                                    excerpt={post.excerpt}
                                    slug={post.slug}
                                />
                            ))}
                        </div>

                        {/* Load More button */}
                        <div className="mt-8 flex justify-center">
                            <button
                                type="button"
                                onClick={handleLoadMore}
                                disabled={!pagination.hasNextPage || loading}
                                className="px-6 py-2 rounded border border-gray-300 text-[#0e1d3d] font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? "Cargando..." : pagination.hasNextPage ? "Cargar más" : "No hay más publicaciones"}
                            </button>
                        </div>
                    </div>

                    {/* Right: 30% sidebar using existing components; sticky on desktop */}
                    <aside className="space-y-6 lg:sticky lg:top-4 self-start">
                        <div className="px-5">
                            <h4 className="text-[#0e1d3d] font-semibold mb-3">Popular</h4>
                            {popularListSlot}
                        </div>
                        <HeroAdBox />
                        {popularCategoriesSlot}
                    </aside>
                </div>
            </div>
        </section>
    );
}
