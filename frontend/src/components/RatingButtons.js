import React, { useState } from 'react';

const RatingButtons = () => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  return (
    <div className="flex space-x-4 items-center mt-2">
      <button
        onClick={() => setLikes((l) => l + 1)}
        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
      >
        👍 {likes}
      </button>
      <button
        onClick={() => setDislikes((d) => d + 1)}
        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
      >
        👎 {dislikes}
      </button>
    </div>
  );
};

export default RatingButtons;
