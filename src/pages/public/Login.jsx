import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Eye, EyeOff, LogIn, Droplet } from 'lucide-react';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', form);
      login(data.token, data.user);
      toast.success(`Welcome back, ${data.user.role === 'hospital' ? data.user.hospitalName : data.user.fullName}!`);
      navigate(data.user.role === 'hospital' ? '/hospital/dashboard' : '/donor/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-72px)] items-center justify-center bg-linen-50 px-5 py-14">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-crimson-500 text-white">
            <Droplet size={22} />
          </div>
          <h1 className="mt-4 font-display text-3xl font-bold text-navy-900">Welcome back</h1>
          <p className="mt-2 text-sm text-ink-500">Log in to your donor or hospital account.</p>
        </div>

        <form onSubmit={handleSubmit} className="card space-y-5 p-7">
          <div>
            <label className="label-field" htmlFor="email">Email Address</label>
            <input id="email" type="email" name="email" required value={form.email} onChange={handleChange} className="input-field" placeholder="you@example.com" />
          </div>
          <div>
            <label className="label-field" htmlFor="password">Password</label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                required
                value={form.password}
                onChange={handleChange}
                className="input-field pr-11"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-500"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? 'Logging in…' : <>Log In <LogIn size={17} /></>}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-ink-500">
          Don't have an account?{' '}
          <Link to="/signup" className="font-semibold text-crimson-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
