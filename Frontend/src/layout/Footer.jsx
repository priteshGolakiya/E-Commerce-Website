// Footer.js

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Shop by Category */}
          <div>
            <h5 className="text-lg font-semibold mb-4">Shop by Category</h5>
            <ul className="list-none">
              <li className="mb-2">
                <Link to="/category/668e1fedfeb40b90c20532f2" className="hover:text-white">
                  Electronics
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/category/668e1feafeb40b90c20532ef" className="hover:text-white">
                  Clothing
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/category/books" className="hover:text-white">
                  Books
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/category/home-decor" className="hover:text-white">
                  Home Decor
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Customer Service */}
          <div>
            <h5 className="text-lg font-semibold mb-4">Customer Service</h5>
            <ul className="list-none">
              <li className="mb-2">
                <Link to="/faq" className="hover:text-white">
                  FAQ
                </Link>
              </li>
              
              <li className="mb-2">
                <Link to="/shipping" className="hover:text-white">
                  Shipping Information
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/contact" className="hover:text-white">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: About Us */}
          <div>
            <h5 className="text-lg font-semibold mb-4">About Us</h5>
            <ul className="list-none">
              <li className="mb-2">
                <Link to="/about" className="hover:text-white">
                  Our Story
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/team" className="hover:text-white">
                  Our Team
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/careers" className="hover:text-white">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Stay Connected */}
          <div>
            <h5 className="text-lg font-semibold mb-4">Stay Connected</h5>
            <div className="flex space-x-4">
              <Link
                to="#"
                className="w-8 h-8 bg-gray-700 flex items-center justify-center rounded-full text-white hover:bg-gray-600"
              >
                <i className="fab fa-facebook"></i>
              </Link>
              <Link
                to="#"
                className="w-8 h-8 bg-gray-700 flex items-center justify-center rounded-full text-white hover:bg-gray-600"
              >
                <i className="fab fa-twitter"></i>
              </Link>
              <Link
                to="#"
                className="w-8 h-8 bg-gray-700 flex items-center justify-center rounded-full text-white hover:bg-gray-600"
              >
                <i className="fab fa-instagram"></i>
              </Link>
              <Link
                to="#"
                className="w-8 h-8 bg-gray-700 flex items-center justify-center rounded-full text-white hover:bg-gray-600"
              >
                <i className="fab fa-pinterest"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
