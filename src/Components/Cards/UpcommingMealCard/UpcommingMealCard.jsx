import React, { useEffect, useState } from "react";
import { FaClock, FaUser, FaHeart, FaRegHeart, FaEye } from "react-icons/fa";
import Swal from "sweetalert2";
import Modal from "../../Modal/Modal";
import PreOrderForm from "../../AllForms/PreOrderForm/PreOrderForm";
import useAxios from "../../../Hooks/useAxios";

const UpcomingMealCard = ({ meal, user, refetch }) => {
  const [showModel, setShowModel] = useState(false);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (user?.uid && Array.isArray(meal.likes)) {
      setLiked(meal.likes.includes(user.uid));
    }
  }, [user, meal.likes]);
  const [likesCount, setLikesCount] = useState(meal.likes?.length || 0);

  const axiosInstance = useAxios();

  const handleLike = async () => {
    if (!user?.uid) {
      return Swal.fire(
        "Error",
        "You must be logged in to like meals.",
        "error"
      );
    }

    try {
      const res = await axiosInstance.patch(
        `/upcomming-meals/like/${meal._id}`,
        { userId: user.uid }
      );

      if (res.data.success) {
        setLiked(res.data.liked);
        setLikesCount(res.data.likesCount);

        if (res.data.published) {
          Swal.fire("Published!", res.data.message, "success");
          refetch?.(); // Meal moved to published, so refresh list
        }
      } else {
        Swal.fire("Error", res.data.message, "error");
      }
    } catch (err) {
      console.error("Like failed", err);
      Swal.fire("Error", "Failed to like/unlike the meal", "error");
    }
  };

  const handleViewDetails = () => {
    Swal.fire({
      title: meal.title,
      html: `
        <img src="${meal.imageUrl}" alt="${meal.title}" style="width:100%; border-radius:10px" />
        <p class="mt-3">${meal.description}</p>
        <p><b>Price:</b> $${meal.price}</p>
        <p><b>Servings:</b> ${meal.servings}</p>
      `,
      showCloseButton: true,
    });
  };

  return (
    <div className="flex flex-col border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition min-h-[500px] bg-white">
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={meal.imageUrl}
          alt={meal.title}
          className="w-full h-64 object-cover"
        />
      </div>

      <div className="flex flex-col flex-1 p-4">
        {/* Title and Likes */}
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-lg text-gray-900">{meal.title}</h3>
          <div className="flex items-center text-sm text-gray-600 gap-1">
            <FaHeart className="text-red-500" />
            <span>{likesCount}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-500 mb-3 line-clamp-3">
          {meal.description}
        </p>

        {/* Time and Servings */}
        <div className="flex justify-between text-sm text-gray-600 mb-3">
          <span className="flex items-center gap-1">
            <FaClock className="text-orange-500" />
            {new Date(meal.postTime).toLocaleString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
              year: "numeric",
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })}
          </span>
          <span className="flex items-center gap-1">
            <FaUser className="text-orange-500" />
            {meal.servings || 0} Servings
          </span>
        </div>

        {/* Price */}
        <p className="text-base font-bold text-gray-800 mb-4">${meal.price}</p>

        {/* Action Buttons */}
        <div className="mt-auto flex gap-2">
          <button
            onClick={() => setShowModel(true)}
            disabled
            className="cursor-pointer disabled:cursor-not-allowed flex-1 bg-gradient-to-r from-orange-500 to-pink-500 text-white py-2 rounded-md font-semibold hover:opacity-90 transition"
          >
            Pre-Order
          </button>

          <button
            onClick={handleViewDetails}
            className="px-3 py-2 rounded-md cursor-pointer bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
          >
            <FaEye />
          </button>

          <button
            onClick={handleLike}
            className={`px-3 py-2 cursor-pointer rounded-md transition ${
              liked
                ? "bg-red-100 text-red-600 hover:bg-red-200"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {liked ? <FaHeart /> : <FaRegHeart />}
          </button>
        </div>
      </div>

      {/* Pre-order Modal */}
      {showModel && (
        <Modal showModal={showModel} setShowModal={setShowModel}>
          <PreOrderForm meal={meal} />
        </Modal>
      )}
    </div>
  );
};

export default UpcomingMealCard;
