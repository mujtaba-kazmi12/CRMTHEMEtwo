export default function PostLoading() {
  return (
    <div className="mx-auto max-w-[1100px] px-5 py-8">
      {/* Two-column layout skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
        {/* Main content column */}
        <div className="lg:col-span-7 animate-pulse">
          {/* Category badge */}
          <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-24 mb-4" />
          
          {/* Title */}
          <div className="space-y-3 mb-6">
            <div className="h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-full" />
            <div className="h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-4/5" />
          </div>

          {/* Meta info */}
          <div className="flex gap-4 mb-6">
            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-32" />
            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-28" />
            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-24" />
          </div>

          {/* Featured image */}
          <div className="aspect-video bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg mb-6" />

          {/* Content paragraphs */}
          <div className="space-y-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-full" />
                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-full" />
                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-5/6" />
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-3 space-y-10 animate-pulse">
          {/* Hot this week skeleton */}
          <div>
            <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-40 mb-4" />
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex gap-3 mb-4">
                <div className="h-12 w-12 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-full" />
                  <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-3/4" />
                </div>
              </div>
            ))}
          </div>

          {/* Topics skeleton */}
          <div>
            <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-32 mb-4" />
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="mb-4">
                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-full mb-2" />
                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-2/3" />
              </div>
            ))}
          </div>

          {/* Ad box skeleton */}
          <div className="aspect-square bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg" />
        </aside>
      </div>

      {/* Centered loading spinner overlay */}
      <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-4">
            <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-red-500 rounded-full border-t-transparent animate-spin"></div>
          </div>
          <p className="text-[#0e1d3d] font-semibold text-lg">Cargando artículo...</p>
        </div>
      </div>
    </div>
  );
}
