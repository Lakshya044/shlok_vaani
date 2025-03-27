"use client";
import React, { useEffect } from "react";
import Book from "./Book";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoggedInWebPage() {
  const bookNumbers = [1, 2, 3, 4, 5];
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect unauthenticated users after the component renders
  
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  // Show a loading state while checking session
  if (status === "loading") {
    return (
      <div className="h-screen flex justify-center items-center text-2xl font-bold text-yellow-400">
        🔄 Checking Authentication...
      </div>
    );
  }

  if (!session) return null; 

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="flex-1 container mx-auto px-6 py-24">
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
    </div>
  );
}
