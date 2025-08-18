import {
  FaUserPlus,
  FaSearch,
  FaShoppingCart,
  FaUtensils,
} from "react-icons/fa";

export default function HowItWorks() {
  const steps = [
    {
      id: "01",
      icon: <FaUserPlus className="text-white text-3xl" />,
      title: "Sign Up",
      description: "Create your account and choose your membership plan.",
    },
    {
      id: "02",
      icon: <FaSearch className="text-white text-3xl" />,
      title: "Browse Meals",
      description: "Explore our diverse menu and find your favorite dishes.",
    },
    {
      id: "03",
      icon: <FaShoppingCart className="text-white text-3xl" />,
      title: "Place Order",
      description: "Select your meals and place your order with ease.",
    },
    {
      id: "04",
      icon: <FaUtensils className="text-white text-3xl" />,
      title: "Enjoy Food",
      description: "Pick up your freshly prepared meal and enjoy!",
    },
  ];

  return (
    <section className="bg-gradient-to-b from-orange-50 to-white dark:from-gray-900 dark:to-gray-950 py-16 px-4 text-center">
      <h2 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">
        How It{" "}
        <span className="bg-gradient-to-r from-orange-500 to-pink-500 text-transparent bg-clip-text">
          Works
        </span>
      </h2>

      <p className="max-w-2xl mx-auto mb-12 text-gray-600 dark:text-gray-300 text-lg">
        Getting your favorite meals is simple. Just follow these four easy
        steps.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {steps.map((step) => (
          <div
            key={step.id}
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6 hover:shadow-2xl transform hover:-translate-y-2 transition duration-300"
          >
            <div className="relative flex items-center justify-center mb-6">
              <div className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-full p-5 shadow-md">
                {step.icon}
              </div>
              <span className="absolute -top-2 -right-2 bg-gray-900 dark:bg-gray-700 text-white rounded-full text-xs px-2 py-1 shadow">
                {step.id}
              </span>
            </div>

            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
              {step.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
