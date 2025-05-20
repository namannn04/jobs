
import React, { useState, useEffect, useRef } from "react";
import SignUpModal from "./SignUpModal";

const Header: React.FC = () => {
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);

  const openSignUpModal = () => {
    setIsSignUpModalOpen(true);
  };

  const closeSignUpModal = () => {
    setIsSignUpModalOpen(false);
  };

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

  return (
    <>
      <header
        className={`bg-blue-900 flex w-full items-stretch gap-5 text-white flex-wrap justify-between px-10 py-3 max-md:max-w-full max-md:px-5 transition-transform duration-300 fixed top-0 left-0 z-50 ${showHeader ? "translate-y-0" : "-translate-y-full"}`}
        style={{willChange: "transform"}}
      >
        <div className="text-2xl font-bold uppercase my-auto">JobMatch AI</div>
        <nav className="flex items-center gap-5 text-lg font-normal">
          <a
            href="#"
            className="self-stretch my-auto hover:text-blue-200 transition-colors"
          >
            Home
          </a>
          <a
            href="#"
            className="self-stretch my-auto hover:text-blue-200 transition-colors"
          >
            Contact
          </a>
          <button 
            className="self-stretch text-center leading-none"
            onClick={openSignUpModal}
          >
            <div className="border px-[41px] py-2 rounded-[5px] border-white border-solid max-md:px-5 hover:bg-white hover:text-blue-900 transition-colors">
              Sign Up
            </div>
          </button>
        </nav>
      </header>
      <div style={{height: 72}}></div>
      <SignUpModal isOpen={isSignUpModalOpen} onClose={closeSignUpModal} />
    </>
  );
};

export default Header;
