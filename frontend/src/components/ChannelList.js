import React from 'react';
import { Link } from 'react-router-dom';

const ChannelList = ({ channels }) => {
  if (channels.length === 0) return <p>No channels yet.</p>;

  return (
    <ul className="space-y-2">
      {channels.map((ch) => (
        <li key={ch._id}>
          <Link to={`/channel/${ch._id}`} className="text-blue-500 hover:underline">
            #{ch.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default ChannelList;