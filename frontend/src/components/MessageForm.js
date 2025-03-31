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
    <form onSubmit={handleSubmit} className="message-form-container">
      <h3 className="message-form-title">Ask a Question</h3>
      <input
        type="text"
        placeholder="Enter a clear, concise topic"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="message-form-input"
      />
      <textarea
        placeholder="Describe your problem or question..."
        value={data}
        onChange={(e) => setData(e.target.value)}
        className="message-form-textarea"
      ></textarea>
      <input
        type="file"
        onChange={(e) => setScreenshot(e.target.files[0])}
        className="message-form-file"
      />
      <button type="submit" className="message-form-button">
        Post Question
      </button>
    </form>
  );
};

export default MessageForm;
