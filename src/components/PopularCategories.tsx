import dbConnect from "@/lib/db";
import Category from "@/models/Category";
import Link from "next/link";

type CategoryType = {
  _id: string;
  name: string;
  slug: string;
  count?: number;
};

type PopularCategoriesProps = {
  title?: string;
};

export default async function PopularCategories({
  title = "Categorías populares",
}: PopularCategoriesProps) {
  await dbConnect();
  // Sort by sequence ascending, then by name
  // We need to lean() or map to plain objects to avoid serialization warnings if we were passing props,
  // but since we render directly here, it's safer to just map what we need.
  const docs = await Category.find({}).sort({ sequence: 1, name: 1 }).lean();

  const categories: CategoryType[] = docs.map((doc: any) => ({
    _id: doc._id.toString(),
    name: doc.name,
    slug: doc.slug,
    count: doc.count || 0, // Assuming count might be added to schema later or aggregated
  }));

  return (
    <div className="px-5">
      <div className="rounded-md bg-[#f8f6f2] p-4">
        <h4 className="text-[#0e1d3d] font-semibold">{title}</h4>
        <ul className="mt-4 divide-y divide-gray-200 border-t border-b border-gray-200">
          {categories.map((c) => (
            <li key={c._id} className="flex items-center justify-between py-3 text-sm">
              <Link href={`/categories/${c.slug}`} className="uppercase tracking-wide text-[#0e1d3d] hover:text-red-500 transition-colors">
                {c.name}
              </Link>
              {c.count && c.count > 0 ? (
                <span className="text-[#0e1d3d]/70">{c.count}</span>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}