export async function GET() {
  const robotsTxt = `User-agent: *
Allow: /
Disallow: /dashboard/
Disallow: /login
Disallow: /register
Disallow: /api/`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
