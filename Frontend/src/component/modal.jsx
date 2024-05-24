/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

const Modal = ({ isOpen, onClose, children }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(isOpen); // Enable animations when modal opens
  }, [isOpen]);

  const handleClose = () => {
    setIsAnimating(false); // Disable animations when modal closes
    setTimeout(() => onClose(), 300); // Close modal after animation completes
  };

  return (
    <>
      {isOpen && (
        <div
          className={`fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex justify-center items-center ${
            isAnimating ? "fade-in" : "fade-out"
          }`}
        >
          <div className="bg-white p-8 rounded-lg max-w-md transform transition-transform duration-300">
            <div className="flex justify-end">
              <button
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={handleClose}
              >
                <i className="fa-solid fa-x text-lg"></i>
              </button>
            </div>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
