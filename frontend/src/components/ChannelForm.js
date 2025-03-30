import React, { useState } from 'react';
import { createChannel } from '../api/api';

const ChannelForm = ({ onChannelCreated }) => {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      const res = await createChannel(name); 
      onChannelCreated(res.data);
      setName('');
    } catch (err) {
      console.error('Error creating channel', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="channel-form">
      <input
        type="text"
        placeholder="New Channel Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="channel-input"
      />
      <button type="submit" className="channel-button">
        Create
      </button>
    </form>
  );
};

export default ChannelForm;
