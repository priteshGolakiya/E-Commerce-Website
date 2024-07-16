import { useState, useEffect } from "react";
import axios from "axios";
import summaryAPI from "../../utils/summaryAPI";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import Preloader from "../../component/Preloader";
import { Link } from "react-router-dom";
import scrollTop from "../../utils/scrollTop";

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
      <div className="container mx-auto p-4">
        <Preloader />
      </div>
    );
  }

  if (error || products.length === 0) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-red-500">{error || "No products found."}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.length === 0 ? (
          <h1 className="col-span-3 text-center">No Products Found</h1>
        ) : (
          products.map((product) => (
            <div
              key={product._id}
              className="border border-gray-200 rounded-lg overflow-hidden shadow-lg"
            >
              <PhotoProvider>
                <PhotoView src={product.images[0]}>
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-48 object-contain cursor-pointer mix-blend-multiply"
                  />
                </PhotoView>
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                  <p className="text-gray-700 mb-1">Brand: {product.brand}</p>
                  <p className="text-gray-700 mb-1">Price: ₹{product.price}</p>
                  <Link
                    key={product._id}
                    to={`/products/${product._id}`}
                    onClick={scrollTop}
                    className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center text-sm"
                  >
                    View Product
                  </Link>

                  <div className="flex mt-2 cursor-pointer">
                    {product.images.length > 1 && (
                      <PhotoView src={product.images[1]}>
                        <div className="w-16 h-16 flex items-center justify-center bg-gray-200 rounded text-gray-600">
                          +{product.images.length - 1}
                        </div>
                      </PhotoView>
                    )}
                    {product.images.slice(2).map((image, index) => (
                      <PhotoView key={index + 1} src={image} />
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
