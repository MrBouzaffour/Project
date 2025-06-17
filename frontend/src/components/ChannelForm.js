import React, { useState } from 'react';
import { createChannel } from '../api/api';
import '../styles/ChannelForm.css';

const ChannelForm = ({ onChannelCreated }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      const res = await createChannel({name, description }); 
      onChannelCreated(res.data);
      setName('');
      setDescription('');
    } catch (err) {
      console.error('Error creating channel', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="channel-form">
      <input
        type="text"
        placeholder="Channel name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="channel-input"
      />
      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="channel-textarea"
      />
      <button type="submit" className="channel-button">
        ➕ Create Channel
      </button>
    </form>
  );
};

export default ChannelForm;
