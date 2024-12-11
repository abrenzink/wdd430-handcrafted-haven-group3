import { fetchReviewsData } from "@/app/lib/data";

export async function ReviewsCardWrapper({ limit, product_id }: { limit: number, product_id: string }) {
    const reviews = await fetchReviewsData( limit, product_id );
  
    if (!reviews) {
      return null; // or show an error message
    }

    if (reviews.length === 0) {
        return (
          <p className="text-lg font-bold p-4">Be the first one to leave a Review!</p>
        ); // or show an error message
      }
  
    return (
        <div className="w-1/2">
          {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      );
  }


  export function ReviewCard({
    review,
  }: {
    review: {
      id: number;
      product_id: number;
      reviewer_name: string;
      rating: number;
      comment: string;
    };
  }) {
  
  
    return (
      <div className="rounded-xl bg-gray-50 p-4 m-4 shadow-sm">
        <h3 className="text-md font-ubuntu font-bold">{review.reviewer_name} said about this product:</h3>
        <p className="mt-2 font-ubtuntu font-semibold">{review.comment}</p>
        <p className="text-sm font-ubuntu text-gray-700">{review.rating} / 5</p>
      </div>
    );
  }


  export function ReviewsCardWrapperSkeleton() {
    return (
      <div className="w-1/2">
        <div className="animate-pulse">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="flex flex-col gap-3 p-4 m-4 bg-gray-200 rounded-xl shadow-sm"
            >
              {/* Skeleton for reviewer name */}
              <div className="h-2 w-1/3 bg-gray-300 rounded"></div>
              {/* Skeleton for review comment */}
              <div className="h-2 w-full bg-gray-300 rounded"></div>
              <div className="h-2 w-5/6 bg-gray-300 rounded"></div>
              {/* Skeleton for rating */}
              <div className="h-2 w-1/4 bg-gray-300 rounded mt-2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  