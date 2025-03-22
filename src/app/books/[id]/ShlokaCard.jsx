import React, { useEffect, useState } from 'react';

const ShlokaCard = ({ uid }) => {
  const [shlokaData, setShlokaData] = useState(null);

  useEffect(() => {
    const fetchShlokaInfo = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/fetch/info/${uid}`);
        const { bookData } = await response.json();
        setShlokaData(bookData);
      } catch (error) {
        console.error('Error fetching shloka info:', error);
      }
    };

    fetchShlokaInfo();
  }, [uid]);

  if (!shlokaData) return <p>Loading...</p>;

  return (
    <div className="border p-4 rounded-lg shadow-lg mb-4">
      <h2 className="text-xl font-semibold">Scripture: {shlokaData.scripture}</h2>
      <p>Book No: {shlokaData.bookNo}</p>
      <p>Chapter No: {shlokaData.chapterNo}</p>
      <p>Shloka No: {shlokaData.shlokaNo}</p>
      <p className="mt-2">{shlokaData.text}</p>
      <p>Likes: {shlokaData.likes.length}</p>
      <p>Comments: {shlokaData.commentCount}</p>
    </div>
  );
};

export default ShlokaCard;


// import React from 'react'

// const shlokacard = () => {
//   return (
//     <div>shlokacard</div>
//   )
// }

// export default shlokacard