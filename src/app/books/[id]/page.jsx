"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ShlokaCard from "./ShlokaCard";
import { FaSpinner } from "react-icons/fa";
import BASE_URL from "../../../../src/lib/constant";
import booksData from "../../../../public/data/booksConstant";

const Page = () => {
  const [shlokas, setShlokas] = useState([]);
  const [books, setBooks] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [currentBook, setCurrentBook] = useState(1);
  const [currentChapter, setCurrentChapter] = useState(1);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const { id } = useParams();

  const bookSlug = booksData[id] ? booksData[id].slug : "Mahabharata";
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const bookResponse = await fetch(`${BASE_URL}/fetch/books/${bookSlug}`);
        if (bookResponse.ok) {
          const data = await bookResponse.json();
          setBooks(data.BookNumber);
          setCurrentBook(data.BookNumber[0].bookNo);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, []);

  useEffect(() => {
    const fetchChapters = async () => {
      if (!currentBook) return;
      try {
        const chapterResponse = await fetch(
          `${BASE_URL}/fetch/chapters/${bookSlug}/${currentBook}`
        );
        if (chapterResponse.ok) {
          const data = await chapterResponse.json();
          setChapters(data.chapterNumber);
          setCurrentChapter(data.chapterNumber[0].chapterNo);
        }
      } catch (error) {
        console.error("Error fetching chapters:", error);
      }
    };
    fetchChapters();
  }, [currentBook]);

  const fetchShlokas = async () => {
    if (!id || !currentBook || !currentChapter) return;
    try {
      setLoading(true);
      const shlokaResponse = await fetch(
        `${BASE_URL}/fetch/shlokas/${bookSlug}/${currentBook}/${currentChapter}`
      );
      if (!shlokaResponse.ok) {
        throw new Error("Failed to fetch shlokas");
      }
      const data = await shlokaResponse.json();
      setShlokas(data?.shlokas || []);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error fetching shlokas:", error);
    } finally {
      setLoading(false);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedShlokas = shlokas.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      <div className="p-2 space-y-6 pt-24 min-h-screen text-base-content">
        <h1 className="text-3xl font-bold text-center text-yellow-300">
          Shlokas
        </h1>
        <div className="flex justify-center">
          <label htmlFor="book-select">Select Book: </label>
          <select
            id="book-select"
            onChange={(e) => setCurrentBook(Number(e.target.value))}
            value={currentBook || 1}
            className="px-4 py-2 rounded-md"
          >
            {books.map((book) => (
              <option key={book.bookNo} value={book.bookNo}>
                Book {book.bookNo}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-center">
          <label htmlFor="chapter-select">Select Chapter: </label>
          <select
            id="chapter-select"
            onChange={(e) => setCurrentChapter(Number(e.target.value))}
            value={currentChapter || 1}
            className="px-4 py-2 rounded-md"
          >
            {chapters.map((chapter) => (
              <option key={chapter.chapterNo} value={chapter.chapterNo}>
                Chapter {chapter.chapterNo}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-center">
          <button className="btn btn-secondary " onClick={fetchShlokas}>
            Show the Shlokas
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center">
            <FaSpinner className="animate-spin text-blue-500 text-3xl" />
          </div>
        ) : (
          <>
            {displayedShlokas.map((shloka) => (
              <ShlokaCard key={shloka._id} uid={shloka._id} />
            ))}
            <div className="flex justify-between mt-4 bottom-0">
              <button
                className="btn btn-primary"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous Page
              </button>
              <button
                className="btn btn-primary"
                onClick={() =>
                  setCurrentPage((prev) =>
                    startIndex + itemsPerPage < shlokas.length ? prev + 1 : prev
                  )
                }
                disabled={startIndex + itemsPerPage >= shlokas.length}
              >
                Next Page
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Page;
