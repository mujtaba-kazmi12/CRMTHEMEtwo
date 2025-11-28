"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type TopicItem = {
    title: string;
    category?: string;
    date?: string;
    slug?: string;
    imageSrc?: string;
};

type CategoryTab = {
    name: string;
    slug: string;
};

type HeroTopicsColumnClientProps = {
    title: string;
    regularTabs: CategoryTab[];
    moreTabs: CategoryTab[];
    featured: TopicItem | null;
    items: TopicItem[];
    maxItems: number;
};

function MoreDropdown({ tabs }: { tabs: CategoryTab[] }) {
    const [moreOpen, setMoreOpen] = useState(false);

    return (
        <div className="relative">
            <button type="button" className="hover:text-red-500" onClick={() => setMoreOpen((v) => !v)}>
                Más
            </button>
            {moreOpen && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setMoreOpen(false)} />
                    <div className="absolute left-0 top-[22px] z-50">
                        <div className="relative">
                            <div className="bg-white rounded shadow border border-gray-200">
                                <ul className="py-2 min-w-[140px]">
                                    {tabs.map((c) => (
                                        <li key={c.slug}>
                                            <Link href={`/categories/${c.slug}`} className="block px-4 py-2 text-[#0e1d3d] hover:bg-[#f5f3f0]">
                                                {c.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default function HeroTopicsColumnClient({
    title,
    regularTabs,
    moreTabs,
    featured,
    items,
    maxItems,
}: HeroTopicsColumnClientProps) {
    const list = items.slice(0, maxItems);

    return (
        <aside className="bg-white">
            <div className="px-5 pt-5">
                <div className="flex items-center justify-between">
                    <h3 className="text-[#0e1d3d] font-bold">{title}</h3>
                    <nav className="hidden md:flex items-center gap-4 text-xs text-[#0e1d3d]/70">
                        {regularTabs.map((t) => (
                            <Link key={t.slug} href={`/categories/${t.slug}`} className="hover:text-red-500">{t.name}</Link>
                        ))}
                        {moreTabs.length > 0 && <MoreDropdown tabs={moreTabs} />}
                    </nav>
                </div>
            </div>

            {featured && (
                <div className="px-5 mt-4">
                    {featured.imageSrc ? (
                        <div className="relative w-full aspect-[16/9] rounded overflow-hidden">
                            <Image
                                src={featured.imageSrc}
                                alt={featured.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 33vw"
                            />
                        </div>
                    ) : (
                        <div className="bg-gray-300 aspect-[16/9] rounded" />
                    )}
                    <Link href={`/${featured.slug}`} className="mt-3 block text-[#0e1d3d] font-semibold leading-snug">
                        {featured.title}
                    </Link>
                    <div className="mt-1 text-xs text-gray-500">
                        <span className="text-red-500 font-semibold">{featured.category}</span>
                        <span className="mx-2">{featured.date}</span>
                    </div>
                </div>
            )}

            <ul className="mt-5 px-5 pb-5 divide-y divide-gray-200">
                {list.map((it, i) => (
                    <li key={i} className="py-3">
                        <Link href={`/${it.slug}`} className="block text-sm font-semibold text-[#0e1d3d] leading-snug hover:text-red-500">
                            {it.title}
                        </Link>
                        <div className="mt-1 text-xs text-gray-500">
                            <span className="text-red-500 font-semibold">{it.category}</span>
                            <span className="ml-2">{it.date}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </aside>
    );
}
