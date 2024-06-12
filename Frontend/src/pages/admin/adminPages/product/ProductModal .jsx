/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Modal from "../../../../component/modal";
import { toast } from "react-toastify";
import axios from "axios";
import summaryAPI from "../../../../utils/summaryAPI";

const ProductModal = ({
  isOpen,
  onClose,
  product,
  isEditMode,
  refreshProducts,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    discountPrice: "",
    finalPrice: "",
    stock: "",
    category: "",
    subcategory: "",
    deliveryOptions: "",
    images: [],
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        brand: product.brand,
        price: product.price,
        discountPrice: product.discountPrice,
        finalPrice: product.finalPrice,
        stock: product.stock,
        category: product.category ? product.category._id : "",
        subcategory: product.subcategory ? product.subcategory._id : "",
        deliveryOptions: product.deliveryOptions,
        images: product.images || [],
      });
    } else {
      setFormData({
        name: "",
        brand: "",
        price: "",
        discountPrice: "",
        finalPrice: "",
        stock: "",
        category: "",
        subcategory: "",
        deliveryOptions: "",
        images: [],
      });
    }
  }, [product, isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const apiConfig = isEditMode
        ? summaryAPI.updateProduct
        : summaryAPI.createProduct;

      const url = isEditMode
        ? `${apiConfig.url}/${product._id}`
        : apiConfig.url;

      const method = isEditMode ? "put" : "post";

      await axios({
        method: method,
        url: url,
        data: formData,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      toast.success(
        isEditMode
          ? "Product updated successfully"
          : "Product added successfully"
      );
      onClose();
      refreshProducts(); // Call the refreshProducts function after successful form submission
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error occurred while submitting the form");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleFormSubmit} className="p-6">
        <h2 className="text-xl font-semibold mb-4">
          {isEditMode ? "Edit Product" : "Add New Product"}
        </h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full p-3 border border-gray-300 rounded"
            placeholder="Enter product name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Brand</label>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleInputChange}
            required
            className="w-full p-3 border border-gray-300 rounded"
            placeholder="Enter brand name"
          />
        </div>
        {/* Add similar inputs for Price, Discount Price, Final Price, Stock, Category, Subcategory, Delivery Options */}
        <button
          type="submit"
          className="w-full mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
        >
          {isEditMode ? "Update" : "Create"}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="w-full mt-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none"
        >
          Cancel
        </button>
      </form>
    </Modal>
  );
};


export default ProductModal;
