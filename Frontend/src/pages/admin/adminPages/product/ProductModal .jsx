/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import Modal from "../../../../component/modal";

const ProductModal = ({
  isOpen,
  onClose,
  product,
  isEditMode,
  onSubmit,
  categories,
  subcategories,
}) => {
  const [formData, setFormData] = useState({
    name: product ? product.name : "",
    brand: product ? product.brand : "",
    price: product ? product.price : "",
    discountPrice: product ? product.discountPrice : "",
    finalPrice: product ? product.finalPrice : "",
    stock: product ? product.stock : "",
    category: product && product.category ? product.category._id : "",
    subcategory: product && product.subcategory ? product.subcategory._id : "",
    deliveryOptions: product ? product.deliveryOptions : "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // Form submission logic
    try {
      // Submit form data to the server
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
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
        {/* Add similar inputs for other fields */}
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
