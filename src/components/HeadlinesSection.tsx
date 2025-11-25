import HeadlinesLeftColumn from "./HeadlinesLeftColumn";
import HeadlinesExclusiveColumn from "./HeadlinesExclusiveColumn";
import HeadlinesRightColumn from "./HeadlinesRightColumn";

export default function HeadlinesSection() {
  return (
    <section className="bg-white ">
      <div className="mx-auto max-w-7xl px-4 py-8 border-b border-gray-200">
        {/* Section header */}
        <div className="mb-4">
          <div className="flex items-center gap-3">
            <h2 className="text-[#0e1d3d] font-bold text-xl">Titulares</h2>
            <div className="flex-1 h-[2px] bg-gray-200" />
          </div>
        </div>

        {/* Three columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-6">
            <HeadlinesLeftColumn />
          </div>
          <div className="md:col-span-3">
            <HeadlinesExclusiveColumn />
          </div>
          <div className="md:col-span-3">
            <HeadlinesRightColumn />
          </div>
        </div>
      </div>
    </section>
  );
}