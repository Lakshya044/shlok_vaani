"use client";
import { useEffect, useState, useRef } from "react";
import shlokas from "../../../public/data/shlokas";
import Outer_Navbar from "../Outer_Navbar";
const ShlokaBanner = () => {
    const [scrollY, setScrollY] = useState(0);
  const scrollContainerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [titleText, setTitleText] = useState("");
  const fullTitle = "DISCOVER THE WISDOM OF SHLOKAS, ONE VERSE AT A TIME";

  // Streaming title effect
  useEffect(() => {
    let index = 0;
    const titleInterval = setInterval(() => {
      setTitleText(fullTitle.slice(0, index));
      index++;
      if (index > fullTitle.length) clearInterval(titleInterval);
    }, 100);
    return () => clearInterval(titleInterval);
  }, []);

  // Continuous Shloka Scrolling
  useEffect(() => {
    let scrollInterval;

    if (!isPaused) {
      scrollInterval = setInterval(() => {
        setScrollY((prev) => (prev + 1) % (shlokas.length * 200));
      }, 30);
    }

    return () => clearInterval(scrollInterval);
  }, [isPaused]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  return (
    <>

    <Outer_Navbar />

    <div
      className="relative w-full h-screen flex flex-col sm:flex-row items-center justify-center bg-cover bg-center p-4"
      style={{ backgroundImage: "url('/bg-image.jpg')" }}
    >
      {/* Left Section for Title */}
      <div className="w-full sm:w-1/2 text-center sm:text-left">
        <h1 className="text-2xl md:text-4xl font-bold text-[#fbd54e] drop-shadow-[2px_2px_4px_rgba(0,0,0,0.8)]">
          {titleText}
        </h1>
      </div>

      {/* Right Section for Continuous Scrolling Shlokas */}
      <div
        className="w-full sm:w-1/2 overflow-hidden flex flex-col items-center h-[300px]"
        ref={scrollContainerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="flex flex-col items-center w-[80%] bg-slate-500 bg-transparent bg-opacity-90 rounded-lg shadow-lg"
          style={{ transform: `translateY(-${scrollY}px)`, transition: "transform 0.1s linear" }}
        >
          {[...shlokas, ...shlokas].map((shloka, index) => (
            <div
              key={index}
              className="h-[200px] flex flex-col items-center justify-center text-center p-4"
            >
              <h2 className="text-lg md:text-2xl font-semibold text-[#f8eb5a]">
                {shloka.text}
              </h2>
              <p className="text-sm md:text-lg text-white mt-2 italic">
                {shloka.meaning}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>

    </>
  );
};

export default ShlokaBanner;
