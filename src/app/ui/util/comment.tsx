'use client';

import { useActionState, useState } from "react";
import { addReview, State } from '@/app/lib/actions';
import { FaStar } from "react-icons/fa";


export default function ReviewComment ({ id }: { id:number;} ) {
  const product_id = id;

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState<number | null>(null);


  const initialState: State = { message: null, errors: {}};
  const [state, formAction] = useActionState(addReview, initialState);
  console.log(state);

  return (
        <div className="lg:col-span-2 bg-white shadow p-6 rounded-lg">
          <h3 className="mb-4 font-semibold text-center text-xl">Leave a Comment</h3>
          <form action={formAction} className="block">
            <label className="sr-only" htmlFor="product_id"> Product ID</label>
            <input hidden id="product_id" name="product_id" readOnly value={product_id} />
            <label className="sr-only" htmlFor="rating">Reiew Rating</label>
            <input hidden id="rating" name="rating"  readOnly value={rating} />
            <label className="sr-only" htmlFor="reviewer_name">Leave your Name</label>
            <input
              id="reviewer_name"
              type="text"
              name="reviewer_name"
              className="mb-3 p-3 border rounded-lg focus:ring-2 focus:ring-black w-full focus:outline-none"
              placeholder="Your Name"
            />
            <div className="flex justify-center items-center space-x-2 mb-4">
              {Array(5)
                .fill(null)
                .map((_, i) => (
                  <FaStar
                  name="rating"
                    key={i}
                    className={`cursor-pointer text-2xl ${
                      (hover || rating) > i ? "text-yellow-500" : "text-gray-300"
                    }`}
                    onClick={() =>  setRating (i+1) }
                    onMouseEnter={() => setHover(i + 1)}
                    onMouseLeave={() => setHover(null)}
                  />
                ))}
            </div>
            <label className="sr-only" htmlFor="comment">Leave a Comment</label>
            <textarea
              id="comment"
              className="mb-3 p-3 border rounded-lg focus:ring-2 focus:ring-black w-full focus:outline-none"
              rows={4}
              name="comment"
              placeholder="Write your review here..."
            />
            <label className="sr-only" htmlFor="submit">Submit</label>
            <button
              id="submit"
              type="submit"
              className="bg-black hover:bg-white px-4 py-2 border border-black rounded-lg w-full text-white hover:text-black transition"
            >
              Submit
            </button>
          </form>
        </div>
  );
}