import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminRoute = () => {
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (!user) {
      toast.error("Please log in to access this page.");
    } else if (user.role !== "admin") {
      toast.error("You do not have permission to access this page.");
    }
  }, [user]);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default AdminRoute;
