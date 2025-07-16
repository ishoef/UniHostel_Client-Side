import React, { useEffect, useState } from "react";
import MealCard from "../../Components/Cards/MealCard/MealCard";
import NormalLoader from "../../Components/Loader copy/NormalLoader";
import NoQueryText from "../../Components/NoQueryText.jsx/NoQueryText";
import NoSearchResult from "../../Components/NoSearchResult/NoSearchResult";

const AllMeals = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [price, setPrice] = useState(500);
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

  // ✅ Fetch meals
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        setLoading(true);
        setIsSearching(search.trim() !== "");

        const params = new URLSearchParams();
        if (search.trim()) params.append("searchText", search);
        if (category && category !== "All Categories")
          params.append("category", category);
        if (price) params.append("price", price);

        const url = params.toString()
          ? `http://localhost:5000/meals?${params.toString()}`
          : `http://localhost:5000/meals`;

        const res = await fetch(url);
        const data = await res.json();
        setMeals(data);
      } catch (error) {
        console.error("Failed to fetch meals", error);
        setMeals([]);
      } finally {
        setLoading(false);
      }
    };

    console.log("searching with:", search, category, price);

    fetchMeals();
  }, [search, category, price]);

  console.log(meals);

  // // ✅ Optional sort
  // const sortedMeals = [...meals].sort((a, b) => {
  //   if (a.createdAt && b.createdAt) {
  //     return new Date(b.createdAt) - new Date(a.createdAt);
  //   }
  //   return 0;
  // });

  // ✅ Loader
  if (loading) return <NormalLoader />;

  return (
    <div className="max-w-7xl mx-auto p-5">
      <h2 className="text-center text-3xl sm:text-4xl lg:text-5xl font-bold my-4">
        All{" "}
        <span className="bg-gradient-to-r from-orange-500 to-pink-500 text-transparent bg-clip-text">
          Meals <span className="text-xl">({meals.length})</span>
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
              max="500"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="accent-orange-500 w-full"
            />
          </div>
        </div>
      </div>

      {/* Meals Grid or No Results */}
      {meals.length === 0 ? (
        isSearching ? (
          <NoSearchResult searchText={search} />
        ) : (
          <NoQueryText />
        )
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 my-10">
          {meals.map((meal) => (
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
