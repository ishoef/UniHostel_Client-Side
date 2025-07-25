import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import LikeButton from "../../LikeButton/LikeButton";
import useAxios from "../../../Hooks/useAxios";
import useAuth from "../../../Hooks/useAuth.jsx/useAuth";
import Swal from "sweetalert2";

const MealCard = ({ meal }) => {
  const { user } = useAuth();
  const userId = user?.uid;

  const [likes, setLikes] = useState(
    Array.isArray(meal.likes) ? meal.likes.length : 0
  );
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (Array.isArray(meal.likes) && userId) {
      setLiked(meal.likes.includes(userId));
    }
  }, [meal.likes, userId]);

  const axiosInstance = useAxios();

  const handleLike = async () => {
    if (!user?.uid) {
      return Swal.fire(
        "Error",
        "You must be logged in to like meals.",
        "info"
      );
    }

    try {
      const response = await axiosInstance.post(`/meals/${meal._id}/like`, {
        userId: userId,
      });

      const { likesCount, liked } = response.data;

      setLikes(likesCount);
      setLiked(liked);
    } catch (err) {
      console.error("Error liking meal:", err);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow flex flex-col hover:shadow-lg transition h-full">
      <div className="h-58 rounded-t-xl overflow-hidden">
        <img
          src={
            meal.imageUrl ||
            "https://images.unsplash.com/photo-1685381984930-1b0643c301f5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fGR1bXklMjBmb29kfGVufDB8fDB8fHww"
          }
          alt={meal.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col flex-grow p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold text-lg text-gray-800">{meal.title}</h3>
          <span
            className={`flex items-center gap-1 text-xs ${
              liked ? "text-red-500" : "text-gray-500"
            }`}
          >
            ❤️ {likes}
          </span>
        </div>

        <p className="text-gray-500 text-sm mb-3 flex-grow">
          {meal.description}
        </p>

        <div className="flex justify-between items-center text-sm mb-4">
          <span className="flex items-center gap-1 text-yellow-500 font-semibold">
            ⭐ {meal.rating}
          </span>
          <span className="text-orange-600 font-bold">${meal.price}</span>
        </div>

        <div className="flex items-center justify-between gap-3">
          <Link
            to={`/meal_details/${meal._id}`}
            className="bg-black w-full text-white text-sm py-[10px] rounded-lg mt-auto text-center hover:opacity-90"
          >
            View Details
          </Link>
          <LikeButton liked={liked} onLike={handleLike} />
        </div>
      </div>
    </div>
  );
};

export default MealCard;
