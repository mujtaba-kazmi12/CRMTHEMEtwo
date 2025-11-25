export type Post = {
  category: string;
  title: string;
  excerpt: string;
  imageSrc?: string;
  date?: string;
};

// Centralized sample dataset reused across pages
export const allPosts: Post[] = [
  // Food
  {
    category: "Food",
    title: "This Week in Houston Food Blogs: High-Protein Recipes and Low Fat Shakes",
    excerpt:
      "Find people with high expectations and a low tolerance for excuses. They'll have higher expectations for you than you...",
  },
  {
    category: "Food",
    title: "Moroccan Salmon with Garlic Mayonnaise is Common in Southern Spain",
    excerpt:
      "Find people with high expectations and a low tolerance for excuses. They'll have higher expectations for you than you...",
  },
  {
    category: "Food",
    title: "Best Places to Get Your Mexican Food Fix When You Visit Mexico City",
    excerpt:
      "Find people with high expectations and a low tolerance for excuses. They'll have higher expectations for you than you...",
  },
  {
    category: "Food",
    title: "The Best Pork Kebabs With Grilled Plums and Couscous is Found in Poland",
    excerpt:
      "Find people with high expectations and a low tolerance for excuses. They'll have higher expectations for you than you...",
  },

  // Travel
  {
    category: "Travel",
    title:
      "10 Things You Should Know Before You Visit South America’s Jungles",
    excerpt:
      "Find people with high expectations and a low tolerance for excuses. They'll have higher expectations for you than you...",
  },
  {
    category: "Travel",
    title:
      "Ultimate Guide to Vienna’s Coffee Renaissance Packed in One Weekend",
    excerpt:
      "Find people with high expectations and a low tolerance for excuses. They'll have higher expectations for you than you...",
  },

  // Tech
  {
    category: "Tech",
    title:
      "The Hottest Wearable Tech and Smart Gadgets of the Year Will Amaze You",
    excerpt:
      "Find people with high expectations and a low tolerance for excuses. They'll have higher expectations for you than you...",
  },
  {
    category: "Tech",
    title:
      "New Technology Will Help Keep Your Smart Home from Becoming Obsolete",
    excerpt:
      "Find people with high expectations and a low tolerance for excuses. They'll have higher expectations for you than you...",
  },
  {
    category: "Tech",
    title:
      "Apple Computers Climb the List of the Top Gadgets in Forbes Magazine",
    excerpt:
      "Find people with high expectations and a low tolerance for excuses. They'll have higher expectations for you than you...",
  },

  // Finance
  {
    category: "Finance",
    title: "Boxtrade Lands $50 Million in Another New Funding Round with IBM",
    excerpt:
      "Find people with high expectations and a low tolerance for excuses. They'll have higher expectations for you than you...",
  },

  // Politics
  {
    category: "Politics",
    title: "The Politics Behind Morocco’s Stock Market Turbulence Last Year",
    excerpt:
      "Find people with high expectations and a low tolerance for excuses. They'll have higher expectations for you than you...",
  },
  {
    category: "Politics",
    title: "Expanding Peaceful Political Climate Gears up for this Election",
    excerpt:
      "Find people with high expectations and a low tolerance for excuses. They'll have higher expectations for you than you...",
  },
  {
    category: "Politics",
    title: "Things You Didn’t Know About the American Past Politicians",
    excerpt:
      "Find people with high expectations and a low tolerance for excuses. They'll have higher expectations for you than you...",
  },
];

export const knownCategories = [
  "business",
  "lifestyle",
  "travel",
  "food",
  "tech",
  "finance",
  "politics",
  "marketing",
  "strategy",
];

export function normalizeCategorySlug(slug: string): string {
  // convert "travel" -> "Travel"
  const lower = slug.toLowerCase();
  return lower.charAt(0).toUpperCase() + lower.slice(1);
}

export function getPostsByCategory(slug: string): Post[] {
  const category = normalizeCategorySlug(slug);
  return allPosts.filter((p) => p.category.toLowerCase() === category.toLowerCase());
}

export function slugifyTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export type PostWithSlug = Post & { slug: string };

export function allPostsWithSlugs(): PostWithSlug[] {
  return allPosts.map((p) => ({ ...p, slug: slugifyTitle(p.title) }));
}

export function getPostBySlug(slug: string): PostWithSlug | undefined {
  return allPostsWithSlugs().find((p) => p.slug === slug);
}