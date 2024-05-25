/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Modal from "../../../../component/modal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the styles for react-toastify

toast.configure(); // Configure toast options if needed

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

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const imagesArray = formData.images.concat(files);
    setFormData({ ...formData, images: imagesArray });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Submit form data to the server
      await onSubmit(formData);
      toast.success(
        isEditMode
          ? "Product updated successfully"
          : "Product added successfully"
      );
      onClose();
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
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Images</label>
          <input
            type="file"
            name="images"
            multiple
            onChange={handleFileChange}
            className="w-full p-3 border border-gray-300 rounded"
          />
          {formData.images.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {formData.images.map((image, index) => (
                <img
                  key={index}
                  src={
                    typeof image === "string"
                      ? image
                      : URL.createObjectURL(image)
                  }
                  alt={`Product Image ${index + 1}`}
                  className="w-16 h-16 object-cover rounded"
                />
              ))}
            </div>
          )}
        </div>
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
