import React from "react";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaUtensils,
  FaStar,
  FaAward,
  FaHeart,
  FaClock,
} from "react-icons/fa";

const stats = [
  {
    icon: <FaUsers className="text-blue-500 w-8 h-8" />,
    value: "5000+",
    label: "Happy Students",
  },
  {
    icon: <FaUtensils className="text-green-500 w-8 h-8" />,
    value: "150+",
    label: "Daily Meals",
  },
  {
    icon: <FaStar className="text-yellow-500 w-8 h-8" />,
    value: "4.9/5",
    label: "Average Rating",
  },
  {
    icon: <FaAward className="text-purple-500 w-8 h-8" />,
    value: "3+",
    label: "Years Experience",
  },
  {
    icon: <FaHeart className="text-red-400 w-8 h-8" />,
    value: "98%",
    label: "Satisfaction Rate",
  },
  {
    icon: <FaClock className="text-orange-400 w-8 h-8" />,
    value: "24/7",
    label: "Hours Service",
  },
];

export default function OurImpact() {
  return (
    <div className="bg-gradient-to-br from-orange-50 via-white to-orange-100 py-16 px-4 sm:px-6 md:px-10 lg:px-16 text-center">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
        Our{" "}
        <span className="bg-gradient-to-r from-orange-500 to-pink-500 text-transparent bg-clip-text">
          Impact
        </span>
      </h2>
      <p className="text-gray-600 mb-10 max-w-2xl mx-auto text-sm sm:text-base">
        Numbers that speak for our commitment to excellence and student
        satisfaction
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="rounded-2xl shadow-lg p-6 transition-all bg-white">
              <div className="flex flex-col items-center">
                <div className="mb-4 p-4 rounded-full bg-gray-100">
                  {stat.icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-1">
                  {stat.value}
                </h3>
                <p className="text-gray-500 text-sm sm:text-base">
                  {stat.label}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
