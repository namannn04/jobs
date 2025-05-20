
import React, { useState } from "react";
import SignUpModal from "./SignUpModal";

const CallToAction: React.FC = () => {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  return (
    <section className="bg-white w-full py-[100px] px-[70px] max-md:max-w-full max-md:px-5">
      <div className="flex max-w-[1100px] mx-auto max-md:flex-col max-md:items-stretch">
        <div className="w-2/5 max-md:w-full max-md:ml-0 flex justify-center items-center">
          <div className="relative h-[300px] w-[300px] max-md:mx-auto">
            <img 
              src="/HASHI.png" 
              alt="Hashtag icon" 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full object-contain"
            />
          </div>
        </div>
        <div className="w-3/5 ml-5 flex items-center max-md:w-full max-md:ml-0 max-md:mt-10">
          <div className="flex flex-col text-center max-md:max-w-full">
            <h2 className="text-2xl font-bold">
              Ready to get started?
            </h2>
            <p className="text-lg mt-6 max-md:max-w-full">
              Job searching can be exhausting, but it doesn't have to be.
              JobMatch AI finds the best job for you by analyzing your
              skills, experience, and goals—saving you time and effort.
            </p>
            <div className="mt-8 flex justify-center">
              <button
                className="bg-blue-900 w-[200px] text-white px-[35px] py-[15px] rounded-[5px] max-md:px-5 hover:bg-blue-800 transition-colors"
                aria-label="Try JobMatch AI"
                onClick={() => setIsSignUpOpen(true)}
              >
                Try JobMatch AI
              </button>
            </div>
          </div>
        </div>
      </div>
      <SignUpModal isOpen={isSignUpOpen} onClose={() => setIsSignUpOpen(false)} />
    </section>
  );
};

export default CallToAction;
