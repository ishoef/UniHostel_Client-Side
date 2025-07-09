import React from "react";
import OurImpact from "./OurImpact/OurImpact";
import FeaturedMeals from "./FeaturedMeals/FeaturedMeals";
import HowItWorks from "./HowItWorks/HowItWorks";
import Testimonials from "./Testimonials/Testimonials";
import WhyChooseUs from "./WhyChooseUs/WhyChooseUs";
import MembershipPlans from "./MembershipPlans/MembershipPlans";
import Hero from "./Hero/Hero";

const Home = () => {
  return (
    <div>
      <Hero />
      <FeaturedMeals />
      <OurImpact />
      <HowItWorks />
      <WhyChooseUs />
      <MembershipPlans />
      <Testimonials />
    </div>
  );
};

export default Home;
