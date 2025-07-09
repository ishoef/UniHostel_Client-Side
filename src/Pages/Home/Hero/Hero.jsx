import { FaUtensils, FaPlay, FaUsers } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-orange-50 to-white py-16 px-6 flex flex-col justify-center items-center">
      <div className="max-w-7xl w-full mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div>
          <span className="bg-orange-100 text-orange-700 px-4 py-1 rounded-full text-sm font-medium inline-flex items-center gap-2 mb-4">
            🌍 World Flavors
          </span>
          <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
            Global Cuisine <br /> Collection
          </h1>
          <p className="text-lg text-gray-600 mt-4">
            Taste the World from Your Campus
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Explore international flavors with our diverse menu featuring
            authentic dishes from around the globe.
          </p>

          {/* Stats */}
          <div className="flex gap-8 mt-6 text-center">
            <div>
              <p className="text-xl font-bold text-orange-600">300+</p>
              <p className="text-xs text-gray-500">Meals Available</p>
            </div>
            <div>
              <p className="text-xl font-bold text-orange-600">4.9</p>
              <p className="text-xs text-gray-500">Average Rating</p>
            </div>
            <div>
              <p className="text-xl font-bold text-orange-600">8K+</p>
              <p className="text-xs text-gray-500">Happy Students</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-6">
            <button className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-3 rounded-full text-sm font-semibold inline-flex items-center gap-2 shadow hover:scale-105 transition">
              <FaUtensils /> Explore Meals
            </button>
            <button className="border border-gray-300 px-6 py-3 rounded-full text-sm font-medium inline-flex items-center gap-2 shadow hover:bg-gray-100 transition">
              <FaPlay /> Watch Story
            </button>
          </div>

          {/* Offer */}
          <div className="mt-6 text-sm bg-pink-100 border border-pink-300 px-4 py-2 rounded-md text-pink-700">
            🎉 Special Offer: Try 3 Cuisines Free
          </div>
        </div>

        {/* Right Image Card */}
        <div className="relative max-w-md w-full">
          <img
            src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="Delicious Food"
            className="w-full rounded-3xl shadow-2xl"
          />

          {/* Overlay Top Right */}
          <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-xl shadow text-sm font-medium text-orange-600 flex items-center gap-2">
            🍽️ 200+ <span className="text-gray-500 text-xs">Daily Meals</span>
          </div>

          {/* Overlay Bottom Left */}
          <div className="absolute bottom-4 left-4 bg-white px-4 py-2 rounded-xl shadow text-sm font-medium text-green-600 flex items-center gap-2">
            <FaUsers className="text-green-500" /> 5,000+ Happy Students
          </div>

          {/* Arrows */}
          <button className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100">
            <IoIosArrowBack />
          </button>
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100">
            <IoIosArrowForward />
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mt-10 w-full max-w-3xl relative">
        <input
          type="text"
          placeholder="Search for your favorite meals..."
          className="w-full px-5 py-4 rounded-full shadow-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-full text-sm">
          <FiSearch />
        </button>
      </div>

      {/* Dots */}
      <div className="flex gap-2 mt-6">
        <span className="w-3 h-3 rounded-full bg-gray-300"></span>
        <span className="w-3 h-3 rounded-full bg-orange-500"></span>
        <span className="w-3 h-3 rounded-full bg-gray-300"></span>
      </div>
    </section>
  );
}
