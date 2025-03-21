"use client";
import React from "react";
import Outer_Navbar from "../../components/Outer_Navbar";
import Book from "./Book";
import Outer_Footer from "@/components/Outer_Footer";

export default function LoggedInWebPage() {
  const bookNumbers = [1, 2, 3, 4, 5];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
      <Outer_Navbar />

      {/* Books Section */}
      <div className="flex-1 container  mx-auto px-6 py-24">
        {/* Page Title */}
        <h1 className="text-5xl md:text-6xl font-extrabold text-center text-yellow-400 mb-12 tracking-widest drop-shadow-lg">
          📜 Explore Sacred Books 📖
        </h1>

        {/* Books Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-center">
          {bookNumbers.map((num) => (
            <Book key={num} bookNumber={num} />
          ))}
        </div>
      </div>

      <Outer_Footer />
    </div>
  );
}
