import HeroLeadCard from "./HeroLeadCard";
import HeroTopicsColumn from "./HeroTopicsColumn";
import HeroHotWeekColumn from "./HeroHotWeekColumn";
import HeroAdBox from "./HeroAdBox";
import FollowUsStats from "./FollowUsStats";
import PopularCategories from "./PopularCategories";
import MiniPostsGrid from "./MiniPostsGrid";
import TwoColumnCategoryList from "./TwoColumnCategoryList";

export default function HeroSection() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* 12-column grid to match theme proportions */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left: lead + utility widgets */}
          <div className="md:col-span-6">
            <div className="space-y-6">
              <HeroLeadCard />
              <MiniPostsGrid />
              <div className="border-t border-gray-200" />
              <TwoColumnCategoryList />
            </div>
          </div>

          {/* Middle: topics column (equal width with right) */}
          <div className="md:col-span-3">
            <HeroTopicsColumn />
          </div>

          {/* Right: column stack (equal width with middle) */}
          <div className="md:col-span-3">
            <div className="space-y-6">
              <HeroHotWeekColumn />
              <HeroAdBox />
              <PopularCategories />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}