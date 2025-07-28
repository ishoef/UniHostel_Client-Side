import React, { useState } from "react";
import MealCard from "../../../Components/Cards/MealCard/MealCard";
import useMeals from "../../../Hooks/useMeals/useMeals";
import { Link } from "react-router";

export default function MealsByCategory() {
  const [activeCategory, setActiveCategory] = useState("All Meals");
  const { meals } = useMeals();

  const categories = ["All Meals", "Breakfast", "Lunch", "Dinner"];

  const sixMeals = [...meals]
    .sort((a, b) => (b.likes?.length || 0) - (a.likes?.length || 0))
    .slice(0, 6);

  const filteredMeals =
    activeCategory === "All Meals"
      ? sixMeals
      : sixMeals.filter((meal) => meal.category === activeCategory);

  if (filteredMeals.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold mb-4">No Meals Found</h2>
        <p className="text-gray-500">
          Please check back later or explore other categories.
        </p>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-3 text-gray-800">
        Meals by{" "}
        <span className="bg-gradient-to-r from-orange-500 to-pink-500 text-transparent bg-clip-text">
          Category
        </span>
      </h2>
      <p className="text-center text-gray-500 mb-8 max-w-2xl mx-auto">
        Discover our delicious meals organized by category. From hearty
        breakfasts to satisfying dinners.
      </p>

      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-5 py-2 rounded-full border text-sm font-medium transition cursor-pointer ${
              activeCategory === category
                ? "bg-black text-white border-black"
                : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {filteredMeals.map((meal) => (
          <MealCard key={meal._id} meal={meal} />
        ))}
      </div>

      <div className="flex justify-center">
        <Link
          to={"/meals"}
          className="bg-black text-white text-sm py-2 px-6 rounded-md hover:opacity-90"
        >
          View All Meals
        </Link>
      </div>
    </div>
  );
}
