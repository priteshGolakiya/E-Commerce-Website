import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Preloader from "../../component/Preloader";
import summaryAPI from "../../utils/summaryAPI";
import { PhotoProvider, PhotoView } from "react-photo-view";
import ProductRecommendationSlider from "../../component/common/ProductRecommendationSlider";
import ProductRecommendationByCategorySlider from "../../component/common/ProductRecommendationByCategorySlider";

const ProductsDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${summaryAPI.common.getProductById.url}/${id}`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setProduct(response.data);
      } catch (err) {
        setError("Error fetching product data: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const addToCart = async () => {
    try {
      const response = await axios.post(
        `${summaryAPI.common.addToCart.url}`,
        {
          productId: id,
          quantity: quantity,
        },
        { withCredentials: true }
      );
      console.log(response.data);
      // You might want to show a success message to the user here
    } catch (err) {
      setError("Error adding product to cart: " + err.message);
    }
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= product.stock) {
      setQuantity(value);
    }
  };

  if (loading) {
    return <Preloader />;
  }

  if (error || !product) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-red-500 text-center text-xl">
          {error || "No product data found."}
        </div>
      </div>
    );
  }

  const {
    name,
    description,
    price,
    finalPrice,
    images,
    brand,
    discountPrice,
    stock,
    category,
    subcategory,
    deliveryOptions,
    offers,
  } = product;

  const discountPercentage =
    price && finalPrice ? Math.round(((price - finalPrice) / price) * 100) : 0;

  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row">
          {/* Left Column - Images */}
          <div className="md:w-2/5 mb-6 md:mb-0 md:pr-8">
            <PhotoProvider>
              <div className="mb-4">
                <PhotoView src={images[selectedImage]}>
                  <img
                    src={images[selectedImage]}
                    alt={`${name} - Main Image`}
                    className="w-full h-96 object-contain cursor-pointer"
                  />
                </PhotoView>
              </div>
              <div className="flex space-x-2 overflow-x-auto">
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${name} - Thumbnail ${index + 1}`}
                    className={`w-16 h-16 object-contain cursor-pointer border-2 ${
                      selectedImage === index
                        ? "border-blue-500"
                        : "border-gray-200"
                    }`}
                    onClick={() => setSelectedImage(index)}
                  />
                ))}
              </div>
            </PhotoProvider>
            <div className="mt-4 flex items-center space-x-2">
              <label htmlFor="quantity" className="text-sm font-medium">
                Quantity:
              </label>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={handleQuantityChange}
                min="1"
                max={stock}
                className="w-16 p-1 border rounded"
              />
            </div>
            <div className="mt-4 flex space-x-2">
              <button
                onClick={addToCart}
                className="flex-1 bg-orange-500 text-white py-3 px-6 rounded-sm hover:bg-orange-600 transition duration-300"
              >
                ADD TO CART
              </button>
              <button className="flex-1 bg-orange-600 text-white py-3 px-6 rounded-sm hover:bg-orange-700 transition duration-300">
                BUY NOW
              </button>
            </div>
          </div>

          {/* Right Column - Product Details */}
          <div className="md:w-3/5">
            <h1 className="text-xl font-medium mb-2">{name}</h1>
            <div className="flex items-center mb-4">
              <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded">
                {discountPercentage}% off
              </span>
              <span className="text-green-600 ml-2 text-sm">Special price</span>
            </div>
            <div className="flex items-center mb-4">
              <span className="text-3xl font-medium">₹{finalPrice}</span>
              {price && price !== finalPrice && (
                <>
                  <span className="ml-2 text-gray-500 line-through">
                    ₹{price}
                  </span>
                  <span className="ml-2 text-green-600 text-sm">
                    ₹{discountPrice} off
                  </span>
                </>
              )}
            </div>
            <div className="mb-4">
              <h2 className="font-medium mb-2">Available offers</h2>
              <ul className="text-sm">
                {offers.split("\n").map((offer, index) => (
                  <li key={index} className="flex items-center mb-1">
                    <span className="text-green-600 mr-2">✓</span>
                    {offer}
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-gray-500">Brand</p>
                <p>{brand}</p>
              </div>
              <div>
                <p className="text-gray-500">Category</p>
                <p>{category && category.name}</p>
              </div>
              <div>
                <p className="text-gray-500">Subcategory</p>
                <p>{subcategory && subcategory.name}</p>
              </div>
              <div>
                <p className="text-gray-500">Stock</p>
                <p>{stock > 0 ? `${stock} available` : "Out of stock"}</p>
              </div>
            </div>
            <div className="mb-6">
              <h2 className="font-medium mb-2">Delivery Options</h2>
              <p className="text-sm">{deliveryOptions}</p>
            </div>
            <div className="mb-6">
              <h2 className="font-medium mb-2">Description</h2>
              <p className="text-sm">{description}</p>
            </div>
          </div>
        </div>
      </div>
      {product && product.subcategory && (
        <ProductRecommendationSlider subcategoryId={product.subcategory._id} />
      )}
      {product && product.category && (
        <ProductRecommendationByCategorySlider
          categoryId={category._id}
          subcategoryId={subcategory._id}
        />
      )}
    </div>
  );
};

export default ProductsDetailsPage;
