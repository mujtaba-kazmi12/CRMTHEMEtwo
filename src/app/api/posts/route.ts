import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Post from "@/models/Post";

export async function GET(request: NextRequest) {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    const categorySlug = searchParams.get("categorySlug");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    try {
        // Scenario 1: Single Post by Slug
        if (slug) {
            const post = await Post.findOne({ slug }).lean();
            if (!post) {
                return NextResponse.json(
                    { success: false, error: "Post not found" },
                    { status: 404 }
                );
            }
            return NextResponse.json({ success: true, post });
        }

        // Scenario 2: List Posts (with Pagination & Category Filter)
        const query: any = {};
        if (categorySlug) {
            query.categorySlug = categorySlug;
        }

        const skip = (page - 1) * limit;

        const [posts, totalPosts] = await Promise.all([
            Post.find(query)
                .sort({ createdAt: -1 }) // Sort by newest first
                .skip(skip)
                .limit(limit)
                .lean(),
            Post.countDocuments(query),
        ]);

        const totalPages = Math.ceil(totalPosts / limit);

        return NextResponse.json({
            success: true,
            posts,
            pagination: {
                currentPage: page,
                totalPages,
                totalPosts,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1,
            },
        });
    } catch (error) {
        console.error("Error fetching posts:", error);
        return NextResponse.json(
            { success: false, error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
