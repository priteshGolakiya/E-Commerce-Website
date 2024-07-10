import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import summaryAPI from "../../utils/summaryAPI";
import Preloader from "../../component/Preloader";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

const SubCategoryListPage = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${summaryAPI.common.getSubcategoryById.url}/${id}`
        );
        if (response.data.success) {
          setData(response.data.products);
        } else {
          setError("Failed to fetch products");
        }
      } catch (error) {
        setError("Error fetching products: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <Preloader />;
  }

  if (error || data.length === 0) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-red-500">{error || "No products found."}</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {data.map((product) => (
        <Link
          key={product._id}
          to={`/products/${product._id}`}
          className="text-black text-decoration-none"
        >
          <div
            key={product._id}
            className="bg-white p-4 shadow rounded-lg transform hover:scale-105 hover:drop-shadow-xl transition-transform duration-300"
          >
            <div className="mb-4 cursor-pointer">
              {product.images && product.images.length > 0 && (
                <PhotoProvider>
                  <div className="flex flex-wrap gap-2">
                    <PhotoView src={product.images[0]}>
                      <img
                        src={product.images[0]}
                        alt={`Product Image 1`}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </PhotoView>
                    {product.images.length > 1 && (
                      <PhotoView src={product.images[1]}>
                        <div className="w-16 h-16 flex items-center justify-center bg-gray-200 rounded text-gray-600">
                          +{product.images.length - 1}
                        </div>
                      </PhotoView>
                    )}
                  </div>
                  {product.images.slice(2).map((image, index) => (
                    <PhotoView key={index + 1} src={image} />
                  ))}
                </PhotoProvider>
              )}
            </div>
            <div className="mb-4">
              <p>
                <span className="font-semibold">Brand:</span> {product.name}
              </p>
              <p>
                <span className="font-semibold">Price:</span> ${product.price}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SubCategoryListPage;
