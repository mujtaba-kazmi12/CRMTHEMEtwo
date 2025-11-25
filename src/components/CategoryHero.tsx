import Link from "next/link";
import HeadlineCard from "@/components/HeadlineCard";
import type { Post } from "@/services/posts";

type CategoryHeroProps = {
  category: string; // Display name (normalized)
  posts: Post[]; // Posts belonging to this category
};

// Optional tabs (currently not rendered, kept for potential future use)
const heroTabs = ["Business", "Food", "Lifestyle", "Tech", "Travel"];

export default function CategoryHero({ category, posts }: CategoryHeroProps) {
  const featured = posts.slice(0, 2);

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6">
        {/* Top row: category title */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#0e1d3d]">{category}</h1>
        </div>
        <div className="mt-2 h-[2px] bg-red-500" />

        {/* Two featured posts */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          {featured.map((p, i) => (
            <HeadlineCard
              key={i}
              category={p.category}
              title={p.title}
              excerpt={p.excerpt}
              imageSrc={p.imageSrc}
              date={p.date ? new Date(p.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' }) : undefined}
              slug={p.slug}
            />
          ))}
        </div>
      </div>
    </section>
  );
}