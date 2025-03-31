import React, { useEffect, useState } from 'react';
import axios from '../api/api';
import '../styles/ReplyThread.css';

const ReplyThread = ({ parentId }) => {
  const [replies, setReplies] = useState([]);
  const [data, setData] = useState('');
  const [screenshot, setScreenshot] = useState(null);

  const fetchReplies = async () => {
    try {
      const res = await axios.get('/alldata');
      const filtered = res.data.replies.filter(r => r.parentId === parentId);
      setReplies(filtered);
    } catch (err) {
      console.error('Failed to fetch replies', err);
    }
  };

  useEffect(() => {
    fetchReplies();
  }, [parentId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('parentId', parentId);
    formData.append('data', data);
    if (screenshot) formData.append('screenshot', screenshot);

    try {
      await axios.post('/replies', formData);
      setData('');
      setScreenshot(null);
      fetchReplies();
    } catch (err) {
      console.error('Failed to post reply', err);
    }
  };

  return (
    <div className="reply-thread-container">
      <form onSubmit={handleSubmit} className="reply-form-box">
        <h4 className="reply-title">Add Your Response</h4>
        <textarea
          value={data}
          onChange={(e) => setData(e.target.value)}
          placeholder="Share your thoughts, explanations, or code snippet..."
          className="reply-textarea"
        />
        <input
          type="file"
          onChange={(e) => setScreenshot(e.target.files[0])}
          className="reply-file"
        />
        <button type="submit" className="reply-button">
          Submit Reply
        </button>
      </form>

      <div className="reply-list-section">
        <h5 className="reply-list-heading">Responses</h5>
        {replies.length === 0 ? (
          <p className="no-replies">No replies yet. Be the first to respond!</p>
        ) : (
          replies.map(reply => (
            <div key={reply._id} className="reply-card">
              <p className="reply-text">{reply.data}</p>
              {reply.screenshot && (
                <img
                  src={reply.screenshot}
                  alt="Reply Screenshot"
                  className="reply-screenshot"
                />
              )}
              <p className="reply-timestamp">
                {new Date(reply.timestamp).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReplyThread;
