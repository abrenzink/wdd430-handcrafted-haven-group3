'use client';

import { FaStar } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react";

interface Review  {
    id: number;
    product_id: number;
    reviewer_name: string;
    rating: number;
    comment: string;
  };

interface SliderProps {
  data: Review[]
}

const ReviewSlider: React.FC<SliderProps> = ({ data }) => {
  return (
  <div className="lg:col-span-2 bg-white shadow p-6 rounded-lg">
    <h2 className="mb-4 font-bold text-2xl text-center lg:text-left">Product Reviews</h2>
    <Swiper
      slidesPerView={2}
      spaceBetween={10}
      pagination={{ clickable: true }}
      navigation={true}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      modules={[Pagination, Navigation, Autoplay]}
      breakpoints={{
      640: { slidesPerView: 2 },
        1024: { slidesPerView: 2 },
      }}
      className="mySwiper"
    >
      {data.map((review) => (
        <SwiperSlide key={review.id}>
          <div className="border-gray-300 bg-white shadow-md p-4 border rounded-lg">
            <h4 className="font-semibold text-gray-800 text-lg">
              {review.reviewer_name}
            </h4>
            <div className="flex items-center space-x-1">
              {Array(5)
                .fill(null)
                .map((_, i) => (
                  <FaStar
                    key={i}
                    className={`text-xl ${
                      review.rating > i
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }`}
                 />
              ))}
            </div>
            <p className="mt-2 text-gray-800 text-sm">{review.comment}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
  )
};

export default ReviewSlider;