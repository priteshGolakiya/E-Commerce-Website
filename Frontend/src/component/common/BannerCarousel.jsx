// BannerCarousel.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import summaryAPI from "../../utils/summaryAPI";
import { Pagination, EffectFade, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Preloader from "../Preloader";

const BannerCarousel = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(summaryAPI.common.getAllCategory.url, {
          withCredentials: true,
        });
        if (response.data.success) {
          setCategories(response.data.products);
        } else {
          setError("Failed to fetch categories");
        }
      } catch (error) {
        setError("Error fetching categories: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Preloader />;
  }

  if (error) {
    return <p className="text-center mt-4">Error: {error}</p>;
  }

  return (
    <div className="mx-auto px-4 py-8">
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        loop={true}
        pagination={{ clickable: true }}
        className="mySwiper"
        navigation={true}
        modules={[EffectFade, Navigation, Pagination]}
      >
        {categories.map((category) => (
          <SwiperSlide key={category._id}>
            <div className="w-full flex flex-col items-center rounded-lg overflow-hidden shadow-lg">
              <img
                src={category.images[0]}
                alt={category.name}
                className="h-96 object-contain mb-4 w-full"
              />
              <div className="bg-white p-12 text-center">
                <h3 className="text-lg font-semibold">{category.name}</h3>
                <p className="text-sm text-gray-600">{category.description}</p>
                <button className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg">
                  Shop Now
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BannerCarousel;
