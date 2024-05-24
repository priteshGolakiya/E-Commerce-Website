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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-5 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">All Products</h1>
      {products.length === 0 ? (
        <div>No products available</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product._id} className="border p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-2">{product.name}</h2>
              <p className="mb-2">Brand: {product.brand}</p>
              <p className="mb-2">Price: ${product.price}</p>
              {product.discountPrice && (
                <p className="mb-2">Discount Price: ${product.discountPrice}</p>
              )}
              <p className="mb-2">Stock: {product.stock}</p>
              {product.images && product.images.length > 0 && (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-48 object-cover mb-2"
                />
              )}
              <p className="mb-2">Category: {product.category}</p>
              <p className="mb-2">Subcategory: {product.subcategory}</p>
              <p className="mb-2">
                Delivery Options: {product.deliveryOptions}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProducts;
