import HeroTopicsColumnClient from "./HeroTopicsColumnClient";

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
      .limit(11)
      .lean();
    return JSON.parse(JSON.stringify(posts));
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return null;
  }
}

export default async function HeroTopicsColumn({ title = "Temas", maxItems = 10 }: { title?: string; maxItems?: number }) {
  // Fetch categories and find the one with sequence: 2
  const categories = await fetchCategories();
  const secondCategory = categories?.find((cat: any) => cat.sequence === 2);

  // Fetch posts for that category
  const posts = secondCategory ? await fetchPosts(secondCategory.slug) : [];

  // Map posts to items format
  const allPosts = posts?.map((post: any) => ({
    title: post.blogContent?.title || "Sin título",
    category: secondCategory?.name || "",
    date: new Date(post.createdAt).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    slug: post.slug,
    imageSrc: post.firebaseImages?.[0]?.url || undefined,
  })) || [];

  const featured = allPosts[0] || null;
  const items = allPosts.slice(1);

  // Get first 2 categories for tabs, rest go in "More" dropdown
  const allCategories = categories || [];
  const regularTabs = allCategories.slice(0, 2).map((cat: any) => ({ name: cat.name, slug: cat.slug }));
  const moreTabs = allCategories.slice(2).map((cat: any) => ({ name: cat.name, slug: cat.slug }));

  return (
    <HeroTopicsColumnClient
      title={title}
      regularTabs={regularTabs}
      moreTabs={moreTabs}
      featured={featured}
      items={items}
      maxItems={maxItems}
    />
  );
}