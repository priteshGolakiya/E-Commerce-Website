import ProductSlider from "../component/common/productSlider";
import AllProducts from "./common/AllProducts";

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Welcome to Our Store
      </h1>
      {/* <div className="grid grid-cols-1 gap-8 sm:grid-cols-2"> */}
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
