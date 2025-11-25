import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import dbConnect from "../lib/db";
import SEO from "../models/SEO";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header categories={categories} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
