// MyPostsPage.jsx (Update)
import React, { useEffect, useState } from 'react';
import { getMyPosts, updateMessage, deleteMessage } from '../api/api';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import RatingButtons from '../components/RatingButtons';
import '../styles/MyPostsPage.css';

const MyPostsPage = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [editedData, setEditedData] = useState('');

  useEffect(() => {
    if (user?._id) {
      fetchMyPosts();
    }
    else{console.log("test1");
    }
  }, [user]);

  const fetchMyPosts = async () => {
    try {
      console.log(user._id);
      
      const res = await getMyPosts(user._id);
      setPosts(res.data);
    } catch (err) {
      console.error('Failed to fetch posts', err);
    }
  };
  

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      await deleteMessage(id);
      fetchMyPosts();
    } catch (err) {
      console.error('Failed to delete post', err);
    }
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setEditedData(post.data);
  };

  const handleUpdate = async () => {
    try {
      await updateMessage(editingPost._id, editedData);
      setEditingPost(null);
      setEditedData('');
      fetchMyPosts();
    } catch (err) {
      console.error('Failed to update post', err);
    }
  };

  return (
    <div className="myposts-wrapper">
      <h1 className="myposts-title">My Profile</h1>

      <div className="user-info-card">
        <h2 className="user-name">{user?.name}</h2>
        <p className="user-email">{user?.email}</p>
      </div>

      <h2 className="section-title">My Posts</h2>
      {posts.length === 0 ? (
        <p className="empty-posts-msg">You haven't posted anything yet.</p>
      ) : (
        <ul className="posts-list">
          {posts.map((post) => (
            <li key={post._id} className="post-card">
              <h3 className="post-topic">{post.topic}</h3>
              {editingPost?._id === post._id ? (
                <>
                  <textarea
                    className="post-edit-input"
                    value={editedData}
                    onChange={(e) => setEditedData(e.target.value)}
                  />
                  <div className="post-actions">
                    <button onClick={handleUpdate} className="btn-save">Save</button>
                    <button onClick={() => setEditingPost(null)} className="btn-cancel">Cancel</button>
                  </div>
                </>
              ) : (
                <>
                  <p className="post-content">{post.data}</p>
                  <RatingButtons
                    targetId={post._id}
                    targetType="message"
                    initialLikes={post.likes || 0}
                    initialDislikes={post.dislikes || 0}
                    userVotes={post.userVotes || {}}
                    currentUserId={user._id}
                  />
                  <div className="post-footer">
                    <span className="post-time">{new Date(post.timestamp).toLocaleString()}</span>
                    <div className="post-controls">
                      <Link to={`/thread/${post._id}`} className="link-view">View Thread</Link>
                      <button onClick={() => handleEdit(post)} className="pill-button edit">✏️ Edit</button>
                      <button onClick={() => handleDelete(post._id)} className="pill-button delete">🗑️ Delete</button>
                    </div>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyPostsPage;