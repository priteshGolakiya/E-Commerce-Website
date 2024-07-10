import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import summaryAPI from "../../utils/summaryAPI";
import Preloader from "../../component/Preloader";
import "react-photo-view/dist/react-photo-view.css";

const CategoryListPage = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${summaryAPI.common.getAllCategoryById.url}/${id}`
        );
        if (response.data.success) {
          setData(response.data.category);
        } else {
          setError("Failed to fetch category data");
        }
      } catch (error) {
        setError("Error fetching category data: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <Preloader />;
  }

  if (error || !data) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-red-500">{error || "No category data found."}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">{data.name}</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data.subcategories.map((subcategory) => (
          <Link
            key={subcategory._id}
            to={`/subcategory/${subcategory._id}`}
            className="text-black text-decoration-none"
          >
            <div className="bg-white p-4 shadow rounded-lg transform hover:scale-105 hover:drop-shadow-xl transition-transform duration-300 cursor-pointer">
              <h2 className="text-xl font-bold mb-4">{subcategory.name}</h2>
              {subcategory.products && subcategory.products.length > 0 ? (
                <div className="mb-4">
                  <img
                    src={subcategory.products[0].image}
                    alt={`${subcategory.name} Product`}
                    className="w-full h-48 object-contain rounded"
                  />
                  {subcategory.products[0].price && (
                    <p className="text-gray-600">
                      ${subcategory.products[0].price.toFixed(2)}
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-gray-600">No products available</p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryListPage;
