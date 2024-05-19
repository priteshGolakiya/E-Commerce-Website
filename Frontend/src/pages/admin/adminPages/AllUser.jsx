import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import Modal from "../../../component/modal";
import summaryAPI from "../../../utils/summaryAPI";
import defaultImg from "../../../default.jpg";
import Preloader from "../../../component/Preloader";

const AllUser = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null); // Error state for handling API errors

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(summaryAPI.getAllUser.url, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });
        setUserData(response.data.data);
      } catch (error) {
        setError("Error fetching user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const openModal = (user) => {
    setCurrentUser(user);
    setFormData({
      name: user.userName,
      email: user.email,
      password: "",
      role: user.role,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentUser(null);
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "",
    }); // Clear form data when closing modal
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${summaryAPI.updateUser.url}/${currentUser._id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setUserData((prevData) =>
        prevData.map((user) =>
          user._id === currentUser._id ? response.data.data : user
        )
      );
      closeModal();
    } catch (error) {
      setError("Error updating user");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {loading ? (
        <Preloader />
      ) : (
        <div className="overflow-x-auto">
          <h1 className="text-3xl font-semibold mb-4">All Users</h1>
          <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
            <thead className="bg-blue-200">
              <tr className="text-center">
                <th className="px-4 py-2">User ID</th>
                <th className="px-4 py-2">Username</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Created At</th>
                <th className="px-4 py-2">Updated At</th>
                <th className="px-4 py-2">Profile Picture</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black">
              {userData.map((user) => (
                <tr key={user._id} className="hover:bg-gray-200">
                  <td className="px-4 py-3">{user?._id}</td>
                  <td className="px-4 py-3">{user?.userName}</td>
                  <td className="px-4 py-3">{user?.email}</td>
                  <td className="px-4 py-3">{user?.role}</td>
                  <td className="px-4 py-3">
                    {moment(user?.createdAt).format("LLL")}
                  </td>
                  <td className="px-4 py-3">
                    {moment(user?.updatedAt).format("LLL")}
                  </td>
                  <td className="px-4 py-3">
                    <img
                      src={user.profilePic || defaultImg}
                      alt="Profile Pic"
                      className="w-14 h-14 border-2 border-gray-400 cursor-pointer rounded-full transform transition duration-300 hover:scale-125 hover:border-indigo-500"
                    />
                  </td>
                  <td className="px-4 py-4 text-center ">
                    <button
                      className="text-indigo-600 bg-gray-200 p-2 rounded-2xl hover:text-indigo-900 hover:bg-indigo-300 focus:outline-none"
                      onClick={() => openModal(user)}
                    >
                      <i className="fa-solid fa-user-pen"></i>
                    </button>
                    <button className="text-red-600 bg-gray-200 p-2 rounded-2xl hover:text-red-900 hover:bg-red-300 focus:outline-none">
                      <i className="fa-solid fa-user-minus"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* Modal component */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="p-8">
          <h2 className="text-xl font-semibold mb-4">Edit User</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="text-right">
              <button
                type="submit"
                className="text-white bg-blue-500 hover:bg-blue-600 p-2 rounded-md"
              >
                Update User
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default AllUser;
