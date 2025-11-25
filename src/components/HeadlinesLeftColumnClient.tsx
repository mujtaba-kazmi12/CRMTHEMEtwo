import HeadlineCard from "./HeadlineCard";

type HeadlinesLeftColumnClientProps = {
    items: {
        imageSrc?: string;
        category: string;
        title: string;
        date?: string;
        excerpt?: string;
        slug: string;
    }[];
};

export default function HeadlinesLeftColumnClient({ items }: HeadlinesLeftColumnClientProps) {
    // Break items into rows of two to create a 2x2 grid
    const rows: typeof items[] = [];
    for (let i = 0; i < items.length; i += 2) {
        rows.push(items.slice(i, i + 2));
    }

    return (
        <div className="space-y-8 overflow-x-hidden">
            {rows.map((row, rowIdx) => (
                <div
                    key={rowIdx}
                    className={`relative grid grid-cols-1 sm:grid-cols-2 gap-x-8 ${rowIdx < rows.length - 1 ? "pb-6 " : ""
                        }`}
                >
                    {/* Vertical divider between the two columns */}
                    <span
                        aria-hidden
                        className="hidden sm:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-200"
                    />

                    {row.map((it, colIdx) => (
                        <div key={colIdx} className={`${colIdx === 0 ? "sm:pr-8" : "sm:pl-0"} min-w-0`}>
                            <HeadlineCard {...it} imageWidth={289} imageHeight={202} />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}
