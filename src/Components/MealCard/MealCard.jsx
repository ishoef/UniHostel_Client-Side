import React from "react";
import { Link } from "react-router"; // Corrected import

const MealCard = ({ meal }) => {
  return (
    <div className="bg-white rounded-xl shadow flex flex-col hover:shadow-lg transition h-full">
      {/* Image Section */}
      <div className="h-56 rounded-t-xl overflow-hidden">
        <img
          src={meal.image}
          alt={meal.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-grow p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold text-lg text-gray-800">{meal.title}</h3>
          <span className="flex items-center gap-1 text-xs text-gray-500">
            ❤️ {meal.likes}
          </span>
        </div>

        <p className="text-gray-500 text-sm mb-3 flex-grow">
          {meal.description}
        </p>

        <div className="flex justify-between items-center text-sm mb-4">
          <span className="flex items-center gap-1 text-yellow-500 font-semibold">
            ⭐ {meal.rating}
          </span>
          <span className="text-orange-600 font-bold">{meal.price}</span>
        </div>

        <Link
          to="/details"
          className="bg-black text-white text-sm py-2 rounded-lg mt-auto text-center hover:opacity-90"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default MealCard;
