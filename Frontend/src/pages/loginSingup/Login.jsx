/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginIcon from "../../assets/signin.gif";
import axios from "axios";
import summaryAPI from "../../utils/summaryAPI";
import { toast } from "react-toastify";
import { setUserDetails } from "../../redux/slices/userSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  let dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [error, setError] = useState("");

  const handleOnChange = (e) => {
    const { name, value, checked, type } = e.target;
    const inputValue = type === "checkbox" ? checked : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: inputValue,
    }));
  };

  const handleTogglePassword = () => {
    setShowPassword((prevShow) => !prevShow);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(summaryAPI.admin.logIn.url, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { data } = response.data;
      dispatch(setUserDetails(data.user));
      toast.success("Login successful!");
      console.log(response);
      setError("");
      navigate("/");
    } catch (error) {
      console.error("Axios request error:", error);
      setError(error.response?.data?.error || "An error occurred");
      toast.error(
        error.response?.data?.error || error.message || "An error occurred"
      );
    }
  };

  return (
    <section
      id="signin"
      className="bg-gray-100 min-h-screen flex items-center justify-center"
    >
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
          <img
            src={loginIcon}
            alt="Signin icon"
            className="object-cover w-full h-full"
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email:
            </label>
            <input
              required
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleOnChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your email"
              autoComplete="email"
              aria-label="Email"
            />
          </div>
          {/* Password input */}
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password:
            </label>
            <input
              required
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleOnChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm pr-10"
              placeholder="Enter your password"
              autoComplete="current-password"
              aria-label="Password"
            />
            <button
              type="button"
              className="absolute top-6 inset-y-0 right-0 flex items-center px-3 text-gray-600"
              onClick={handleTogglePassword}
            >
              {showPassword ? (
                <i className="fa-solid fa-eye-slash"></i>
              ) : (
                <i className="fa-solid fa-eye"></i>
              )}
            </button>
          </div>
          {/* Remember Me checkbox (optional) */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleOnChange}
              className="mr-2"
            />
            <label htmlFor="rememberMe" className="text-sm text-gray-700">
              Remember Me
            </label>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white rounded-md py-2 px-4 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Sign In
          </button>
          <Link to={"/signup"} className="block w-fit ml-auto hover:underline">
            Don't have an account? Sign Up
          </Link>
        </form>
      </div>
    </section>
  );
};

export default Login;
