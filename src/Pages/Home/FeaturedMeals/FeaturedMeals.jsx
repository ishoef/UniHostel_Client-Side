import React from "react";
import { MealCard } from "../../../Components/MealCard/MealCard";

// Reusable Card Component


// Featured Meals Component
export default function FeaturedMeals() {
  const meals = [
    {
      image:
        "https://images.unsplash.com/photo-1613747526070-31ccc300ec07?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fG1lYWxzfGVufDB8fDB8fHww",
      tag: "Breakfast",
      likes: 124,
      title: "Classic Pancakes with Maple Syrup",
      rating: "4.8",
      time: "15 min",
      price: "$8.99",
    },
    {
      image:
        "https://images.unsplash.com/photo-1661366394743-fe30fe478ef7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTJ8fGx1bmNofGVufDB8fDB8fHww",
      tag: "Lunch",
      likes: 89,
      title: "Grilled Chicken Caesar Salad",
      rating: "4.6",
      time: "20 min",
      price: "$12.99",
    },
    {
      image:
        "https://images.unsplash.com/photo-1740591872073-e0e627756b90?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fG1lYWxzfGVufDB8fDB8fHww",
      tag: "Dinner",
      likes: 156,
      title: "Premium Beef Steak",
      rating: "4.9",
      time: "25 min",
      price: "$18.99",
    },
  ];

  return (
    <div className="py-16 px-4 sm:px-6 md:px-10 lg:px-16 text-center">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
        Featured <span className="text-orange-500">Meals</span>
      </h2>

      <p className="text-gray-600 mb-10 max-w-2xl mx-auto text-sm sm:text-base">
        Discover our most popular and highly-rated meals, carefully crafted by
        our expert chefs
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {meals.map((meal, index) => (
          <MealCard key={index} {...meal} />
        ))}
      </div>

      <div className="mt-10">
        <button className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-all text-sm">
          View All Meals
        </button>
      </div>
    </div>
  );
}
