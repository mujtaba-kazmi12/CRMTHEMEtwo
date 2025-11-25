type HeroAdBoxProps = {
  title?: string;
  imageSrc?: string;
  alt?: string;
  href?: string;
  label?: string;
};

export default function HeroAdBox({
  title = "300x250 Ad",
  imageSrc,
  alt = "Advertisement",
  href = "#",
  label = "BUY NOW",
}: HeroAdBoxProps) {
  return (
    <div className="px-5">
      <div className="w-full max-w-[300px] mx-auto aspect-[300/250] rounded-md overflow-hidden bg-gray-200">
        {imageSrc ? (
          <a href={href} aria-label={alt}>
            <img src={imageSrc} alt={alt} className="w-full h-full object-cover" />
          </a>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-600 text-sm">
            {title}
          </div>
        )}
      </div>
    </div>
  );
}