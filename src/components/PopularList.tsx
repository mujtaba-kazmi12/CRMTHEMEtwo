type PopularItem = {
  category: string;
  title: string;
  imageSrc?: string;
};

type PopularListProps = {
  items?: PopularItem[];
  maxItems?: number;
};

export default function PopularList({
  items = [
    {
      category: "Strategy",
      title: "Kansas City Has a Massive Array of Big National Companies",
      imageSrc: undefined,
    },
    {
      category: "Celebrity",
      title: "Fashion Finder: Biggest Shows, Parties and Celebrity for New Years",
      imageSrc: undefined,
    },
    {
      category: "Tech",
      title: "The Hottest Wearable Tech and Smart Gadgets of the Year Will Amaze You",
      imageSrc: undefined,
    },
    {
      category: "Politics",
      title: "Expanding Peaceful Political Climate Gears up for this Election",
      imageSrc: undefined,
    },
    {
      category: "Tech",
      title: "New Technology Will Help Keep Your Smart Home from Becoming Obsolete",
      imageSrc: undefined,
    },
  ],
  maxItems = 5,
}: PopularListProps) {
  const visible = items.slice(0, maxItems);

  return (
    <div>
      <ul className="space-y-6">
        {visible.map((it, i) => (
          <li key={i}>
            <div className="grid grid-cols-[88px_1fr] gap-4 items-start">
              {/* Thumbnail left */}
              <div className="w-[88px] h-[72px] bg-gray-300 rounded-md overflow-hidden">
                {it.imageSrc && (
                  <img src={it.imageSrc} alt="" className="w-full h-full object-cover" />
                )}
              </div>

              {/* Text right */}
              <div className="min-w-0">
                <p className="text-xs font-semibold text-red-600">{it.category}</p>
                <a href="#" className="mt-1 block text-sm leading-snug text-[#0e1d3d] hover:text-red-500">
                  {it.title}
                </a>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}