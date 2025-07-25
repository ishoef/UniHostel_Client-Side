import React, { useEffect, useState } from "react";
// import useMeals from "../../Hooks/useMeals/useMeals";
import useAxios from "../../Hooks/useAxios";
import { useParams } from "react-router";
import useAuth from "../../hooks/useAuth.jsx/useAuth";
import Swal from "sweetalert2";
import useUserByEmail from "../../Hooks/useUserByEmail/useUserByEmail";

const MealDetail = () => {
  const { id } = useParams();
  console.log(id);

  const [reviews, setReviews] = useState([]);
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [meal, setMeal] = useState([]);
  const [loading, setLoading] = useState(false);
  const [requested, setRequested] = useState(false);
  const { user } = useAuth();
  const userId = user?.uid;

  console.log(requested);

  const { data: currentUser } = useUserByEmail(user?.email);
  console.log(currentUser);

  const [likes, setLikes] = useState([]);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const axiosInstance = useAxios();
  const isSubscribed = currentUser?.isSubscribed === true;

  console.log(meal);

  // Handle Review Submission
  const submitReview = async () => {
    if (!newComment.trim() || newRating === 0) return;

    if (!userId) {
      Swal.fire({
        title: "Oops!",
        text: "You must be logged in to submit a review.",
        icon: "info",
        confirmButtonText: "Login",
        preConfirm: () => {
          window.location.href = "/auth"; // Adjust this path as needed
        },
        // show cancel button
        showCancelButton: true,
        cancelButtonText: "Cancel",
      });
      return;
    }

    if (newRating === 0) {
      Swal.fire({
        title: "Please rate the meal!",
        text: "You must select a star rating before submitting your review.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }

    try {
      // 1️⃣ Submit the review
      const response = await axiosInstance.post(`/meals/${meal._id}/review`, {
        userId: userId,
        rating: newRating,
        comment: newComment,
        name: user?.displayName,
        email: user?.email,
        photoURL: user?.photoURL,
        mealName: meal.title,
        likes: meal.likes,
      });
      console.log(meal);
      if (response.data.success) {
        // 2️⃣ Re-fetch meal data to get updated reviews and rating
        const refreshedMeal = await axiosInstance.get(`/meals/${meal._id}`);
        setMeal(refreshedMeal.data);
        setReviews(refreshedMeal.data.reviews || []);

        Swal.fire({
          title: "Review Submitted Successfully!",
          text: "Thank you for your feedback.",
          icon: "success",
          confirmButtonText: "OK",
        });

        // 3️⃣ Reset form
        setNewRating(0);
        setNewComment("");
      } else {
        console.error("Review submission failed:", response.data.message);
        Swal.fire({
          title: "Error",
          text: response.data.message || "Failed to submit review.",
        });
      }
    } catch (err) {
      console.error("Error submitting review:", err);
      Swal.fire({
        title: "Error",
        text: "Failed to submit review.",
      });
    }
  };

  // Fetch Meal Details
  useEffect(() => {
    const fetchMeals = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`/meals/${id}`);
        setMeal(response.data);
        setReviews(response.data.reviews || []); // 👈 this line is critical
      } catch (err) {
        console.log("Error fetching Meals data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, [axiosInstance, id]);

  // Handle Like Initialization
  useEffect(() => {
    if (meal && Array.isArray(meal.likes)) {
      setLikes(meal.likes); // full array
      if (userId) {
        setLiked(meal.likes.includes(userId));
      }
    }
  }, [meal, userId]);

  // Handle Like Button Click
  const handleLike = async () => {
    if (!userId) {
      console.error("User ID is missing!");
      Swal.fire({
        icon: "warning",
        title: "Login & Subscription Required",
        text: "You must Login & subscribe to a plan to like meals.",
      });
      return;
    }

    if (!isSubscribed) {
      // 🔒 Show message if user isn't subscribed
      Swal.fire({
        icon: "warning",
        title: "Subscription Required",
        text: "You must subscribe to a plan to like meals.",
      });
      return;
    }

    try {
      const response = await axiosInstance.post(`/meals/${meal._id}/like`, {
        userId: userId,
      });

      const { likes: updatedLikes, liked: updatedLiked } = response.data;

      setLikes(updatedLikes);
      setLiked(updatedLiked);

      // Refresh meal details for latest like count
      const updatedMeal = await axiosInstance.get(`/meals/${meal._id}`);
      setMeal(updatedMeal.data);
    } catch (err) {
      console.error("Error liking meal:", err);
    }
  };

  // Handle Meal Request
  const handleRequestMeal = async () => {
    // 🧩 Check if logged in
    if (!userId) {
      return Swal.fire({
        title: "Login Required",
        text: "You must be logged in to request a meal.",
        icon: "info",
        confirmButtonText: "Login",
        showCancelButton: true,
        cancelButtonText: "Cancel",
        preConfirm: () => {
          window.location.href = "/auth";
        },
      });
    }

    try {
      // 🔄 Fetch user data
      const isSubscribed = currentUser?.isSubscribed === true;
      console.log(isSubscribed);

      // 📛 Check subscription
      if (!isSubscribed) {
        Swal.fire({
          title: "Subscription Required",
          text: "You need to subscribe to Silver, Gold, or Platinum to request a meal.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Subscribe Now",
          cancelButtonText: "Cancel",
          preConfirm: () => {
            window.location.href = "/subscription";
          },
        });

        return;
      }

      // ✅ Show confirmation alert first
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to request this meal?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, request it!",
      });

      if (result.isConfirmed) {
        // ✅ If user confirms, send the request
        const res = await axiosInstance.post(`/meals/${meal._id}/request`, {
          userId,
          name: user?.displayName,
          mealName: meal.title,
          email: user?.email,
          isSubscribed,
        });

        console.log(`After Request successful:`, res.data);

        if (res.data.success) {
          Swal.fire({
            title: "Request Sent",
            text: "Your meal request has been successfully submitted.",
            icon: "success",
          });

          setRequested(true);
        } else {
          Swal.fire({
            title: "Request Failed",
            text: res.data.message || "Something went wrong.",
            icon: "error",
          });
        }
      }
    } catch (err) {
      console.error("Error requesting meal:", err);

      // Handle common error statuses if needed
      if (err.response?.status === 403) {
        Swal.fire({
          title: "Access Denied",
          text: "You are not authorized to make this request.",
          icon: "error",
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "Could not complete the request. Try again later.",
          icon: "error",
        });
      }
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500 text-xl">
        Loading meal details...
      </div>
    );
  }

  console.log(reviews);

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row gap-6 bg-white p-6 rounded-lg shadow-sm">
        {/* Image */}
        <div className="w-full md:w-1/2 h-80">
          <img
            src={meal.imageUrl}
            alt={meal.title}
            className="w-full h-full object-cover rounded"
          />
        </div>

        {/* Details */}
        <div className="w-full md:w-1/2">
          <span className="bg-gray-100 px-3 py-1 text-sm rounded mb-2 inline-block">
            {meal.category}
          </span>
          <h2 className="text-2xl font-semibold">{meal.title}</h2>

          <div className="flex items-center gap-4 mt-2">
            <span className="text-yellow-500">⭐ {meal.rating || 0}</span>
            <span className="text-red-600 font-semibold text-lg">
              ৳{meal.price}
            </span>
          </div>

          <p className="mt-3 text-gray-600">
            👨‍🍳 Distributor: <strong>{meal.distributorName}</strong>
          </p>
          <p className="text-gray-600">📧 {meal.distributorEmail}</p>
          <p className="text-gray-600">
            📅 Posted: {new Date(meal.postTime).toLocaleString()}
          </p>

          <p className="mt-4 text-gray-700">{meal.description}</p>

          <div className="flex gap-3 mt-5">
            <button
              onClick={handleLike}
              className={`cursor-pointer px-4 py-2 rounded border ${
                liked
                  ? "bg-red-100 text-red-600 border-red-300"
                  : "bg-white text-black border-gray-300"
              } hover:bg-gray-100`}
            >
              ❤️ Like ({likes?.length || 0})
            </button>

            <button
              disabled={requested}
              onClick={handleRequestMeal}
              className={`cursor-pointer px-4 py-2 rounded border 
    ${
      requested
        ? "bg-gray-300 text-gray-600 border-gray-400 disabled:cursor-not-allowed"
        : "bg-blue-100 text-blue-700 border-blue-300 hover:bg-blue-200"
    }`}
            >
              {requested ? "🍽️ Requested" : "🍽️ Request Meal"}
            </button>
          </div>
        </div>
      </div>

      {/* Ingredients */}
      <div className="mt-10 bg-white p-6 rounded shadow-sm">
        <h3 className="text-xl font-semibold mb-4">Ingredients</h3>
        <div className="flex flex-wrap gap-3">
          {meal.ingredients?.split(",").map((item) => (
            <span
              key={item.trim()}
              className="px-3 py-1 bg-gray-100 rounded-full text-sm"
            >
              {item.trim()}
            </span>
          ))}
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-10 bg-white p-6 rounded shadow-sm">
        <h3 className="text-xl font-semibold mb-4">
          Reviews ({reviews.length})
        </h3>

        {/* Write Review */}
        <div className="mb-6">
          <label className="block mb-1 font-medium">Write a Review</label>
          <div className="flex gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((num) => (
              <span
                key={num}
                onClick={() => setNewRating(num)}
                className={`text-2xl cursor-pointer ${
                  newRating >= num ? "text-yellow-400" : "text-gray-300"
                }`}
              >
                ★
              </span>
            ))}
          </div>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full border border-gray-300 focus:outline-primary rounded p-2 mb-2"
            rows="3"
            placeholder="Share your thoughts about this meal..."
          />
          <button
            onClick={submitReview}
            className="bg-black cursor-pointer text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            Submit Review
          </button>
        </div>

        {/* Existing Reviews */}
        <div className="space-y-6">
          {reviews.map((r, idx) => (
            <div
              key={idx}
              className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
            >
              {/* Reviewer info */}
              <div className="flex items-center gap-3 mb-2">
                {/* Profile Initial */}
                <div className="w-10 h-10 rounded-full borde bg-gray-100 flex items-center justify-center text-gray-600 font-bold text-lg">
                  {/* {r.name?.charAt(0) || "U"} */}
                  <img
                    className={
                      "w-[40px] h-[40px] rounded-full border-2 border-green-600"
                    }
                    src={`${
                      r.photoURL ||
                      "https://w7.pngwing.com/pngs/946/556/png-transparent-computer-icons-login-user-profile-client-smiley-%D0%B7%D0%BD%D0%B0%D1%87%D0%BA%D0%B8-windows-10-thumbnail.png"
                    }`}
                    alt=""
                  />
                </div>

                <div>
                  <p className="font-semibold text-gray-800">{r.name}</p>
                  <div className="text-sm text-gray-500">
                    {new Date(r.date).toLocaleString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                    })}
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-2">
                {Array.from({ length: r.rating }, (_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">
                    ★
                  </span>
                ))}
                {Array.from({ length: 5 - r.rating }, (_, i) => (
                  <span key={i} className="text-gray-300 text-lg">
                    ★
                  </span>
                ))}
              </div>

              {/* Comment */}
              <p className="text-gray-700">{r.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MealDetail;
