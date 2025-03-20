"use client";
import { useState, useEffect, useRef } from "react";

const Outer_Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const scrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
  };

  const toggleNav = () => {
    setIsNavOpen((prev) => !prev);
  };

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isNavOpen && !event.target.closest(".nav-menu")) {
        setIsNavOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isNavOpen]);

  return (
    <div className="w-full px-4 llg:px-[95px] py-4 bg-[#e5d631] flex justify-between items-center mx-auto shadow-lg">
      {/* Logo Section */}
      <div className="flex items-center gap-4">
        <img
          className="w-6 h-6 md:w-[90px] md:h-[90px] rounded-xl"
          src="logo.jpg"
          alt="Logo"
        />
        <div className="text-lg md:text-4xl font-bold font-['Inter'] text-[#D35400]">
          <a href="/"> ShlokVaani</a>
        </div>
      </div>

      {/* Mobile Menu Icon */}
      <div className="sm:hidden">
        <button
          onClick={toggleNav}
          className="focus:outline-none text-[#D34500] text-2xl transition"
        >
          {isNavOpen ? (
            <span key="close" className="transition-opacity duration-300">
              ✖
            </span>
          ) : (
            <span key="menu" className="transition-opacity duration-300">
              ☰
            </span>
          )}
        </button>
      </div>

      {/* Action Buttons for Larger Screens */}
      <div className="hidden sm:flex items-center gap-4 llg:gap-8">
        <button
          className="text-[#1e1e1e] text-sm md:text-base lg:text-lg font-normal px-4 py-2 rounded-xl mx-20 bg-[#D35400] font-['SF Pro Display'] cursor-pointer hover:text-[#fbd54e] transition"
          onClick={() => scrollToSection("auth-form")}
        >
          Get Started
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {isNavOpen && (
        <div className="fixed inset-0 bg-[#e6efec] z-50 flex flex-col items-center justify-center space-y-6 md:hidden nav-menu">
          <div
            className="px-6 py-3 bg-[#e6efec] rounded-full border-2 border-[#01875e] cursor-pointer hover:bg-[#01875e] hover:text-white transition"
            onClick={() => {
              toggleNav();
              scrollToSection("auth-form");
            }}
          >
            <button className="text-[#1e1e1e] text-lg font-normal font-['SF Pro Display']">
              Get Started
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Outer_Navbar;
