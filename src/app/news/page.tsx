import CategoryHero from "@/components/CategoryHero";
import WideAdBanner from "@/components/WideAdBanner";
import CategoryPostsSection from "@/components/CategoryPostsSection";
import dbConnect from "@/lib/db";
import SEO from "@/models/SEO";
import type { Metadata } from "next";

async function fetchNewsSEO() {
    try {
        await dbConnect();
        const seoData = await SEO.findOne({}).lean();

        if (!seoData || !seoData.categories) return null;

        // Find news SEO by slug 'news'
        const newsSEO = seoData.categories.find(
            (cat: any) => cat.categorySlug === 'news'
        );

        return newsSEO;
    } catch (error) {
        console.error("Error fetching news SEO:", error);
        return null;
    }
}

async function fetchNewsPosts() {
    try {
        const dbConnect = (await import("@/lib/db")).default;
        const Post = (await import("@/models/Post")).default;
        await dbConnect();
        
        // Filter posts from Yahoo News and Bing News
        const posts = await Post.find({
            $or: [
                {
                    postType: 'news',
                    'newsMetadata.originalUrl': { $regex: 'yahoo.com', $options: 'i' },
                },
                {
                    postType: 'news',
                    'newsMetadata.originalUrl': { $regex: 'www.investors.com', $options: 'i' },
                },
                {
                    postType: 'news',
                    'newsMetadata.originalUrl': { $regex: 'bing.com', $options: 'i' },
                }
            ]
        })
            .sort({ createdAt: -1 })
            .limit(100)
            .lean();

        return JSON.parse(JSON.stringify(posts)).map((post: any) => ({
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
        }));
    } catch (error) {
        console.error("Error fetching news posts:", error);
        return [];
    }
}

export async function generateMetadata(): Promise<Metadata> {
    const newsSEO = await fetchNewsSEO();

    if (!newsSEO) {
        return {
            title: "News - teacuerdas.com",
            description: "Browse latest news from Yahoo News and Bing News on teacuerdas.com",
        };
    }

    return {
        title: newsSEO.title || "News - teacuerdas.com",
        description: newsSEO.description || "Browse latest news from Yahoo News and Bing News on teacuerdas.com",
        keywords: newsSEO.keywords || "",
        authors: newsSEO.authors ? [{ name: newsSEO.authors }] : undefined,
    };
}

export default async function NewsPage() {
    const items = await fetchNewsPosts();

    // Skip first 2 posts (shown in hero) and show the rest
    const postsForGrid = items.slice(2);

    return (
        <main className="bg-white">
            {/* Hero section at the top of news page */}
            <CategoryHero category="News" posts={items} />

            {/* Wide banner below hero */}
            <WideAdBanner />

            {/* Posts grid with Load more */}
            <CategoryPostsSection items={postsForGrid} />
        </main>
    );
}
