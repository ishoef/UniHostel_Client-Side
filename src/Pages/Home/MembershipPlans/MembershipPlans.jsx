import React from "react";
import { Link } from "react-router";

const plans = [
  {
    name: "Silver",
    price: 29.99,
    features: [
      "Access to all regular meals",
      "Basic meal reviews",
      "Standard dining hours",
      "Mobile app access",
      "Email support",
    ],
    buttonText: "Choose Silver",
    featured: false,
  },
  {
    name: "Gold",
    price: 49.99,
    features: [
      "All Silver features",
      "Priority meal requests",
      "Extended dining hours",
      "Premium meal options",
      "Like upcoming meals",
      "Priority support",
    ],
    buttonText: "Choose Gold",
    featured: true,
  },
  {
    name: "Platinum",
    price: 79.99,
    features: [
      "All Gold features",
      "Exclusive chef specials",
      "Custom meal requests",
      "VIP dining area access",
      "Personal meal consultant",
      "24/7 premium support",
    ],
    buttonText: "Choose Platinum",
    featured: false,
  },
];

export default function MembershipPlans() {
  return (
    <div id="pricing" className=" bg-gradient-to-b from-orange-50 to-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
          Choose Your{" "}
          <span className="bg-gradient-to-r from-orange-500 to-pink-500 text-transparent bg-clip-text">
            Membership
          </span>
        </h2>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Upgrade your dining experience with our premium packages. Each tier
          offers enhanced features and exclusive benefits designed to delight
          your taste buds.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, idx) => (
          <div
            key={idx}
            className={`relative flex flex-col h-full rounded-3xl shadow-2xl p-8 bg-white border transform hover:-translate-y-2 transition-all duration-300 ${
              plan.featured
                ? "border-orange-500 ring-2 ring-orange-400"
                : "border-gray-200"
            }`}
          >
            {plan.featured && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg">
                Most Popular
              </div>
            )}

            <div className="mt-8 text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {plan.name}
              </h3>
              <p className="text-4xl font-extrabold text-gray-900">
                ${plan.price}
                <span className="text-base font-medium text-gray-500">
                  /month
                </span>
              </p>
            </div>

            <ul className="mt-8 space-y-4 text-gray-700 flex-grow">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start space-x-3">
                  <span className="text-green-500 text-lg">✔</span>
                  <span className="text-sm sm:text-base">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 w-full">
              <Link to={`/checkout/${plan.name.toLowerCase()}`}
                
                className={`block text-center cursor-pointer w-full py-3 px-4 rounded-xl text-white text-sm font-semibold tracking-wide shadow-lg transition-colors duration-300 ${
                  plan.featured
                    ? "bg-orange-500 hover:bg-orange-600"
                    : "bg-gray-900 hover:bg-gray-800"
                }`}
              >
                {plan.buttonText}
              </Link>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-12 text-center text-sm text-gray-600">
        Cancel anytime • No hidden fees •{" "}
        <strong>30-day money-back guarantee</strong>
      </p>
    </div>
  );
}
