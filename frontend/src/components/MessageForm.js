import React, { useState } from 'react';
import axios from '../api/api';

const MessageForm = ({ channelId, onMessageSent }) => {
  const [topic, setTopic] = useState('');
  const [data, setData] = useState('');
  const [screenshot, setScreenshot] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('channelId', channelId);
    formData.append('topic', topic);
    formData.append('data', data);
    if (screenshot) formData.append('screenshot', screenshot);

    try {
      await axios.post('/messages', formData);
      setTopic('');
      setData('');
      setScreenshot(null);
      onMessageSent();
    } catch (err) {
      console.error('Error sending message', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 mb-4">
      <input
        type="text"
        placeholder="Topic"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <textarea
        placeholder="Message..."
        value={data}
        onChange={(e) => setData(e.target.value)}
        className="w-full p-2 border rounded"
      ></textarea>
      <input type="file" onChange={(e) => setScreenshot(e.target.files[0])} className="w-full" />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Post</button>
    </form>
  );
};

export default MessageForm;