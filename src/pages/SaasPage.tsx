import React from "react";

const SaasPage: React.FC = () => {
  const navigate = require("react-router-dom").useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h1 className="text-4xl font-bold mb-4 text-blue-900">SaaS Resume Analyzer</h1>
      <p className="text-lg text-gray-700 mb-8">Upload your resume and let our AI analyze it for ATS compliance, job matching, and personalized career guidance.</p>
      {/* You can add the ResumeUploadForm component here if desired */}
      <div className="w-full max-w-md">
        <p className="text-center text-gray-500">(Feature coming soon!)</p>
      </div>
    </div>
  );
};

export default SaasPage;