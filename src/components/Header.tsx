"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { getCurrentDateString } from "../services/date";

const BRAND_W = 120;
const BRAND_W2 = 320; // width reserved for big left brand

export type Category = {
  _id: string;
  name: string;
  slug: string;
  sequence: number;
};

type HeaderProps = {
  categories?: Category[];
};

function BrandMark() {
  return (
    <Link href="/" className="block select-none">
      <span className="text-white font-serif text-[64px] sm:text-[72px] md:text-[96px] font-bold leading-none tracking-tight">
        fn
      </span>
      <span
        className="ml-1 inline-block w-2.5 h-2.5 rounded-full bg-red-500"
        aria-hidden
      />
    </Link>
  );
}

function Icon({ name, className = "" }: { name: string; className?: string }) {
  // Inline icons sized to match screenshot aesthetics
  const base = "w-5 h-5 fill-current";
  switch (name) {
    case "search":
      return (
        <svg viewBox="0 0 24 24" className={`${base} ${className}`}>
          <path d="M10 4a6 6 0 104.472 10.072l4.128 4.128a1 1 0 001.414-1.414l-4.128-4.128A6 6 0 0010 4zm0 2a4 4 0 110 8 4 4 0 010-8z" />
        </svg>
      );
    case "user":
      return (
        <svg viewBox="0 0 24 24" className={`${base} ${className}`}>
          <path d="M12 12a5 5 0 100-10 5 5 0 000 10zm-8 9a8 8 0 1116 0H4z" />
        </svg>
      );
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
    case "chevron":
      return (
        <svg viewBox="0 0 24 24" className={`${base} ${className}`}>
          <path d="M7 10l5 5 5-5H7z" />
        </svg>
      );
    case "menu":
      return (
        <svg viewBox="0 0 24 24" className={`${base} ${className}`}>
          <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
        </svg>
      );
    case "cloud":
      return (
        <svg viewBox="0 0 24 24" className={`${base} ${className}`}>
          <path d="M6 18h10a4 4 0 100-8 5 5 0 00-9.8 1.3A3 3 0 006 18z" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Header({ categories = [] }: HeaderProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [accountOpen, setAccountOpen] = useState(false);
  const dateDisplay = getCurrentDateString();

  const handleMobileLinkClick = () => {
    setMobileOpen(false);
  };

  const topLinks = [
    { label: "SOBRE NOSOTROS", href: "/about-us" },
    { label: "CONTACTO", href: "/contact-us" },
    { label: "POLÍTICA DE PRIVACIDAD", href: "/policy" },
    { label: "DESCARGO DE RESPONSABILIDAD", href: "/disclaimer" },
  ];

  // Sort categories by sequence
  const sortedCategories = [...categories].sort((a, b) => a.sequence - b.sequence);

  const mainNav = [
    { label: "INICIO", href: "/", dropdown: false },
    ...sortedCategories.map((cat) => ({
      label: cat.name,
      href: `/categories/${cat.slug}`,
      dropdown: false,
    })),
  ];

  return (
    <header className="w-full bg-[#0e1d3d] text-white">
      <div className="mx-auto max-w-7xl px-4 relative">
        {/* Top row: 30% left (fn+date+weather), 70% right (utilities+socials) */}
        <div className="flex flex-col md:flex-row py-3 gap-2">
          <div className="md:basis-[30%] flex items-center justify-between md:justify-start gap-3">
            <BrandMark />
            {/* Mobile-only utilities: account + search */}
            <div className="md:hidden flex items-center gap-3 text-white/80">
              <div className="relative">
                <button aria-label="Cuenta" className="hover:text-white" type="button" onClick={() => { setAccountOpen((v) => !v); setSearchOpen(false); }}>
                  <Icon name="user" />
                </button>
                {accountOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setAccountOpen(false)} />
                    <div className="absolute right-0 top-[30px] z-50">
                      <div className="relative">
                        <span className="absolute -top-2 right-6 w-0 h-0 border-l-6 border-r-6 border-b-6 border-l-transparent border-r-transparent border-b-red-500" />
                        <div className="bg-white rounded shadow-lg border-t-2 border-red-500 p-4 w-[280px]">
                          <div className="text-[#0e1d3d] font-semibold">Accede a tu cuenta.</div>
                          <div className="mt-3">
                            <Link href="/account" className="inline-block bg-red-500 text-white font-semibold rounded px-4 py-2">Iniciar sesión</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className="relative">
                <button aria-label="Buscar" className="hover:text-white" type="button" onClick={() => { setSearchOpen((v) => !v); setAccountOpen(false); }}>
                  <Icon name="search" />
                </button>
                {searchOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setSearchOpen(false)} />
                    <div className="absolute right-0 top-[30px] z-50">
                      <div className="relative">
                        <span className="absolute -top-2 right-6 w-0 h-0 border-l-6 border-r-6 border-b-6 border-l-transparent border-r-transparent border-b-red-500" />
                        <div className="bg-white rounded shadow-lg border-t-2 border-red-500 p-4 md:p-5 w-[min(92vw,480px)]">
                          <form onSubmit={(e) => { e.preventDefault(); }}>
                            <div className="flex items-center gap-3">
                              <input
                                type="text"
                                placeholder="Buscar artículos..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="flex-1 h-10 rounded-full border border-gray-300 px-5 outline-none focus:ring-2 focus:ring-red-500 text-gray-900"
                              />
                              <button type="submit" className="h-10 px-5 rounded-full bg-red-500 text-white font-semibold">BUSCAR</button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            {/* Desktop-only date (weather removed) */}
            <div className="hidden md:flex flex-col items-start gap-2">
              <span className="text-sm text-white font-semibold" suppressHydrationWarning>{dateDisplay}</span>
            </div>
          </div>

          <div className="md:basis-[70%] flex flex-col">
            <div className="hidden md:flex items-center justify-end gap-4 py-3">
              <nav className="flex items-center gap-4 text-xs">
                {topLinks.map((l) => (
                  <Link key={l.label} href={l.href} className="hover:text-white/90">
                    {l.label}
                  </Link>
                ))}
              </nav>
              <div className="flex items-center gap-3 text-white/80">
                <div className="relative">
                  <button aria-label="Cuenta" className="hover:text-white" type="button" onClick={() => { setAccountOpen((v) => !v); setSearchOpen(false); }}>
                    <Icon name="user" />
                  </button>
                  {accountOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setAccountOpen(false)} />
                      <div className="absolute right-0 top-[30px] z-50">
                        <div className="relative">
                          <span className="absolute -top-2 right-6 w-0 h-0 border-l-6 border-r-6 border-b-6 border-l-transparent border-r-transparent border-b-red-500" />
                          <div className="bg-white rounded shadow-lg border-t-2 border-red-500 p-4 w-[280px]">
                            <div className="text-[#0e1d3d] font-semibold">Accede a tu cuenta.</div>
                            <div className="mt-3">
                              <Link href="/account" className="inline-block bg-red-500 text-white font-semibold rounded px-4 py-2">Iniciar sesión</Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <div className="relative">
                  <button aria-label="Buscar" className="hover:text-white" type="button" onClick={() => { setSearchOpen((v) => !v); setAccountOpen(false); }}>
                    <Icon name="search" />
                  </button>
                  {searchOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setSearchOpen(false)} />
                      <div className="absolute right-0 top-[30px] z-50">
                        <div className="relative">
                          <span className="absolute -top-2 right-6 w-0 h-0 border-l-6 border-r-6 border-b-6 border-l-transparent border-r-transparent border-b-red-500" />
                          <div className="bg-white rounded shadow-lg border-t-2 border-red-500 p-4 md:p-5 w-[min(92vw,480px)]">
                            <form onSubmit={(e) => { e.preventDefault(); }}>
                              <div className="flex items-center gap-3">
                                <input
                                  type="text"
                                  placeholder="Buscar artículos..."
                                  value={searchQuery}
                                  onChange={(e) => setSearchQuery(e.target.value)}
                                  className="flex-1 h-10 rounded-full border border-gray-300 px-5 outline-none focus:ring-2 focus:ring-red-500 text-gray-900"
                                />
                                <button type="submit" className="h-10 px-5 rounded-full bg-red-500 text-white font-semibold">BUSCAR</button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <span className="w-px h-4 bg-gray-200" />
                <Link href="#" aria-label="Facebook" className="hover:text-white">
                  <Icon name="facebook" />
                </Link>
                <Link href="#" aria-label="Instagram" className="hover:text-white">
                  <Icon name="instagram" />
                </Link>
                <Link href="#" aria-label="X" className="hover:text-white">
                  <Icon name="x" />
                </Link>
                <Link href="#" aria-label="YouTube" className="hover:text-white">
                  <Icon name="youtube" />
                </Link>
              </div>
            </div>
            {/* Search dropdown anchored to the search icon */}
            <div className="h-px bg-gray-200" />
            <div className="flex items-center justify-end py-3">
              <nav className="hidden md:flex items-center gap-6 text-sm">
                {mainNav.map((item) => {
                  const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
                  const isDropdownActive = activeDropdown === item.label;
                  const base = "px-1 py-1 border-b-2 transition-colors whitespace-nowrap";
                  const stateCls = isActive
                    ? "border-red-500 text-red-400"
                    : isDropdownActive
                      ? "border-red-500 text-red-400"
                      : "border-transparent hover:border-red-500";
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      aria-expanded={item.dropdown ? isDropdownActive : undefined}
                      onClick={(e) => {
                        if (item.dropdown) {
                          e.preventDefault();
                          setActiveDropdown(isDropdownActive ? null : item.label);
                        }
                      }}
                      onMouseEnter={() => {
                        if (item.dropdown) setActiveDropdown(item.label);
                      }}
                      className={`${base} ${stateCls}`}
                    >
                      <span className="inline-flex items-center gap-1">
                        {item.label}
                        {item.dropdown && <Icon name="chevron" className="w-4 h-4" />}
                      </span>
                    </Link>
                  );
                })}</nav>
              <div className="ml-4 flex items-center gap-4">
                <button
                  className="md:hidden p-2 text-white/80"
                  onClick={() => setMobileOpen((v) => !v)}
                  aria-label="Abrir menú"
                >
                  <Icon name="menu" />
                </button>
                <Link href="/pricing" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500 text-white text-sm font-medium hover:bg-red-600">
                  Suscribirse
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Slide-over menu overlay */}
        <div className={`fixed inset-0 z-50 ${mobileOpen ? 'pointer-events-auto' : 'pointer-events-none'}`} aria-hidden={!mobileOpen}>
          <div className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${mobileOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setMobileOpen(false)} />
          <div className={`absolute right-0 top-0 h-full w-full max-w-[1100px] bg-white text-[#0e1d3d] shadow-xl transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <button onClick={() => setMobileOpen(false)} aria-label="Cerrar menú" className="absolute top-4 right-4 text-[#0e1d3d] hover:text-red-500 text-2xl">✕</button>
            <div className="flex flex-col md:flex-row h-full">
              {/* Left sidebar (hidden on mobile) */}
              <aside className="hidden md:flex md:flex-col w-[260px] bg-[#f5f3f0] border-r border-gray-200">
                {/* Clean sidebar without hot topics */}
                <div className="mt-auto px-6 py-5 flex items-center gap-4">
                  <Icon name="instagram" className="w-5 h-5" />
                  <Icon name="linkedin" className="w-5 h-5" />
                  <Icon name="x" className="w-5 h-5" />
                </div>
              </aside>

              {/* Right content columns */}
              <section className="flex-1 overflow-y-auto px-6 py-6">
                {/* Mobile: show main navigation and top links */}
                <div className="md:hidden">
                  <h3 className="font-serif text-xl font-semibold">Menú</h3>
                  <nav className="mt-3 space-y-1">
                    {mainNav.map((item) => (
                      <div key={item.label} onClick={handleMobileLinkClick}>
                        <Link 
                          href={item.href} 
                          className="block py-2 border-b border-gray-200 text-base hover:text-red-500"
                        >
                          {item.label}
                        </Link>
                      </div>
                    ))}
                  </nav>
                  <div className="mt-4">
                    <h4 className="font-serif text-lg font-semibold">Enlaces principales</h4>
                    <nav className="mt-2 grid grid-cols-2 gap-2">
                      {topLinks.map((l) => (
                        <div key={l.label} onClick={handleMobileLinkClick}>
                          <Link 
                            href={l.href} 
                            className="text-sm hover:text-red-500"
                          >
                            {l.label}
                          </Link>
                        </div>
                      ))}
                    </nav>
                  </div>
                  <div className="mt-4 h-px bg-gray-200" />
                </div>
                {/* Clean right section without menuSections */}
              </section>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}