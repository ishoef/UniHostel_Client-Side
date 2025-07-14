import React, { useState } from "react";
import MealCard from "../../../Components/Cards/MealCard/MealCard";

const meals = [
  {
    id: 1,
    title: "Classic Pancakes with Maple Syrup",
    description: "Fluffy pancakes served with fresh maple syrup and butter.",
    rating: 4.8,
    price: "$8.99",
    likes: 124,
    category: "Breakfast",
    image:
      "https://images.unsplash.com/photo-1604524238304-cb554a937f33?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fENsYXNzaWMlMjBQYW5jYWtlcyUyMHdpdGglMjBNYXBsZSUyMFN5cnVwfGVufDB8fDB8fHww",
  },
  {
    id: 2,
    title: "Grilled Chicken Caesar Salad",
    description:
      "Fresh romaine lettuce with grilled chicken and caesar dressing.",
    rating: 4.6,
    price: "$12.99",
    likes: 69,
    category: "Lunch",
    image:
      "https://plus.unsplash.com/premium_photo-1695151832943-1a8f373aff93?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTN8fEdyaWxsZWQlMjBDaGlja2VuJTIwQ2Flc2FyJTIwU2FsYWR8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 3,
    title: "Beef Steak with Vegetables",
    description: "Juicy beef steak served with roasted vegetables and herbs.",
    rating: 4.9,
    price: "$18.50",
    likes: 89,
    category: "Dinner",
    image:
      "https://images.unsplash.com/photo-1676300184878-02199c0d02f9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fEJlZWYlMjBTdGVhayUyMHdpdGglMjBWZWdldGFibGVzfGVufDB8fDB8fHww",
  },
  {
    id: 4,
    title: "Chocolate Cake Delight",
    description: "Decadent chocolate cake layered with rich chocolate ganache.",
    rating: 5.0,
    price: "$6.75",
    likes: 145,
    category: "Dessert",
    image:
      "https://images.unsplash.com/photo-1695605302698-21f49c671a41?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Q2hvY29sYXRlJTIwQ2FrZSUyMERlbGlnaHR8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 5,
    title: "Fresh Sushi Platter",
    description: "Assorted sushi with fresh fish, rice, and seaweed.",
    rating: 4.7,
    price: "$14.99",
    likes: 95,
    category: "Lunch",
    image:
      "https://images.unsplash.com/photo-1726824863833-e88146cf0a72?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8RnJlc2glMjBTdXNoaSUyMFBsYXR0ZXJ8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 6,
    title: "Spaghetti Bolognese",
    description: "Classic Italian pasta with rich meat sauce and parmesan.",
    rating: 4.5,
    price: "$11.50",
    likes: 110,
    category: "Dinner",
    image:
      "https://images.unsplash.com/photo-1589227365533-cee630bd59bd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fFNwYWdoZXR0aSUyMEJvbG9nbmVzZXxlbnwwfHwwfHx8MA%3D%3D",
  },
];
  
  

export default function MealsByCategory() {
  const [activeCategory, setActiveCategory] = useState("All Meals");

  const categories = ["All Meals", "Breakfast", "Lunch", "Dinner"];

  const filteredMeals =
    activeCategory === "All Meals"
      ? meals
      : meals.filter((meal) => meal.category === activeCategory);

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
          <MealCard key={meal.id} meal={meal} />
        ))}
      </div>

      <div className="flex justify-center">
        <button className="bg-black text-white text-sm py-2 px-6 rounded-md hover:opacity-90">
          View All Meals
        </button>
      </div>
    </div>
  );
}
