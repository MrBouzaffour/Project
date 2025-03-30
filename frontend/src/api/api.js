import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// Auth
export const loginUser = async (email, password) => {
  const response = await API.post('/auth/login', { email, password });
  return response.data; // <-- this returns token & user correctly
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

// Messages / Replies (using FormData for file uploads)
export const postMessage = (formData) => API.post('/messages', formData);
export const postReply = (formData) => API.post('/replies', formData);

// All Data (optional fallback)
export const fetchAllData = () => API.get('/alldata');

export default API;
