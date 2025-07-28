import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const PLAN_DETAILS = {
  silver: {
    name: "Silver",
    price: 29.99,
    duration: "12 months",
    originalPrice: 49.99,
    savings: 20,
    highlights: ["Basic meal access", "Email support", "1 month free trial"],
    features: [
      "Access to all regular meals",
      "Basic meal reviews",
      "Standard dining hours",
      "Mobile app access",
      "Email support",
    ],
  },
  gold: {
    name: "Gold",
    price: 49.99,
    duration: "24 months",
    originalPrice: 89.99,
    savings: 40,
    highlights: ["All Silver features", "Priority meals", "3 months free"],
    features: [
      "All Silver features",
      "Priority meal requests",
      "Extended dining hours",
      "Premium meal options",
      "Like upcoming meals",
      "Priority support",
    ],
  },
  platinum: {
    name: "Platinum",
    price: 79.99,
    duration: "48 months",
    originalPrice: 159.99,
    savings: 80,
    highlights: ["All Gold features", "VIP chef access", "6 months free"],
    features: [
      "All Gold features",
      "Exclusive chef specials",
      "Custom meal requests",
      "VIP dining area access",
      "Personal meal consultant",
      "24/7 premium support",
    ],
  },
};

const CheckoutPage = () => {
  useEffect(() => {
    document.title = "Checkout |  UniHostel";
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { plan } = useParams();
  const selected = PLAN_DETAILS[plan];
  const navigate = useNavigate();

  const handlePayment = () => {
    //  Navigate to the payment gateway or handle payment logic here
    navigate("/payment", { state: { plan: selected } });
    // Swal.fire("Success", `Subscribed to ${selected.name} plan!`, "success");
  };

  if (!selected) {
    return (
      <div className="text-center mt-10 text-red-600 text-xl font-semibold">
        Invalid plan selected.
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-orange-50 to-white px-4 py-10"
    >
      {/* Banner */}
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-5xl mx-auto mb-10"
      >
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 rounded-2xl flex items-center justify-between shadow-lg">
          <p className="text-sm font-semibold">
            🎁 Bonus features with a {selected.duration} plan!
          </p>
          <div className="bg-white text-orange-600 font-bold px-4 py-1 rounded-md text-sm shadow">
            00:17:22
          </div>
        </div>
      </motion.div>

      {/* Main Section */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Cart Details */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="backdrop-blur-md bg-white/70 p-6 rounded-2xl border-2 border-orange-500 shadow-xl hover:shadow-2xl transition duration-300"
        >
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Cart</h2>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Plan Selected
            </label>
            <div className="border border-orange-500 rounded-xl p-4 bg-white/60 shadow-sm transition hover:shadow-md">
              <p className="text-lg font-semibold text-orange-600">
                {selected.name} Plan
              </p>
              <p className="text-sm text-gray-500">{selected.duration}</p>
              <p className="text-sm text-green-600 mt-2">
                🎉 {selected.highlights.join(" + ")}
              </p>
            </div>
          </div>

          <div className="bg-green-50 text-green-700 p-3 rounded-lg text-sm font-medium mt-4 shadow-sm">
            ✅ You saved ${selected.savings} with this plan.
          </div>
        </motion.div>

        {/* Order Summary */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="backdrop-blur-md bg-white/70 p-6 rounded-2xl border-2 border-orange-500 shadow-xl hover:shadow-2xl transition duration-300"
        >
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            Order Summary
          </h2>

          <div className="text-sm text-gray-700 space-y-3">
            <div className="flex justify-between">
              <span>{selected.name} Plan</span>
              <span className="line-through text-gray-400">
                ${selected.originalPrice.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span className="text-green-600 text-lg">
                ${selected.price.toFixed(2)}
              </span>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              Tax will be calculated at checkout.
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            onClick={handlePayment}
            className="cursor-pointer mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition duration-300 shadow"
          >
            Confirm and Pay
          </motion.button>

          <p className="text-center text-xs text-gray-400 mt-4">
            🔒 30-day money-back guarantee
          </p>
        </motion.div>
      </div>

      {/* Features Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto mt-12 bg-white/70 backdrop-blur-md p-6 rounded-2xl border-2 border-orange-500 shadow-xl"
      >
        <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">
          What's Included in the {selected.name} Plan
        </h3>
        <div className="space-y-3 text-gray-700 text-sm sm:text-base">
          {selected.features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.08 * idx }}
              className="flex items-center gap-2"
            >
              <FaCheckCircle className="text-orange-500" />
              <span>{feature}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CheckoutPage;
