"use client";
import Image from "next/image";
import Link from "next/link";

type PostData = {
    title: string;
    category: string;
    author: string;
    date: string;
    excerpt: string;
    imageSrc?: string;
    slug: string;
};

type HeroLeadCardClientProps = {
    post: PostData;
};

export default function HeroLeadCardClient({ post }: HeroLeadCardClientProps) {
    return (
        <Link href={`/${post.slug}`} className="block">
            <article className="bg-white rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                {/* Image */}
                {post.imageSrc ? (
                    <div className="relative w-full aspect-[16/9]">
                        <Image
                            src={post.imageSrc}
                            alt={post.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority
                        />
                    </div>
                ) : (
                    <div className="bg-gray-300 aspect-[16/9]" />
                )}

                {/* Content */}
                <div className="p-5">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-[#0e1d3d] leading-tight hover:text-red-500 transition-colors">
                        {post.title}
                    </h2>
                    <div className="mt-3 flex items-center gap-3 text-sm">
                        <span className="text-red-500 font-semibold">{post.category}</span>
                        <span className="text-gray-600">{post.author}</span>
                        <span className="text-gray-500">{post.date}</span>
                    </div>
                    <p className="mt-4 text-[#0e1d3d]/80">
                        {post.excerpt.length > 150 ? `${post.excerpt.substring(0, 150)}...` : post.excerpt}
                    </p>

                    {/* Simple controls */}
                    <div className="mt-4 flex items-center gap-2">
                        <button
                            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 hover:bg-gray-50"
                            aria-label="Anterior"
                            onClick={(e) => e.preventDefault()}
                        >
                            ‹
                        </button>
                        <button
                            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 hover:bg-gray-50"
                            aria-label="Siguiente"
                            onClick={(e) => e.preventDefault()}
                        >
                            ›
                        </button>
                    </div>
                </div>
            </article>
        </Link>
    );
}
