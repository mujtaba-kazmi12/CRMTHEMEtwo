import ThreeColumnSectionClient from "./ThreeColumnSectionClient";

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

async function fetchPostsByCategory(categorySlug: string, limit: number) {
    try {
        const dbConnect = (await import("@/lib/db")).default;
        const Post = (await import("@/models/Post")).default;
        await dbConnect();
        const posts = await Post.find({ categorySlug })
            .sort({ createdAt: -1 })
            .limit(limit)
            .lean();
        return JSON.parse(JSON.stringify(posts));
    } catch (error) {
        console.error("Failed to fetch posts:", error);
        return null;
    }
}

export default async function ThreeColumnSection() {
    // Fetch categories
    const categories = await fetchCategories();

    // TODO: Replace these sequence numbers with the actual categories you want to display
    // For now, I'm using placeholders - you'll specify which sequences to use
    const category1 = categories?.find((cat: any) => cat.sequence === 5); // Travel equivalent
    const category2 = categories?.find((cat: any) => cat.sequence === 6); // Music equivalent
    const category3 = categories?.find((cat: any) => cat.sequence === 8); // Food equivalent

    // Fetch posts for each category (6 posts each: 4 for CategoryColumn + 2 for ArticleCards)
    const [posts1, posts2, posts3] = await Promise.all([
        category1 ? fetchPostsByCategory(category1.slug, 6) : [],
        category2 ? fetchPostsByCategory(category2.slug, 6) : [],
        category3 ? fetchPostsByCategory(category3.slug, 6) : [],
    ]);

    // Map posts to the format expected by CategoryColumn (first 4 posts)
    const mapToArticles = (posts: any[]) => {
        return posts?.slice(0, 4).map((post: any, index: number) => ({
            title: post.blogContent?.title || "Untitled",
            image: post.firebaseImages?.[0]?.url || undefined,
            excerpt: index === 0 ? (post.blogContent?.metaDescription || post.blogContent?.summary || "") : undefined,
            isLarge: index === 0,
            slug: post.slug,
        })) || [];
    };

    // Map posts for ArticleCards (last 2 posts)
    const mapToCards = (posts: any[]) => {
        return posts?.slice(4, 6).map((post: any) => ({
            title: post.blogContent?.title || "Untitled",
            slug: post.slug,
        })) || [];
    };

    const column1Data = {
        category: category1?.name || "Category 1",
        articles: mapToArticles(posts1),
        cards: mapToCards(posts1),
    };

    const column2Data = {
        category: category2?.name || "Category 2",
        articles: mapToArticles(posts2),
        cards: mapToCards(posts2),
    };

    const column3Data = {
        category: category3?.name || "Category 3",
        articles: mapToArticles(posts3),
        cards: mapToCards(posts3),
    };

    return (
        <ThreeColumnSectionClient
            column1={column1Data}
            column2={column2Data}
            column3={column3Data}
        />
    );
}