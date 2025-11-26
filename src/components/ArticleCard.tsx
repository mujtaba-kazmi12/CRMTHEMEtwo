'use client'

interface ArticleCardProps {
  title: string
  image?: string
  slug?: string
}

export default function ArticleCard({ title, image, slug }: ArticleCardProps) {
  const content = (
    <div className="flex gap-3 p-3 bg-white hover:shadow-md transition-shadow duration-200 border-b border-gray-200">
      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-gray-900 leading-tight line-clamp-3 hover:text-red-500 cursor-pointer">
          {title}
        </h3>
      </div>
    </div>
  );

  if (slug) {
    return <a href={`/${slug}`}>{content}</a>;
  }

  return content;
}