import React, { useEffect, useState } from "react";
import MealCard from "../../Components/Cards/MealCard/MealCard";
import useAxios from "../../Hooks/useAxios";
import NormalLoader from "../../Components/Loader copy/NormalLoader";

// function MealCard({ meal }) {
//   return (
//     <div className="border border-gray-200 rounded-2xl p-4 bg-white shadow hover:shadow-md transition">
//       <img
//         src={meal.imageUrl}
//         alt={meal.title}
//         className="w-full h-40 object-cover rounded-xl mb-3"
//       />
//       <h3 className="text-lg font-semibold mb-1">{meal.title}</h3>
//       <p className="text-sm text-gray-600 mb-2">{meal.description}</p>
//       <div className="flex justify-between items-center mb-3">
//         <span className="text-sm">⭐ {meal.rating}</span>
//         <span className="font-bold text-sm">${meal.price}</span>
//       </div>
//       <button className="cursor-pointer bg-orange-500 text-white rounded-md w-full py-2 hover:bg-orange-600 transition">
//         View Details
//       </button>
//     </div>
//   );
// }

function AllMeals() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [price, setPrice] = useState(50);
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const axiosInstance = useAxios();
  useEffect(() => {
    const fetchMeals = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/meals");
        setMeals(response.data);
      } catch (err) {
        console.log("Error fetching Meals data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, [axiosInstance]);

  // const demoImages = [
  //   "https://images.unsplash.com/photo-1600891964599-f61ba0e24092",
  //   "https://images.unsplash.com/photo-1543353071-873f17a7a088",
  //   "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
  // ];

  // const meals = Array.from({ length: 32 }, (_, index) => ({
  //   id: index + 1,
  //   name: `Delicious Meal ${index + 1}`,
  //   description: "A wonderful meal description for your taste.",
  //   rating: (4 + (index % 2) * 0.2).toFixed(1),
  //   price: (5 + Math.random() * 45).toFixed(2),
  //   category: ["Breakfast", "Lunch", "Dinner"][index % 3],
  //   image: demoImages[index % demoImages.length],
  // }));

  // const filteredMeals = meals.filter((meal) => {
  //   const matchesSearch = meal.name
  //     .toLowerCase()
  //     .includes(search.toLowerCase());
  //   const matchesCategory =
  //     category === "All Categories" || meal.category === category;
  //   const matchesPrice = parseFloat(meal.price) <= price;
  //   return matchesSearch && matchesCategory && matchesPrice;
  // });

  if (loading) {
    return <NormalLoader/>
  }

  return (
    <div className="max-w-7xl mx-auto p-5">
      <h2 className="text-center text-3xl sm:text-4xl lg:text-5xl font-bold my-4">
        All{" "}
        <span className="bg-gradient-to-r from-orange-500 to-pink-500 text-transparent bg-clip-text">
          Meals
        </span>
      </h2>

      <p className="w-11/12 md:w-7/12 mx-auto text-center text-gray-500">
        Explore a wide variety of delicious meals prepared by our talented
        chefs. Browse by category, discover new flavors, and pre-order your
        favorites to enjoy on campus.
      </p>

      {/* Search & Category & Price */}
      <div className="border border-gray-300 rounded-md bg-white p-5 flex gap-4 justify-between items-center my-6">
        <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-5">
          <input
            type="text"
            placeholder="Search Meals"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 shadow rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-2 shadow rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option>All Categories</option>
            <option>Breakfast</option>
            <option>Lunch</option>
            <option>Dinner</option>
          </select>

          <div className="border p-2 col-span-2 md:col-span-1 border-gray-300 shadow rounded flex items-center gap-3">
            <span className="text-sm">Price: Up to ${price}</span>
            <input
              type="range"
              min="2"
              max="50"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="accent-orange-500 w-full"
            />
            <button className="hidden bg-orange-500 p-2 rounded-md hover:bg-orange-600 text-white">
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {meals.map((meal) => (
          <MealCard key={meal._id} meal={meal} />
        ))}
      </div>

      {meals.length === 0 && (
        <div className="text-center mt-10 text-gray-500">No meals found.</div>
      )}

      <div className="text-center mt-10 text-xs text-gray-400">
        You’ve seen all available meals.
      </div>
    </div>
  );
}

export default AllMeals;
