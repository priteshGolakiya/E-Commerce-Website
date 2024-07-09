import ProductSlider from "../component/common/productSlider";
import AllProducts from "./common/AllProducts";

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div>
        <ProductSlider />
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-4">All Products</h2>
        <AllProducts />
      </div>
      {/* </div> */}
    </div>
  );
};

export default Home;
