import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import dbConnect from "../lib/db";
import SEO from "../models/SEO";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

async function fetchSEOMetadata() {
  try {
    await dbConnect();
    const seoData = await SEO.findOne({}).lean();
    return seoData;
  } catch (error) {
    console.error("Error fetching SEO metadata:", error);
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const seoData = await fetchSEOMetadata();

  if (!seoData) {
    return {
      title: "teacuerdas.com",
      description: "Your destination for news, trends, and stories that matter.",
    };
  }

  const metadata: Metadata = {
    title: seoData.metaTitle || "teacuerdas.com",
    description: seoData.metaDescription || "Your destination for news, trends, and stories that matter.",
    keywords: seoData.metaKeywords || "",
    robots: seoData.robotsDirective || "index, follow",
    openGraph: {
      title: seoData.ogTitle || seoData.metaTitle || "teacuerdas.com",
      description: seoData.ogDescription || seoData.metaDescription || "",
      images: seoData.ogImageUrl ? [{ url: seoData.ogImageUrl }] : [],
      type: "website",
    },
    twitter: {
      card: (seoData.twitterCardType as "summary" | "summary_large_image" | "app" | "player") || "summary_large_image",
      title: seoData.twitterTitle || seoData.metaTitle || "teacuerdas.com",
      description: seoData.twitterDescription || seoData.metaDescription || "",
      images: seoData.twitterImageUrl ? [seoData.twitterImageUrl] : [],
    },
  };

  if (seoData.canonicalURL) {
    metadata.alternates = {
      canonical: seoData.canonicalURL,
    };
  }

  return metadata;
}

async function fetchCategories() {
  try {
    const dbConnect = (await import("@/lib/db")).default;
    const Category = (await import("@/models/Category")).default;
    await dbConnect();
    const categories = await Category.find({}).sort({ sequence: 1, name: 1 }).lean();
    return JSON.parse(JSON.stringify(categories));
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = await fetchCategories();

  return (
    <html lang="en">
      <head>
        {/* Critical CSS for above-the-fold content */}
        <style dangerouslySetInnerHTML={{
          __html: `
            :root{--background:#ffffff;--foreground:#171717}
            body{background:var(--background);color:var(--foreground);font-family:Arial,Helvetica,sans-serif;margin:0;padding:0}
            *{box-sizing:border-box}
            .antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
          `
        }} />
        {/* DNS Prefetch and Preconnect for external resources */}
        <link rel="dns-prefetch" href="https://teacuerdas.com" />
        <link rel="preconnect" href="https://teacuerdas.com" crossOrigin="anonymous" />
        {/* Firebase Storage for images */}
        <link rel="dns-prefetch" href="https://firebasestorage.googleapis.com" />
        <link rel="preconnect" href="https://firebasestorage.googleapis.com" crossOrigin="anonymous" />
        {/* Google Fonts */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-P5JCXEFTRY"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-P5JCXEFTRY');
          `}
        </Script>

        <Header categories={categories} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
