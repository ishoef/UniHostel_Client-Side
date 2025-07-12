import React, { useState } from "react";
import axios from "axios";

const AddMealForm = ({ distributorName, distributorEmail }) => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    image: "",
    ingredients: "",
    description: "",
    price: "",
    postTime: "",
    distributorName: distributorName || "",
    distributorEmail: distributorEmail || "",
    rating: 0,
    likes: 0,
    reviews_count: 0,
  });

  const [loading, setLoading] = useState(false);

  const imageBB_API_KEY = "YOUR_IMAGE_BB_API_KEY"; // Replace with actual key

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    const form = new FormData();
    form.append("image", image);

    setLoading(true);
    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imageBB_API_KEY}`,
        form
      );
      setFormData((prev) => ({ ...prev, image: res.data.data.url }));
    } catch (err) {
      console.error("Image upload failed", err);
      alert("Image upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    // POST to backend
  };

  return (
    <div className="max-w-4xl mx-auto p-10 bg-white shadow-2xl rounded-3xl mt-12 border border-pink-100">
      <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 text-transparent bg-clip-text mb-8 animate-pulse">
        🍽️ Add a Delicious New Meal
      </h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        <div>
          <label className="block font-semibold text-gray-700 mb-1">
            Meal Title
          </label>
          <input
            name="title"
            onChange={handleChange}
            className="w-full border border-gray-400 focus-within:outline-primary p-3 rounded  hover:shadow-md transition"
            placeholder="e.g. Spicy Chicken Curry"
            required
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">
            Category
          </label>
          <input
            name="category"
            onChange={handleChange}
            className="w-full border border-gray-400 focus-within:outline-primary p-3 rounded  hover:shadow-md transition"
            placeholder="e.g. Dinner"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block font-semibold text-gray-700 mb-1">
            Upload Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100 transition"
            required
          />
          {loading && (
            <p className="text-sm text-gray-500 mt-1">Uploading image...</p>
          )}
          {formData.image && (
            <img
              src={formData.image}
              alt="Uploaded"
              className="w-40 h-40 object-cover mt-4 rounded shadow-md hover:scale-105 transition-transform duration-300"
            />
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block font-semibold text-gray-700 mb-1">
            Ingredients
          </label>
          <textarea
            name="ingredients"
            onChange={handleChange}
            className="w-full border border-gray-400 focus-within:outline-primary p-3 rounded hover:shadow-md transition"
            rows="3"
            placeholder="List ingredients separated by commas"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block font-semibold text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            onChange={handleChange}
            className="w-full border border-gray-400 focus-within:outline-primary p-3 rounded hover:shadow-md transition"
            rows="3"
            placeholder="Describe how the meal tastes and looks..."
            required
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">
            Price ($)
          </label>
          <input
            type="number"
            name="price"
            onChange={handleChange}
            className="w-full border border-gray-400 focus-within:outline-primary p-3 rounded hover:shadow-md transition"
            required
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">
            Post Time
          </label>
          <input
            type="datetime-local"
            name="postTime"
            onChange={handleChange}
            className="w-full border border-gray-400 focus-within:outline-primary p-3 rounded hover:shadow-md transition"
            required
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">
            Distributor Name
          </label>
          <input
            value={formData.distributorName}
            readOnly
            className="w-full bg-gray-100 text-gray-600 p-3 border rounded"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">
            Distributor Email
          </label>
          <input
            value={formData.distributorEmail}
            readOnly
            className="w-full bg-gray-100 text-gray-600 p-3 border rounded"
          />
        </div>

        <div className="md:col-span-2 flex justify-center mt-6">
          <button
            type="submit"
            className="px-8 py-3 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 text-white font-bold shadow-md hover:shadow-lg transform hover:scale-105 transition"
          >
            🚀 Submit Meal
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMealForm;
