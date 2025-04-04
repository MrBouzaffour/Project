import React, { useEffect, useState } from 'react';
import { voteOnContent } from '../api/api'; 
import '../styles/RatingButtons.css';

const RatingButtons = ({ targetId, targetType }) => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [voted, setVoted] = useState(null); // Prevent spam votes

  const handleVote = async (voteType) => {
    if (voted) return;

    try {
      await voteOnContent(targetType, targetId, voteType);
      voteType === 'like'
        ? setLikes((prev) => prev + 1)
        : setDislikes((prev) => prev + 1);
      setVoted(voteType);
    } catch (err) {
      console.error(`Failed to ${voteType}`, err);
    }
  };

  return (
    <div className="rating-buttons">
      <button
        onClick={() => handleVote('like')}
        className={`rating-btn like ${voted === 'like' ? 'active' : ''}`}
      >
        👍 {likes}
      </button>
      <button
        onClick={() => handleVote('dislike')}
        className={`rating-btn dislike ${voted === 'dislike' ? 'active' : ''}`}
      >
        👎 {dislikes}
      </button>
    </div>
  );
};

export default RatingButtons;
