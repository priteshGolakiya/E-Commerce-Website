import { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import summaryAPI from "../../utils/summaryAPI";
import { FreeMode, Pagination } from "swiper/modules";
import Preloader from "../Preloader";

const ProductSlider = () => {
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(summaryAPI.common.getAllCategory.url, {
          withCredentials: true,
        });
        if (response.data.success) {
          setSubcategories(response.data.products);
        } else {
          setError("Failed to fetch products");
        }
      } catch (error) {
        setError("Error fetching products: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <p>
        <Preloader />
      </p>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container mx-auto ">
      <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        freeMode={true}
        pagination={{ clickable: true }}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
      >
        {subcategories.map((product) => (
          <SwiperSlide
            key={product._id}
            className="flex p-10 flex-col items-center"
          >
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-52 object-contain mb-4 rounded-lg shadow-lg"
            />
            <p className="text-lg font-semibold text-center">{product.name}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductSlider;
