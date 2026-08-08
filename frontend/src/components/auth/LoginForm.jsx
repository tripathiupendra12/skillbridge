import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../../services/authService';
import { useAuth } from '../../context/AuthContext';

export default function LoginForm() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await loginUser(form);
      login(data);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-8 max-w-sm w-full mx-auto shadow-sm">
      <h2 className="text-xl font-semibold mb-1 text-center">Welcome back</h2>
      <p className="text-sm text-gray-500 text-center mb-6">Log in to continue</p>
      {error && <p className="text-red-600 text-sm mb-4 text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input name="email" type="email" placeholder="name@company.com" value={form.email} onChange={handleChange} required className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black" />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black" />
        <button type="submit" disabled={loading} className="bg-black text-white rounded-md py-2 text-sm mt-2 disabled:opacity-50">
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <p className="text-sm text-gray-500 text-center mt-4">
        No account? <Link to="/signup" className="text-black font-medium">Sign up</Link>
      </p>
    </div>
  );
}