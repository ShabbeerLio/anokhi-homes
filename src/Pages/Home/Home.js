import React from "react";
import "./Home.css";
import CTA from "../../components/LandingPage/CTA";
import Banner from "../../components/LandingPage/Banner";
import About from "../../components/LandingPage/About";
import Projects from "../../components/LandingPage/Projects";
import Services from "../../components/LandingPage/Services";
import Testimonial from "../../components/LandingPage/Testimonial";
import Counter from "../../components/LandingPage/Counter";

const Home = () => {
  return (
    <>
      <Banner />
      <About />
      <Counter/>
      <Projects />
      <Services />
      <Testimonial />
      <CTA />
    </>
  );
};

export default Home;
