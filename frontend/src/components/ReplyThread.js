import React, { useEffect, useState } from 'react';
import axios from '../api/api';

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
    <div className="reply-thread">
      <form onSubmit={handleSubmit} className="reply-form">
        <textarea
          value={data}
          onChange={(e) => setData(e.target.value)}
          placeholder="Write a reply..."
          className="textarea"
        />
        <input
          type="file"
          onChange={(e) => setScreenshot(e.target.files[0])}
          className="file"
        />
        <button
          type="submit"
          className="btn-submit"
        >
          Reply
        </button>
      </form>

      <div className="reply-list">
        {replies.map(reply => (
          <div key={reply._id} className="reply-item">
            <p>{reply.data}</p>
            {reply.screenshot && (
              <img
                src={reply.screenshot}
                alt="Reply Screenshot"
                className="reply-img"
              />
            )}
            <p className="timestamp">
              {new Date(reply.timestamp).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReplyThread;
