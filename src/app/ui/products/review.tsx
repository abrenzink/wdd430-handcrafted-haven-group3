//import { useState } from "react";

import { fetchReviewsById } from '@/app/lib/data';
import ReviewSlider from '@/app/ui/util/swiper';
import ReviewComment from '../util/comment';


export async function ReviewWrapper({ product_id, limit,}: {product_id: string; limit: number;}) {
  const reviews = await fetchReviewsById(product_id, limit);

  if (!reviews) {
    return null // or show an error message
  }

  if (reviews.length === 0) {
    return (
     <p className="text-lg font-bold p-4">Be the first one to leave a Review!</p>
      ); // or show an error message
  }

  return(
    <div className="bg-gray-100 p-4 lg:p-8">
      <div className="gap-6 grid grid-cols-1 lg:grid-cols-4 mx-auto w-full max-w-7xl">
        <ReviewSlider data={reviews} />
        <ReviewComment id={product_id}/>
      </div>
    </div>
  )
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
