import React, { useState } from "react";
import Modal from "./Modal";
import ResumeUploadForm from "./ResumeUploadForm";

const Hero: React.FC = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  return (
    <section className="bg-[#1E3A8A] flex w-full flex-col items-center pt-16 pb-12 px-20 max-md:max-w-full max-md:px-5">
      <div className="flex w-[800px] max-w-full flex-col items-center">
        <h1 className="text-white text-5xl font-medium text-center max-md:max-w-full max-md:text-[40px]">
          Why Choose JobMatch AI?
        </h1>
        <p className="text-white text-lg font-light leading-[25px] text-center w-[506px] mt-[19px] max-md:max-w-full opacity-90">
          Get AI-powered resume screening, ATS compliance checks, and smart job
          recommendations to boost your job search. Optimize your resume and
          land the right job faster!
        </p>
        <button
          className="bg-white whitespace-nowrap min-w-[240px] max-w-full text-lg text-[#1E3A8A] font-medium text-center mt-8 px-[39px] py-[15px] rounded-[5px] max-md:px-5 hover:bg-gray-100 transition-colors"
          aria-label="Upload your Resume"
          onClick={() => setIsUploadModalOpen(true)}
        >
          Upload your Resume
        </button>
        <div className="rounded bg-white self-stretch flex flex-col items-center mt-[54px] pt-[76px] pb-2 px-20 max-md:max-w-full max-md:mt-10 max-md:px-5 mb-[-48px] relative z-10">
          <div className="flex w-[400px] max-w-full flex-col">
            <div className="flex w-80 max-w-full items-stretch gap-5 justify-between">
              <div className="flex items-stretch">
                <div className="flex w-20 shrink-0 h-20 rounded-[50%] border-black border-solid border-2" />
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/74938d88c24d19cf35b9cd044ed750e31b5822f1?placeholderIfAbsent=true"
                  alt="Visual element"
                  className="aspect-[1] object-contain w-20 shrink-0 mt-20 max-md:mt-10"
                />
                <div>
                  <div className="bg-black flex w-20 shrink-0 h-20 border-black border-solid border-2" />
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/e611329d7713b9d9579ff478d6be87bd6c053303?placeholderIfAbsent=true"
                    alt="Visual element"
                    className="aspect-[1] object-contain w-20"
                  />
                </div>
              </div>
              <div className="bg-black flex w-5 shrink-0 h-5 my-auto rounded-[50%] border-black border-solid border-2" />
            </div>
            <div className="flex w-[253px] max-w-full items-stretch gap-5 justify-between">
              <div className="bg-black flex w-5 shrink-0 h-5 rounded-[50%] border-black border-solid border-2" />
              <div className="flex gap-[13px]">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/89c5e87d625121539e6a0e023b72005e4c24b702?placeholderIfAbsent=true"
                  alt="Visual element"
                  className="aspect-[1] object-contain w-20 shrink-0"
                />
                <div className="flex w-20 shrink-0 h-20 mt-[7px] rounded-[50%] border-black border-solid border-2" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
      >
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-[#1E3A8A] mb-4">
            Upload Your Resume
          </h2>
          <ResumeUploadForm />
        </div>
      </Modal>
    </section>
  );
};

export default Hero;
