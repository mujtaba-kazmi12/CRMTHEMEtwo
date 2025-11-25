import { Post } from "../services/posts";
import TableOfContents from "./TableOfContents";

// Social Media Icon Component
function SocialIcon({ platform }: { platform: string }) {
  const base = "w-4 h-4 fill-current";
  switch (platform.toLowerCase()) {
    case "facebook":
      return (
        <svg viewBox="0 0 24 24" className={base}>
          <path d="M22 12a10 10 0 10-11.6 9.9v-7h-2.4V12h2.4V9.8c0-2.4 1.4-3.7 3.6-3.7 1 0 2 .2 2 .2v2.2h-1.1c-1.1 0-1.4.7-1.4 1.4V12h2.4l-.4 2.9h-2v7A10 10 0 0022 12z" />
        </svg>
      );
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" className={base}>
          <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm0 2a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H7zm5 3a5 5 0 110 10 5 5 0 010-10zm6.5-.75a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5z" />
        </svg>
      );
    case "twitter":
    case "x":
      return (
        <svg viewBox="0 0 24 24" className={base}>
          <path d="M4 4l7.4 7.4L4 20h3.5l5.6-6.5L18.5 20H22l-7.3-7.3L22 4h-3.5l-5.3 6.2L8.6 4H4z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" className={base}>
          <path d="M4.98 3.5A2.5 2.5 0 102.5 6a2.5 2.5 0 002.48-2.5zM3 8.5h4v12H3v-12zM9 8.5h3.8v1.7h.05c.53-1 1.82-2.05 3.75-2.05 4.01 0 4.75 2.64 4.75 6.07V20.5h-4v-5.4c0-1.29-.03-2.95-1.8-2.95-1.8 0-2.08 1.4-2.08 2.85v5.5H9V8.5z" />
        </svg>
      );
    case "threads":
      return (
        <svg viewBox="0 0 24 24" className={base}>
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
        </svg>
      );
    case "youtube":
      return (
        <svg viewBox="0 0 24 24" className={base}>
          <path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.7 3.5 12 3.5 12 3.5s-7.7 0-9.4.6A3 3 0 00.5 6.2C0 7.9 0 12 0 12s0 4.1.5 5.8a3 3 0 002.1 2.1c1.7.6 9.4.6 9.4.6s7.7 0 9.4-.6a3 3 0 002.1-2.1c.5-1.7.5-5.8.5-5.8s0-4.1-.5-5.8zM9.6 15.5V8.5L15.8 12l-6.2 3.5z" />
        </svg>
      );
    default:
      return null;
  }
}

export type PostDetailData = Post & {
  author?: string;
  readTime?: string;
  tags?: string[];
  content?: string;
  videos?: {
    videoId?: string | null;
    url?: string;
    embedUrl?: string;
    title?: string;
    thumbnail?: string;
    channelTitle?: string;
  }[];
  socialMediaUrls?: {
    instagram?: string[];
    facebook?: string[];
    twitter?: string[];
    linkedin?: string[];
    threads?: string[];
    [key: string]: string[] | undefined;
  };
  faqs?: {
    question: string;
    answer: string;
  }[];
  keyPoints?: string[];
  images?: { url: string; title?: string }[];
};

type PostDetailProps = {
  post?: PostDetailData;
};

// Helper to clean HTML content
const cleanContent = (html: string) => {
  if (!html) return "";
  // Remove iframes
  let cleaned = html.replace(/<iframe\b[^>]*>(.*?)<\/iframe>/gi, "");
  // Remove h1 tags (assuming they are duplicate titles)
  cleaned = cleaned.replace(/<h1\b[^>]*>[\s\S]*?<\/h1>/gi, "");
  return cleaned;
};

export default function PostDetail({
  post = {
    category: "Strategy",
    title: "Kansas City Has a Massive Array of Big National Companies",
    excerpt:
      "Find people with high expectations and a low tolerance for excuses. They'll have higher expectations for you than you...",
    date: "December 14, 2023",
    author: "Arianna Scott",
    readTime: "2 min. Read",
    tags: ["Magazine", "News", "Newspaper"],
    content: "",
  },
}: PostDetailProps) {
  const processedContent = post.content ? cleanContent(post.content) : "";

  return (
    <article>
      {/* Cover image */}
      <div className="rounded-md overflow-hidden bg-gray-200 aspect-[16/9]">
        {post.imageSrc && (
          <img src={post.imageSrc} alt="" className="w-full h-full object-cover" />
        )}
      </div>

      {/* Meta header */}
      <div className="mt-6 flex items-center gap-4 text-xs">
        <span className="uppercase tracking-wide text-red-500 font-semibold">
          {post.category}
        </span>
        {post.readTime && <span className="text-gray-500">{post.readTime}</span>}
      </div>

      {/* Title */}
      <h1 className="mt-3 text-3xl md:text-4xl font-extrabold leading-tight text-[#0e1d3d]">
        {post.title}
      </h1>

      {/* Byline row */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-3 text-sm text-[#0e1d3d]">
          <div className="w-8 h-8 rounded-full bg-gray-300" />
          <div className="flex items-center gap-2">
            {post.author && <span className="font-semibold">Por {post.author}</span>}
            {post.date && (
              <span className="text-gray-500 ml-2">{post.date}</span>
            )}
          </div>
        </div>

        {/* Social Share / Links */}
        <div className="flex items-center gap-2">
          {post.socialMediaUrls && Object.entries(post.socialMediaUrls).map(([platform, urls]) => {
            if (!urls || urls.length === 0) return null;
            const url = urls[0];
            return (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded bg-[#0e1d3d] text-white flex items-center justify-center hover:bg-red-500 transition-colors"
                aria-label={`Visitar ${platform}`}
              >
                <SocialIcon platform={platform} />
              </a>
            );
          })}
        </div>
      </div>

      {/* Key Points */}
      {post.keyPoints && post.keyPoints.length > 0 && (
        <div className="mt-8 p-6 bg-gray-50 rounded-lg border-l-4 border-red-500">
          <h3 className="text-lg font-bold text-[#0e1d3d] mb-4 uppercase tracking-wide">Puntos Clave</h3>
          <ul className="space-y-2">
            {post.keyPoints.map((point, idx) => (
              <li key={idx} className="flex items-start gap-3 text-[#0e1d3d]/80">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Table of contents (Commented out) */}
      {/* <div className="mt-6">
        <TableOfContents
          items={[
            { id: "overview", text: "Resumen" },
            ...(post.videos && post.videos.length > 0 ? [{ id: "videos", text: "Videos" }] : []),
            ...(post.faqs && post.faqs.length > 0 ? [{ id: "faqs", text: "Preguntas Frecuentes" }] : []),
          ]}
        />
      </div> */}

      {/* Body paragraphs with Prose styles */}
      <div id="overview" className="mt-6 scroll-mt-24">
        {processedContent ? (
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: processedContent }} />
        ) : (
          <div className="prose max-w-none">
            <p>
              Encuentra personas con altas expectativas y poca tolerancia a las excusas. Tendrán mayores expectativas de ti que tú
              de ti mismo. No te hagas la ilusión de que esto tiene mucho que ver contigo: así son ellos. No busques
              "amabilidad" en estas relaciones. Busca confianza.
            </p>
          </div>
        )}
      </div>

      {/* Second Image (Bottom of content) */}
      {post.images && post.images.length > 1 && (
        <div className="mt-8 rounded-md overflow-hidden bg-gray-200 aspect-[16/9]">
          <img src={post.images[1].url} alt={post.images[1].title || ""} className="w-full h-full object-cover" />
        </div>
      )}

      {/* Videos Section */}
      {post.videos && post.videos.length > 0 && (
        <div id="videos" className="mt-12 scroll-mt-24">
          <h3 className="text-2xl font-bold text-[#0e1d3d] mb-6 border-b pb-2">Videos Relacionados</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {post.videos.map((video, idx) => (
              <div key={idx} className="space-y-2">
                <div className="aspect-video rounded-lg overflow-hidden bg-black">
                  {video.embedUrl ? (
                    <iframe
                      src={video.embedUrl}
                      title={video.title || "Video"}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/50">
                      Sin Vista Previa
                    </div>
                  )}
                </div>
                {video.title && (
                  <h4 className="font-semibold text-[#0e1d3d] leading-tight">{video.title}</h4>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FAQs Section */}
      {post.faqs && post.faqs.length > 0 && (
        <div id="faqs" className="mt-12 scroll-mt-24">
          <h3 className="text-2xl font-bold text-[#0e1d3d] mb-6 border-b pb-2">Preguntas Frecuentes</h3>
          <div className="space-y-4">
            {post.faqs.map((faq, idx) => (
              <div key={idx} className="bg-gray-50 rounded-lg p-5">
                <h4 className="font-bold text-[#0e1d3d] mb-2">{faq.question}</h4>
                <p className="text-[#0e1d3d]/80 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-2 border-t pt-6">
          {post.tags.map((t) => (
            <span
              key={t}
              className="text-xs uppercase tracking-wide rounded bg-[#0e1d3d] text-white px-2 py-1"
            >
              {t}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}