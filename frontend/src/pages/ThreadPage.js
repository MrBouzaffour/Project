import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/api';
import RatingButtons from '../components/RatingButtons';
import NestedReplies from '../components/NestedReplies';
import '../styles/ThreadPage.css';

const ThreadPage = () => {
  const { id } = useParams();
  const [message, setMessage] = useState(null);
  const [replies, setReplies] = useState([]);
  const [data, setData] = useState('');
  const [screenshot, setScreenshot] = useState(null);

  useEffect(() => {
    fetchThread();
  }, [id]);

  const fetchThread = async () => {
    try {
      const res = await axios.get('/alldata');
      const allMessages = res.data.messages;
      const allReplies = res.data.replies;
      const main = allMessages.find((m) => m._id === id);
      const related = allReplies.filter((r) => r.parentId === id);
      setMessage(main);
      setReplies(related);
    } catch (err) {
      console.error('Error fetching thread', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('parentId', id);
    formData.append('data', data);
    if (screenshot) formData.append('screenshot', screenshot);

    try {
      await axios.post('/replies', formData);
      setData('');
      setScreenshot(null);
      fetchThread();
    } catch (err) {
      console.error('Error posting reply', err);
    }
  };

  if (!message)
    return <p className="thread-loading">Loading thread...</p>;

  return (
    <div className="thread-container">
      <h2 className="thread-title">Discussion: {message.topic}</h2>
      <div className="thread-main-message">
        <p>{message.data}</p>
        {message.screenshot && <img src={message.screenshot} alt="screenshot" />}
        <RatingButtons targetId={message._id} targetType="message" />
        <p className="timestamp">Posted at {new Date(message.timestamp).toLocaleString()}</p>
      </div>

      <h3 className="thread-subtitle">Answers</h3>
      {replies.length === 0 ? (
        <p className="no-replies">No replies yet.</p>
      ) : (
        <ul className="replies-list">
          {replies.map((reply) => (
            <li key={reply._id} className="reply-item">
              <p>{reply.data}</p>
              {reply.screenshot && <img src={reply.screenshot} alt="screenshot" />}
              <RatingButtons targetId={reply._id} targetType="reply" />
              <p className="timestamp">{new Date(reply.timestamp).toLocaleString()}</p>
              <NestedReplies parentId={reply._id} />
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit} className="reply-form">
        <h4>Write Your Answer</h4>
        <textarea
          placeholder="Write a reply..."
          value={data}
          onChange={(e) => setData(e.target.value)}
        ></textarea>
        <input type="file" onChange={(e) => setScreenshot(e.target.files[0])} />
        <button type="submit">Submit Answer</button>
      </form>
    </div>
  );
};

export default ThreadPage;
