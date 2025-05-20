
import React, { ReactNode } from "react";

interface FeatureSectionProps {
  title: string;
  description: ReactNode;
  mediaContent: ReactNode;
  isReversed?: boolean;
  bgColor?: string;
}

const FeatureSection: React.FC<FeatureSectionProps> = ({
  title,
  description,
  mediaContent,
  isReversed = false,
  bgColor = "bg-white",
}) => {
  const contentOrder = isReversed ? "flex-row-reverse" : "flex-row";

  return (
    <section
      className={`${bgColor} w-full max-md:max-w-full`}
    >
      <div
        className={`flex ${contentOrder} max-md:flex-col max-md:items-stretch`}
      >
        <div
          className={`${isReversed ? "w-1/2" : "w-1/2"} max-md:w-full`}
        >
          {mediaContent}
        </div>
        <div
          className={`${isReversed ? "w-1/2" : "w-1/2"} max-md:w-full flex items-center`}
        >
          <div className="flex flex-col self-stretch items-stretch text-black my-auto p-12 max-md:max-w-full max-md:mt-10 max-md:p-5">
            <h2 className="text-2xl font-bold leading-none max-md:max-w-full">
              {title}
            </h2>
            <div className="text-xl font-normal leading-7 mt-[46px] max-md:mt-10">
              {description}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
