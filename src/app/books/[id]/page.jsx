"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ShlokaCard from "./ShlokaCard";
import { FaSpinner } from "react-icons/fa";
import booksData from "../../../../public/data/booksConstant";

const Page = () => {
  const { id } = useParams();
  const [shlokas, setShlokas] = useState([]);
  const [books, setBooks] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [currentBook, setCurrentBook] = useState(null);
  const [currentChapter, setCurrentChapter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const bookInfo = booksData[id] || {};
  const bookSlug = bookInfo.slug || "Mahabharata";
  const bgUrl = bookInfo.image || "/data/mahabharata.jpg";

  useEffect(() => {
    if (!bookInfo || !bookInfo.books) return;
    const bookNumbers = bookInfo.books;
    setBooks(bookNumbers.map((bookNo) => ({ bookNo })));
    setCurrentBook(bookNumbers[0]);
  }, [bookInfo]);

  useEffect(() => {
    if (!bookInfo || !currentBook) return;
    const chapterNumbers = bookInfo.chapters?.[currentBook] || [];
    setChapters(chapterNumbers.map((chapterNo) => ({ chapterNo })));
    setCurrentChapter(chapterNumbers[0] || null);
  }, [bookInfo, currentBook]);

  const fetchShlokas = async () => {
    if (!currentBook || !currentChapter) return;

    setLoading(true);
    try {
      const res = await fetch(
        `/api/fetch/shlokas/${bookSlug}/${currentBook}/${currentChapter}`
      );
      if (!res.ok) throw new Error("Shloka fetch failed");
      const data = await res.json();
      setShlokas(Array.isArray(data?.shlokas) ? data.shlokas : []);
      setCurrentPage(1);
    } catch (err) {
      console.error("Error fetching shlokas:", err);
      setShlokas([]);
    } finally {
      setLoading(false);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedShlokas = shlokas.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className=" pt-16 w-full min-h-screen -mb-40 ">
      {/* Background */}
      <div
        className="fixed top-0 left-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${bgUrl})` }}
      >
        <div className="absolute inset-0 bg-black/70 " />
      </div>

      {/* Foreground */}
      <div className="relative z-5 h-full overflow-y-auto px-4 pt-8 sm:px-8 flex flex-col items-center gap-6 text-base-content">
        <h1 className="text-yellow-400 text-3xl font-extrabold text-center drop-shadow">
          {bookSlug} Shlokas 📖
        </h1>

        {/* Selectors */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Book Select */}
          <div className="flex items-center gap-2">
            <label className="text-white font-semibold" htmlFor="book-select">
              Book:
            </label>
            <select
              id="book-select"
              value={currentBook ?? ""}
              onChange={(e) => setCurrentBook(Number(e.target.value))}
              className="bg-white text-black rounded px-3 py-2"
            >
              {books.map((book) => (
                <option key={book.bookNo} value={book.bookNo}>
                  Book {book.bookNo}
                </option>
              ))}
            </select>
          </div>

          {/* Chapter Select */}
          <div className="flex items-center gap-2">
            <label className="text-white font-semibold" htmlFor="chapter-select">
              Chapter:
            </label>
            <select
              id="chapter-select"
              value={currentChapter ?? ""}
              onChange={(e) => setCurrentChapter(Number(e.target.value))}
              className="bg-white text-black rounded px-3 py-2"
            >
              {chapters.map((chapter) => (
                <option key={chapter.chapterNo} value={chapter.chapterNo}>
                  Chapter {chapter.chapterNo}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Fetch Button */}
        <button
          className="bg-yellow-400 text-black font-bold px-6 py-3 rounded-lg shadow-lg hover:scale-105 transition-transform"
          onClick={fetchShlokas}
        >
          Show the Shlokas
        </button>

        {/* Shlokas Display */}
        {loading ? (
          <div className="flex justify-center py-4">
            <FaSpinner className="animate-spin text-yellow-400 text-3xl" />
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 overflow-y-scroll max-h-[60vh] w-full">
            {displayedShlokas.map((shloka) => (
              <ShlokaCard key={shloka._id} uid={shloka._id} />
            ))}

            {/* Pagination */}
            {shlokas.length > itemsPerPage && (
              <div className="flex items-center gap-4 mt-4">
                <button
                  className="btn btn-outline btn-primary px-4 py-2"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span className="text-white font-semibold">
                  Page {currentPage} of {Math.ceil(shlokas.length / itemsPerPage)}
                </span>
                <button
                  className="btn btn-outline btn-primary px-4 py-2"
                  onClick={() =>
                    setCurrentPage((prev) =>
                      startIndex + itemsPerPage < shlokas.length ? prev + 1 : prev
                    )
                  }
                  disabled={startIndex + itemsPerPage >= shlokas.length}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}
        <div className="h-12" />
      </div>
    </div>
  );
};

export default Page;