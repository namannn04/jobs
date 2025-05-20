
import React from "react";
import Header from "./Main_header";
import Hero from "./Main_hero";
import Features from "./main_features";
import CallToAction from "./CallToAction";
import Footer from "./main_footer";

const JobMatchAI: React.FC = () => {
  return (
    <div className="bg-white flex flex-col overflow-hidden items-stretch">
      <Header />
      <main>
        <Hero />
        <Features />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default JobMatchAI;
