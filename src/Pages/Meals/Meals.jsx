import React, { useEffect, useMemo, useState } from "react";
import MealCard from "../../Components/Cards/MealCard/MealCard";
import NormalLoader from "../../Components/Loader copy/NormalLoader";
import NoQueryText from "../../Components/NoQueryText.jsx/NoQueryText";
import NoSearchResult from "../../Components/NoSearchResult/NoSearchResult";
import useMeals from "../../Hooks/useMeals/useMeals";

const AllMeals = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [price, setPrice] = useState(500);
  const [filteredMeals, setFilteredMeals] = useState([]);

  // ✅ Memoize the filters object to prevent re-renders
  const filters = useMemo(() => ({}), []);

  // ✅ Prevent re-fetching by keeping object reference stable
  const { meals, loading, totalMeals } = useMeals(filters, 1, 10); // Fetch all meals

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.title = "Meals | UniHostel";
  });

  useEffect(() => {
    let filtered = meals;

    // Filter by category
    if (category !== "All Categories") {
      filtered = filtered.filter((meal) => meal.category === category);
    }

    // Filter by price
    filtered = filtered.filter((meal) => Number(meal.price) <= price);

    // Filter by search
    if (search.trim() !== "") {
      const lower = search.toLowerCase();
      filtered = filtered.filter(
        (meal) =>
          meal.title.toLowerCase().includes(lower) ||
          (meal.chef && meal.chef.toLowerCase().includes(lower))
      );
    }

    setFilteredMeals(filtered);
  }, [meals, category, search, price]);

  if (loading) return <NormalLoader />;

  return (
    <div className="max-w-7xl mx-auto p-5">
      <h2 className="text-center text-3xl sm:text-4xl lg:text-5xl font-bold my-4">
        All{" "}
        <span className="bg-gradient-to-r from-orange-500 to-pink-500 text-transparent bg-clip-text">
          Meals <span className="text-xl">({totalMeals})</span>
        </span>
      </h2>

      <p className="w-11/12 md:w-7/12 mx-auto text-center text-gray-500">
        Explore a wide variety of delicious meals prepared by our talented
        chefs. Browse by category, discover new flavors, and pre-order your
        favorites.
      </p>

      {/* Filters */}
      <div className="border border-gray-300 rounded-md bg-white p-5 flex gap-4 justify-between items-center my-6">
        <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-5">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search Meals"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 shadow rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />

          {/* Category Dropdown */}
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

          {/* Price Slider */}
          <div className="border p-2 col-span-2 md:col-span-1 border-gray-300 shadow rounded flex items-center gap-3">
            <span className="text-sm">Price: Up to ${price}</span>
            <input
              type="range"
              min="2"
              max="500"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="accent-orange-500 w-full"
            />
          </div>
        </div>
      </div>

      {/* Meals Grid or No Results */}
      {filteredMeals.length === 0 ? (
        search.trim() !== "" ? (
          <NoSearchResult searchText={search} />
        ) : (
          <NoQueryText />
        )
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 my-10">
          {filteredMeals.map((meal) => (
            <MealCard key={meal._id} meal={meal} />
          ))}
        </div>
      )}

      <div className="text-center mt-10 text-xs text-gray-400">
        You’ve seen all available meals.
      </div>
    </div>
  );
};

export default AllMeals;
