/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Modal from "../../../../component/modal";
import { toast } from "react-toastify";
import axios from "axios";
import summaryAPI from "../../../../utils/summaryAPI";
import uploadImage from "../../../../utils/uploadImage";

const ProductModal = ({ isOpen, onClose, product, refreshProducts }) => {
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

  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);

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

      // Previews of existing image URLs
      setImagePreviews(product.images || []);
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
      setImagePreviews([]);
    }
  }, [product, isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleChange = (e) => {
    const { name, type } = e.target;
    const value = type === "file" ? e.target.files : e.target.value;

    if (type === "file") {
      const files = Array.from(e.target.files);
      const previews = files.map((file) => URL.createObjectURL(file));
      setImagePreviews((prev) => [...prev, ...previews]);
      setFormData((prevData) => ({
        ...prevData,
        [name]: [...prevData.images, ...files],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleRemoveImage = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
    setImagePreviews(newPreviews);
  };

  const validateForm = () => {
    if (!formData.name || !formData.brand || !formData.price) {
      toast.error("Please fill in all required fields.");
      return false;
    }
    return true;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const uploadedImages = await Promise.all(
        formData.images.map((image) => uploadImage(image))
      );

      const imageURLs = uploadedImages.map((response) => response.secure_url);

      const payload = {
        ...formData,
        images: imageURLs,
        offers: formData.offers
          ? formData.offers.split(",").map((offer) => offer.trim())
          : [],
        subcategory: formData.subcategory || null,
      };

      const url = `${summaryAPI.admin.updateProduct.url}/${product._id}`;

      const response = await axios.put(url, payload, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Product updated successfully:", response.data);
      toast.success("Product updated successfully");
      onClose();
      refreshProducts();
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleFormSubmit} className="p-6">
        <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
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
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required
            className="w-full p-3 border border-gray-300 rounded"
            placeholder="Enter price"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Discount Price</label>
          <input
            type="number"
            name="discountPrice"
            value={formData.discountPrice}
            onChange={handleInputChange}
            required
            className="w-full p-3 border border-gray-300 rounded"
            placeholder="Enter discount price"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Final Price</label>
          <input
            type="number"
            name="finalPrice"
            value={formData.finalPrice}
            onChange={handleInputChange}
            required
            className="w-full p-3 border border-gray-300 rounded"
            placeholder="Enter final price"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Stock</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleInputChange}
            required
            className="w-full p-3 border border-gray-300 rounded"
            placeholder="Enter stock quantity"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-1">Images</label>
          <input
            type="file"
            name="images"
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            multiple
          />
          <div className="mt-2 grid grid-cols-3 gap-2">
            {imagePreviews.map((src, index) => (
              <div key={index} className="relative group">
                <img
                  src={src}
                  alt={`Preview ${index}`}
                  className="h-24 w-24 object-cover border rounded-lg shadow-md"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-2 right-2 bg-red-600 cursor-pointer bg-opacity-70 text-white p-1 rounded-full focus:outline-none transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100"
                  title="Remove image"
                >
                  <i className="fa-solid fa-trash text-sm"></i>
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
            className="w-full p-3 border border-gray-300 rounded"
            placeholder="Enter category"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Subcategory</label>
          <input
            type="text"
            name="subcategory"
            value={formData.subcategory}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded"
            placeholder="Enter subcategory"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Delivery Options</label>
          <input
            type="text"
            name="deliveryOptions"
            value={formData.deliveryOptions}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded"
            placeholder="Enter delivery options"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ProductModal;
