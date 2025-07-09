import React from "react";
import OurImpact from "./OurImpact/OurImpact";
import HowItWorks from "./HowItWorks/HowItWorks";
import Testimonials from "./Testimonials/Testimonials";
import WhyChooseUs from "./WhyChooseUs/WhyChooseUs";
import MembershipPlans from "./MembershipPlans/MembershipPlans";
import Hero from "./Hero/Hero";
import MealsByCategory from "./MealsByCategory/MealsByCategory";

const Home = () => {
  return (
    <div>
      <Hero />
      <MealsByCategory/>
      <OurImpact />
      <HowItWorks />
      <WhyChooseUs />
      <MembershipPlans />
      <Testimonials />
    </div>
  );
};

export default Home;
