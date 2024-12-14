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
