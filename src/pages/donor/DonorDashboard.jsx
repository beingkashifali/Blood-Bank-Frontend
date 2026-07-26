import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { LayoutDashboard, User, Bell, History, Droplet, MapPin, Heart, ArrowRight } from 'lucide-react';
import DashboardShell from '../../components/DashboardShell';
import Loader from '../../components/Loader';
import { BloodGroupBadge, AvailabilityPill, UrgencyPill } from '../../components/Badges';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/axios';

const navItems = [
  { to: '/donor/dashboard', label: 'Overview', icon: LayoutDashboard },
  { to: '/donor/profile', label: 'My Profile', icon: User },
  { to: '/donor/requests', label: 'Emergency Requests', icon: Bell },
  { to: '/donor/history', label: 'Donation History', icon: History },
];

const DonorDashboard = () => {
  const { user, updateUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState(false);

  const fetchData = async () => {
    try {
      const [profileRes, requestsRes] = await Promise.all([
        api.get('/donors/profile'),
        api.get('/donors/requests'),
      ]);
      setProfile(profileRes.data.donor);
      setRequests(requestsRes.data.requests.slice(0, 3));
    } catch (error) {
      toast.error('Could not load your dashboard. Please refresh.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleAvailability = async () => {
    setToggling(true);
    try {
      const { data } = await api.put('/donors/availability', { isAvailable: !profile.isAvailable });
      setProfile(data.donor);
      updateUser({ ...user, isAvailable: data.donor.isAvailable });
      toast.success(data.message);
    } catch (error) {
      toast.error('Could not update availability.');
    } finally {
      setToggling(false);
    }
  };

  if (loading) {
    return (
      <DashboardShell navItems={navItems} title="Donor Dashboard">
        <Loader full />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell navItems={navItems} title="Donor Dashboard">
      {/* Welcome + availability card */}
      <div className="card flex flex-col items-start justify-between gap-6 bg-gradient-to-br from-navy-900 to-navy-700 p-7 text-white sm:flex-row sm:items-center">
        <div className="flex items-center gap-4">
          <BloodGroupBadge group={profile?.bloodGroup} size="lg" />
          <div>
            <h2 className="font-display text-xl font-bold sm:text-2xl">Welcome, {profile?.fullName?.split(' ')[0]}</h2>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-navy-100">
              <MapPin size={14} /> {profile?.area}, {profile?.city}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-start gap-2 sm:items-end">
          <AvailabilityPill available={profile?.isAvailable} />
          <button
            onClick={toggleAvailability}
            disabled={toggling}
            className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-navy-900 transition-transform hover:scale-[1.02] disabled:opacity-60"
          >
            {toggling ? 'Updating…' : profile?.isAvailable ? 'Mark as Unavailable' : 'Mark as Available'}
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-6 grid gap-5 sm:grid-cols-3">
        <div className="card p-6">
          <Droplet className="text-crimson-500" size={22} />
          <p className="mt-3 font-mono text-2xl font-bold text-navy-900">{profile?.totalDonations || 0}</p>
          <p className="text-sm text-ink-500">Total Donations</p>
        </div>
        <div className="card p-6">
          <Heart className="text-crimson-500" size={22} />
          <p className="mt-3 font-mono text-2xl font-bold text-navy-900">{profile?.bloodGroup}</p>
          <p className="text-sm text-ink-500">Your Blood Group</p>
        </div>
        <div className="card p-6">
          <Bell className="text-crimson-500" size={22} />
          <p className="mt-3 font-mono text-2xl font-bold text-navy-900">{requests.length}</p>
          <p className="text-sm text-ink-500">Active Requests Nearby</p>
        </div>
      </div>

      {/* Recent requests */}
      <div className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-lg font-bold text-navy-900">Latest Emergency Requests</h3>
          <Link to="/donor/requests" className="flex items-center gap-1 text-sm font-semibold text-crimson-600">
            View all <ArrowRight size={14} />
          </Link>
        </div>

        {requests.length === 0 ? (
          <div className="card p-10 text-center text-sm text-ink-500">
            No active emergency requests right now. We'll notify you here the moment one is posted.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {requests.map((r) => (
              <div key={r._id} className="card p-5">
                <div className="flex items-center justify-between">
                  <BloodGroupBadge group={r.bloodGroup} size="sm" />
                  <UrgencyPill level={r.urgencyLevel} />
                </div>
                <p className="mt-3 font-display font-semibold text-navy-900">{r.patientName}</p>
                <p className="text-sm text-ink-500">{r.hospitalName} · {r.unitsRequired} units needed</p>
                <p className="mt-2 text-xs text-ink-500">Contact: {r.contactNumber}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardShell>
  );
};

export default DonorDashboard;
