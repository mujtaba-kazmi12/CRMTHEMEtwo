import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Post from '@/models/Post';

export async function GET() {
    try {
        await dbConnect();

        const posts = await Post.find({
            $nor: [
                {
                    postType: 'news',
                    'newsMetadata.originalUrl': { $regex: 'news.google.com', $options: 'i' },
                },
                {
                    postType: 'news',
                    'newsMetadata.originalUrl': { $regex: 'bing.com', $options: 'i' },
                },
                {
                    postType: 'news',
                    'newsMetadata.originalUrl': { $regex: 'yahoo.com', $options: 'i' },
                },
                {
                    postType: 'news',
                    'newsMetadata.originalUrl': { $regex: 'www.investors.com', $options: 'i' },
                },
            ],
        }, 'slug updatedAt createdAt').sort({ createdAt: -1 }).lean();
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap-style.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${posts
                .map((post) => {
                    return `
  <url>
    <loc>${baseUrl}/${post.slug}</loc>
    <lastmod>${new Date(post.updatedAt || post.createdAt).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
                })
                .join('')}
</urlset>`;

        return new NextResponse(sitemap, {
            headers: {
                'Content-Type': 'text/xml',
            },
        });
    } catch (error) {
        console.error('Error generating sitemap:', error);
        return new NextResponse('Error generating sitemap', { status: 500 });
    }
}
