import React, { useState } from 'react';
import axios from '../api/api';

const ChannelForm = ({ onChannelCreated }) => {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      const res = await axios.post('/channels', { name });
      onChannelCreated(res.data);
      setName('');
    } catch (err) {
      console.error('Error creating channel', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        placeholder="New Channel Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="px-3 py-2 border rounded mr-2"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Create
      </button>
    </form>
  );
};

export default ChannelForm;