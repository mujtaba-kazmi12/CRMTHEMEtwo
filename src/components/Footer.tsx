function Icon({ name, className = "" }: { name: string; className?: string }) {
  const base = "w-5 h-5 fill-current";
  switch (name) {
    case "facebook":
      return (
        <svg viewBox="0 0 24 24" className={`${base} ${className}`}>
          <path d="M22 12a10 10 0 10-11.6 9.9v-7h-2.4V12h2.4V9.8c0-2.4 1.4-3.7 3.6-3.7 1 0 2 .2 2 .2v2.2h-1.1c-1.1 0-1.4.7-1.4 1.4V12h2.4l-.4 2.9h-2v7A10 10 0 0022 12z" />
        </svg>
      );
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" className={`${base} ${className}`}>
          <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm0 2a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H7zm5 3a5 5 0 110 10 5 5 0 010-10zm6.5-.75a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" className={`${base} ${className}`}>
          <path d="M4.98 3.5A2.5 2.5 0 102.5 6a2.5 2.5 0 002.48-2.5zM3 8.5h4v12H3v-12zM9 8.5h3.8v1.7h.05c.53-1 1.82-2.05 3.75-2.05 4.01 0 4.75 2.64 4.75 6.07V20.5h-4v-5.4c0-1.29-.03-2.95-1.8-2.95-1.8 0-2.08 1.4-2.08 2.85v5.5H9V8.5z" />
        </svg>
      );
    case "x":
      return (
        <svg viewBox="0 0 24 24" className={`${base} ${className}`}>
          <path d="M4 4l7.4 7.4L4 20h3.5l5.6-6.5L18.5 20H22l-7.3-7.3L22 4h-3.5l-5.3 6.2L8.6 4H4z" />
        </svg>
      );
    case "youtube":
      return (
        <svg viewBox="0 0 24 24" className={`${base} ${className}`}>
          <path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.7 3.5 12 3.5 12 3.5s-7.7 0-9.4.6A3 3 0 00.5 6.2C0 7.9 0 12 0 12s0 4.1.5 5.8a3 3 0 002.1 2.1c1.7.6 9.4.6 9.4.6s7.7 0 9.4-.6a3 3 0 002.1-2.1c.5-1.7.5-5.8.5-5.8s0-4.1-.5-5.8zM9.6 15.5V8.5L15.8 12l-6.2 3.5z" />
        </svg>
      );
    default:
      return null;
  }
}

type Category = {
  _id: string;
  name: string;
  slug: string;
  sequence: number;
};

type Post = {
  _id: string;
  slug: string;
  blogContent: {
    title: string;
  };
};

export default async function Footer() {
  const topLinks = [
    { label: "SOBRE NOSOTROS", href: "/about-us" },
    { label: "CONTACTO", href: "/contact-us" },
    { label: "POLÍTICA DE PRIVACIDAD", href: "/policy" },
  ];

  // Texto por defecto del footer en español
  let footerContent = "Free News - Donde las voces se unen, las historias florecen y la comunidad prospera a través del diálogo abierto y conexiones significativas.";
  try {
    const dbConnect = (await import("@/lib/db")).default;
    const SEO = (await import("@/models/SEO")).default;
    await dbConnect();
    const seoData = await SEO.findOne({}).lean();
    if (seoData && seoData.footerContent) {
      footerContent = seoData.footerContent;
    }
  } catch (error) {
    console.error("Failed to fetch SEO data:", error);
  }

  // Fetch categories directly from database
  let categories: Category[] = [];
  try {
    const dbConnect = (await import("@/lib/db")).default;
    const CategoryModel = (await import("@/models/Category")).default;
    await dbConnect();
    const result = await CategoryModel.find({}).sort({ sequence: 1, name: 1 }).lean();
    categories = JSON.parse(JSON.stringify(result));
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }

  // Fetch posts directly from database (limit to 4)
  let posts: Post[] = [];
  try {
    const dbConnect = (await import("@/lib/db")).default;
    const PostModel = (await import("@/models/Post")).default;
    await dbConnect();
    const result = await PostModel.find({})
      .sort({ createdAt: -1 })
      .limit(4)
      .lean();
    posts = JSON.parse(JSON.stringify(result));
  } catch (error) {
    console.error("Failed to fetch posts:", error);
  }

  return (
    <footer className="bg-[#0e1d3d] text-white">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Top row: logo + red divider + top links */}
        <div className="flex items-center gap-4">
          <div className="text-4xl font-bold">fn</div>
          <div className="flex-1 h-[2px] bg-red-500" />
          <div className="flex items-center gap-6 ml-auto text-xs text-gray-300">
            {topLinks.map((l) => (
              <a key={l.label} href={l.href} className="hover:text-red-400">
                {l.label}
              </a>
            ))}
          </div>
        </div>

        {/* Branding + columns */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left branding */}
          <div className="md:col-span-3">
            <p className="text-sm text-gray-300 leading-relaxed">
              {footerContent}
            </p>
          </div>

          {/* Categories column */}
          <div className="md:col-span-3">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Categorías</h3>
              <div className="h-[1px] w-6 bg-red-500" />
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <a href="/" className="hover:text-red-400">Inicio</a>
                </li>
                {categories.map((category) => (
                  <li key={category._id}>
                    <a href={`/categories/${category.slug}`} className="hover:text-red-400">
                      {category.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Headlines column */}
          <div className="md:col-span-3">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Titulares</h3>
              <div className="h-[1px] w-6 bg-red-500" />
              <ul className="space-y-3">
                {posts.map((post) => (
                  <li key={post._id} className="text-sm text-gray-300">
                    <a href={`/${post.slug}`} className="block hover:text-red-400">
                      {post.blogContent.title}
                    </a>
                    <div className="mt-2 h-[2px] w-20 bg-gray-500/50" />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter column */}
          <div className="md:col-span-3">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Boletín</h3>
              <div className="h-[1px] w-6 bg-red-500" />
              <p className="text-sm text-gray-300">
                Recibe noticias importantes directamente en tu bandeja de entrada y mantente conectado.
              </p>
              <form className="flex items-center gap-2">
                <input
                  type="email"
                  placeholder="Tu dirección de correo electrónico"
                  className="flex-1 rounded bg-white/10 border border-white/20 px-3 py-2 text-sm placeholder:text-gray-300 focus:outline-none focus:ring-1 focus:ring-red-500"
                />
                <button
                  type="button"
                  className="rounded bg-red-600 hover:bg-red-500 px-4 py-2 text-xs font-semibold"
                >
                  SUSCRIBIRSE
                </button>
              </form>
              <label className="flex items-center gap-2 text-xs text-gray-300">
                <input type="checkbox" className="accent-red-600" />
                <span>
                  He leído y acepto la <a href="/privacy" className="underline hover:text-red-400">Política de Privacidad</a>.
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 border-t border-white/10 pt-4 flex items-center justify-between">
          <div className="text-xs text-gray-300">© Todos los derechos reservados</div>
          <div className="flex items-center gap-4 text-gray-300">
            <a href="#" aria-label="Facebook" className="hover:text-red-400"><Icon name="facebook" /></a>
            <a href="#" aria-label="LinkedIn" className="hover:text-red-400"><Icon name="linkedin" /></a>
            <a href="#" aria-label="YouTube" className="hover:text-red-400"><Icon name="youtube" /></a>
            <a href="#" aria-label="X" className="hover:text-red-400"><Icon name="x" /></a>
            <a href="#" aria-label="Instagram" className="hover:text-red-400"><Icon name="instagram" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}