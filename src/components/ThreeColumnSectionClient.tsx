'use client';

import CategoryColumn from "./CategoryColumn";
import ArticleCard from "./ArticleCard";

type ArticleItem = {
    title: string;
    image?: string;
    excerpt?: string;
    isLarge?: boolean;
    slug: string;
};

type CardItem = {
    title: string;
    slug: string;
};

type ColumnData = {
    category: string;
    articles: ArticleItem[];
    cards: CardItem[];
};

type ThreeColumnSectionClientProps = {
    column1: ColumnData;
    column2: ColumnData;
    column3: ColumnData;
};

export default function ThreeColumnSectionClient({
    column1,
    column2,
    column3,
}: ThreeColumnSectionClientProps) {
    return (
        <section className="bg-white">
            <div className="mx-auto max-w-7xl px-4 py-8">
                {/* Three equal columns */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Column 1 */}
                    <div className="space-y-4">
                        <CategoryColumn category={column1.category} articles={column1.articles} />
                        <div className="space-y-3 border-t">
                            {column1.cards.map((card, i) => (
                                <ArticleCard key={i} title={card.title} slug={card.slug} />
                            ))}
                        </div>
                    </div>

                    {/* Column 2 */}
                    <div className="space-y-4">
                        <CategoryColumn category={column2.category} articles={column2.articles} />
                        <div className="space-y-3 border-t">
                            {column2.cards.map((card, i) => (
                                <ArticleCard key={i} title={card.title} slug={card.slug} />
                            ))}
                        </div>
                    </div>

                    {/* Column 3 */}
                    <div className="space-y-4">
                        <CategoryColumn category={column3.category} articles={column3.articles} />
                        <div className="space-y-3 border-t">
                            {column3.cards.map((card, i) => (
                                <ArticleCard key={i} title={card.title} slug={card.slug} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
