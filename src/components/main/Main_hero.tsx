
import React from "react";
import { useNavigate } from "react-router-dom";

const Hero: React.FC = () => {
  const navigate = useNavigate(); 
  return <section className="bg-white flex w-full flex-col items-center px-[70px] py-[110px] max-md:max-w-full max-md:px-5 max-md:py-[100px]">
      <div className="w-full max-w-[1153px] flex max-md:flex-col max-md:items-stretch">
        <div className="w-[39%] max-md:w-full max-md:ml-0">
          <div className="flex flex-col text-black font-normal my-auto max-md:max-w-full max-md:mt-10">
            <h1 className="text-[40px] font-medium leading-tight">
              No More Job Hunt Stress – Let AI Find the Perfect Fit!
            </h1>
            <p className="text-xl leading-7 mt-8 max-md:max-w-full">
              Upload your resume and get instant feedback on ATS
              compatibility, keyword optimization, and job matches. Let AI
              help you stand out in the hiring process!
            </p>
            <button className="bg-blue-900 text-lg text-white text-center mt-[30px] w-fit px-8 py-[15px] rounded-[5px] max-md:px-5 hover:bg-blue-800 transition-colors" aria-label="Scan My Resume" onClick={() => navigate("/saas") }>
          
              Scan My Resume

            </button>
          </div>
        </div>
        <div className="w-[61%] ml-5 max-md:w-full max-md:ml-0">
          <div className="flex items-center justify-center w-full max-md:max-w-full max-md:mt-10">
            <img 
              src="/hand.jpg" 
              alt="Hand holding a yellow light bulb" 
              className="w-[400px] h-auto object-contain" 
            />
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;
