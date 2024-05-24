// utils/uploadImage.js
import axios from "axios";

const uploadImage = async (image) => {
  try {
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/dlbflgtdr/image/upload`;
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "mern_product"); // Replace with your preset

    const response = await axios.post(
      cloudinaryUrl, // Replace with your Cloudinary URL
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    return response.data;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error("Failed to upload image");
  }
};

export default uploadImage;
