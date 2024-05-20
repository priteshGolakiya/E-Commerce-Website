// AdminRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminRoute = () => {
  const user = useSelector((state) => state.user.user);

  if (!user) {
    // If the user is not logged in, show a toast message and redirect to login page
    toast.error("Please log in to access this page.");
    return <Navigate to="/login" />;
  }

  if (user.role !== "admin") {
    // If the user is not an admin, show a toast message and redirect to home page
    toast.error("You do not have permission to access this page.");
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default AdminRoute;
