import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ChannelList.css';

const ChannelList = ({ channels }) => {
  if (channels.length === 0) {
    return <p className="no-channels">No channels yet. Create one to get started!</p>;
  }

  return (
    <div className="channel-list-container">
      {channels.map((ch) => (
        <Link key={ch._id} to={`/channel/${ch._id}`} className="channel-card">
          <h3 className="channel-name">#{ch.name}</h3>
          <p className="channel-description">Discuss coding topics, ask questions, and get answers.</p>
        </Link>
      ))}
    </div>
  );
};

export default ChannelList;
