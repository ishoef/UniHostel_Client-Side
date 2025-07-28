import React, { useEffect } from "react";
import OurImpact from "./OurImpact/OurImpact";
import HowItWorks from "./HowItWorks/HowItWorks";
import Testimonials from "./Testimonials/Testimonials";
import WhyChooseUs from "./WhyChooseUs/WhyChooseUs";
import MembershipPlans from "./MembershipPlans/MembershipPlans";
import Hero from "./Hero/Hero";
import MealsByCategory from "./MealsByCategory/MealsByCategory";
import useMeals from "../../Hooks/useMeals/useMeals";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.title = "Home | UniHostel";
  });

  const { meals } = useMeals();
  console.log(meals);
  return (
    <div>
      <Hero />
      <MealsByCategory />
      <OurImpact />
      <HowItWorks />
      <WhyChooseUs />
      <MembershipPlans />
      <Testimonials />
    </div>
  );
};

export default Home;
