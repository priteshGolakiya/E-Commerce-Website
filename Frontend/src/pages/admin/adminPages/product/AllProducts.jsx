import { useState, useEffect } from "react";
import axios from "axios";
import summaryAPI from "../../../../utils/summaryAPI";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(summaryAPI.getAllProducts.url, {
          withCredentials: true,
        });
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg font-semibold">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg font-semibold text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-5 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">All Products</h1>
      {products.length === 0 ? (
        <div className="text-center text-lg">No products available</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product._id} className="border p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="mb-1">
                <span className="font-medium">Brand:</span> {product.brand}
              </p>
              <p className="mb-1">
                <span className="font-medium">Price:</span> ${product.price}
              </p>
              {product.discountPrice && (
                <p className="mb-1 text-green-600">
                  <span className="font-medium">Discount Price:</span> $
                  {product.discountPrice}
                </p>
              )}
              <p className="mb-1 text-blue-600">
                <span className="font-medium">Final Price:</span> $
                {product.finalPrice}
              </p>
              <p className="mb-1">
                <span className="font-medium">Stock:</span> {product.stock}
              </p>
              {product.images && product.images.length > 0 && (
                <div className="mb-2">
                  {product.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-48 object-cover mb-2 rounded-lg"
                    />
                  ))}
                </div>
              )}
              <p className="mb-1">
                <span className="font-medium">Category:</span>{" "}
                {product.category.name}
              </p>
              <p className="mb-1">
                <span className="font-medium">Subcategory:</span>{" "}
                {product.subcategory.name}
              </p>
              <p className="mb-1">
                <span className="font-medium">Delivery Options:</span>{" "}
                {product.deliveryOptions}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProducts;
