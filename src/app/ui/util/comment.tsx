'use client';
import { useRef, useState } from "react";
import { addReview } from '@/app/lib/data';
import { FaStar } from "react-icons/fa";

export default function ReviewComment ({ id }: { id:string; } ) {
  const product_id = id;

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState<number | null>(null);

  const reviewer_nameRef = useRef<HTMLInputElement>(null);
  const commentRef = useRef<HTMLTextAreaElement>(null);
  const ratingRef = useRef<number>(0);

   const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();

    if (product_id && reviewer_nameRef.current && ratingRef.current && commentRef.current !== null) {
      const reviewData = {
        product_id,
        reviewer_name: reviewer_nameRef.current.value,
        rating: ratingRef.current,
        comment: commentRef.current.value,
      };

      try {
        const insertedReviewID = await addReview(reviewData);
       // window.location.reload();
        console.log(`New Review ID: ${insertedReviewID}`);
      } catch (error) {
        console.error("Error submitting new review: ", error);
        alert("There was an issue submitting your review. Please try again")
      }


    } else {
      alert("Please provide your name, a rating, and a comment!");
      return;
    }
  };

  return (
        <div className="lg:col-span-2 bg-white shadow p-6 rounded-lg">
          <h3 className="mb-4 font-semibold text-center text-xl">Leave a Comment</h3>
          <form onSubmit={handleSubmit} className="block">
            <input
              type="text"
              name="name"
              className="mb-3 p-3 border rounded-lg focus:ring-2 focus:ring-black w-full focus:outline-none"
              placeholder="Your Name"
              ref={reviewer_nameRef}
            />
            <div className="flex justify-center items-center space-x-2 mb-4">
              {Array(5)
                .fill(null)
                .map((_, i) => (
                  <FaStar
                    key={i}
                    className={`cursor-pointer text-2xl ${
                      (hover || rating) > i ? "text-yellow-500" : "text-gray-300"
                    }`}
                    onClick={() => {
                      setRating(i + 1)
                      ratingRef.current = i + 1;
                    }}
                    onMouseEnter={() => setHover(i + 1)}
                    onMouseLeave={() => setHover(null)}
                  />
                ))}
            </div>
            <textarea
              className="mb-3 p-3 border rounded-lg focus:ring-2 focus:ring-black w-full focus:outline-none"
              rows={4}
              name="comment"
              placeholder="Write your review here..."
              ref={commentRef}
            />
            <button
              type="submit"
              className="bg-black hover:bg-white px-4 py-2 border border-black rounded-lg w-full text-white hover:text-black transition"
            >
              Submit
            </button>
          </form>
        </div>
  );
}