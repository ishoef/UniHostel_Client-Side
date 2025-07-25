import React, { useEffect, useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { IoFilter } from "react-icons/io5";
import DatePicker from "react-datepicker";
import UpcomingMealCard from "../../Components/Cards/UpcommingMealCard/UpcommingMealCard";
import useUpcommingMeals from "../../Hooks/useUpcommingMeals/useUpcommingMeals";
import useAuth from "../../Hooks/useAuth.jsx/useAuth";
import PreLoader from "../../Components/Loader copy/PreLoader/PreLoader";

const UpcomingMeals = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [filteredMeals, setFilteredMeals] = useState([]);
  const [category, setCategory] = useState("All Categories");
  const [searchTerm, setSearchTerm] = useState("");

  // Remove category param since backend filtering not implemented
  const { upcommingMeals, loading } = useUpcommingMeals(1, undefined);
  const { user } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Clear filters handler
  const clearFilters = () => {
    setSelectedDate(null);
    setCategory("All Categories");
    setSearchTerm("");
  };

  useEffect(() => {
    let filtered = upcommingMeals;

    // Filter by category if not "All Categories"
    if (category !== "All Categories") {
      filtered = filtered.filter((meal) => meal.category === category);
    }

    // Filter by selected date if any
    if (selectedDate) {
      filtered = filtered.filter(
        (meal) =>
          new Date(meal.date).toDateString() === selectedDate.toDateString()
      );
    }

    // Filter by search term (case-insensitive) on meal title or chef name
    if (searchTerm.trim() !== "") {
      const lowerSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (meal) =>
          meal.title.toLowerCase().includes(lowerSearch) ||
          (meal.chef && meal.chef.toLowerCase().includes(lowerSearch))
      );
    }

    setFilteredMeals(filtered);
  }, [upcommingMeals, category, selectedDate, searchTerm]);

  if (loading)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <PreLoader />
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto p-5">
      <header className="text-center mb-8">
        <h2 className="text-center text-3xl sm:text-4xl lg:text-5xl font-bold my-4">
          Upcoming{" "}
          <span className="bg-gradient-to-r from-orange-500 to-pink-500 text-transparent bg-clip-text">
            Meals <span className="text-xl">({filteredMeals.length})</span>
          </span>
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Discover what our talented chefs are preparing for you. Pre-order your
          favorites and never miss out on special dishes!
        </p>
      </header>

      {/* <div className="flex flex-wrap justify-center gap-3 mb-6">
        {[
          "Jan 20",
          "Jan 21",
          "Jan 22",
          "Jan 23",
          "Jan 24",
          "Jan 25",
          "Jan 26",
        ].map((day, i) => (
          <div
            key={i}
            className="border rounded-lg px-4 py-2 text-sm hover:bg-orange-100 cursor-pointer"
          >
            {day}
          </div>
        ))}
      </div> */}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-5 mb-8">
        {/* Search Input */}
        <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-[#F97316]">
          <input
            type="text"
            placeholder="Search meals or chefs..."
            className="flex-1 focus:outline-none text-sm text-gray-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Category Dropdown */}
        <select
          className="border border-gray-300 px-3 py-2 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#F97316]"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>All Categories</option>
          <option>Breakfast</option>
          <option>Lunch</option>
          <option>Dinner</option>
        </select>

        {/* Date Picker */}
        <div className="border border-gray-300 px-3 py-2 rounded-md flex items-center gap-2 cursor-pointer hover:border-[#F97316] transition ">
          <FaCalendarAlt className="text-[#F97316]" />
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            placeholderText="Pick a date"
            className="border-none focus:outline-none text-sm text-gray-700 w-full"
            calendarClassName="rounded-lg p-2 shadow-lg"
            popperPlacement="bottom"
            isClearable
          />
        </div>

        {/* Clear Filters Button */}
        <button
          onClick={clearFilters}
          className="cursor-pointer flex items-center gap-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-5 py-2 rounded-md font-semibold hover:opacity-90 transition"
        >
          <IoFilter className="text-lg" />
          Clear Filters
        </button>
      </div>

      {/* Meals Showcase */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {filteredMeals.length === 0 && !loading && (
          <p className="text-center col-span-full">No meals found.</p>
        )}
        {filteredMeals.map((meal, index) => (
          <UpcomingMealCard user={user} key={index} meal={meal} />
        ))}
      </div>
    </div>
  );
};

export default UpcomingMeals;
