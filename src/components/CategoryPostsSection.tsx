"use client";

import { useState } from "react";
import HeadlineCard from "@/components/HeadlineCard";
import type { Post } from "@/services/posts";

type CategoryPostsSectionProps = {
    items: Post[];
};

export default function CategoryPostsSection({ items }: CategoryPostsSectionProps) {
    const ROW_SIZE = 3; // 3 cards per row
    const INITIAL_ROWS = 2; // show 2 rows initially (6 posts)
    const [visibleCount, setVisibleCount] = useState(INITIAL_ROWS * ROW_SIZE);

    const canLoadMore = visibleCount < items.length;
    const handleLoadMore = () => {
        setVisibleCount((c) => Math.min(c + ROW_SIZE, items.length));
    };

    return (
        <section className="bg-white">
            <div className="mx-auto max-w-7xl px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {items.slice(0, visibleCount).map((p, i) => (
                        <HeadlineCard
                            key={i}
                            category={p.category}
                            title={p.title}
                            excerpt={p.excerpt}
                            imageSrc={p.imageSrc}
                            date={p.date}
                            slug={p.slug}
                        />
                    ))}
                </div>

                {/* Load more */}
                {items.length > ROW_SIZE && (
                    <div className="mt-8 flex justify-center">
                        <button
                            type="button"
                            onClick={handleLoadMore}
                            disabled={!canLoadMore}
                            className="inline-flex items-center gap-2 px-6 py-2 rounded border border-gray-300 text-[#0e1d3d] font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {canLoadMore ? "Cargar más" : "No hay más publicaciones"}
                            <span aria-hidden>›</span>
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}