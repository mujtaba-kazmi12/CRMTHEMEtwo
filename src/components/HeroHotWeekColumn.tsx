import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400"] });

type HeroHotWeekColumnProps = {
  title?: string;
};

async function fetchCategories() {
  try {
    const dbConnect = (await import("@/lib/db")).default;
    const Category = (await import("@/models/Category")).default;
    await dbConnect();
    const categories = await Category.find({}).sort({ sequence: 1, name: 1 }).lean();
    return JSON.parse(JSON.stringify(categories));
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return null;
  }
}

async function fetchPosts(categorySlug: string) {
  try {
    const dbConnect = (await import("@/lib/db")).default;
    const Post = (await import("@/models/Post")).default;
    await dbConnect();
    const posts = await Post.find({ categorySlug })
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();
    return JSON.parse(JSON.stringify(posts));
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return null;
  }
}

export default async function HeroHotWeekColumn({
  title = "Tendencias de la semana",
}: HeroHotWeekColumnProps) {
  // Fetch categories and find the one with sequence: 1
  const categories = await fetchCategories();
  const firstCategory = categories?.find((cat: any) => cat.sequence === 1);

  // Fetch posts for that category
  const posts = firstCategory ? await fetchPosts(firstCategory.slug) : [];

  // Map posts to items format
  const items = posts?.slice(0, 5).map((post: any, index: number) => ({
    title: post.blogContent?.title || "Untitled",
    category: firstCategory?.name || "",
    index: index + 1,
    slug: post.slug,
  })) || [];

  return (
    <aside className="bg-gray-100 rounded-md">
      {/* Header */}
      <div className="px-5 pt-5">
        <h3 className="text-[#0e1d3d] font-bold">{title}</h3>
      </div>

      {/* Ranked list */}
      <ul className="mt-4 px-5">
        {items.map((it: any) => (
          <li key={it.index} className="relative py-4 border-b border-gray-200">
            {/* Large right-side number anchored to bottom line */}
            <div
              aria-hidden
              className={`${playfair.className} absolute right-0 bottom-0 text-gray-300 text-5xl leading-none select-none`}
            >
              {it.index}
            </div>

            {/* Content with right padding to avoid number overlap */}
            <div className="pr-12">
              <div className="text-xs text-red-500 font-semibold">{it.category}</div>
              <a
                href={`/post/${it.slug}`}
                className="block text-sm font-semibold text-[#0e1d3d] leading-snug hover:text-red-500"
              >
                {it.title}
              </a>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}