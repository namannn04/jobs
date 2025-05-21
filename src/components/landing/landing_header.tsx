
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
      </header>
      <div style={{height: 80}}></div>
    </>
  );
};

export default Header;
