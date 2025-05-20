
import React from "react";
import { Check } from "lucide-react";

const Features: React.FC = () => {
  return (
    <section className="bg-[rgba(242,242,242,1)] flex w-full flex-col py-[100px] px-[70px] max-md:max-w-full max-md:px-5">
      <div className="w-full max-w-[1100px] mx-auto">
        <div className="gap-10 flex max-md:flex-col max-md:items-stretch">
          <div className="w-[54%] max-md:w-full max-md:ml-0">
            <div className="flex w-full flex-col text-black max-md:max-w-full max-md:mt-10">
              <h2 className="text-[32px] font-medium max-md:max-w-full">
                Your Best Value Proposition
              </h2>
              <p className="text-lg leading-[25px] mt-6 max-md:max-w-full">
                Finding the right job shouldn't be a struggle. JobMatch AI uses
                intelligent algorithms to analyze your skills, experience, and
                preferences—matching you with opportunities that truly fit. Say
                goodbye to endless job searching and let AI do the work for you.
              </p>
              <ul className="mt-8 space-y-[19px]">
                <li className="flex items-center gap-3">
                  <div className="border border-black p-0.5 rounded">
                    <Check size={18} className="text-black" />
                  </div>
                  <span>AI-driven personalized job matches</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="border border-black p-0.5 rounded">
                    <Check size={18} className="text-black" />
                  </div>
                  <span>Save time with automated screening</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="border border-black p-0.5 rounded">
                    <Check size={18} className="text-black" />
                  </div>
                  <span>Enhance your resume with AI insights</span>
                </li>
              </ul>
              <p className="font-bold mt-[45px] max-md:mt-10">
                Get matched smarter. Apply faster.
              </p>
            </div>
          </div>
          <div className="w-[46%] max-md:w-full max-md:ml-0">
            <div className="w-full max-md:mt-10 flex justify-center">
              <img 
                src="/peeps.webp" 
                alt="Team collaborating around a computer" 
                className="w-[300px] h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
