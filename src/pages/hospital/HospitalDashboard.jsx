import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { LayoutDashboard, Building2, Search, PlusCircle, ListChecks, ArrowRight, Siren, Users } from 'lucide-react';
import DashboardShell from '../../components/DashboardShell';
import Loader from '../../components/Loader';
import { BloodGroupBadge, UrgencyPill, StatusPill } from '../../components/Badges';
import api from '../../api/axios';

const navItems = [
  { to: '/hospital/dashboard', label: 'Overview', icon: LayoutDashboard },
  { to: '/hospital/profile', label: 'Hospital Profile', icon: Building2 },
  { to: '/hospital/search', label: 'Search Donors', icon: Search },
  { to: '/hospital/create-request', label: 'New Request', icon: PlusCircle },
  { to: '/hospital/requests', label: 'All Requests', icon: ListChecks },
];

const HospitalDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.get('/hospitals/profile'), api.get('/requests/mine')])
      .then(([profileRes, requestsRes]) => {
        setProfile(profileRes.data.hospital);
        setRequests(requestsRes.data.requests);
      })
      .catch(() => toast.error('Could not load your dashboard.'))
      .finally(() => setLoading(false));
  }, []);

  const activeCount = requests.filter((r) => r.status === 'Active').length;
  const criticalCount = requests.filter((r) => r.urgencyLevel === 'Critical' && r.status === 'Active').length;

  if (loading) {
    return (
      <DashboardShell navItems={navItems} title="Hospital Dashboard">
        <Loader full />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell navItems={navItems} title="Hospital Dashboard">
      <div className="card flex flex-col items-start justify-between gap-6 bg-gradient-to-br from-crimson-600 to-crimson-500 p-7 text-white sm:flex-row sm:items-center">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15">
            <Building2 size={26} />
          </div>
          <div>
            <h2 className="font-display text-xl font-bold sm:text-2xl">{profile?.hospitalName}</h2>
            <p className="mt-1 text-sm text-crimson-50">{profile?.hospitalAddress}</p>
          </div>
        </div>
        <Link to="/hospital/create-request" className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-crimson-600 transition-transform hover:scale-[1.02]">
          + New Emergency Request
        </Link>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-3">
        <div className="card p-6">
          <ListChecks className="text-navy-800" size={22} />
          <p className="mt-3 font-mono text-2xl font-bold text-navy-900">{requests.length}</p>
          <p className="text-sm text-ink-500">Total Requests Raised</p>
        </div>
        <div className="card p-6">
          <Siren className="text-crimson-500" size={22} />
          <p className="mt-3 font-mono text-2xl font-bold text-navy-900">{activeCount}</p>
          <p className="text-sm text-ink-500">Active Requests</p>
        </div>
        <div className="card p-6">
          <Users className="text-crimson-500" size={22} />
          <p className="mt-3 font-mono text-2xl font-bold text-navy-900">{criticalCount}</p>
          <p className="text-sm text-ink-500">Critical & Active</p>
        </div>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <Link to="/hospital/search" className="card group flex items-center justify-between p-6 transition-shadow hover:shadow-md">
          <div>
            <Search className="text-navy-800" size={22} />
            <p className="mt-3 font-display font-semibold text-navy-900">Search Donors</p>
            <p className="mt-1 text-sm text-ink-500">Filter by blood group, city, and area.</p>
          </div>
          <ArrowRight className="text-ink-500 transition-transform group-hover:translate-x-1" size={18} />
        </Link>
        <Link to="/hospital/create-request" className="card group flex items-center justify-between p-6 transition-shadow hover:shadow-md">
          <div>
            <PlusCircle className="text-crimson-500" size={22} />
            <p className="mt-3 font-display font-semibold text-navy-900">Create Emergency Request</p>
            <p className="mt-1 text-sm text-ink-500">Broadcast a request to matching donors instantly.</p>
          </div>
          <ArrowRight className="text-ink-500 transition-transform group-hover:translate-x-1" size={18} />
        </Link>
      </div>

      <div className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-lg font-bold text-navy-900">Recent Requests</h3>
          <Link to="/hospital/requests" className="flex items-center gap-1 text-sm font-semibold text-crimson-600">
            View all <ArrowRight size={14} />
          </Link>
        </div>
        {requests.length === 0 ? (
          <div className="card p-10 text-center text-sm text-ink-500">
            You haven't raised any emergency requests yet.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {requests.slice(0, 3).map((r) => (
              <div key={r._id} className="card p-5">
                <div className="flex items-center justify-between">
                  <BloodGroupBadge group={r.bloodGroup} size="sm" />
                  <StatusPill status={r.status} />
                </div>
                <p className="mt-3 font-display font-semibold text-navy-900">{r.patientName}</p>
                <div className="mt-1"><UrgencyPill level={r.urgencyLevel} /></div>
                <p className="mt-2 text-xs text-ink-500">{r.unitsRequired} units · {new Date(r.createdAt).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardShell>
  );
};

export default HospitalDashboard;
