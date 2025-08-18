import Slider from "react-slick";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Computer Science Student",
      initial: "S",
      quote:
        "The food quality is amazing! I love how fresh everything tastes and the variety of options available. UniHostel has made my university life so much better.",
    },
    {
      name: "Alex Smith",
      role: "Business Student",
      initial: "A",
      quote:
        "Ordering meals has never been easier. The service is fast and reliable. Highly recommend UniHostel to all students!",
    },
    {
      name: "Maria Lopez",
      role: "Engineering Student",
      initial: "M",
      quote:
        "The membership plans are affordable and the meals are delicious. I don’t have to worry about what to eat anymore.",
    },
  ];

  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  return (
    <section className="bg-gradient-to-b from-orange-50 to-white dark:from-gray-900 dark:to-gray-950 py-16 px-4 text-center transition-colors duration-300">
      <h2 className="text-4xl font-bold mb-4 text-gray-800 dark:text-gray-100">
        What Students{" "}
        <span className="bg-gradient-to-r from-orange-500 to-pink-500 text-transparent bg-clip-text">
          Say
        </span>
      </h2>
      <p className="text-gray-600 dark:text-gray-300 text-lg mb-12 max-w-2xl mx-auto">
        Don't just take our word for it. Here's what our students have to say
        about their experience.
      </p>

      <div className="max-w-3xl mx-auto">
        <Slider {...settings}>
          {testimonials.map((t, index) => (
            <div key={index} className="px-4">
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-10 border border-gray-100 dark:border-gray-700 hover:shadow-3xl transition duration-300 transform hover:scale-105">
                <FaQuoteLeft className="text-orange-500 text-4xl mb-6 mx-auto" />

                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className="text-yellow-400 mx-0.5 text-lg"
                    />
                  ))}
                </div>

                <p className="text-gray-700 dark:text-gray-300 text-lg italic mb-8 leading-relaxed">
                  "{t.quote}"
                </p>

                <div className="flex items-center justify-center gap-4">
                  <div className="w-14 h-14 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center text-lg font-bold text-orange-600 dark:text-orange-300 shadow-inner">
                    {t.initial}
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-gray-800 dark:text-gray-100 text-lg">
                      {t.name}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      {t.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
