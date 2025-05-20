
import React from "react";
import Header from "@/components/landing/landing_header";
import Hero from "@/components/landing/landing_hero";
import Features from "@/components/landing/landing_features";
import FeatureSection from "@/components/landing/FeatureSection";
import MediaContent from "@/components/landing/MediaContent";
import FAQ from "@/components/landing/FAQ";
import Footer from "../components/landing/landing_footer";
import { useNavigate } from "react-router-dom";

const Index: React.FC = () => {
  const navigate = useNavigate();
  return (
    <main className="bg-white overflow-hidden">
      <Header />
      <Hero />
      <Features />
      <div className="flex flex-col w-full">
        <FeatureSection
          title="AI-Powered Resume Screening & ATS Compliance"
          description={
            <>
              • Uses Natural Language Processing (NLP) to analyze resumes.
              <br />
              <br />• Ensures ATS-friendly formatting and keyword optimization.
              <br />
              <br />• Provides real-time feedback to improve resume quality.
            </>
          }
          mediaContent={<MediaContent type="diagram" />}
          isReversed={false}
        />

        <FeatureSection
          title="Intelligent Job Matching & Suitability Scoring"
          description={
            <>
              • Assigns weightage-based scores to skills, experience, and job
              requirements.
              <br />
              <br />• Matches candidates with the most suitable job opportunities.
              <br />
              <br />• Uses Machine Learning to improve job recommendations over
              time.
            </>
          }
          mediaContent={<MediaContent type="diagram" />}
          isReversed={true}
          bgColor="bg-[rgba(242,242,242,1)]"
        />

        <FeatureSection
          title="Personalized Career Guidance & Recommendations"
          description={
            <>
              • Offers tailored job recommendations based on user preferences.
              <br />
              <br />• Provides insights into skill gaps and career development
              suggestions.
              <br />
              <br />• Uses user-based filtering for a better job search
              experience.
            </>
          }
          mediaContent={<MediaContent type="diagram" />}
          isReversed={false}
        />
      </div>

      <FAQ />
      <Footer />
    </main>
  );
};

export default Index;
