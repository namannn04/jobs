import React from "react";

const Features: React.FC = () => {
  return (
    <section
      id="features"
      className="bg-[rgba(242,242,242,1)] flex w-full flex-col items-center text-black font-semibold text-center leading-none justify-center px-20 py-[70px] max-md:max-w-full max-md:px-5"
    >
      <div className="flex w-[605px] max-w-full flex-col items-center">
        <h2 className="text-2xl">How JobMatch AI Helps You</h2>
        <p className="text-xl font-normal leading-7 self-stretch mt-8 max-md:max-w-full">
          JobMatch AI connects you with the best job opportunities tailored to
          your skills and goals.
        </p>
        <div className="flex w-[534px] max-w-full items-stretch gap-5 text-[11px] text-white flex-wrap justify-between mt-[87px] max-md:mt-10">
          <div className="bg-black text-xs py-2.5 px-3 max-md:pr-5 hover:bg-blue-900 transition-colors cursor-pointer rounded-md flex items-center justify-center">
            Smart Matching
          </div>
          <div className="bg-black py-2.5 px-[7px] hover:bg-blue-900 transition-colors cursor-pointer rounded-md flex items-center justify-center">
            Resume Optimization
          </div>
          <div className="bg-black py-2.5 px-[19px] max-md:pr-5 hover:bg-blue-900 transition-colors cursor-pointer rounded-md flex items-center justify-center">
            Career Insights
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
