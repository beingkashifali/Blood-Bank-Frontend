import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut } from 'lucide-react';
import Logo from './Logo';
import { useAuth } from '../context/AuthContext';

// Shared layout for Donor & Hospital dashboards — a persistent sidebar + top bar.
// `navItems` is an array of { to, label, icon: LucideIcon }
const DashboardShell = ({ navItems, title, children }) => {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const displayName = user?.role === 'hospital' ? user?.hospitalName : user?.fullName;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      <div className="px-6 py-6">
        <Logo />
      </div>
      <nav className="flex-1 space-y-1 px-3">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
                isActive ? 'bg-crimson-50 text-crimson-600' : 'text-ink-700 hover:bg-navy-50'
              }`
            }
          >
            <item.icon size={18} />
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="border-t border-black/5 px-6 py-5">
        <p className="truncate text-sm font-semibold text-ink-900">{displayName}</p>
        <p className="truncate text-xs text-ink-500">{user?.email}</p>
        <button
          onClick={handleLogout}
          className="mt-3 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-crimson-600 hover:bg-crimson-50"
        >
          <LogOut size={16} /> Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-linen-100">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-black/5 bg-linen-50 lg:block">
        <div className="sticky top-0 h-screen">
          <SidebarContent />
        </div>
      </aside>

      {/* Mobile sidebar */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-72 bg-linen-50 shadow-xl">
            <button className="absolute right-4 top-6 text-ink-700" onClick={() => setOpen(false)}>
              <X size={22} />
            </button>
            <SidebarContent />
          </div>
        </div>
      )}

      <div className="flex min-h-screen flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-black/5 bg-linen-50/90 px-5 py-4 backdrop-blur-md lg:px-8">
          <div className="flex items-center gap-3">
            <button className="text-ink-700 lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu">
              <Menu size={22} />
            </button>
            <h1 className="font-display text-lg font-bold text-navy-900 lg:text-xl">{title}</h1>
          </div>
          <Link to="/" className="hidden text-sm font-medium text-ink-500 hover:text-crimson-600 sm:block">
            ← Back to site
          </Link>
        </header>

        <main className="flex-1 px-5 py-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  );
};

export default DashboardShell;
