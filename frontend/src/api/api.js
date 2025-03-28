import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true,
});

export const loginUser = (email, password) =>
  instance.post('/login', { email, password });

export const registerUser = (name, email, password) =>
  instance.post('/register', { name, email, password });

export const fetchUserProfile = () =>
  instance.get('/profile');

export default instance;