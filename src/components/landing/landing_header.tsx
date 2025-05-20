
import React, { useState, useEffect, useRef } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/landing ui/dropdown-menu";
import { Button } from "@/components/landing ui/button";
import { ChevronDown, Filter, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const Header: React.FC = () => {
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);
  const [selectedJobLevels, setSelectedJobLevels] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 10) {
        setShowHeader(true);
      } else if (currentScrollY > lastScrollY.current) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const jobTypes = ["Full-time", "Part-time", "Internship", "Contract"];
  const jobLevels = ["Entry", "Junior", "Mid", "Senior"];
  const locations = ["On-site", "Remote", "Hybrid", "Flexible"];
  const industries = ["IT", "Marketing", "Finance", "Healthcare"];

  const toggleJobType = (type: string) => {
    setSelectedJobTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const toggleJobLevel = (level: string) => {
    setSelectedJobLevels(prev =>
      prev.includes(level) ? prev.filter(l => l !== level) : [...prev, level]
    );
  };

  const toggleLocation = (location: string) => {
    setSelectedLocations(prev =>
      prev.includes(location) ? prev.filter(l => l !== location) : [...prev, location]
    );
  };

  const toggleIndustry = (industry: string) => {
    setSelectedIndustries(prev =>
      prev.includes(industry) ? prev.filter(i => i !== industry) : [...prev, industry]
    );
  };

  const totalFiltersSelected =
    selectedJobTypes.length +
    selectedJobLevels.length +
    selectedLocations.length +
    selectedIndustries.length;

  return (
    <>
      <header
        className={`bg-white flex w-full items-center justify-between px-8 py-4 shadow-sm max-md:px-5 transition-transform duration-300 fixed top-0 left-0 z-50 ${showHeader ? "translate-y-0" : "-translate-y-full"}`}
        style={{willChange: "transform"}}
      >
        {/* Left navigation */}
        <nav className="flex items-center gap-8 text-base font-medium">
          <a href="#" className="hover:text-blue-900 transition-colors">
            Home
          </a>
          <a href="#features" className="hover:text-blue-900 transition-colors">
            Features
          </a>
          <a href="#faq" className="hover:text-blue-900 transition-colors">
            FAQ
          </a>
        </nav>

        {/* Logo - centered */}
        <div className="text-2xl font-bold text-center uppercase absolute left-1/2 transform -translate-x-1/2">
          JOBMATCH AI
        </div>

        {/* Filter jobs dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="default"
              className="bg-[#1E3A8A] hover:bg-[#1a3378] text-white font-medium flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              <span>Filter Jobs</span>
              {totalFiltersSelected > 0 && (
                <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-medium text-[#1E3A8A]">
                  {totalFiltersSelected}
                </span>
              )}
              <ChevronDown className="ml-1 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[280px] bg-white p-2 shadow-lg rounded-md border border-gray-200"
            align="end"
            sideOffset={8}
          >
            <DropdownMenuLabel className="text-[#1E3A8A] font-semibold px-3 py-2">
              Filter Options
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-200" />
            {/* Job Type Filter */}
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-[#1E3A8A] rounded-md cursor-pointer">
                <span>Job Type</span>
                {selectedJobTypes.length > 0 && (
                  <span className="ml-auto bg-blue-100 text-[#1E3A8A] text-xs font-medium px-2 py-0.5 rounded-full">
                    {selectedJobTypes.length}
                  </span>
                )}
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="p-2 bg-white rounded-md shadow-lg border border-gray-200">
                {jobTypes.map((type) => (
                  <DropdownMenuCheckboxItem
                    key={type}
                    checked={selectedJobTypes.includes(type)}
                    onCheckedChange={() => toggleJobType(type)}
                    className="px-3 py-2 cursor-pointer rounded-md hover:bg-blue-50 text-gray-700 hover:text-[#1E3A8A]"
                  >
                    {type}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            {/* Job Level Filter */}
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-[#1E3A8A] rounded-md cursor-pointer">
                <span>Job Level</span>
                {selectedJobLevels.length > 0 && (
                  <span className="ml-auto bg-blue-100 text-[#1E3A8A] text-xs font-medium px-2 py-0.5 rounded-full">
                    {selectedJobLevels.length}
                  </span>
                )}
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="p-2 bg-white rounded-md shadow-lg border border-gray-200">
                {jobLevels.map((level) => (
                  <DropdownMenuCheckboxItem
                    key={level}
                    checked={selectedJobLevels.includes(level)}
                    onCheckedChange={() => toggleJobLevel(level)}
                    className="px-3 py-2 cursor-pointer rounded-md hover:bg-blue-50 text-gray-700 hover:text-[#1E3A8A]"
                  >
                    {level}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            {/* Location Filter */}
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-[#1E3A8A] rounded-md cursor-pointer">
                <span>Location</span>
                {selectedLocations.length > 0 && (
                  <span className="ml-auto bg-blue-100 text-[#1E3A8A] text-xs font-medium px-2 py-0.5 rounded-full">
                    {selectedLocations.length}
                  </span>
                )}
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="p-2 bg-white rounded-md shadow-lg border border-gray-200">
                {locations.map((location) => (
                  <DropdownMenuCheckboxItem
                    key={location}
                    checked={selectedLocations.includes(location)}
                    onCheckedChange={() => toggleLocation(location)}
                    className="px-3 py-2 cursor-pointer rounded-md hover:bg-blue-50 text-gray-700 hover:text-[#1E3A8A]"
                  >
                    {location}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            {/* Industry Filter */}
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-[#1E3A8A] rounded-md cursor-pointer">
                <span>Industry</span>
                {selectedIndustries.length > 0 && (
                  <span className="ml-auto bg-blue-100 text-[#1E3A8A] text-xs font-medium px-2 py-0.5 rounded-full">
                    {selectedIndustries.length}
                  </span>
                )}
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="p-2 bg-white rounded-md shadow-lg border border-gray-200">
                {industries.map((industry) => (
                  <DropdownMenuCheckboxItem
                    key={industry}
                    checked={selectedIndustries.includes(industry)}
                    onCheckedChange={() => toggleIndustry(industry)}
                    className="px-3 py-2 cursor-pointer rounded-md hover:bg-blue-50 text-gray-700 hover:text-[#1E3A8A]"
                  >
                    {industry}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <div style={{height: 80}}></div>
    </>
  );
};

export default Header;
