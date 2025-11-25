type TocItem = {
  id: string; // anchor id in the article
  text: string; // display text
  level?: 1 | 2 | 3; // optional nesting level
};

type TableOfContentsProps = {
  title?: string;
  items: TocItem[];
  sticky?: boolean;
};

export default function TableOfContents({
  title = "Table of contents",
  items,
  sticky = false,
}: TableOfContentsProps) {
  return (
    <nav className={`${sticky ? "lg:sticky lg:top-4" : ""} rounded-md border border-gray-200 bg-[#faf7f5] p-4`} aria-label="Table of contents">
      <h3 className="text-sm font-semibold text-[#0e1d3d] mb-3">{title}</h3>
      <ul className="space-y-2">
        {items.map((it, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="mt-1 inline-block w-2 h-2 rounded-full bg-red-500" aria-hidden />
            <a href={`#${it.id}`} className="text-sm leading-snug hover:text-red-500">
              {it.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}