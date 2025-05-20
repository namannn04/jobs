import React, { useState } from "react";

const ResumeUploadForm: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setFeedback(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setFeedback("Please select a resume file to upload");
      return;
    }

    setIsUploading(true);

    // Simulate API call
    setTimeout(() => {
      setIsUploading(false);
      setFeedback(
        "Resume uploaded successfully! Our AI is analyzing your resume.",
      );
      setFile(null);

      // Reset form
      const form = e.target as HTMLFormElement;
      form.reset();
    }, 1500);
  };

  return (
    <div className="mt-8 w-full max-w-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="resume" className="text-sm font-medium mb-2">
            Upload your resume (PDF, DOCX)
          </label>
          <input
            id="resume"
            type="file"
            accept=".pdf,.docx,.doc"
            onChange={handleFileChange}
            className="border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        {file && (
          <div className="text-sm">
            Selected file: <span className="font-medium">{file.name}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={isUploading}
          className={`w-full bg-blue-900 text-white py-3 rounded-md transition-colors ${
            isUploading ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-800"
          }`}
        >
          {isUploading ? "Uploading..." : "Analyze My Resume"}
        </button>

        {feedback && (
          <div
            className={`p-3 rounded-md ${feedback.includes("successfully") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
          >
            {feedback}
          </div>
        )}
      </form>
    </div>
  );
};

export default ResumeUploadForm;
