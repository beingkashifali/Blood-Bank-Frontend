import { Link } from 'react-router-dom';
import { Droplet } from 'lucide-react';

const NotFound = () => (
  <div className="flex min-h-[calc(100vh-72px)] flex-col items-center justify-center px-5 text-center">
    <Droplet className="text-crimson-300" size={40} />
    <h1 className="mt-4 font-display text-5xl font-extrabold text-navy-900">404</h1>
    <p className="mt-3 text-ink-500">This page couldn't be found. Let's get you back on track.</p>
    <Link to="/" className="btn-primary mt-6">Back to Home</Link>
  </div>
);

export default NotFound;
