import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

function Layout() {
  return (
    <>
      <ToastContainer />
      <Navbar />
      <main className="min-h-[calc(100vh-120px)] pt-20">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
