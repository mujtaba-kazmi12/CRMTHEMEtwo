import HeroLeadCardClient from "./HeroLeadCardClient";

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
      .limit(1)
      .lean();
    return JSON.parse(JSON.stringify(posts));
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return null;
  }
}

export default async function HeroLeadCard() {
  // Fetch categories and find the one with sequence: 3
  const categories = await fetchCategories();
  const thirdCategory = categories?.find((cat: any) => cat.sequence === 3);

  // Fetch 1 post for that category
  const posts = thirdCategory ? await fetchPosts(thirdCategory.slug) : [];
  const post = posts?.[0];

  if (!post) {
    return (
      <article className="bg-white rounded-md overflow-hidden shadow-sm">
        <div className="bg-gray-300 aspect-[16/9]" />
        <div className="p-5">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#0e1d3d] leading-tight">
            No hay publicaciones disponibles
          </h2>
        </div>
      </article>
    );
  }

  const rawExcerpt = post.blogContent?.metaDescription || post.blogContent?.summary || "";
  const cleanExcerpt = stripHtmlTags(rawExcerpt);

  const postData = {
    title: post.blogContent?.title || "Sin título",
    category: thirdCategory?.name || "",
    author: "Alejandro", // You can add author field to your schema if needed
    date: new Date(post.createdAt).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    excerpt: cleanExcerpt,
    imageSrc: post.firebaseImages?.[0]?.url || undefined,
    slug: post.slug,
  };

  return <HeroLeadCardClient post={postData} />;
}