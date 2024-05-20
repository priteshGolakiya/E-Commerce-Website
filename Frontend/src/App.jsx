import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./layout/Layout.jsx";
import Login from "./pages/loginSingup/Login.jsx";
import Signup from "./pages/loginSingup/Signup.jsx";
import AdminPanel from "./pages/admin/AdminPanel.jsx";
import AllUser from "./pages/admin/adminPages/AllUser.jsx";
import AllProducts from "./pages/admin/adminPages/AllProducts.jsx";
import AddProduct from "./pages/admin/adminPages/product/AddProduct.jsx";
import CategoryList from "./pages/admin/adminPages/category/CategoryList.jsx";
import NewCategory from "./pages/admin/adminPages/category/NewCategory.jsx";
import OrdersList from "./pages/admin/adminPages/orders/OrdersList.jsx";
import OrderDetail from "./pages/admin/adminPages/orders/OrderDetail.jsx";
import OrderTracking from "./pages/admin/adminPages/orders/OrderTracking.jsx";
import NewUser from "./pages/admin/adminPages/users/NewUser.jsx";
import ForgotPassword from "./pages/loginSingup/ForgotPasswod.jsx";
import AdminRoute from "./AdminRoute.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route element={<AdminRoute />}>
          <Route path="admin-panel" element={<AdminPanel />}>
            <Route index element={<div>Welcome to the Admin Panel</div>} />
            <Route path="users/all-users" element={<AllUser />} />
            <Route path="users/new" element={<NewUser />} />
            <Route path="products/all-products" element={<AllProducts />} />
            <Route path="products/add" element={<AddProduct />} />
            <Route path="category/list" element={<CategoryList />} />
            <Route path="category/new" element={<NewCategory />} />
            <Route path="orders/list" element={<OrdersList />} />
            <Route path="orders/detail" element={<OrderDetail />} />
            <Route path="orders/tracking" element={<OrderTracking />} />
            <Route path="reports" element={<div>View Reports</div>} />
            <Route path="settings" element={<div>Settings</div>} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
