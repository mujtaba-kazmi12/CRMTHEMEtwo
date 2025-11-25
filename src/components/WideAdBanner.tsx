type WideAdBannerProps = {
  title?: string;
  tagline?: string;
  buttonLabel?: string;
  href?: string;
};

export default function WideAdBanner({
  title = "PERIÓDICO",
  tagline = "Área de anuncios",
  buttonLabel = "Agregar ahora ›",
  href = "#",
}: WideAdBannerProps) {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4">
        {/* Outer top/bottom grey separators */}
        <div className="my-8 border-y border-gray-200">
          {/* Banner body */}
          <div className="bg-gray-50">
            <div className="flex items-center justify-between px-6 py-6">
              {/* Left: title with short grey lines and tagline */}
              <div className="flex items-center gap-4">
                <span className="hidden sm:block h-[2px] w-10 bg-gray-200" />
                <span className="text-[#0e1d3d] font-bold tracking-wide">{title}</span>
                <span className="hidden sm:block h-[2px] w-10 bg-gray-200" />
                <span className="text-gray-600 text-sm">{tagline}</span>
              </div>

              {/* Right: call-to-action button */}
              <a
                href={href}
                className="inline-flex items-center px-5 py-2 bg-[#0e1d3d] text-white text-sm"
                aria-label={buttonLabel}
              >
                {buttonLabel}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}