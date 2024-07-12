/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import summaryAPI from "../../utils/summaryAPI";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Cart = () => {
  const user = useSelector((state) => state.user.user);
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(summaryAPI.common.getUserCart.url, {
          withCredentials: true,
        });
        setCart(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handleUpdateCartItem = useCallback(async (productId, quantity) => {
    try {
      await axios.put(
        `${summaryAPI.common.updateCartItem.url}`,
        { productId, quantity },
        { withCredentials: true }
      );
      setCart((prevCart) => ({
        ...prevCart,
        items: prevCart.items.map((item) =>
          item.product._id === productId
            ? { ...item, quantity: quantity }
            : item
        ),
      }));
    } catch (err) {
      setError(err.message);
    }
  }, []);

  const handleRemoveFromCart = useCallback(async (productId) => {
    try {
      await axios.delete(
        `${summaryAPI.common.removeFromCart.url}/${productId}`,
        { withCredentials: true }
      );
      setCart((prevCart) => ({
        ...prevCart,
        items: prevCart.items.filter((item) => item.product._id !== productId),
      }));
    } catch (err) {
      setError(err.message);
    }
  }, []);

  const handleClearCart = useCallback(async () => {
    try {
      await axios.delete(summaryAPI.common.clearCart.url, {
        withCredentials: true,
      });
      setCart(null);
    } catch (err) {
      setError(err.message);
    }
  }, []);

  const calculateTotalPrice = () => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
  };

  if (!user) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-semibold mb-4">Please Login</h2>
        <p className="text-gray-600 mb-8">
          You need to login to view your cart.
        </p>
        <Link
          to="/login"
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Login
        </Link>
      </div>
    );
  }

  if (error)
    return <div className="text-red-500 text-center p-4">Error: {error}</div>;

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );

  return (
    <>
      <div className="container mx-auto p-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Your Shopping Cart
        </h1>
        {cart && cart.items.length > 0 ? (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="px-6 py-4 bg-gray-100 border-b border-gray-200">
              <h2 className="text-xl font-semibold">Items in Your Cart</h2>
            </div>
            <ul className="divide-y divide-gray-200">
              {cart.items.map((item) => (
                <li key={item.product._id} className="px-6 py-4">
                  <div className="flex items-center">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-24 h-24 object-cover rounded-md mr-6"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900">
                        {item.product.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        ₹{item.product.price.toFixed(2)}
                      </p>
                      <div className="mt-2 flex items-center">
                        <button
                          className="bg-gray-200 text-gray-600 px-2 py-1 rounded-l-md hover:bg-gray-300"
                          onClick={() =>
                            handleUpdateCartItem(
                              item.product._id,
                              Math.max(1, item.quantity - 1)
                            )
                          }
                        >
                          -
                        </button>
                        <span className="px-4 py-1 bg-gray-100">
                          {item.quantity}
                        </span>
                        <button
                          className="bg-gray-200 text-gray-600 px-2 py-1 rounded-r-md hover:bg-gray-300"
                          onClick={() =>
                            handleUpdateCartItem(
                              item.product._id,
                              item.quantity + 1
                            )
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="text-right flex flex-col items-end">
                      <p className="text-lg font-medium text-gray-900">
                        ₹{(item.product.price * item.quantity).toFixed(2)}
                      </p>
                      <button
                        className="mt-2 text-sm text-red-600 hover:text-red-800 transition duration-150 ease-in-out"
                        onClick={() => handleRemoveFromCart(item.product._id)}
                      >
                        Remove
                      </button>
                      <Link
                        to={`/products/${item.product._id}`}
                        className="mt-1 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="px-6 py-4 bg-gray-50">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Total</h2>
                <p className="text-2xl font-bold">
                  ₹{calculateTotalPrice().toFixed(2)}
                </p>
              </div>
              <div className="mt-6 flex justify-between">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
                  onClick={handleClearCart}
                >
                  Clear Cart
                </button>
                <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition duration-200">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link
              to="/"
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition duration-200"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
