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
    <div className="mt-6 ml-6">
      <form onSubmit={handleSubmit} className="space-y-3">
        <textarea
          value={data}
          onChange={(e) => setData(e.target.value)}
          placeholder="Write a reply..."
          className="w-full p-2 border rounded"
        />
        <input
          type="file"
          onChange={(e) => setScreenshot(e.target.files[0])}
          className="w-full"
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Reply
        </button>
      </form>

      <div className="mt-4 space-y-3">
        {replies.map(reply => (
          <div key={reply._id} className="p-3 border rounded bg-gray-50">
            <p>{reply.data}</p>
            {reply.screenshot && (
              <img
                src={reply.screenshot}
                alt="Reply Screenshot"
                className="mt-2 max-w-xs"
              />
            )}
            <p className="text-sm text-gray-500">
              {new Date(reply.timestamp).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReplyThread;
