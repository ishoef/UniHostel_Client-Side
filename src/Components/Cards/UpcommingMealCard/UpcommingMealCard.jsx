import React, { useState } from "react";
import { FaClock, FaUser } from "react-icons/fa";
import Modal from "../../Modal/Modal";
import PreOrderForm from "../../AllForms/PreOrderForm/PreOrderForm";

const UpcomingMealCard = ({ meal }) => {
  const [showModel, setShowModel] = useState(false);

  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden shadow hover:shadow-lg transition">
      <img
        src={meal.imageUrl}
        alt={meal.title}
        className="h-58 w-full object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1 text-[#111827]">
          {meal.title}
        </h3>
        <p className="text-sm text-gray-500 mb-2">{meal.description}</p>
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span className="flex items-center">
            <FaClock className="inline mr-1 text-[#F97316]" />{" "}
            {new Date(meal.postTime).toLocaleString("en-US", {
              weekday: "short", // Thu
              month: "short", // Jul
              day: "numeric", // 17
              year: "numeric", // 2025
              hour: "numeric", // 8 PM
              minute: "2-digit", // 00
              hour12: true, // 12-hour format
            })}
          </span>
          <span className="flex items-center">
            <FaUser className="inline mr-1 text-[#F97316]" /> {meal.servings}{" "}
            Servings
          </span>
        </div>
        <p className="font-bold text-[#111827] mb-2">${meal.price}</p>
        {/* <div className="flex flex-wrap gap-1 mb-3">
          {meal.tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div> */}
        <button
          onClick={() => setShowModel(true)}
          className="cursor-pointer w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-2 rounded-md font-semibold hover:opacity-90 transition"
        >
          Pre-Order Now
        </button>
      </div>

      {showModel && (
        <Modal showModal={showModel} setShowModal={setShowModel}>
          <PreOrderForm meal={meal} />
        </Modal>
      )}
    </div>
  );
};

export default UpcomingMealCard;
