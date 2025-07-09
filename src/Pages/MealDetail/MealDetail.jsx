import React, { useState } from "react";

const MealDetail = () => {
  const [reviews, setReviews] = useState([
    {
      name: "John Doe",
      rating: 5,
      comment:
        "Absolutely delicious! The pancakes were fluffy and the maple syrup was perfect.",
      date: "January 14, 2024 at 12:30 PM",
    },
    {
      name: "Sarah Smith",
      rating: 4,
      comment: "Great breakfast option. Would definitely order again!",
      date: "January 13, 2024 at 11:15 AM",
    },
  ]);

  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState("");

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

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row gap-6 bg-white p-6 rounded-lg shadow-sm">
        {/* Image */}
        <div className="w-full md:w-1/2 bg-gray-100 h-64 flex items-center justify-center rounded">
          <span className="text-gray-400 text-3xl">📷</span>
        </div>

        {/* Details */}
        <div className="w-full md:w-1/2">
          <span className="bg-gray-100 px-3 py-1 text-sm rounded mb-2 inline-block">
            Breakfast
          </span>
          <h2 className="text-2xl font-semibold">
            Classic Pancakes with Maple Syrup
          </h2>

          <div className="flex items-center gap-2 mt-2">
            <span className="text-yellow-500">⭐ 4.8</span>
            <span className="text-red-600 font-semibold text-lg">$8.99</span>
          </div>

          <p className="mt-3 text-gray-600">
            👨‍🍳 Distributor: <strong>Chef Maria Rodriguez</strong>
          </p>
          <p className="text-gray-600">
            📅 Posted: January 15, 2024 at 10:30 AM
          </p>

          <p className="mt-4 text-gray-700">
            Fluffy, golden pancakes made from scratch with our secret recipe.
            Served with pure Canadian maple syrup, fresh butter, and a side of
            seasonal berries. A perfect start to your day!
          </p>

          <div className="flex gap-3 mt-5">
            <button className="px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-100">
              ❤️ Like (124)
            </button>
            <button className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800">
              Request Meal
            </button>
          </div>
        </div>
      </div>

      {/* Ingredients */}
      <div className="mt-10 bg-white p-6 rounded shadow-sm">
        <h3 className="text-xl font-semibold mb-4">Ingredients</h3>
        <div className="flex flex-wrap gap-3">
          {[
            "All-purpose flour",
            "Fresh eggs",
            "Whole milk",
            "Pure maple syrup",
            "Butter",
            "Baking powder",
            "Vanilla extract",
            "Fresh berries",
          ].map((ingredient) => (
            <span
              key={ingredient}
              className="px-3 py-1 bg-gray-100 rounded-full text-sm"
            >
              {ingredient}
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
            className="w-full border border-gray-300 rounded p-2 mb-2"
            rows="3"
            placeholder="Share your thoughts about this meal..."
          />
          <button
            onClick={submitReview}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
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
