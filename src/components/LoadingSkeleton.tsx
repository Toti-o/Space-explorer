interface LoadingSkeletonProps {
  type?: "card" | "apod";
}

export default function LoadingSkeleton({ type = "card" }: LoadingSkeletonProps) {
  if (type === "apod") {
    return (
      <div className="bg-maroon-900 border border-white/10 rounded-2xl p-6 shadow-xl animate-pulse">
        <div className="h-64 bg-maroon-800 rounded-xl mb-4"></div>
        <div className="h-6 bg-maroon-800 rounded mb-3 w-3/4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-maroon-800 rounded"></div>
          <div className="h-4 bg-maroon-800 rounded w-5/6"></div>
          <div className="h-4 bg-maroon-800 rounded w-4/6"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-maroon-900 border border-white/10 rounded-2xl p-6 shadow-xl animate-pulse">
          <div className="h-48 bg-maroon-800 rounded-xl mb-4"></div>
          <div className="h-5 bg-maroon-800 rounded mb-2"></div>
          <div className="h-4 bg-maroon-800 rounded w-3/4"></div>
        </div>
      ))}
    </div>
  );
}