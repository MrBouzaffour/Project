import { useEffect, useState } from 'react';
import { loginUser } from '../api/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const { user, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    try {
      const data = await loginUser(email, password);
      login(data.token, data.user);
    } catch (err) {
      const errMsg = err.response?.data?.error || 'Login failed.';
      setMessage({ type: 'error', text: errMsg });
    }
  };

  return (
    <AuthForm title="Welcome Back" subtitle="Log in to post and answer programming questions" onSubmit={handleSubmit}>
      {message && (
        <div className={`alert ${message.type}`}>{message.text}</div>
      )}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </AuthForm>
  );
}
