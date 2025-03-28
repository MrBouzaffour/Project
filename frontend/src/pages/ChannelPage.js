import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/api';

const ChannelPage = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [topic, setTopic] = useState('');
  const [data, setData] = useState('');
  const [screenshot, setScreenshot] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, [id]);

  const fetchMessages = async () => {
    try {
      const res = await axios.get('/alldata');
      const channelMessages = res.data.messages.filter(msg => msg.channelId === id);
      setMessages(channelMessages);
    } catch (err) {
      console.error('Error fetching messages', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('channelId', id);
    formData.append('topic', topic);
    formData.append('data', data);
    if (screenshot) formData.append('screenshot', screenshot);

    try {
      await axios.post('/messages', formData);
      setTopic('');
      setData('');
      setScreenshot(null);
      fetchMessages();
    } catch (err) {
      console.error('Error posting message', err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Channel Messages</h2>
      <form onSubmit={handleSubmit} className="space-y-3 mb-6">
        <input type="text" placeholder="Topic" value={topic} onChange={e => setTopic(e.target.value)} className="w-full p-2 border rounded" />
        <textarea placeholder="Message content" value={data} onChange={e => setData(e.target.value)} className="w-full p-2 border rounded"></textarea>
        <input type="file" onChange={e => setScreenshot(e.target.files[0])} className="w-full" />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Post Message</button>
      </form>

      {messages.length === 0 ? (
        <p>No messages yet.</p>
      ) : (
        <ul className="space-y-4">
          {messages.map(msg => (
            <li key={msg._id} className="border p-3 rounded shadow">
              <h3 className="font-semibold">{msg.topic}</h3>
              <p>{msg.data}</p>
              {msg.screenshot && <img src={msg.screenshot} alt="screenshot" className="mt-2 max-w-xs" />}
              <p className="text-sm text-gray-500">{new Date(msg.timestamp).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChannelPage;
