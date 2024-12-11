// Loading animation
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function CardSkeleton() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 p-4 shadow-sm w-full`}
    >
      {/* Image Placeholder */}
      <div className="h-32 w-full rounded-md bg-gray-200 mb-4" />

      {/* Title Placeholder */}
      <div className="h-6 w-3/4 rounded-md bg-gray-200 mb-2" />

      {/* Description Placeholder */}
      <div className="h-4 w-full rounded-md bg-gray-200 mb-2" />
      <div className="h-4 w-5/6 rounded-md bg-gray-200 mb-4" />

      {/* Price Placeholder */}
      <div className="h-5 w-1/4 rounded-md bg-gray-200 mb-2" />

      {/* Category Placeholder */}
      <div className="h-4 w-1/3 rounded-md bg-gray-200" />
    </div>
  );
}

export function CardsSkeleton({ limit = 8 }: { limit?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      {Array.from({ length: limit }).map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  );
}


export function ProductPageCardSkeleton() {
  return (
    <div className="w-full">
      {/* Skeleton for the title */}
      <div className="h-4 w-3/4 bg-gray-200 rounded-md mb-6"></div>
      
      {/* Skeleton for the card layout */}
      <div className="md:flex gap-4">
        {/* Skeleton for the image */}
        <div className="h-[600px] w-full md:w-1/2 bg-gray-200 rounded-md animate-pulse"></div>
        
        {/* Skeleton for the text content */}
        <div className="flex flex-col gap-4 w-full md:w-1/2 p-4">
          <div className="h-4 w-5/6 bg-gray-200 rounded-md"></div>
          <div className="h-4 w-4/6 bg-gray-200 rounded-md"></div>
          <div className="h-4 w-3/6 bg-gray-200 rounded-md"></div>
        </div>
      </div>
    </div>
  );
}

  