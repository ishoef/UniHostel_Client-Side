import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../Context/AuthProvider";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AddMealForm = ({ setMeals }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const distributorName = user.displayName;
  const distributorEmail = user.email;

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    data.distributorName = distributorName || "";
    data.distributorEmail = distributorEmail || "";
    data.rating = 0;
    data.likes = 0;
    data.reviews_count = 0;

    try {
      const response = await axiosSecure.post("/meals", data);

      if (response.data.insertedId || response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Meal Submitted!",
          text: "Your meal has been successfully added.",
          confirmButtonColor: "#ec4899",
        });

        const allMeals = await axiosSecure.get("/meals");
        setMeals ? setMeals(allMeals.data) : "";
        reset();
      }
    } catch (error) {
      console.error("Error Submitting meal:", error);
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "Something went wrong. Please try again later.",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-10 bg-white dark:bg-gray-900 shadow-2xl rounded-3xl mt-12 border border-pink-100 dark:border-gray-700">
      <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 text-transparent bg-clip-text mb-8 animate-pulse">
        🍽️ Add a Delicious New Meal
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {/* Meal Title */}
        <div>
          <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Meal Title
          </label>
          <input
            {...register("title", { required: true })}
            className="w-full border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus-within:outline-primary p-3 rounded hover:shadow-md transition"
            placeholder="e.g. Spicy Chicken Curry"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">Title is required</p>
          )}
        </div>

        {/* Meal Category */}
        <div>
          <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Category
          </label>
          <select
            {...register("category", { required: true })}
            className="w-full h-[52px] border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-primary p-3 rounded hover:shadow-md transition"
          >
            <option value="" disabled>
              -- Select Category --
            </option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">Category is required</p>
          )}
        </div>

        {/* Image URL */}
        <div className="md:col-span-2">
          <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Image URL
          </label>
          <input
            type="url"
            {...register("imageUrl", { required: true })}
            className="w-full border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus-within:outline-primary p-3 rounded hover:shadow-md transition"
            placeholder="Enter image URL (e.g. https://...)"
          />
          {errors.imageUrl && (
            <p className="text-red-500 text-sm mt-1">Image URL is required</p>
          )}
        </div>

        {/* Ingredients */}
        <div className="md:col-span-2">
          <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Ingredients
          </label>
          <textarea
            {...register("ingredients", { required: true })}
            className="w-full border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus-within:outline-primary p-3 rounded hover:shadow-md transition"
            rows="3"
            placeholder="List ingredients separated by commas"
          />
          {errors.ingredients && (
            <p className="text-red-500 text-sm mt-1">Ingredients required</p>
          )}
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Description
          </label>
          <textarea
            {...register("description", { required: true })}
            className="w-full border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus-within:outline-primary p-3 rounded hover:shadow-md transition"
            rows="3"
            placeholder="Describe how the meal tastes and looks..."
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">Description required</p>
          )}
        </div>

        {/* Price */}
        <div>
          <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Price ($)
          </label>
          <input
            type="number"
            step="0.01"
            {...register("price", { required: true })}
            className="w-full border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus-within:outline-primary p-3 rounded hover:shadow-md transition"
          />
          {errors.price && (
            <p className="text-red-500 text-sm mt-1">Price required</p>
          )}
        </div>

        {/* Post Time */}
        <div>
          <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Post Time
          </label>
          <input
            type="datetime-local"
            {...register("postTime", { required: true })}
            className="w-full border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus-within:outline-primary p-3 rounded hover:shadow-md transition"
          />
          {errors.postTime && (
            <p className="text-red-500 text-sm mt-1">Post time required</p>
          )}
        </div>

        {/* Distributor Name */}
        <div>
          <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Distributor Name
          </label>
          <input
            value={distributorName}
            readOnly
            className="w-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 p-3 border rounded"
          />
        </div>

        {/* Distributor Email */}
        <div>
          <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Distributor Email
          </label>
          <input
            value={distributorEmail}
            readOnly
            className="w-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 p-3 border rounded"
          />
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2 flex justify-center mt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-8 py-3 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 text-white font-bold shadow-md ${
              isSubmitting
                ? "opacity-50 cursor-not-allowed"
                : "hover:shadow-lg transform hover:scale-105 transition"
            }`}
          >
            {isSubmitting ? "Submitting..." : "🚀 Submit Meal"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMealForm;
