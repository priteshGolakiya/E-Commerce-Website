/* eslint-disable react/prop-types */

const ProductTable = ({ products, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-1.5 border-b">Name</th>
            <th className="py-2 px-1.5 border-b">Brand</th>
            <th className="py-2 px-1.5 border-b">Price</th>
            <th className="py-2 px-1.5 border-b">Discount Price</th>
            <th className="py-2 px-1.5 border-b">Final Price</th>
            <th className="py-2 px-1.5 border-b">Stock</th>
            <th className="py-2 px-1.5 border-b">Images</th>
            <th className="py-2 px-1.5 border-b">Category</th>
            <th className="py-2 px-1.5 border-b">Subcategory</th>
            <th className="py-2 px-1.5 border-b">Delivery Options</th>
            <th className="py-2 px-1.5 border-b">Options</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td className="py-3 px-1.5 border-b">{product.name}</td>
              <td className="py-3 px-1.5 border-b">{product.brand}</td>
              <td className="py-3 px-1.5 border-b">${product.price}</td>
              {product.discountPrice ? (
                <td className="py-3 px-1.5 border-b text-green-600">
                  ${product.discountPrice}
                </td>
              ) : (
                <td className="py-3 px-1.5 border-b">N/A</td>
              )}
              <td className="py-3 px-1.5 border-b text-blue-600">
                ${product.finalPrice}
              </td>
              <td className="py-3 px-1.5 border-b">{product.stock}</td>
              <td className="py-3 px-1.5 border-b max-w-xs flex flex-col">
                {product.images && product.images.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {product.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Product Image ${index + 1}`}
                        className="w-16 h-16 object-cover rounded"
                      />
                    ))}
                  </div>
                )}
              </td>
              <td className="py-3 px-1.5 border-b">
                {product.category && product.category.name}
              </td>
              <td className="py-3 px-1.5 border-b">
                {product.subcategory && product.subcategory.name}
              </td>
              <td className="py-3 px-1.5 border-b">
                {product.deliveryOptions}
              </td>
              <td className="py-3 px-1.5 border-b">
                <button
                  className="mr-2 px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 focus:outline-none"
                  onClick={() => onEdit(product, true)}
                >
                  Edit
                </button>
                <button
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
                  onClick={() => onDelete(product._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
