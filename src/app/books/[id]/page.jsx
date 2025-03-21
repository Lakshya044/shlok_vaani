"use client";
import Outer_Footer from "@/components/Outer_Footer";
import Outer_Navbar from "@/components/Outer_Navbar";
import { useParams } from "next/navigation";

const books = {
  1: { name: "Ramayana", shlokas: ["श्लोक 1", "श्लोक 2", "श्लोक 3"] },
  2: { name: "Mahabharata", shlokas: ["श्लोक 1", "श्लोक 2", "श्लोक 3"] },
  3: { name: "Bhagavad Gita", shlokas: ["श्लोक 1", "श्लोक 2", "श्लोक 3"] },
  4: { name: "Vedas", shlokas: ["श्लोक 1", "श्लोक 2", "श्लोक 3"] },
  5: { name: "Upanishads", shlokas: ["श्लोक 1", "श्लोक 2", "श्लोक 3"] },
};

const BookPage = () => {
  const { id } = useParams();
  const book = books[id] || { name: "Unknown Book", shlokas: [] };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
      <Outer_Navbar />

      <main className="flex-grow flex flex-col items-center px-6 py-24">
        <div className="max-w-2xl w-full text-center">
          {/* Book Title */}
          <h1 className="text-5xl font-extrabold text-yellow-400 drop-shadow-md tracking-wide">
            {book.name}
          </h1>
          <p className="text-lg text-yellow-300 mt-3 italic">
            Explore the sacred wisdom of {book.name}.
          </p>

          {/* Shlokas Section */}
          <div className="mt-8 w-full space-y-6">
            {book.shlokas.length > 0 ? (
              book.shlokas.map((shloka, index) => (
                <div
                  key={index}
                  className="p-6 bg-white bg-opacity-10 backdrop-blur-lg shadow-lg rounded-lg border border-yellow-500 transition-transform duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <p className="text-lg font-semibold text-white tracking-wide">
                    {shloka}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-300">No shlokas available.</p>
            )}
          </div>
        </div>
      </main>

      <Outer_Footer />
    </div>
  );
};

export default BookPage;
