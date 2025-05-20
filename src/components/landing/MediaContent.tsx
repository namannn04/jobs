import React from "react";

interface MediaContentProps {
  type: "diagram" | "placeholder";
}

const MediaContent: React.FC<MediaContentProps> = ({ type }) => {
  if (type === "placeholder") {
    return (
      <div className="bg-blue-900 flex grow flex-col items-center justify-center w-full px-20 py-[120px] max-md:max-w-full max-md:mt-10 max-md:px-5 max-md:py-[100px]">
        <div className="bg-neutral-600 flex w-80 shrink-0 max-w-full h-[360px] rounded-lg" />
      </div>
    );
  }

  return (
    <div className="bg-blue-900 flex w-full h-full flex-col items-center justify-center">
      <div className="flex w-[400px] max-w-full items-center py-16 max-md:py-10">
        <div className="bg-black self-stretch flex w-5 shrink-0 h-5 my-auto rounded-[50%] border-black border-solid border-2" />
        <div className="bg-white self-stretch flex flex-col items-stretch px-10 py-[57px] rounded-lg max-md:px-5 mx-4">
          <div className="flex items-stretch">
            <div className="flex w-20 shrink-0 h-20 rounded-[50%] border-black border-solid border-2" />
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/74938d88c24d19cf35b9cd044ed750e31b5822f1?placeholderIfAbsent=true"
              alt="Visual element"
              className="aspect-[1] object-contain w-20 shrink-0 mt-20 max-md:mt-10"
            />
            <div className="flex-1">
              <div className="bg-black flex w-20 shrink-0 h-20 border-black border-solid border-2" />
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/e611329d7713b9d9579ff478d6be87bd6c053303?placeholderIfAbsent=true"
                alt="Visual element"
                className="aspect-[1] object-contain w-20"
              />
            </div>
          </div>
          <div className="flex gap-[13px]">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/89c5e87d625121539e6a0e023b72005e4c24b702?placeholderIfAbsent=true"
              alt="Visual element"
              className="aspect-[1] object-contain w-20 shrink-0"
            />
            <div className="flex w-20 shrink-0 h-20 mt-[7px] rounded-[50%] border-black border-solid border-2" />
          </div>
        </div>
        <div className="bg-black self-stretch flex w-5 shrink-0 h-5 my-auto rounded-[50%] border-black border-solid border-2" />
      </div>
    </div>
  );
};

export default MediaContent;
