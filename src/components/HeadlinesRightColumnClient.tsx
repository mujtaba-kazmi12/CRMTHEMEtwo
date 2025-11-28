import Image from "next/image";
import Link from "next/link";

type RightPost = {
    imageSrc?: string;
    category: string;
    title: string;
    date?: string;
    slug: string;
};

type HeadlinesRightColumnClientProps = {
    items: RightPost[];
};

export default function HeadlinesRightColumnClient({ items }: HeadlinesRightColumnClientProps) {
    return (
        <div className="space-y-8">
            {items.map((it, i) => (
                <article key={i}>
                    <div className="bg-gray-300 rounded aspect-[16/9] overflow-hidden relative">
                        {it.imageSrc && (
                            <Image
                                src={it.imageSrc}
                                alt={it.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 25vw"
                            />
                        )}
                    </div>
                    <Link href={`/${it.slug}`} className="mt-3 block text-[#0e1d3d] font-semibold leading-snug hover:text-red-500">
                        {it.title}
                    </Link>
                    <div className="mt-1 text-xs text-gray-500">
                        <span className="text-red-500 font-semibold">{it.category}</span>
                        {it.date && <span className="ml-2">{it.date}</span>}
                    </div>
                </article>
            ))}
        </div>
    );
}
