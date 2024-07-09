import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  FaBars,
  FaUser,
  FaBoxOpen,
  FaShoppingCart,
  FaChartBar,
  FaCogs,
  FaTimes,
  FaChevronDown,
  FaChevronUp,
  FaUsers,
  FaList,
  FaPlus,
  FaUserPlus,
  FaInfo,
  FaMapMarkerAlt,
  FaTags,
  FaUserShield,
  FaStar,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import defaultImg from "../../default.jpg";

const AdminPanel = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const [isCategoriesDropdownOpen, setIsCategoriesDropdownOpen] =
    useState(false);
  const [isOrdersDropdownOpen, setIsOrdersDropdownOpen] = useState(false);
  const [isUsersDropdownOpen, setIsUsersDropdownOpen] = useState(false);
  const [isSubCategoriesDropdownOpen, setIsSubCategoriesDropdownOpen] =
    useState(false);

  const user = useSelector((state) => state.user.user);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    if (!isSidebarOpen) {
      setIsProductsDropdownOpen(false);
      setIsCategoriesDropdownOpen(false);
      setIsOrdersDropdownOpen(false);
      setIsUsersDropdownOpen(false);
    }
  };

  const toggleProductsDropdown = () => {
    setIsProductsDropdownOpen(!isProductsDropdownOpen);
  };

  const toggleCategoriesDropdown = () => {
    setIsCategoriesDropdownOpen(!isCategoriesDropdownOpen);
  };
  const toggleSubCategoriesDropdown = () => {
    setIsSubCategoriesDropdownOpen(!isSubCategoriesDropdownOpen);
  };

  const toggleOrdersDropdown = () => {
    setIsOrdersDropdownOpen(!isOrdersDropdownOpen);
  };

  const toggleUsersDropdown = () => {
    setIsUsersDropdownOpen(!isUsersDropdownOpen);
  };

  const getLinkClass = (path) => {
    return location.pathname === path
      ? "flex items-center p-2 rounded bg-blue-600 text-white"
      : "flex items-center p-2 rounded hover:bg-blue-600 hover:text-white transition-colors duration-300";
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-slate-800 text-gray-300 ${
          isSidebarOpen ? "w-64" : "w-20"
        } transition-all duration-300`}
        aria-expanded={isSidebarOpen}
      >
        <div className="flex justify-between items-center p-4">
          <button
            onClick={toggleSidebar}
            className="focus:outline-none"
            aria-label="Toggle sidebar"
          >
            {isSidebarOpen ? (
              <FaTimes className="text-2xl" />
            ) : (
              <FaBars className="text-2xl" />
            )}
          </button>
          {isSidebarOpen && (
            <span className="text-xl font-semibold">Admin Panel</span>
          )}
        </div>
        <div className="overflow-y-auto h-[calc(100vh-50px)] scrollbar-hidden">
          {/* Apply scrollable styles */}
          <nav className="mt-4">
            <ul>
              <li className="mb-2">
                <Link
                  to="/admin-panel"
                  className={getLinkClass("/admin-panel")}
                >
                  <FaUserShield className="mr-2" />
                  {isSidebarOpen && "Dashboard"}
                </Link>
              </li>
              {/* ----------------------------------------------------------------- */}
              <li className="mb-2">
                <div
                  className="flex items-center p-2 rounded cursor-pointer hover:bg-blue-600 hover:text-white transition-colors duration-300"
                  onClick={isSidebarOpen ? toggleUsersDropdown : undefined}
                  aria-haspopup="true"
                  aria-expanded={isUsersDropdownOpen}
                >
                  <FaUser className="mr-2" />
                  {isSidebarOpen && <span>User</span>}
                  {isSidebarOpen && (
                    <span className="ml-auto">
                      {isUsersDropdownOpen ? (
                        <FaChevronUp />
                      ) : (
                        <FaChevronDown />
                      )}
                    </span>
                  )}
                </div>
                {(isUsersDropdownOpen || !isSidebarOpen) && (
                  <ul className={`${isSidebarOpen ? "ml-4" : "ml-0"}`}>
                    <li>
                      <Link
                        to="/admin-panel/users/all-users"
                        className={getLinkClass("/admin-panel/users/all-users")}
                      >
                        <FaUsers className="mr-2" />
                        {isSidebarOpen && "Users List"}
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin-panel/users/new"
                        className={getLinkClass("/admin-panel/users/new")}
                      >
                        <FaUserPlus className="mr-2" />
                        {isSidebarOpen && "Add New User"}
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              {/* ----------------------------------------------------------------- */}
              <li className="mb-2">
                <div
                  className="flex items-center p-2 rounded cursor-pointer hover:bg-blue-600 hover:text-white transition-colors duration-300"
                  onClick={isSidebarOpen ? toggleProductsDropdown : undefined}
                  aria-haspopup="true"
                  aria-expanded={isProductsDropdownOpen}
                >
                  <FaBoxOpen className="mr-2" />
                  {isSidebarOpen && <span>Products</span>}
                  {isSidebarOpen && (
                    <span className="ml-auto">
                      {isProductsDropdownOpen ? (
                        <FaChevronUp />
                      ) : (
                        <FaChevronDown />
                      )}
                    </span>
                  )}
                </div>
                {(isProductsDropdownOpen || !isSidebarOpen) && (
                  <ul className={`${isSidebarOpen ? "ml-4" : "ml-0"}`}>
                    <li>
                      <Link
                        to="/admin-panel/products/all-products"
                        className={getLinkClass(
                          "/admin-panel/products/all-products"
                        )}
                      >
                        <FaList className="mr-2" />
                        {isSidebarOpen && "Products List"}
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin-panel/products/add"
                        className={getLinkClass("/admin-panel/products/add")}
                      >
                        <FaPlus className="mr-2" />
                        {isSidebarOpen && "Add Product"}
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              {/* ----------------------------------------------------------------- */}
              <li className="mb-2">
                <div
                  className="flex items-center p-2 rounded cursor-pointer hover:bg-blue-600 hover:text-white transition-colors duration-300"
                  onClick={isSidebarOpen ? toggleCategoriesDropdown : undefined}
                  aria-haspopup="true"
                  aria-expanded={isCategoriesDropdownOpen}
                >
                  <FaTags className="mr-2" />
                  {isSidebarOpen && <span>Category</span>}
                  {isSidebarOpen && (
                    <span className="ml-auto">
                      {isCategoriesDropdownOpen ? (
                        <FaChevronUp />
                      ) : (
                        <FaChevronDown />
                      )}
                    </span>
                  )}
                </div>
                {(isCategoriesDropdownOpen || !isSidebarOpen) && (
                  <ul className={`${isSidebarOpen ? "ml-4" : "ml-0"}`}>
                    <li>
                      <Link
                        to="/admin-panel/category/list"
                        className={getLinkClass("/admin-panel/category/list")}
                      >
                        <FaList className="mr-2" />
                        {isSidebarOpen && "Category List"}
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin-panel/category/new"
                        className={getLinkClass("/admin-panel/category/new")}
                      >
                        <FaPlus className="mr-2" />
                        {isSidebarOpen && "New Category"}
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              {/* ----------------------------------------------------------------- */}
              <li className="mb-2">
                {/* Subcategory dropdown */}
                <div
                  className="flex items-center p-2 rounded cursor-pointer hover:bg-blue-600 hover:text-white transition-colors duration-300"
                  onClick={
                    isSidebarOpen ? toggleSubCategoriesDropdown : undefined
                  }
                  aria-haspopup="true"
                  aria-expanded={isSubCategoriesDropdownOpen}
                >
                  <FaTags className="mr-2" />
                  {isSidebarOpen && <span>Sub Category</span>}
                  {isSidebarOpen && (
                    <span className="ml-auto">
                      {isSubCategoriesDropdownOpen ? (
                        <FaChevronUp />
                      ) : (
                        <FaChevronDown />
                      )}
                    </span>
                  )}
                </div>
                {(isSubCategoriesDropdownOpen || !isSidebarOpen) && (
                  <ul className={`${isSidebarOpen ? "ml-4" : "ml-0"}`}>
                    <li>
                      <Link
                        to="/admin-panel/sub-category/list"
                        className={getLinkClass(
                          "/admin-panel/sub-category/list"
                        )}
                      >
                        <FaList className="mr-2" />
                        {isSidebarOpen && "Sub Category List"}
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin-panel/sub-category/new"
                        className={getLinkClass(
                          "/admin-panel/sub-category/new"
                        )}
                      >
                        <FaPlus className="mr-2" />
                        {isSidebarOpen && "New Sub Category"}
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              {/* ----------------------------------------------------------------- */}
              <li className="mb-2">
                <div
                  className="flex items-center p-2 rounded cursor-pointer hover:bg-blue-600 hover:text-white transition-colors duration-300"
                  onClick={isSidebarOpen ? toggleOrdersDropdown : undefined}
                  aria-haspopup="true"
                  aria-expanded={isOrdersDropdownOpen}
                >
                  <FaShoppingCart className="mr-2" />
                  {isSidebarOpen && <span>Order</span>}
                  {isSidebarOpen && (
                    <span className="ml-auto">
                      {isOrdersDropdownOpen ? (
                        <FaChevronUp />
                      ) : (
                        <FaChevronDown />
                      )}
                    </span>
                  )}
                </div>
                {(isOrdersDropdownOpen || !isSidebarOpen) && (
                  <ul className={`${isSidebarOpen ? "ml-4" : "ml-0"}`}>
                    <li>
                      <Link
                        to="/admin-panel/orders/list"
                        className={getLinkClass("/admin-panel/orders/list")}
                      >
                        <FaList className="mr-2" />
                        {isSidebarOpen && "Order List"}
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin-panel/orders/detail"
                        className={getLinkClass("/admin-panel/orders/detail")}
                      >
                        <FaInfo className="mr-2" />
                        {isSidebarOpen && "Order Detail"}
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin-panel/orders/tracking"
                        className={getLinkClass("/admin-panel/orders/tracking")}
                      >
                        <FaMapMarkerAlt className="mr-2" />
                        {isSidebarOpen && "Order Tracking"}
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              {/* ----------------------------------------------------------------- */}
              <li className="mb-2">
                <Link
                  to="/admin-panel/review"
                  className={getLinkClass("/admin-panel/review")}
                >
                  <FaStar className="mr-2" />
                  {isSidebarOpen && "review"}
                </Link>
              </li>
              {/* ----------------------------------------------------------------- */}
              <li className="mb-2">
                <Link
                  to="/admin-panel/reports"
                  className={getLinkClass("/admin-panel/reports")}
                >
                  <FaChartBar className="mr-2" />
                  {isSidebarOpen && "Reports"}
                </Link>
              </li>
              {/* ----------------------------------------------------------------- */}
              <li className="mb-2">
                <Link
                  to="/admin-panel/settings"
                  className={getLinkClass("/admin-panel/settings")}
                >
                  <FaCogs className="mr-2" />
                  {isSidebarOpen && "Settings"}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Admin Panel</h1>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-gray-600">Welcome, {user.username}</span>
                <img
                  src={user.profilePic || defaultImg}
                  alt={user.username}
                  className="w-10 h-10 rounded-full"
                />
              </>
            ) : (
              <FaUser className="text-2xl text-gray-600" />
            )}
          </div>
        </header>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
