import Image from "next/image";

interface Article {
    id: string;
    title: string;
    image: string;
    slug: string;
}

interface HeadlinesExclusiveColumnClientProps {
    articles: Article[];
}

export default function HeadlinesExclusiveColumnClient({ articles }: HeadlinesExclusiveColumnClientProps) {
    return (
        <div className="w-full max-w-md bg-gray-100 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-red-600 mb-6">Artículos Exclusivos</h2>

            <div className="space-y-4">
                {articles.map((article) => (
                    <a
                        key={article.id}
                        href={`/post/${article.slug}`}
                        className="flex gap-4 cursor-pointer hover:opacity-80 transition-opacity"
                    >
                        {/* Article Image */}
                        <div className="flex-shrink-0">
                            {article.image ? (
                                <div className="relative w-[72px] h-[72px] rounded-md overflow-hidden">
                                    <Image
                                        src={article.image}
                                        alt={article.title}
                                        fill
                                        className="object-cover"
                                        sizes="72px"
                                    />
                                </div>
                            ) : (
                                <div className="w-[72px] h-[72px] rounded-md bg-gray-300" />
                            )}
                        </div>

                        {/* Article Title */}
                        <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-semibold text-gray-800 leading-tight line-clamp-3">{article.title}</h3>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}
