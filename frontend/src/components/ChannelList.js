import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ChannelList.css'; // Optional if you want modern styles

const ChannelList = ({ channels }) => {
  if (channels.length === 0) return <p>No channels yet.</p>;

  return (
    <div className="channel-list-container">
      {channels.map((ch) => (
        <Link key={ch._id} to={`/channel/${ch._id}`} className="channel-card">
          <h3 className="channel-name">#{ch.name}</h3>
        </Link>
      ))}
    </div>
  );
};

export default ChannelList;
