import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// Auth
export const loginUser = async (email, password) => {
  const response = await API.post('/auth/login', { email, password });
  return response.data;
};

export const registerUser = (name, email, password) =>
  API.post('/auth/register', { name, email, password });

// Profile
export const fetchUserProfile = (token) =>
  API.get('/auth/profile', {
    headers: { Authorization: `Bearer ${token}` },
  });

// Channels
export const fetchChannels = () => API.get('/channels');
export const createChannel = (name) => API.post('/channels', { name });

// Messages / Replies
export const postMessage = (formData) => API.post('/messages', formData);
export const postReply = (formData) => API.post('/replies', formData);

// Optional helper: includes user data
export const postMessageWithUser = (formData, user) => {
  if (user) {
    formData.append('userId', user._id);
    formData.append('username', user.name);
  }
  return postMessage(formData);
};

// All Data
export const fetchAllData = () => API.get('/alldata');

// Search & Analytics
export const searchContent = (query) =>
  API.get(`/explore/search?q=${encodeURIComponent(query)}`);

export const fetchAnalytics = () => API.get('/explore/analytics');

export const getMyPosts = (userId) => API.get(`/messages/user/${userId}`);
export const updateMessage = (id, data) => API.put(`/messages/${id}`, { data });
export const deleteMessage = (id) => API.delete(`/messages/${id}`);

export default API;
