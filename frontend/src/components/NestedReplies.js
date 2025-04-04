import React, { useEffect, useState } from 'react';
import axios from '../api/api';
import RatingButtons from './RatingButtons';

const NestedReplies = ({ parentId }) => {
  const [replies, setReplies] = useState([]);
  const [data, setData] = useState('');

  const fetchReplies = async () => {
    try {
      const res = await axios.get('/alldata');
      const allReplies = res.data.replies;
      const filtered = allReplies.filter((r) => r.parentId === parentId);
      setReplies(filtered);
    } catch (err) {
      console.error('Error fetching nested replies', err);
    }
  };

  useEffect(() => {
    fetchReplies();
  }, [parentId]);

  const handleReply = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/replies', { parentId, data });
      setData('');
      fetchReplies();
    } catch (err) {
      console.error('Failed to post nested reply', err);
    }
  };

  return (
    <div className="nested-replies">
      {replies.map((reply) => (
        <div key={reply._id} className="nested-reply">
          <p>{reply.data}</p>
          <RatingButtons id={reply._id} type="replies" />
          <NestedReplies parentId={reply._id} />
        </div>
      ))}
      <form onSubmit={handleReply} className="nested-reply-form">
        <textarea
          value={data}
          onChange={(e) => setData(e.target.value)}
          placeholder="Reply to this reply..."
        ></textarea>
        <button type="submit">Reply</button>
      </form>
    </div>
  );
};

export default NestedReplies;