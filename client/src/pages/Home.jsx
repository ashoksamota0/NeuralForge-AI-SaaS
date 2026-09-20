import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Testimonial from "../components/Testimonial";
import Plan from "../components/Plan";
import FAQ from "./FAQ";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <main className="min-h-screen overflow-hidden bg-white">
      <Navbar />
      <Hero />
      <Testimonial />
      <Plan />
      <FAQ />
      <Footer />
    </main>
  );
};

export default Home;
