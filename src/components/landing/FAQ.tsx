
import React, { useState } from "react";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/landing ui/accordion";

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const faqItems: FAQItemProps[] = [
    {
      question: "How this work?",
      answer:
        "1. Upload your resume\n2. AI analyzes it for formatting, keywords, and ATS compliance\n3. Receive job recommendations based on your skills and experience\n4. Get improvement suggestions to enhance your resume",
    },
    {
      question: "Is JobMatch AI free to use?",
      answer:
        "Yes, JobMatch AI is a student project and is currently free for educational purposes.",
    },
    {
      question: "Does JobMatch AI store my data?",
      answer:
        "No, JobMatch AI does not store or process real user data. It is a student-built project for learning and demonstration purposes only.",
    },
  ];

  return (
    <section
      id="faq"
      className="bg-[rgba(242,242,242,1)] flex w-full flex-col text-black justify-center px-20 py-44 max-md:max-w-full max-md:px-5 max-md:py-[100px]"
    >
      <div className="flex w-full max-w-[1153px] mx-auto flex-col items-stretch max-md:max-w-full">
        <div className="flex items-start gap-5 justify-between max-md:max-w-full max-md:flex-col">
          {/* Left side - Title and brief info */}
          <div className="flex flex-col items-stretch w-[45%] max-md:w-full max-md:mb-8">
            <h2 className="text-5xl font-bold leading-[68px] max-md:text-[40px] max-md:leading-[63px]">
              Any questions?
              <br />
              We got you.
            </h2>
            <p className="text-base font-normal leading-[23px] mt-[69px] max-md:mt-10">
              Whether you're curious about how JobMatch AI works, need help with
              resume screening, or want to understand AI-powered job matching,
              we're here to help. Explore our FAQs to get all the details you
              need to kickstart your job search journey with confidence!
            </p>
          </div>
          
          {/* Right side - Accordion elements */}
          <div className="w-[50%] max-md:w-full">
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="mb-4">
                  <AccordionTrigger className="bg-white px-[9px] py-[13px] rounded-[10px] text-[25px] font-semibold hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="bg-white mt-1 px-[9px] py-[13px] rounded-[10px] text-lg font-normal whitespace-pre-line">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
