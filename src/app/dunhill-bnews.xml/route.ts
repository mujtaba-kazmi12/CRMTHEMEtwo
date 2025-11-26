import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Post from '@/models/Post';

export async function GET() {
    try {
        await dbConnect();

        const posts = await Post.find({
            postType: 'news',
            'newsMetadata.originalUrl': { $regex: 'bing.com', $options: 'i' },
        }, 'slug updatedAt createdAt blogContent.title blogContent.detectedLanguage').sort({ createdAt: -1 }).lean();

        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap-style.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  ${posts
                .map((post) => {
                    const title = post.blogContent?.title || 'Untitled';
                    const language = post.blogContent?.detectedLanguage || 'en';
                    const publicationDate = new Date(post.createdAt || post.updatedAt).toISOString();

                    return `
  <url>
    <loc>${baseUrl}/${post.slug}</loc>
    <news:news>
      <news:publication>
        <news:name>Dunhill News</news:name>
        <news:language>${language}</news:language>
      </news:publication>
      <news:publication_date>${publicationDate}</news:publication_date>
      <news:title>${title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')}</news:title>
    </news:news>
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
