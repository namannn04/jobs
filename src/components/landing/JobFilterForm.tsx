
import React, { useState } from "react";
import { X, Plus, Filter } from "lucide-react";
import { Button } from "@/components/landing ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/landing ui/select";
import { 
  ToggleGroup, 
  ToggleGroupItem 
} from "@/components/landing ui/toggle-group";

interface JobFilterFormProps {
  onClose: () => void;
}

const JobFilterForm: React.FC<JobFilterFormProps> = ({ onClose }) => {
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [currentSkill, setCurrentSkill] = useState("");
  const [jobType, setJobType] = useState<string[]>([]);

  const experienceLevels = [
    "Entry Level",
    "1-3 years",
    "3-5 years",
    "5-10 years",
    "10+ years",
  ];

  const jobTypes = [
    { value: "full-time", label: "Full-time" },
    { value: "part-time", label: "Part-time" },
    { value: "contract", label: "Contract" },
    { value: "internship", label: "Internship" },
    { value: "remote", label: "Remote" },
  ];

  const handleAddSkill = () => {
    if (currentSkill.trim() && !skills.includes(currentSkill.trim())) {
      setSkills([...skills, currentSkill.trim()]);
      setCurrentSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleJobTypeChange = (values: string[]) => {
    setJobType(values);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      jobTitle,
      location,
      experience,
      skills,
      jobType,
    });
    // Here you would typically send the filter data to your API
    onClose();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkill();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-blue-900 flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Filter Jobs
        </h2>
        <button 
          onClick={onClose} 
          className="text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Close filter"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1.5">
          <label
            htmlFor="jobTitle"
            className="block text-sm font-medium text-gray-700"
          >
            Job Title
          </label>
          <input
            type="text"
            id="jobTitle"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            placeholder="e.g. Software Engineer"
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700"
          >
            Location
          </label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            placeholder="e.g. New York, Remote"
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="jobType"
            className="block text-sm font-medium text-gray-700"
          >
            Job Type
          </label>
          <ToggleGroup 
            type="multiple" 
            variant="outline"
            className="flex flex-wrap justify-start gap-2"
            value={jobType}
            onValueChange={handleJobTypeChange}
          >
            {jobTypes.map((type) => (
              <ToggleGroupItem 
                key={type.value} 
                value={type.value}
                className="bg-white border-gray-300 data-[state=on]:bg-blue-50 data-[state=on]:text-blue-900 data-[state=on]:border-blue-900"
              >
                {type.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="experience"
            className="block text-sm font-medium text-gray-700"
          >
            Experience Level
          </label>
          <Select value={experience} onValueChange={setExperience}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select experience level" />
            </SelectTrigger>
            <SelectContent>
              {experienceLevels.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="skills"
            className="block text-sm font-medium text-gray-700"
          >
            Skills
          </label>
          <div className="flex">
            <input
              type="text"
              id="skills"
              value={currentSkill}
              onChange={(e) => setCurrentSkill(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="e.g. React, Python"
            />
            <Button
              type="button"
              onClick={handleAddSkill}
              className="px-4 py-2 bg-blue-900 text-white rounded-r-md hover:bg-blue-800 transition-colors"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {skills.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {skills.map((skill) => (
                <div
                  key={skill}
                  className="group bg-blue-50 text-blue-800 px-3 py-1.5 rounded-full flex items-center text-sm border border-blue-100 hover:bg-blue-100 transition-colors"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="ml-2 text-blue-400 hover:text-blue-700 transition-colors"
                    aria-label={`Remove ${skill} skill`}
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 pt-3">
          <Button
            type="button"
            onClick={onClose}
            variant="outline"
            className="border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-blue-900 text-white hover:bg-blue-800 transition-colors"
          >
            Apply Filters
          </Button>
        </div>
      </form>
    </div>
  );
};

export default JobFilterForm;
