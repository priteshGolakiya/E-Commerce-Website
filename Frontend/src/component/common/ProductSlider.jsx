import { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import styles from "../../style/ProductSlider.module.css";

import { Pagination } from "swiper/modules";
import summaryAPI from "../../utils/summaryAPI";

const ProductSlider = () => {
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          summaryAPI.admin.getAllSubcategories.url,
          {
            withCredentials: true,
          }
        );
        if (response.data.success) {
          setSubcategories(response.data.subcategories);
        } else {
          console.error("Failed to fetch subcategories");
        }
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Swiper
        slidesPerView={4}
        centeredSlides={true}
        spaceBetween={30}
        grabCursor={true}
        loop={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className={styles.mySwiper}
      >
        {subcategories.map((subcategory) =>
          subcategory.products.map((product) => (
            <SwiperSlide key={product._id}>
              <img src={product.images[0]} alt={product.name} />
              <p>{product.name}</p>
              <p>Price: {product.price}</p>
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </>
  );
};

export default ProductSlider;
