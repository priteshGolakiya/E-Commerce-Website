import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import summaryAPI from "../../../../utils/summaryAPI";
import uploadImage from "../../../../utils/uploadImage";

const AddProduct = () => {
  const [productData, setProductData] = useState({
    name: "",
    brand: "",
    description: "",
    price: "",
    discountPrice: "",
    stock: "",
    images: [],
    category: "",
    subcategory: "",
    features: "",
    offers: "",
    deliveryOptions: "",
  });

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await axios.get(summaryAPI.getAllCategory.url, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Failed to fetch categories. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, type } = e.target;
    const value = type === "file" ? e.target.files : e.target.value;

    if (type === "file") {
      const files = Array.from(e.target.files);
      const previews = [...imagePreviews];
      for (const file of files) {
        previews.push(URL.createObjectURL(file));
      }
      setImagePreviews(previews);
      setProductData({
        ...productData,
        [name]: [...productData.images, ...files],
      });
    } else {
      setProductData({
        ...productData,
        [name]: value,
      });
    }
  };

  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;
    const selectedCategory = categories.find(
      (category) => category._id === selectedCategoryId
    );
    const subcategories = selectedCategory?.subcategories || [];

    setProductData({
      ...productData,
      category: selectedCategoryId,
      subcategory: "",
    });
    setSubcategories(subcategories);
  };

  const handleSubcategoryChange = (e) => {
    setProductData({
      ...productData,
      subcategory: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const uploadedImages = await Promise.all(
        productData.images.map((image) => uploadImage(image))
      );

      const imageURLs = uploadedImages.map((response) => response.secure_url);

      const payload = {
        ...productData,
        images: imageURLs,
        offers: productData.offers.split(",").map((offer) => offer.trim()),
        subcategory: productData.subcategory || null,
      };

      const response = await axios.post(summaryAPI.createProduct.url, payload, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Product added successfully:", response.data);
      toast.success("Product added successfully");
      setProductData({
        name: "",
        brand: "",
        description: "",
        price: "",
        discountPrice: "",
        stock: "",
        images: [],
        category: "",
        subcategory: "",
        features: "",
        offers: "",
        deliveryOptions: "",
      });
      setImagePreviews([]);
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product. Please try again later.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-5 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>
      <form onSubmit={handleSubmit}>
        {[
          { label: "Name", name: "name", type: "text" },
          { label: "Brand", name: "brand", type: "text" },
          { label: "Description", name: "description", type: "textarea" },
          { label: "Price", name: "price", type: "number" },
          { label: "Discount Price", name: "discountPrice", type: "number" },
          { label: "Stock", name: "stock", type: "number" },
          { label: "Features", name: "features", type: "text" },
          { label: "Offers", name: "offers", type: "text" },
          { label: "Delivery Options", name: "deliveryOptions", type: "text" },
        ].map(({ label, name, type }) => (
          <div key={name} className="mb-4">
            <label className="block text-gray-700">{label}</label>
            {type === "textarea" ? (
              <textarea
                name={name}
                value={productData[name]}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <input
                type={type}
                name={name}
                value={type !== "file" ? productData[name] : undefined}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
          </div>
        ))}
        <div className="mb-4">
          <label className="block text-gray-700">Images</label>
          <input
            type="file"
            name="images"
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            multiple
          />
          <div className="mt-2 grid grid-cols-3 gap-2">
            {imagePreviews.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Preview ${index}`}
                className="h-24 w-24 object-cover border"
              />
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Category</label>
          <select
            name="category"
            value={productData.category}
            onChange={handleCategoryChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a category</option>
            {loading ? (
              <option disabled>Loading categories...</option>
            ) : (
              categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))
            )}
          </select>
        </div>
        {productData.category && subcategories.length > 0 && (
          <div className="mb-4">
            <label className="block text-gray-700">Subcategory</label>
            <select
              name="subcategory"
              value={productData.subcategory}
              onChange={handleSubcategoryChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a subcategory</option>
              {subcategories.map((subcategory) => (
                <option key={subcategory._id} value={subcategory._id}>
                  {subcategory.name}
                </option>
              ))}
            </select>
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
