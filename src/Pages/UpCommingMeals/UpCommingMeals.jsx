import React from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaUser,
} from "react-icons/fa";
import { IoFilter } from "react-icons/io5";
import { useState } from "react";
import DatePicker from "react-datepicker";

const UpcomingMeals = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const meals = [
    {
      id: 1,
      title: "Grilled Salmon with Quinoa Salad",
      chef: "Chef Maria Rodriguez",
      image:
        "https://images.unsplash.com/photo-1624726175512-19b9baf9fbd1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vZHN8ZW58MHx8MHx8fDA%3D",
      price: "$22.99",
      servings: 50,
      time: "6:00 PM",
      date: "2024-01-20",
      tags: ["Gluten-Free", "High-Protein", "Omega-3"],
    },
    {
      id: 1,
      title: "Grilled Salmon with Quinoa Salad",
      chef: "Chef Maria Rodriguez",
      image:
        "https://plus.unsplash.com/premium_photo-1668095398227-c943ddb69d89?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Zm9vZHN8ZW58MHx8MHx8fDA%3D",
      price: "$22.99",
      servings: 50,
      time: "6:00 PM",
      date: "2024-01-20",
      tags: ["Gluten-Free", "High-Protein", "Omega-3"],
    },
    {
      id: 1,
      title: "Grilled Salmon with Quinoa Salad",
      chef: "Chef Maria Rodriguez",
      image:
        "https://images.unsplash.com/photo-1583623025817-d180a2221d0a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Zm9vZHN8ZW58MHx8MHx8fDA%3D",
      price: "$22.99",
      servings: 50,
      time: "6:00 PM",
      date: "2024-01-20",
      tags: ["Gluten-Free", "High-Protein", "Omega-3"],
    },
    {
      id: 1,
      title: "Grilled Salmon with Quinoa Salad",
      chef: "Chef Maria Rodriguez",
      image:
        "https://plus.unsplash.com/premium_photo-1666649675527-6a7859752c53?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGZvb2RzfGVufDB8fDB8fHww",
      price: "$22.99",
      servings: 50,
      time: "6:00 PM",
      date: "2024-01-20",
      tags: ["Gluten-Free", "High-Protein", "Omega-3"],
    },
    {
      id: 1,
      title: "Grilled Salmon with Quinoa Salad",
      chef: "Chef Maria Rodriguez",
      image:
        "https://images.unsplash.com/photo-1488523665057-a818cdf6f5e6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fGZvb2RzfGVufDB8fDB8fHww",
      price: "$22.99",
      servings: 50,
      time: "6:00 PM",
      date: "2024-01-20",
      tags: ["Gluten-Free", "High-Protein", "Omega-3"],
    },
    {
      id: 1,
      title: "Grilled Salmon with Quinoa Salad",
      chef: "Chef Maria Rodriguez",
      image:
        "https://plus.unsplash.com/premium_photo-1677192450285-23bc5465b68e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fGZvb2RzfGVufDB8fDB8fHww",
      price: "$22.99",
      servings: 50,
      time: "6:00 PM",
      date: "2024-01-20",
      tags: ["Gluten-Free", "High-Protein", "Omega-3"],
    },
    {
      id: 1,
      title: "Grilled Salmon with Quinoa Salad",
      chef: "Chef Maria Rodriguez",
      image:
        "https://images.unsplash.com/photo-1634141614476-1b421ce4aace?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDh8fGZvb2RzfGVufDB8fDB8fHww",
      price: "$22.99",
      servings: 50,
      time: "6:00 PM",
      date: "2024-01-20",
      tags: ["Gluten-Free", "High-Protein", "Omega-3"],
    },
    {
      id: 1,
      title: "Grilled Salmon with Quinoa Salad",
      chef: "Chef Maria Rodriguez",
      image:
        "https://images.unsplash.com/photo-1651440204296-a79fa9988007?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTZ8fGZvb2RzfGVufDB8fDB8fHww",
      price: "$22.99",
      servings: 50,
      time: "6:00 PM",
      date: "2024-01-20",
      tags: ["Gluten-Free", "High-Protein", "Omega-3"],
    },
    {
      id: 1,
      title: "Grilled Salmon with Quinoa Salad",
      chef: "Chef Maria Rodriguez",
      image:
        "https://images.unsplash.com/photo-1482242248426-c4e9fe3a559a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTh8fGZvb2RzfGVufDB8fDB8fHww",
      price: "$22.99",
      servings: 50,
      time: "6:00 PM",
      date: "2024-01-20",
      tags: ["Gluten-Free", "High-Protein", "Omega-3"],
    },
    {
      id: 1,
      title: "Grilled Salmon with Quinoa Salad",
      chef: "Chef Maria Rodriguez",
      image:
        "https://images.unsplash.com/photo-1639000135382-f6db04fceca7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzF8fGZvb2RzfGVufDB8fDB8fHww",
      price: "$22.99",
      servings: 50,
      time: "6:00 PM",
      date: "2024-01-20",
      tags: ["Gluten-Free", "High-Protein", "Omega-3"],
    },
    {
      id: 1,
      title: "Grilled Salmon with Quinoa Salad",
      chef: "Chef Maria Rodriguez",
      image:
        "https://images.unsplash.com/photo-1636647511729-6703539ba71f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzl8fGZvb2RzfGVufDB8fDB8fHww",
      price: "$22.99",
      servings: 50,
      time: "6:00 PM",
      date: "2024-01-20",
      tags: ["Gluten-Free", "High-Protein", "Omega-3"],
    },

    // Add other meals similarly
  ];

  return (
    <div className="max-w-7xl mx-auto p-5">
      <header className="text-center mb-8">
        <h2 className="text-center text-3xl sm:text-4xl lg:text-5xl font-bold my-4">
          Upcomming{" "}
          <span className="bg-gradient-to-r from-orange-500 to-pink-500 text-transparent bg-clip-text">
            Meals
          </span>
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Discover what our talented chefs are preparing for you. Pre-order your
          favorites and never miss out on special dishes!
        </p>
      </header>

      <div className="flex flex-wrap justify-center gap-3 mb-6">
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
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-5 mb-8">
        {/* Search Input */}
        <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-[#F97316]">
          <input
            type="text"
            placeholder="Search meals or chefs..."
            className="flex-1 focus:outline-none text-sm text-gray-700"
          />
        </div>

        {/* Category Dropdown */}
        <select className="border border-gray-300 px-3 py-2 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#F97316]">
          <option>All Categories</option>
          <option>Breakfast</option>
          <option>Lunch</option>
          <option>Dinner</option>
        </select>

        {/* Date Picker Placeholder */}
        <div className="border border-gray-300 px-3 py-2 rounded-md flex items-center gap-2 cursor-pointer hover:border-[#F97316] transition ">
          <FaCalendarAlt className="text-[#F97316]" />

          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            placeholderText="Pick a date"
            className="border-none focus:outline-none text-sm text-gray-700 w-full"
            calendarClassName="rounded-lg p-2 shadow-lg"
            popperPlacement="bottom"
          />
        </div>

        {/* Clear Filters Button */}
        <button className="cursor-pointer flex items-center gap-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-5 py-2 rounded-md font-semibold hover:opacity-90 transition">
          <IoFilter className="text-lg" />
          Clear Filters
        </button>
      </div>

      {/* Meals Showcase */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {meals.map((meal) => (
          <div
            key={meal.id}
            className="border border-gray-200 rounded-2xl overflow-hidden shadow hover:shadow-lg transition"
          >
            <img
              src={meal.image}
              alt={meal.title}
              className="h-58 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-1 text-[#111827]">
                {meal.title}
              </h3>
              <p className="text-sm text-gray-500 mb-2">{meal.chef}</p>
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span className="flex items-center">
                  <FaClock className="inline mr-1 text-[#F97316]" /> {meal.time}
                </span>
                <span className="flex items-center">
                  <FaUser className="inline mr-1 text-[#F97316]" />{" "}
                  {meal.servings} Servings
                </span>
              </div>
              <p className="font-bold text-[#111827] mb-2">{meal.price}</p>
              <div className="flex flex-wrap gap-1 mb-3">
                {meal.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <button className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-2 rounded-md font-semibold hover:opacity-90 transition">
                Pre-Order Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingMeals;
