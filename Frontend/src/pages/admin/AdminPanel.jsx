import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  FaBars,
  FaUser,
  FaUsers,
  FaBoxOpen,
  FaShoppingCart,
  FaChartBar,
  FaCogs,
  FaTimes,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import defaultImg from "../../default.jpg";

const AdminPanel = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const user = useSelector((state) => state.user.user);

  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
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
      >
        <div className="flex justify-between items-center p-4">
          <button onClick={toggleSidebar} className="focus:outline-none">
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
        <nav className="mt-4">
          <ul>
            <li className="mb-2">
              <Link to="/admin-panel" className={getLinkClass("/admin-panel")}>
                <FaUser className="mr-2" /> {isSidebarOpen && "Dashboard"}
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="/admin-panel/all-users"
                className={getLinkClass("/admin-panel/all-users")}
              >
                <FaUsers className="mr-2" /> {isSidebarOpen && "All Users"}
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="/admin-panel/all-products"
                className={getLinkClass("/admin-panel/all-products")}
              >
                <FaBoxOpen className="mr-2" /> {isSidebarOpen && "All Products"}
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="/admin-panel/orders"
                className={getLinkClass("/admin-panel/orders")}
              >
                <FaShoppingCart className="mr-2" /> {isSidebarOpen && "Orders"}
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="/admin-panel/customers"
                className={getLinkClass("/admin-panel/customers")}
              >
                <FaUser className="mr-2" /> {isSidebarOpen && "Customers"}
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="/admin-panel/reports"
                className={getLinkClass("/admin-panel/reports")}
              >
                <FaChartBar className="mr-2" /> {isSidebarOpen && "Reports"}
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="/admin-panel/settings"
                className={getLinkClass("/admin-panel/settings")}
              >
                <FaCogs className="mr-2" /> {isSidebarOpen && "Settings"}
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Admin Panel</h1>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-gray-600">welcome {user.username}</span>
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
          {/* Outlet for rendering nested routes */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
