import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, LayoutDashboard, LogOut } from 'lucide-react';
import Logo from './Logo';
import { useAuth } from '../context/AuthContext';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const dashboardPath = user?.role === 'hospital' ? '/hospital/dashboard' : '/donor/dashboard';

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate('/');
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        scrolled ? 'border-black/5 bg-linen-50/90 backdrop-blur-md shadow-sm' : 'border-transparent bg-linen-50/60 backdrop-blur-sm'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <Logo />

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 font-medium text-sm transition-colors ${
                  isActive ? 'text-crimson-600' : 'text-ink-700 hover:text-crimson-600'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <Link to={dashboardPath} className="btn-ghost gap-2">
                <LayoutDashboard size={17} /> Dashboard
              </Link>
              <button onClick={handleLogout} className="btn-secondary gap-2 !px-5 !py-2.5 text-sm">
                <LogOut size={16} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-ghost">
                Log In
              </Link>
              <Link to="/signup" className="btn-primary !px-5 !py-2.5 text-sm">
                Become a Donor
              </Link>
            </>
          )}
        </div>

        <button
          className="rounded-lg p-2 text-navy-900 md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-black/5 bg-linen-50 px-5 pb-6 pt-2 md:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 font-medium text-ink-700 hover:bg-navy-50"
              >
                {link.label}
              </NavLink>
            ))}
            <div className="mt-3 flex flex-col gap-2 border-t border-black/5 pt-3">
              {user ? (
                <>
                  <Link to={dashboardPath} onClick={() => setOpen(false)} className="btn-primary">
                    Dashboard
                  </Link>
                  <button onClick={handleLogout} className="btn-secondary">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setOpen(false)} className="btn-secondary">
                    Log In
                  </Link>
                  <Link to="/signup" onClick={() => setOpen(false)} className="btn-primary">
                    Become a Donor
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
