import React from "react";
import {
  FaUtensils,
  FaStar,
  FaClock,
  FaUsers,
  FaShieldAlt,
  FaMobileAlt,
} from "react-icons/fa";
import FeatureCard from "../../../Components/FeatureCard/FeatureCard";

export default function WhyChooseUs() {
  const features = [
    {
      icon: <FaUtensils className="text-orange-500 text-3xl mb-4" />,
      title: "Quality Meals",
      description:
        "Fresh, nutritious meals prepared daily by our expert chefs using the finest ingredients.",
    },
    {
      icon: <FaStar className="text-orange-500 text-3xl mb-4" />,
      title: "Rated Experience",
      description:
        "Rate and review meals to help fellow students discover the best dining options.",
    },
    {
      icon: <FaClock className="text-orange-500 text-3xl mb-4" />,
      title: "24/7 Service",
      description:
        "Round-the-clock dining service to accommodate all student schedules and preferences.",
    },
    {
      icon: <FaUsers className="text-orange-500 text-3xl mb-4" />,
      title: "Community Driven",
      description:
        "Join a vibrant community of students sharing their dining experiences and recommendations.",
    },
    {
      icon: <FaShieldAlt className="text-orange-500 text-3xl mb-4" />,
      title: "Safe & Hygienic",
      description:
        "Maintaining the highest standards of food safety and hygiene in all our operations.",
    },
    {
      icon: <FaMobileAlt className="text-orange-500 text-3xl mb-4" />,
      title: "Easy Ordering",
      description:
        "Simple and intuitive meal ordering system accessible from any device, anywhere.",
    },
  ];

  return (
    <div className="py-20 px-4 sm:px-6 md:px-10 lg:px-16 text-center bg-gradient-to-b from-white to-orange-50">
      <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 text-gray-800">
        Why Choose{" "}
        <span className="bg-gradient-to-r from-orange-500 to-pink-500 text-transparent bg-clip-text">
          UniHostel?
        </span>
      </h2>

      <p className="text-gray-600 mb-12 max-w-2xl mx-auto text-base sm:text-lg">
        We're committed to providing the best dining experience for university
        students with innovative features and exceptional service.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition duration-300 transform hover:-translate-y-2"
          >
            <div className="flex items-center justify-center mb-6">
              {feature.icon}
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
