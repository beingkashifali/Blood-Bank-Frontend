import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../api/axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On first load, rehydrate the session from localStorage + verify with the API
  useEffect(() => {
    const token = localStorage.getItem('bloodbridge_token');
    const storedUser = localStorage.getItem('bloodbridge_user');

    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
      api
        .get('/auth/me')
        .then(({ data }) => {
          setUser(data.user);
          localStorage.setItem('bloodbridge_user', JSON.stringify(data.user));
        })
        .catch(() => {
          localStorage.removeItem('bloodbridge_token');
          localStorage.removeItem('bloodbridge_user');
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = useCallback((token, userData) => {
    localStorage.setItem('bloodbridge_token', token);
    localStorage.setItem('bloodbridge_user', JSON.stringify(userData));
    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('bloodbridge_token');
    localStorage.removeItem('bloodbridge_user');
    setUser(null);
  }, []);

  const updateUser = useCallback((userData) => {
    setUser(userData);
    localStorage.setItem('bloodbridge_user', JSON.stringify(userData));
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};
