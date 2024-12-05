export function SellerCardSkeleton() {
    return (
      <div className="flex items-start gap-6 animate-pulse">
        {/* Image Placeholder */}
        <div className="h-16 w-16 rounded-full bg-gray-200" />
  
        {/* Text Placeholders */}
        <div className="flex flex-col gap-2">
          <div className="h-6 w-32 bg-gray-200 rounded-md" /> {/* Shop Name */}
          <div className="h-4 w-48 bg-gray-200 rounded-md" /> {/* Bio */}
          <div className="h-4 w-40 bg-gray-200 rounded-md" /> {/* Optional extra bio line */}
        </div>
      </div>
    );
}