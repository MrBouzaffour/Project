import React, { useEffect, useState } from 'react';
import { voteOnContent } from '../api/api';
import '../styles/RatingButtons.css';
import { useAuth } from '../context/AuthContext'; // ✅ Import this

const RatingButtons = ({
  targetId,
  targetType,
  initialLikes = 0,
  initialDislikes = 0,
  userVotes = {}
}) => {
  const { user } = useAuth(); // ✅ Grab logged-in user
  const [likes, setLikes] = useState(initialLikes);
  const [dislikes, setDislikes] = useState(initialDislikes);
  const [voted, setVoted] = useState(user ? userVotes[user._id] : null); // ✅

  const handleVote = async (voteType) => {
    if (!user || voted) return;

    try {
      await voteOnContent(targetType, targetId, voteType, user._id); // ✅ Pass user._id
      voteType === 'like' ? setLikes((prev) => prev + 1) : setDislikes((prev) => prev + 1);
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
        disabled={!!voted}
      >
        👍 {likes}
      </button>
      <button
        onClick={() => handleVote('dislike')}
        className={`rating-btn dislike ${voted === 'dislike' ? 'active' : ''}`}
        disabled={!!voted}
      >
        👎 {dislikes}
      </button>
    </div>
  );
};

export default RatingButtons;
