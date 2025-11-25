import PostDetail from "../../../components/PostDetail";
import HeroHotWeekColumn from "../../../components/HeroHotWeekColumn";
import HeroTopicsColumn from "../../../components/HeroTopicsColumn";
import MiniPostsGrid from "../../../components/MiniPostsGrid";
import HeroAdBox from "../../../components/HeroAdBox";
import WideAdBanner from "../../../components/WideAdBanner";
import HeadlineCard from "../../../components/HeadlineCard";
import PrevNextArticles from "../../../components/PrevNextArticles";
import { getPostBySlug } from "../../../services/posts";
import type { Metadata } from "next";

async function fetchPostData(slug: string) {
  try {
    const dbConnect = (await import("@/lib/db")).default;
    const Post = (await import("@/models/Post")).default;
    await dbConnect();
    const post = await Post.findOne({ slug }).lean();
    return JSON.parse(JSON.stringify(post));
  } catch (error) {
    console.error("Failed to fetch post:", error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const apiPost = await fetchPostData(slug);

  if (!apiPost || !apiPost.blogContent) {
    return {
      title: "Post - teacuerdas.com",
      description: "Read the latest articles and news on teacuerdas.com",
    };
  }

  const { blogContent, firebaseImages } = apiPost;
  const metaTags = blogContent.metaTags || {};
  const ogTags = blogContent.ogTags || {};

  const metadata: Metadata = {
    title: metaTags.title || blogContent.title || "Post - teacuerdas.com",
    description: metaTags.description || blogContent.metaDescription || blogContent.summary || "",
    keywords: metaTags.keywords || "",
    authors: metaTags.author ? [{ name: metaTags.author }] : undefined,
    openGraph: {
      title: ogTags.title || metaTags.title || blogContent.title || "",
      description: ogTags.description || metaTags.description || blogContent.metaDescription || "",
      type: (ogTags.type as "article" | "website") || "article",
      url: ogTags.url || undefined,
      images: ogTags.image
        ? [{ url: ogTags.image }]
        : firebaseImages && firebaseImages.length > 0
          ? [{ url: firebaseImages[0].url }]
          : [],
    },
  };

  return metadata;
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Fetch post data from API
  const apiPost = await fetchPostData(slug);
  let post = null;

  if (apiPost) {
    post = {
      _id: apiPost._id,
      slug: apiPost.slug,
      category: apiPost.categorySlug || "General",
      title: apiPost.blogContent.title,
      excerpt: apiPost.blogContent.summary || "",
      date: new Date(apiPost.createdAt).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      author: apiPost.blogContent.metaTags?.author || "Alejandro",
      readTime: "5 min. de lectura", // Placeholder or calculate from wordCount
      tags: apiPost.blogContent.metaTags?.keywords ? apiPost.blogContent.metaTags.keywords.split(", ") : [],
      imageSrc: apiPost.firebaseImages && apiPost.firebaseImages.length > 0 ? apiPost.firebaseImages[0].url : "",
      content: apiPost.blogContent.content,
      videos: apiPost.videos || [],
      socialMediaUrls: apiPost.socialMediaUrls || {},
      faqs: apiPost.blogContent.faqs || [],
      keyPoints: apiPost.blogContent.keyPoints || [],
      images: apiPost.firebaseImages || [],
    };
  }

  const demoPost = {
    category: "Strategy",
    title: "Kansas City Has a Massive Array of Big National Companies",
    excerpt:
      "Find people with high expectations and a low tolerance for excuses. They'll have higher expectations for you than you...",
    date: "14 de diciembre de 2023",
    author: "Arianna Scott",
    readTime: "2 min. de lectura",
    tags: ["Magazine", "News", "Newspaper"],
    content: "",
  };

  // Use fetched post or fallback to demoPost
  const postData = post || demoPost;

  // Fetch categories
  let categories = [];
  try {
    const dbConnect = (await import("@/lib/db")).default;
    const Category = (await import("@/models/Category")).default;
    await dbConnect();
    const cats = await Category.find({}).sort({ sequence: 1, name: 1 }).lean();
    categories = JSON.parse(JSON.stringify(cats));
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }

  return (
    <div className="mx-auto max-w-[1100px] px-5 py-8">
      {/* Two-column layout: 70/30 */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
        <div className="lg:col-span-7">
          <PostDetail post={postData} />
        </div>
        <aside className="lg:col-span-3 space-y-10 lg:sticky lg:top-4 self-start">
          {/* Hot this week (ranked list with large numbers) */}
          <HeroHotWeekColumn />

          {/* Topics block with tabs and list (show 4 posts) */}
          <HeroTopicsColumn maxItems={4} />

          {/* 300x250 ad */}
          <HeroAdBox />
        </aside>
      </div>

      {/* After-article blocks */}
      <div className="mt-12">
        {/* Popular Categories row */}
        <div className="text-center">
          <div className="text-xs uppercase tracking-wide text-[#0e1d3d]/70">Categorías Populares</div>
          <nav className="mt-3 flex flex-wrap items-center justify-center gap-6 text-sm uppercase tracking-wide text-[#0e1d3d]">
            {categories.length > 0 ? (
              categories.map((category: any) => (
                <a key={category._id} href={`/${category.slug}`} className="hover:text-red-500">
                  {category.name}
                </a>
              ))
            ) : (
              ["Strategy", "Marketing", "Finance", "Politics", "Music", "Celebrity", "Make-up"].map((c) => (
                <a key={c} href="#" className="hover:text-red-500">
                  {c}
                </a>
              ))
            )}
          </nav>
        </div>

        {/* Wide banner below categories */}
        <div className="mt-4">
          <WideAdBanner />
        </div>

        {/* Prev/Next */}
        <PrevNextArticles categorySlug={postData.category} />
      </div>
    </div>
  );
}