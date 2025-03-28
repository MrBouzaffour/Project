// === File: src/pages/ThreadPage.jsx ===
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/api';

const ThreadPage = () => {
  const { id } = useParams(); // This is the parent message ID
  const [message, setMessage] = useState(null);
  const [replies, setReplies] = useState([]);
  const [data, setData] = useState('');
  const [screenshot, setScreenshot] = useState(null);

  useEffect(() => {
    fetchThread();
  }, [id]);

  const fetchThread = async () => {
    try {
      const res = await axios.get('/alldata');
      const allMessages = res.data.messages;
      const allReplies = res.data.replies;
      const main = allMessages.find(m => m._id === id);
      const related = allReplies.filter(r => r.parentId === id);
      setMessage(main);
      setReplies(related);
    } catch (err) {
      console.error('Error fetching thread', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('parentId', id);
    formData.append('data', data);
    if (screenshot) formData.append('screenshot', screenshot);

    try {
      await axios.post('/replies', formData);
      setData('');
      setScreenshot(null);
      fetchThread();
    } catch (err) {
      console.error('Error posting reply', err);
    }
  };

  if (!message) return <p className="p-4">Loading thread...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Topic: {message.topic}</h2>
      <p>{message.data}</p>
      {message.screenshot && <img src={message.screenshot} alt="screenshot" className="my-2 max-w-xs" />}
      <p className="text-sm text-gray-500">Posted at {new Date(message.timestamp).toLocaleString()}</p>

      <hr className="my-4" />

      <h3 className="text-lg font-semibold mb-2">Replies</h3>
      {replies.length === 0 ? (
        <p>No replies yet.</p>
      ) : (
        <ul className="space-y-4">
          {replies.map(reply => (
            <li key={reply._id} className="border p-3 rounded">
              <p>{reply.data}</p>
              {reply.screenshot && <img src={reply.screenshot} alt="screenshot" className="mt-2 max-w-xs" />}
              <p className="text-sm text-gray-500">{new Date(reply.timestamp).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-3">
        <textarea
          placeholder="Write a reply..."
          value={data}
          onChange={(e) => setData(e.target.value)}
          className="w-full p-2 border rounded"
        ></textarea>
        <input type="file" onChange={e => setScreenshot(e.target.files[0])} className="w-full" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Reply
        </button>
      </form>
    </div>
  );
};

export default ThreadPage;