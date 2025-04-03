import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from '../api/api';
import ChannelList from '../components/ChannelList';
import { useAuth } from '../context/AuthContext'; // ✅ Add this
import '../styles/ChannelPage.css';

const ChannelPage = () => {
  const { id } = useParams();
  const { user } = useAuth(); // ✅ Use user context
  const [messages, setMessages] = useState([]);
  const [topic, setTopic] = useState('');
  const [data, setData] = useState('');
  const [screenshot, setScreenshot] = useState(null);
  const [allChannels, setAllChannels] = useState([]);

  useEffect(() => {
    fetchMessages();
    fetchAllChannels();
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

  const fetchAllChannels = async () => {
    try {
      const res = await axios.get('/channels');
      setAllChannels(res.data);
    } catch (err) {
      console.error('Error fetching channels', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('channelId', id);
    formData.append('topic', topic);
    formData.append('data', data);
    if (screenshot) formData.append('screenshot', screenshot);

    // ✅ Append user identity
    if (user) {
      formData.append('userId', user._id);
      formData.append('username', user.name);
    }

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
    <div className="channel-container">
      <h2 className="channel-title">Ask a Programming Question</h2>

      <form onSubmit={handleSubmit} className="channel-form">
        <input
          type="text"
          placeholder="Enter a brief topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="channel-input"
        />
        <textarea
          placeholder="Describe your issue or question..."
          value={data}
          onChange={(e) => setData(e.target.value)}
          className="channel-textarea"
        ></textarea>
        <input
          type="file"
          onChange={(e) => setScreenshot(e.target.files[0])}
          className="channel-file"
        />
        <button type="submit" className="channel-submit">Post Message</button>
      </form>

      <h3 className="channel-messages-title">Recent Questions</h3>
      {messages.length === 0 ? (
        <p className="channel-no-msg">No messages yet. Be the first to post!</p>
      ) : (
        <div className="channel-message-list">
          {messages.map((msg) => (
            <div key={msg._id} className="channel-message-card">
              <h4 className="channel-msg-title">{msg.topic}</h4>
              <p className="channel-msg-content">{msg.data}</p>
              {msg.screenshot && (
                <img
                  src={msg.screenshot}
                  alt="screenshot"
                  className="channel-img"
                />
              )}
              <div className="channel-message-footer">
                <p className="channel-msg-time">
                  Posted by {msg.username || 'Unknown'} at {new Date(msg.timestamp).toLocaleString()}
                </p>
                <Link to={`/thread/${msg._id}`} className="channel-msg-link">
                  View Thread →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      <h3 className="channel-messages-title">Explore Other Channels</h3>
      <ChannelList channels={allChannels} />
    </div>
  );
};

export default ChannelPage;
