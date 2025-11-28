export default function CategoryLoading() {
  return (
    <main className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6">
        {/* Animated header skeleton */}
        <div className="animate-pulse">
          <div className="h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-48 mb-2" />
          <div className="h-[2px] bg-red-500/30" />
        </div>

        {/* Two featured posts skeleton */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-video bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg mb-4" />
              <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-20 mb-3" />
              <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-full mb-2" />
              <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-3/4 mb-3" />
              <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-full mb-2" />
              <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-5/6" />
            </div>
          ))}
        </div>
      </div>

      {/* Wide banner skeleton */}
      <div className="mx-auto max-w-7xl px-4 py-4">
        <div className="h-24 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg animate-pulse" />
      </div>

      {/* Posts grid skeleton */}
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="animate-pulse" style={{ animationDelay: `${i * 50}ms` }}>
              <div className="aspect-video bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg mb-4" />
              <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-16 mb-3" />
              <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-full mb-2" />
              <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-4/5 mb-3" />
              <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-full mb-1" />
              <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Centered loading spinner overlay */}
      <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-4">
            <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-red-500 rounded-full border-t-transparent animate-spin"></div>
          </div>
          <p className="text-[#0e1d3d] font-semibold text-lg">Cargando...</p>
        </div>
      </div>
    </main>
  );
}
