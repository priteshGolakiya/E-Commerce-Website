import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./layout/Layout.jsx";
import Login from "./pages/loginSingup/Login.jsx";
import Signup from "./pages/loginSingup/Signup.jsx";
import AdminPanel from "./pages/admin/AdminPanel.jsx";
// import CategoryProduct from "./pages/CategoryProduct";
// import ProductDetails from "./pages/ProductDetails";
// import Cart from "./pages/Cart";
// import SearchProduct from "./pages/SearchProduct";
import AllUser from "./pages/admin/adminPages/AllUser.jsx";
import AllProducts from "./pages/admin/adminPages/AllProducts.jsx";
import ForgotPasswod from "./pages/loginSingup/ForgotPasswod.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="forgot-password" element={<ForgotPasswod />} />
        {/* <Route path="product-category" element={<CategoryProduct />} /> */}
        {/* <Route path="product/:id" element={<ProductDetails />} /> */}
        {/* <Route path="cart" element={<Cart />} /> */}
        {/* <Route path="search" element={<SearchProduct />} /> */}
        <Route path="admin-panel" element={<AdminPanel />}>
          <Route index element={<div>Welcome to the Admin Panel</div>} />
          <Route path="all-users" element={<AllUser />} />
          <Route path="all-products" element={<AllProducts />} />
          <Route path="orders" element={<div>Manage Orders</div>} />
          <Route path="customers" element={<div>Manage Customers</div>} />
          <Route path="reports" element={<div>View Reports</div>} />
          <Route path="settings" element={<div>Settings</div>} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
