import HeadlinesRightColumnClient from "./HeadlinesRightColumnClient";

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
            .limit(7)
            .lean();
        return JSON.parse(JSON.stringify(posts));
    } catch (error) {
        console.error("Failed to fetch posts:", error);
        return null;
    }
}

export default async function HeadlinesRightColumn() {
    // Fetch categories and find the one with sequence: 4
    const categories = await fetchCategories();
    const fourthCategory = categories?.find((cat: any) => cat.sequence === 4);

    // Fetch 7 posts from that category
    const posts = fourthCategory ? await fetchPosts(fourthCategory.slug) : [];

    // Skip the first 4 posts and take the remaining 3 (posts 5-7)
    const items = posts?.slice(4, 7).map((post: any) => ({
        imageSrc: post.firebaseImages?.[0]?.url || undefined,
        category: fourthCategory?.name || "",
        title: post.blogContent?.title || "Sin título",
        date: new Date(post.createdAt).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }),
        slug: post.slug,
    })) || [];

    return <HeadlinesRightColumnClient items={items} />;
}
