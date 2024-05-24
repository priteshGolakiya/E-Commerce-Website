import { useState, useEffect } from "react";
import axios from "axios";
import summaryAPI from "../../../../utils/summaryAPI";
import Modal from "../../../../component/modal"; // Import your Modal component

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null); // State to track selected product for modal

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

  // Function to handle opening the modal
  const handleOpenModal = (product) => {
    setSelectedProduct(product);
  };

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="max-w-6xl mx-auto p-5 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">All Products</h1>
      {products.length === 0 ? (
        <div className="text-center text-lg">No products available</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Brand</th>
                <th className="py-2 px-4 border-b">Price</th>
                <th className="py-2 px-4 border-b">Discount Price</th>
                <th className="py-2 px-4 border-b">Final Price</th>
                <th className="py-2 px-4 border-b">Stock</th>
                <th className="py-2 px-4 border-b">Images</th>
                <th className="py-2 px-4 border-b">Category</th>
                <th className="py-2 px-4 border-b">Subcategory</th>
                <th className="py-2 px-4 border-b">Delivery Options</th>
                <th className="py-2 px-4 border-b">Options</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td className="py-3 px-4 border-b">{product.name}</td>
                  <td className="py-3 px-4 border-b">{product.brand}</td>
                  <td className="py-3 px-4 border-b">${product.price}</td>
                  {product.discountPrice ? (
                    <td className="py-3 px-4 border-b text-green-600">
                      ${product.discountPrice}
                    </td>
                  ) : (
                    <td className="py-3 px-4 border-b">N/A</td>
                  )}
                  <td className="py-3 px-4 border-b text-blue-600">
                    ${product.finalPrice}
                  </td>
                  <td className="py-3 px-4 border-b">{product.stock}</td>
                  <td className="py-3 px-4 border-b max-w-xs flex flex-col">
                    {product.images && product.images.length > 0 && (
                      <div className="">
                        {product.images.map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={`${product.name} ${index + 1}`}
                            className="w-12 h-12 object-cover rounded-lg cursor-pointer transform hover:scale-150 transition-transform"
                          />
                        ))}
                      </div>
                    )}
                  </td>

                  <td className="py-3 px-4 border-b">
                    {product.category.name}
                  </td>
                  <td className="py-3 px-4 border-b">
                    {product.subcategory.name}
                  </td>
                  <td className="py-3 px-4 border-b">
                    {product.deliveryOptions}
                  </td>
                  <td>
                    <button
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
                      onClick={() => handleOpenModal(product)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Render the Modal component conditionally */}
      <Modal isOpen={selectedProduct !== null} onClose={handleCloseModal}>
        {/* Modal content */}
        {selectedProduct && (
          <>
            <h2 className="text-2xl font-semibold mb-4">
              {selectedProduct.name}
            </h2>
            {/* Add more product details here */}
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
              onClick={handleCloseModal}
            >
              Close
            </button>
          </>
        )}
      </Modal>
    </div>
  );
};

export default AllProducts;
