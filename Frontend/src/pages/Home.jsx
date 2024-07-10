import BannerCarousel from "../component/common/BannerCarousel";
import ProductSlider from "../component/common/ProductSlider";
import AllProducts from "./common/AllProducts";

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <ProductSlider />
      </div>
      <div className="w-full md:w-5/6 lg:w-2/3 mx-auto">
        <BannerCarousel />
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">All Products</h2>
        <AllProducts />
      </div>
    </div>
  );
};

export default Home;
