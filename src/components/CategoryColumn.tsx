'use client';

type ArticleItem = {
  title: string;
  image?: string;
  excerpt?: string;
  isLarge?: boolean;
  slug?: string;
};

type CategoryColumnProps = {
  category: string;
  articles: ArticleItem[];
};

export default function CategoryColumn({ category, articles }: CategoryColumnProps) {
  return (
    <div className="bg-white">
      {/* Category header with red accent line */}
      <div className="mb-4">
        <h3 className="text-[#0e1d3d] font-bold text-lg mb-2">{category}</h3>
        <div className="w-8 h-[2px] bg-red-500" />
      </div>

      {/* Articles list */}
      <div className="space-y-4">
        {articles.map((article, index) => (
          <article key={index} className={`${index > 0 ? 'border-t border-gray-200 pt-4' : ''}`}>
            {article.isLarge ? (
              /* Large featured article */
              <div className="space-y-3">
                <div className="aspect-[16/10] bg-gray-200 rounded overflow-hidden">
                  {article.image ? (
                    <img
                      src={article.image}
                      alt=""
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.setAttribute('aria-hidden', 'true');
                      }}
                    />
                  ) : (
                    <span className="sr-only">Image placeholder</span>
                  )}
                </div>
                <a href={article.slug ? `/post/${article.slug}` : '#'}>
                  <h4 className="text-[#0e1d3d] font-semibold text-base leading-tight hover:text-red-500 cursor-pointer">
                    {article.title}
                  </h4>
                </a>
                {article.excerpt && (
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {article.excerpt}
                  </p>
                )}
              </div>
            ) : (
              /* Small article with side image */
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-16 h-12 bg-gray-200 rounded overflow-hidden">
                  {article.image ? (
                    <img
                      src={article.image}
                      alt=""
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.setAttribute('aria-hidden', 'true');
                      }}
                    />
                  ) : (
                    <span className="sr-only">Thumbnail placeholder</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <a href={article.slug ? `/post/${article.slug}` : '#'}>
                    <h4 className="text-[#0e1d3d] font-medium text-sm leading-tight hover:text-red-500 cursor-pointer">
                      {article.title}
                    </h4>
                  </a>
                </div>
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}