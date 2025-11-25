"use client";

import { useState, useEffect } from "react";
import HeadlineCard from "./HeadlineCard";

type Post = {
    _id: string;
    slug: string;
    categorySlug: string;
    blogContent: {
        title: string;
        summary?: string;
    };
    firebaseImages?: { url: string }[];
    createdAt: string;
};

type PrevNextArticlesProps = {
    categorySlug?: string;
};

export default function PrevNextArticles({ categorySlug }: PrevNextArticlesProps) {
    const [posts, setPosts] = useState<Post[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPosts(currentPage);
    }, [currentPage]);

    const fetchPosts = async (page: number) => {
        setLoading(true);
        try {
            const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
            // Add categorySlug filter if provided
            const categoryParam = categorySlug ? `&categorySlug=${categorySlug}` : '';
            const res = await fetch(`${baseUrl}/api/posts?page=${page}&limit=2${categoryParam}`, { cache: 'no-store' });

            if (res.ok) {
                const data = await res.json();
                if (data.success && data.posts) {
                    setPosts(data.posts);
                    if (data.pagination) {
                        setTotalPages(data.pagination.totalPages);
                    }
                }
            }
        } catch (error) {
            console.error("Failed to fetch prev/next posts:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    if (loading) {
        return (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-[#f8f6f2] rounded-md p-4 animate-pulse">
                    <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
                    <div className="h-32 bg-gray-300 rounded"></div>
                </div>
                <div className="bg-[#f8f6f2] rounded-md p-4 animate-pulse">
                    <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
                    <div className="h-32 bg-gray-300 rounded"></div>
                </div>
            </div>
        );
    }

    const [firstPost, secondPost] = posts;

    return (
        <div>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                {firstPost && (
                    <div className="bg-[#f8f6f2] rounded-md p-4">
                        <div className="text-xs uppercase text-red-500 font-semibold mb-2">Artículo 1</div>
                        <HeadlineCard
                            imageSrc={firstPost.firebaseImages?.[0]?.url || "/window.svg"}
                            category={firstPost.categorySlug || "General"}
                            title={firstPost.blogContent.title}
                            date={new Date(firstPost.createdAt).toLocaleDateString("es-ES", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                            excerpt={firstPost.blogContent.summary || ""}
                            slug={firstPost.slug}
                        />
                    </div>
                )}
                {secondPost && (
                    <div className="bg-[#f8f6f2] rounded-md p-4">
                        <div className="text-xs uppercase text-red-500 font-semibold mb-2">Artículo 2</div>
                        <HeadlineCard
                            imageSrc={secondPost.firebaseImages?.[0]?.url || "/window.svg"}
                            category={secondPost.categorySlug || "General"}
                            title={secondPost.blogContent.title}
                            date={new Date(secondPost.createdAt).toLocaleDateString("es-ES", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                            excerpt={secondPost.blogContent.summary || ""}
                            slug={secondPost.slug}
                        />
                    </div>
                )}
            </div>

            {/* Navigation buttons */}
            <div className="mt-6 flex justify-center gap-4">
                <button
                    onClick={handlePrev}
                    disabled={currentPage === 1}
                    className="px-6 py-2 rounded border border-gray-300 text-[#0e1d3d] font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    ← Anterior
                </button>
                <span className="px-4 py-2 text-[#0e1d3d] font-medium">
                    Página {currentPage} de {totalPages}
                </span>
                <button
                    onClick={handleNext}
                    disabled={currentPage >= totalPages}
                    className="px-6 py-2 rounded border border-gray-300 text-[#0e1d3d] font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Siguiente →
                </button>
            </div>
        </div>
    );
}
