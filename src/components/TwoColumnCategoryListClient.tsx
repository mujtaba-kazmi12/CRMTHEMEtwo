type ListItem = {
    category: string;
    title: string;
    slug: string;
};

type TwoColumnCategoryListClientProps = {
    items: ListItem[];
};

function splitTwo<T>(arr: T[]): [T[], T[]] {
    const mid = Math.ceil(arr.length / 2);
    return [arr.slice(0, mid), arr.slice(mid)];
}

export default function TwoColumnCategoryListClient({ items }: TwoColumnCategoryListClientProps) {
    const [left, right] = splitTwo(items);

    return (
        <div className="bg-white rounded-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left column */}
                <ul className="space-y-5">
                    {left.map((it, i) => (
                        <li key={i} className="pb-4 border-b border-gray-200">
                            <div className="text-xs text-red-500 font-semibold">{it.category}</div>
                            <a href={`/post/${it.slug}`} className="mt-1 block text-sm font-semibold text-[#0e1d3d] leading-snug hover:text-red-500">
                                {it.title}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Right column */}
                <ul className="space-y-5">
                    {right.map((it, i) => (
                        <li key={i} className="pb-4 border-b border-gray-200">
                            <div className="text-xs text-red-500 font-semibold">{it.category}</div>
                            <a href={`/post/${it.slug}`} className="mt-1 block text-sm font-semibold text-[#0e1d3d] leading-snug hover:text-red-500">
                                {it.title}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
