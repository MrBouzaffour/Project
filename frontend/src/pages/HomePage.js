import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { fetchChannels } from '../api/api';
import ChannelForm from '../components/ChannelForm';
import ChannelList from '../components/ChannelList';
import '../styles/HomePage.css';

const HomePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      loadChannels();
    }
  }, [user, navigate]);

  const loadChannels = async () => {
    try {
      const res = await fetchChannels();
      setChannels(res.data);
    } catch (err) {
      console.error('Failed to fetch channels', err);
    }
  };

  const handleNewChannel = (channel) => {
    setChannels((prev) => [...prev, channel]);
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className="home-title">Welcome to Your Programming Hub</h1>
        <p className="home-subtitle">Create channels, ask questions, and help others!</p>
      </header>

      <section className="home-form-section">
        <h2 className="section-heading">Create a New Channel</h2>
        <ChannelForm onChannelCreated={handleNewChannel} />
      </section>

      <section className="home-channels-section">
        <h2 className="section-heading">Explore Channels</h2>
        <ChannelList channels={channels} />
      </section>
    </div>
  );
};

export default HomePage;
