import HeroSection from "../components/HeroSection";
import HeadlinesSection from "../components/HeadlinesSection";
import WideAdBanner from "../components/WideAdBanner";
import ThreeColumnSection from "../components/ThreeColumnSection";
import EditorsChoiceSection from "../components/EditorsChoiceSection";
import RecentPostsSection from "../components/RecentPostsSection";
import PopularCategories from "../components/PopularCategories";


// Revalidate every 60 seconds (ISR)
export const revalidate = 60;

export default function Home() {
  return (
    <main className="bg-white">
      {/* Hero Sectionsssss */}
      <HeroSection />
      {/* Headlines Section */}
      <HeadlinesSection />
      {/* Banner below Headlines */}
      <WideAdBanner />
      {/* Three Column Categories Section */}
      <ThreeColumnSection />


      {/* Banner below column section */}
      <WideAdBanner />

      {/* New: Publicaciones Recientes with 70/30 layout */}
      <RecentPostsSection popularCategoriesSlot={<PopularCategories />} />
    </main>
  );
}
