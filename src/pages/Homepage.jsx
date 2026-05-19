import Hero from "@/components/Homepage/Hero";
import TopRated from "@/components/Homepage/TopRated";
import WhyChoose from "@/components/Homepage/WhyChoose";
import Review from "@/components/shared/Review";
import React from "react";

const Homepage = () => {
  return (
    <div>
      <Hero />
      <TopRated />
      <WhyChoose />
      <Review />
    </div>
  );
};

export default Homepage;
