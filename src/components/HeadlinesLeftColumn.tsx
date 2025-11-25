import HeadlinesLeftColumnClient from "./HeadlinesLeftColumnClient";

function stripHtmlTags(html: string): string {
  return html.replace(/\u003c[^\u003e]*\u003e/g, '').trim();
}

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
      .limit(4)
      .lean();
    return JSON.parse(JSON.stringify(posts));
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return null;
  }
}

export default async function HeadlinesLeftColumn() {
  // Fetch categories and find the one with sequence: 4
  const categories = await fetchCategories();
  const fourthCategory = categories?.find((cat: any) => cat.sequence === 4);

  // Fetch 4 posts for that category
  const posts = fourthCategory ? await fetchPosts(fourthCategory.slug) : [];

  // Map posts to items format
  const items = posts?.map((post: any) => {
    const rawExcerpt = post.blogContent?.metaDescription || post.blogContent?.summary || "";
    const cleanExcerpt = stripHtmlTags(rawExcerpt);

    return {
      imageSrc: post.firebaseImages?.[0]?.url || undefined,
      category: fourthCategory?.name || "",
      title: post.blogContent?.title || "Sin título",
      date: new Date(post.createdAt).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      excerpt: cleanExcerpt.length > 100 ? `${cleanExcerpt.substring(0, 100)}...` : cleanExcerpt,
      slug: post.slug,
    };
  }) || [];

  return <HeadlinesLeftColumnClient items={items} />;
}