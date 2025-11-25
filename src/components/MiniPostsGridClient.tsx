import Image from "next/image";

type MiniPost = {
    title: string;
    category: string;
    imageSrc?: string;
    slug: string;
};

type MiniPostsGridClientProps = {
    items: MiniPost[];
};

function chunkTwo<T>(arr: T[]): T[][] {
    const rows: T[][] = [];
    for (let i = 0; i < arr.length; i += 2) {
        rows.push(arr.slice(i, i + 2));
    }
    return rows;
}

export default function MiniPostsGridClient({ items }: MiniPostsGridClientProps) {
    const rows = chunkTwo(items);

    return (
        <div className="bg-white rounded-md">
            {/* Top separator to match screenshot */}
            <div className="border-t border-gray-300" />

            {/* Rows with full-width separators and two columns */}
            <div className="space-y-0">
                {rows.map((row, rowIdx) => (
                    <div
                        key={rowIdx}
                        className={`relative grid grid-cols-1 sm:grid-cols-2 gap-x-8 py-4 ${rowIdx > 0 ? "border-t border-gray-200" : ""}`}
                    >
                        {/* Vertical divider between columns */}
                        <span
                            aria-hidden
                            className="hidden sm:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-200"
                        />

                        {row.map((it, i) => (
                            <article key={i} className="min-w-0 sm:px-6">
                                <div className="grid grid-cols-[1fr_88px] items-center gap-4">
                                    <div className="min-w-0">
                                        <div className="text-xs text-red-500 font-semibold">{it.category}</div>
                                        <a
                                            href={`/post/${it.slug}`}
                                            className="mt-1 block text-sm font-semibold text-[#0e1d3d] leading-snug hover:text-red-500"
                                        >
                                            {it.title}
                                        </a>
                                    </div>
                                    <div className="w-[88px] h-[72px] rounded-md bg-gray-300 overflow-hidden relative">
                                        {it.imageSrc ? (
                                            <Image
                                                src={it.imageSrc}
                                                alt={it.title}
                                                fill
                                                className="object-cover"
                                                sizes="88px"
                                            />
                                        ) : null}
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                ))}
            </div>

            {/* Bottom separator */}
            <div className="border-t border-gray-300" />
        </div>
    );
}
