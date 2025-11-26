import CategoryHero from "@/components/CategoryHero";
import WideAdBanner from "@/components/WideAdBanner";
import CategoryPostsSection from "@/components/CategoryPostsSection";
import { normalizeCategorySlug } from "@/services/posts";
import dbConnect from "@/lib/db";
import SEO from "@/models/SEO";
import type { Metadata } from "next";

async function fetchCategorySEO(slug: string) {
    try {
        await dbConnect();
        const seoData = await SEO.findOne({}).lean();

        if (!seoData || !seoData.categories) return null;

        // Find category SEO by slug
        const categorySEO = seoData.categories.find(
            (cat: any) => cat.categorySlug === slug
        );

        return categorySEO;
    } catch (error) {
        console.error("Error fetching category SEO:", error);
        return null;
    }
}

async function fetchCategoryPosts(slug: string) {
    try {
        const dbConnect = (await import("@/lib/db")).default;
        const Post = (await import("@/models/Post")).default;
        await dbConnect();
        
        const posts = await Post.find({ categorySlug: slug })
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
        console.error("Error fetching category posts:", error);
        return [];
    }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const categorySEO = await fetchCategorySEO(slug);
    const categoryName = normalizeCategorySlug(slug);

    if (!categorySEO) {
        return {
            title: `${categoryName} - teacuerdas.com`,
            description: `Browse ${categoryName} articles and news on teacuerdas.com`,
        };
    }

    return {
        title: categorySEO.title || `${categoryName} - teacuerdas.com`,
        description: categorySEO.description || `Browse ${categoryName} articles and news on teacuerdas.com`,
        keywords: categorySEO.keywords || "",
        authors: categorySEO.authors ? [{ name: categorySEO.authors }] : undefined,
    };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const category = normalizeCategorySlug(slug);
    const items = await fetchCategoryPosts(slug);

    // Skip first 2 posts (shown in hero) and show the rest
    const postsForGrid = items.slice(2);

    return (
        <main className="bg-white">
            {/* Hero section at the top of category page */}
            <CategoryHero category={category} posts={items} />

            {/* Wide banner below hero */}
            <WideAdBanner />

            {/* Posts grid with Load more */}
            <CategoryPostsSection items={postsForGrid} />
        </main>
    );
}
