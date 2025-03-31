import React, { useState } from 'react';
import { searchContent } from '../api/api';
import '../styles/SearchPage.css';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    try {
      const res = await searchContent(query);
      setResults(res.data);
    } catch (err) {
      console.error('Search failed', err);
    }
  };

  return (
    <div className="search-container">
      <h1 className="search-title">Search Programming Content</h1>

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Try 'arrow function', 'react', etc."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {results && (
        <div className="search-results">
          {/* === Messages === */}
          <div>
            <h2 className="result-section-title">📨 Messages</h2>
            {results.messages.length === 0 ? (
              <p className="text-gray-500">No messages found.</p>
            ) : (
              <ul>
                {results.messages.map((msg) => (
                  <li key={msg._id} className="result-card">
                    <h3 className="result-topic">{msg.topic}</h3>
                    <p className="result-content">{msg.data}</p>
                    <p className="result-timestamp">
                      Posted: {new Date(msg.timestamp).toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* === Replies === */}
          <div>
            <h2 className="result-section-title">💬 Replies</h2>
            {results.replies.length === 0 ? (
              <p className="text-gray-500">No replies found.</p>
            ) : (
              <ul>
                {results.replies.map((rep) => (
                  <li key={rep._id} className="result-card reply">
                    <p className="result-content">{rep.data}</p>
                    <p className="result-timestamp">
                      Replied: {new Date(rep.timestamp).toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
