import React, { useState } from 'react';

const RatingButtons = () => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  return (
    <div className="rating-buttons">
      <button onClick={() => setLikes((l) => l + 1)} className="like-button">
        👍 {likes}
      </button>
      <button onClick={() => setDislikes((d) => d + 1)} className="dislike-button">
        👎 {dislikes}
      </button>
    </div>
  );
};

export default RatingButtons;