import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loader from './Loader';

// Wraps a page/route that requires authentication, and optionally a specific role
const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useAuth();

  if (loading) return <Loader full label="Verifying session" />;

  if (!user) return <Navigate to="/login" replace />;

  if (role && user.role !== role) {
    const fallback = user.role === 'hospital' ? '/hospital/dashboard' : '/donor/dashboard';
    return <Navigate to={fallback} replace />;
  }

  return children;
};

export default ProtectedRoute;
