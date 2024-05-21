import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import summaryAPI from "../../../../utils/summaryAPI";

// Backend categories mapped to frontend categories and subcategories
const subcategoryOptions = {
  "Apparel & Accessories": [
    "Men's Clothing",
    "Women's Clothing",
    "Shoes",
    "Accessories",
  ],
  Electronics: ["Laptops", "Smartphones", "Tablets"],
  "Home & Garden": ["Furniture", "Home Decor", "Kitchen Appliances"],
  "Health & Beauty": ["Skincare", "Haircare", "Makeup", "Personal Care"],
  "Toys & Games": [
    "Board Games",
    "Outdoor Toys",
    "Educational Toys",
    "Action Figures",
  ],
  "Books & Media": ["Fiction", "Non-fiction", "Mystery"],
  "Sports & Outdoors": ["Fitness Equipment", "Outdoor Gear", "Sportswear"],
  Automotive: ["Car Accessories", "Motorcycle Parts", "Tools"],
  "Baby & Kids": ["Baby Clothing", "Toys", "Kids' Furniture"],
  "Food & Grocery": ["Snacks", "Beverages", "Cooking Ingredients"],
  "Pet Supplies": ["Dog Supplies", "Cat Supplies", "Pet Toys"],
  "Office Supplies": ["Stationery", "Office Furniture", "Office Electronics"],
  "Jewelry & Watches": ["Necklaces", "Bracelets", "Watches"],
  "Crafts & DIY": ["Craft Kits", "Painting Supplies", "DIY Tools"],
  "Art & Collectibles": ["Paintings", "Sculptures", "Antiques"],
  "Travel & Luggage": ["Luggage", "Travel Accessories", "Backpacks"],
  "Fitness & Wellness": [
    "Vitamins & Supplements",
    "Fitness Accessories",
    "Wellness Products",
  ],
  "Home Improvement": ["Tools", "Building Materials", "Home Renovation"],
  "Electronics Accessories": ["Phone Cases", "Chargers", "Cables"],
  "Gifts & Occasions": ["Gift Baskets", "Cards", "Party Supplies"],
  "Music & Instruments": ["Guitars", "Keyboards", "Music Accessories"],
  "Party Supplies": ["Party Decorations", "Tableware", "Party Favors"],
  "Software & Apps": [
    "Productivity Software",
    "Utility Apps",
    "Gaming Software",
  ],
  Services: ["Cleaning Services", "Repair Services", "Consulting Services"],
  "Subscription Boxes": ["Beauty Boxes", "Snack Boxes", "Book Subscriptions"],
  "Vintage & Antiques": [
    "Vintage Clothing",
    "Antique Furniture",
    "Collectible Items",
  ],
};

const SubNewCategory = () => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [loading, setLoading] = useState(false);

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

  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;
    const selectedCategory = categories.find(
      (category) => category._id === selectedCategoryId
    );
    const selectedCategoryName = selectedCategory?.name;
    const subcategories = subcategoryOptions[selectedCategoryName] || [];
    console.log("Selected category:", selectedCategoryName);
    setSelectedCategory(selectedCategoryId);
    setSelectedSubcategory(subcategories[0] || "");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !selectedCategory || !selectedSubcategory) {
      toast.error("Please select a category, subcategory, and enter a name.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${summaryAPI.createSubcategory.url}${selectedCategory}/subcategory`,
        { name },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      setName("");
      toast.success(response.data.message);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error creating subcategory"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Create New Subcategory</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="category" className="block mb-2">
            Select Category:
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="border border-gray-300 rounded p-2 w-full"
            required
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
        {selectedCategory && subcategoryOptions[selectedCategory] && (
          <div className="mb-4">
            <label htmlFor="subcategory" className="block mb-2">
              Select Subcategory:
            </label>
            <select
              id="subcategory"
              value={selectedSubcategory}
              onChange={(e) => setSelectedSubcategory(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full"
              required
            >
              <option value="">Select a subcategory</option>
              {subcategoryOptions[selectedCategory].map(
                (subcategory, index) => (
                  <option key={index} value={subcategory}>
                    {subcategory}
                  </option>
                )
              )}
            </select>
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="name" className="block mb-2">
            Subcategory Name:
          </label>
          <select
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
            required
          >
            <option value="">Select a subcategory name</option>
            {selectedSubcategory ? (
              <option value={selectedSubcategory}>{selectedSubcategory}</option>
            ) : null}
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Subcategory"}
        </button>
      </form>
    </div>
  );
};

export default SubNewCategory;
