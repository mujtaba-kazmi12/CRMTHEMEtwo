import Image from "next/image";

type HeadlineCardProps = {
  imageSrc?: string;
  category: string;
  title: string;
  date?: string;
  excerpt?: string;
  imageWidth?: number;
  imageHeight?: number;
  slug?: string;
  priority?: boolean;
};

export default function HeadlineCard({
  imageSrc,
  category,
  title,
  date = "14 de diciembre de 2023",
  excerpt,
  imageWidth,
  imageHeight,
  slug,
  priority = false,
}: HeadlineCardProps) {
  const fixedSize = typeof imageWidth === "number" && typeof imageHeight === "number";
  const containerClass = fixedSize
    ? "bg-gray-300 rounded overflow-hidden mx-auto"
    : "relative bg-gray-300 rounded aspect-[16/9] overflow-hidden w-full";
  const containerStyle = fixedSize
    ? { width: `${imageWidth}px`, height: `${imageHeight}px` }
    : undefined;

  const content = (
    <article className="flex flex-col max-w-full">
      <div className={containerClass} style={containerStyle}>
        {imageSrc && (
          fixedSize ? (
            <img src={imageSrc} alt={title} className="w-full h-full object-cover" />
          ) : (
            <Image
              src={imageSrc}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={priority}
              fetchPriority={priority ? "high" : "auto"}
            />
          )
        )}
      </div>
      <div className="mt-3">
        <span className="text-sm font-semibold text-red-600">{category}</span>
        <h3 className="mt-1 text-lg font-bold text-[#0e1d3d] leading-tight break-words hover:text-red-600 cursor-pointer">
          {title}
        </h3>
        {excerpt && (
          <p className="mt-2 text-sm text-gray-600 break-words line-clamp-2">{excerpt}</p>
        )}
        {date && <p className="mt-2 text-xs text-gray-500">{date}</p>}
      </div>
    </article>
  );

  if (slug) {
    return <a href={`/${slug}`}>{content}</a>;
  }

  return content;
}