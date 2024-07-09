import axios from "axios";
import summaryAPI from "../../utils/summaryAPI";
import { useState, useEffect } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import Preloader from "../../component/Preloader";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(summaryAPI.common.getAllProducts.url, {
        withCredentials: true,
      });
      setProducts(response.data);
    } catch (err) {
      setError("Failed to fetch products. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div>
        <Preloader />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.length === 0 ? (
          <h1>No Products Found</h1>
        ) : (
          products.map((product) => (
            <div
              key={product._id}
              className="border py-3 rounded-lg shadow-lg overflow-hidden"
            >
              <PhotoProvider>
                <PhotoView src={product.images[0]}>
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-48 object-contain cursor-pointer"
                  />
                </PhotoView>
                <div className="p-4">
                  <h2 className="text-xl font-semibold">{product.name}</h2>
                  <p className="text-gray-500">Brand: {product.brand}</p>
                  <p className="text-gray-500">Price: ₹{product.price}</p>
                  <p className="text-gray-500">
                    Discount Price: ₹{product.discountPrice}
                  </p>
                  <p className="text-gray-500">Stock: {product.stock}</p>
                  <p className="text-gray-500">
                    Category: {product.category.name}
                  </p>
                  <p className="text-gray-500">
                    Subcategory: {product.subcategory.name}
                  </p>
                  <p className="mt-2">{product.description}</p>
                  <div className="flex mt-2">
                    {product.images.map((img, index) => (
                      <PhotoView key={index} src={img}>
                        <img
                          src={img}
                          alt={`Product ${index + 1}`}
                          className="w-10 h-10 object-contain mr-2 cursor-pointer"
                        />
                      </PhotoView>
                    ))}
                  </div>
                </div>
              </PhotoProvider>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AllProducts;
