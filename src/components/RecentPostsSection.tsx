import RecentPostsSectionClient from "./RecentPostsSectionClient";
import PopularList from "./PopularList";

type PopularItem = {
  category: string;
  title: string;
  imageSrc?: string;
};

async function fetchPopularPosts(): Promise<PopularItem[]> {
  try {
    const dbConnect = (await import("@/lib/db")).default;
    const Category = (await import("@/models/Category")).default;
    const Post = (await import("@/models/Post")).default;
    await dbConnect();

    // 1. Find category with sequence 8
    const targetCategory = await Category.findOne({ sequence: 8 }).lean();
    if (!targetCategory) return [];

    // 2. Fetch posts for that category
    const posts = await Post.find({ categorySlug: (targetCategory as any).slug })
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    // 3. Map to PopularItem
    return (posts as any[]).map((post: any) => ({
      category: post.categorySlug || targetCategory.name,
      title: post.blogContent?.title || "Untitled",
      imageSrc: post.firebaseImages?.[0]?.url || undefined,
    }));

  } catch (error) {
    console.error("Error fetching popular posts:", error);
    return [];
  }
}

async function fetchPosts(page: number = 1, limit: number = 9) {
  try {
    const dbConnect = (await import("@/lib/db")).default;
    const Post = (await import("@/models/Post")).default;
    await dbConnect();

    const skip = (page - 1) * limit;
    const [posts, totalPosts] = await Promise.all([
      Post.find({})
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Post.countDocuments({})
    ]);

    const totalPages = Math.ceil(totalPosts / limit);

    return {
      posts: JSON.parse(JSON.stringify(posts)),
      pagination: {
        currentPage: page,
        totalPages,
        totalPosts,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      }
    };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return null;
  }
}

type RecentPostsSectionProps = {
  popularCategoriesSlot: React.ReactNode;
};

export default async function RecentPostsSection({ popularCategoriesSlot }: RecentPostsSectionProps) {
  // Fetch initial 9 posts
  const data = await fetchPosts(1, 9);

  // Fetch popular posts (sequence 8)
  const popularPosts = await fetchPopularPosts();

  // Map posts to the format expected by HeadlineCard
  const initialPosts = data?.posts?.map((post: any) => ({
    id: post._id?.toString() || post._id,
    category: post.categorySlug || "News",
    title: post.blogContent?.title || "Untitled",
    excerpt: post.blogContent?.summary || post.blogContent?.metaDescription || "",
    imageSrc: post.firebaseImages?.[0]?.url || undefined,
    date: new Date(post.createdAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    slug: post.slug,
  })) || [];

  const pagination = data?.pagination || {
    currentPage: 1,
    totalPages: 1,
    totalPosts: 0,
    hasNextPage: false,
  };

  return (
    <RecentPostsSectionClient
      initialPosts={initialPosts}
      initialPagination={pagination}
      popularCategoriesSlot={popularCategoriesSlot}
      popularListSlot={<PopularList items={popularPosts} />}
    />
  );
}