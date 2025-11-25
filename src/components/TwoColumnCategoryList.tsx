import TwoColumnCategoryListClient from "./TwoColumnCategoryListClient";

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

export default async function TwoColumnCategoryList() {
  // Fetch categories and find the one with sequence: 3
  const categories = await fetchCategories();
  const thirdCategory = categories?.find((cat: any) => cat.sequence === 3);

  // Fetch 11 posts for that category
  const posts = thirdCategory ? await fetchPosts(thirdCategory.slug) : [];

  // Skip the first 5 posts and take the next 6 (posts 6-11)
  const listItems = posts?.slice(5, 11).map((post: any) => ({
    title: post.blogContent?.title || "Untitled",
    category: thirdCategory?.name || "",
    slug: post.slug,
  })) || [];

  return <TwoColumnCategoryListClient items={listItems} />;
}