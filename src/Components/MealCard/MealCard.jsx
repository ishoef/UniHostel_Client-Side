import { FaStar, FaHeart, FaClock } from "react-icons/fa";
import { Link } from "react-router";

export const MealCard = ({ image, tag, likes, title, rating, time, price }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col">
      <div className="relative">
        <img src={image} alt={title} className="w-full h-58 object-cover" />

        <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
          {tag}
        </div>

        <div className="absolute top-2 right-2 bg-white text-red-500 text-xs px-2 py-1 rounded-full flex items-center">
          <FaHeart className="mr-1" /> {likes}
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-semibold text-start text-base sm:text-lg mb-2">
          {title}
        </h3>

        <div className="flex items-center justify-between text-gray-500 text-xs mb-4">
          <div className="flex items-center">
            <FaStar className="text-yellow-400 mr-1" /> {rating}
          </div>
          <div className="flex items-center">
            <FaClock className="mr-1" /> {time}
          </div>
        </div>

        <div className="mt-auto">
          <p className="text-orange-500 font-bold text-start text-xl mb-3">
            {price}
          </p>
          <Link
            to="/details"
            className="bg-orange-500 w-full text-white text-sm px-4 py-2 rounded-full hover:bg-orange-600 transition-all"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};
