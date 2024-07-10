import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Preloader from "../../component/Preloader";
import summaryAPI from "../../utils/summaryAPI";
import { PhotoProvider, PhotoView } from "react-photo-view";

const ProductsDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${summaryAPI.common.getProductById.url}/${id}`
        );
        if (response.data) {
          setProduct(response.data);
        } else {
          setError("Failed to fetch product data");
        }
      } catch (error) {
        setError("Error fetching product data: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

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
  } = product;

  const discountPercentage =
    price && finalPrice ? Math.round(((price - finalPrice) / price) * 100) : 0;

  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
      <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
            {images && images.length > 0 && (
              <PhotoProvider>
                <div className="grid grid-cols-2 gap-4">
                  <PhotoView src={images[0]}>
                    <img
                      src={images[0]}
                      alt={`${name} - Main Image`}
                      className="w-full h-64 object-contain rounded-lg cursor-pointer"
                    />
                  </PhotoView>
                  <div className="grid grid-cols-2 gap-2">
                    {images.slice(1, 5).map((image, index) => (
                      <PhotoView key={index} src={image}>
                        <img
                          src={image}
                          alt={`${name} - Image ${index + 2}`}
                          className="w-full h-28 object-contain rounded-lg cursor-pointer"
                        />
                      </PhotoView>
                    ))}
                  </div>
                  {images.slice(5).map((image, index) => (
                    <PhotoView key={index + 5} src={image} />
                  ))}
                </div>
              </PhotoProvider>
            )}
          </div>
          <div className="md:w-1/2">
            <h1 className="text-3xl font-bold mb-4">{name}</h1>
            <p className="text-gray-600 mb-4">{description}</p>
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold text-blue-600">
                ₹{finalPrice}
              </span>
              {price && price !== finalPrice && (
                <>
                  <span className="ml-2 text-lg text-gray-500 line-through">
                    ₹{price}
                  </span>
                  <span className="ml-2 text-sm font-semibold text-green-600">
                    Save {discountPercentage}%
                  </span>
                </>
              )}
            </div>
            {discountPrice > 0 && (
              <div className="mb-4 p-2 bg-yellow-100 rounded-lg">
                <p className="text-sm font-semibold text-yellow-800">
                  Additional discount: ₹{discountPrice}
                </p>
              </div>
            )}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="font-semibold">Brand</p>
                <p className="text-gray-600">{brand}</p>
              </div>
              <div>
                <p className="font-semibold">Stock</p>
                <p className="text-gray-600">{stock} available</p>
              </div>
              <div>
                <p className="font-semibold">Category</p>
                <p className="text-gray-600">{category && category.name}</p>
              </div>
              <div>
                <p className="font-semibold">Subcategory</p>
                <p className="text-gray-600">
                  {subcategory && subcategory.name}
                </p>
              </div>
            </div>
            <div className="mb-6">
              <p className="font-semibold mb-2">Delivery Options</p>
              <p className="text-gray-600">{deliveryOptions}</p>
            </div>
            <button className="bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition duration-300">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsDetailsPage;
