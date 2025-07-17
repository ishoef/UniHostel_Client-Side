import React, { useEffect, useState } from "react";
// import useMeals from "../../Hooks/useMeals/useMeals";
import useAxios from "../../Hooks/useAxios";
import { useParams } from "react-router";
import useAuth from "../../hooks/useAuth.jsx/useAuth";

const MealDetail = () => {
  const { id } = useParams();
  console.log(id);

  const [reviews, setReviews] = useState([]);
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [meal, setMeal] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();
  const userId = user?.uid;

  const [likes, setLikes] = useState([]);
  const [liked, setLiked] = useState(false);

  const axiosInstance = useAxios();

  useEffect(() => {
    const fetchMeals = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`/meals/${id}`);
        setMeal(response.data);
      } catch (err) {
        console.log("Error fetching Meals data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, [axiosInstance, id]);

  console.log(meal);
  const submitReview = () => {
    if (!newComment || newRating === 0) return;

    const newReview = {
      name: "You",
      rating: newRating,
      comment: newComment,
      date: new Date().toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      }),
    };

    setReviews([newReview, ...reviews]);
    setNewRating(0);
    setNewComment("");
  };

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
     return;
   }

   try {
     const response = await axiosInstance.post(`/meals/${meal._id}/like`, {
       userId: userId,
     });

     const { likes: updatedLikes, liked: updatedLiked } = response.data;

     // Update local state
     setLikes(updatedLikes);
     setLiked(updatedLiked);

     // ✅ Also update meal.likes to reflect UI change immediately
      const updatedMeal = await axiosInstance.get(`/meals/${meal._id}`);
      setMeal(updatedMeal.data);
   } catch (err) {
     console.error("Error liking meal:", err);
   }
 };

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500 text-xl">
        Loading meal details...
      </div>
    );
  }

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
        <div className="space-y-5">
          {reviews.map((r, idx) => (
            <div key={idx}>
              <p className="font-semibold">{r.name}</p>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                {Array.from({ length: r.rating }, (_, i) => (
                  <span key={i} className="text-yellow-400">
                    ★
                  </span>
                ))}
                {Array.from({ length: 5 - r.rating }, (_, i) => (
                  <span key={i} className="text-gray-300">
                    ★
                  </span>
                ))}
                <span className="ml-2">{r.date}</span>
              </div>
              <p>{r.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MealDetail;
