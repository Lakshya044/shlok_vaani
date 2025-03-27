"use client";
import { useRouter } from "next/navigation";
import books from "../../../public/data/booksConstant";
const Book = ({ bookNumber }) => {
  const router = useRouter();
  const book = books[bookNumber] || { name: "Unknown Book", image: "https://via.placeholder.com/200" };

  return (
    <div className="relative flex flex-col items-center p-6 bg-white/10 backdrop-blur-md shadow-lg rounded-2xl border border-gray-600 transition-transform duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
      onClick={() => router.push(`books/${bookNumber}`)}
    >
      {/* Book Image */}
      <img src={book.image} alt={book.name} className="w-32 h-32 object-cover rounded-lg shadow-md" />

      {/* Book Details */}
      <h2 className="mt-4 text-xl font-bold text-yellow-300">{book.name}</h2>
      <p className="text-sm text-gray-300 mt-1 text-center px-4">
        Discover the wisdom of {book.name}.
      </p>

      {/* Read Now Button */}
      <button className="mt-4 px-6 py-2 text-black font-semibold bg-yellow-400 rounded-lg shadow-md transition-all duration-200 ease-in-out hover:bg-yellow-500 hover:scale-105">
        Read Now 📖
      </button>
    </div>
  );
};

export default Book;
