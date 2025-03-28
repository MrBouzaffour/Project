import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from '../api/api';
import ChannelForm from '../components/ChannelForm';
import ChannelList from '../components/ChannelList';

const HomePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      fetchChannels();
    }
  }, [user]);

  const fetchChannels = async () => {
    try {
      const res = await axios.get('/channels');
      setChannels(res.data);
    } catch (err) {
      console.error('Failed to fetch channels', err);
    }
  };

  const handleNewChannel = (channel) => {
    setChannels((prev) => [...prev, channel]);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Channels</h2>
      <ChannelForm onChannelCreated={handleNewChannel} />
      <ChannelList channels={channels} />
    </div>
  );
};

export default HomePage;
