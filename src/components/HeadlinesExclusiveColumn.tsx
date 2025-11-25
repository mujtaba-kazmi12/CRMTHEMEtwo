import HeadlinesExclusiveColumnClient from "./HeadlinesExclusiveColumnClient";

async function fetchPosts() {
  try {
    const dbConnect = (await import("@/lib/db")).default;
    const Post = (await import("@/models/Post")).default;
    await dbConnect();
    const posts = await Post.find({})
      .sort({ createdAt: -1 })
      .limit(8)
      .lean();
    return JSON.parse(JSON.stringify(posts));
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return null;
  }
}

export default async function HeadlinesExclusiveColumn() {
  // Fetch 8 posts
  const posts = await fetchPosts();

  // Map posts to articles format
  const articles = posts?.map((post: any) => ({
    id: post._id,
    title: post.blogContent?.title || "Untitled",
    image: post.firebaseImages?.[0]?.url || "",
    slug: post.slug,
  })) || [];

  return <HeadlinesExclusiveColumnClient articles={articles} />;
}