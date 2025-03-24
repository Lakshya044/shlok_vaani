"use client";

import React, { useEffect, useState } from 'react';
import Outer_Footer from '@/components/Outer_Footer';
import Outer_Navbar from '@/components/Outer_Navbar';
import ShlokaCard from './ShlokaCard';
import { FaSpinner, FaArrowLeft, FaArrowRight } from 'react-icons/fa'; // Importing spinner and arrow icons

const Page = () => {
  const [shlokas, setShlokas] = useState([]);
  const [currentBook, setCurrentBook] = useState(1);
  const [currentChapter, setCurrentChapter] = useState(1);
  const [currentPage, setCurrentPage] = useState(0); // Track the current page for pagination
  const [loading, setLoading] = useState(false); // Track if data is being fetched

  const fetchShlokas = async () => {
    try {
      setLoading(true); // Set loading to true when fetching data
      const shlokaResponse = await fetch(
        `http://localhost:3000/api/fetch/shlokas/Mahabharata/${currentBook}/${currentChapter}`
      );

      if (!shlokaResponse.ok) {
        throw new Error('Failed to fetch shlokas');
      }

      const data = await shlokaResponse.json();
      const newShlokas = data?.shlokas || [];

      setShlokas(newShlokas); // Save all shlokas in state
    } catch (error) {
      console.error('Error fetching shlokas:', error);
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };

  // Logic to handle pagination
  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1); // Increment page when "Next" is clicked
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0)); // Decrement page when "Previous" is clicked, but not below 0
  };

  // Only show 10 shlokas at a time based on the current page
  const displayedShlokas = shlokas.slice(currentPage * 10, (currentPage + 1) * 10);

  useEffect(() => {
    fetchShlokas(); // Fetch all shlokas initially
  }, [currentBook, currentChapter]); // Fetch new shlokas when book or chapter changes

  return (
    <div>
      <div className="p-6 space-y-6 pt-24">
        {displayedShlokas.map((shloka) => (
          <ShlokaCard key={shloka._id} uid={shloka._id} />
        ))}
        
        {/* Loading Spinner when fetching more shlokas */}
        {loading && (
          <div className="flex justify-center">
            <FaSpinner className="animate-spin text-blue-500 text-3xl" />
          </div>
        )}

        {/* Pagination Buttons */}
        <div className="flex justify-between mt-4">
          <button
            className="px-6 py-2 bg-yellow-700 text-white rounded-md shadow-md hover:bg-yellow-900 transition-all duration-300 ease-in-out flex items-center"
            onClick={prevPage}
            disabled={currentPage === 0} // Disable if already at the first page
            title={currentPage === 0 ? 'No previous page' : ''}
          >
            <FaArrowLeft className="mr-2" />
            Previous
          </button>
          
          <button
            className="px-6 py-2 bg-yellow-700 text-white rounded-md shadow-md hover:bg-yellow-900 transition-all duration-300 ease-in-out flex items-center"
            onClick={nextPage}
            disabled={displayedShlokas.length < 10} // Disable if fewer than 10 shlokas are displayed
          >
            Next
            <FaArrowRight className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
