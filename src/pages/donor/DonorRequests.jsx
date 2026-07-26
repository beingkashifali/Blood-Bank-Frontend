import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { LayoutDashboard, User, Bell, History, Phone, Building2 } from 'lucide-react';
import DashboardShell from '../../components/DashboardShell';
import Loader from '../../components/Loader';
import { BloodGroupBadge, UrgencyPill } from '../../components/Badges';
import api from '../../api/axios';

const navItems = [
  { to: '/donor/dashboard', label: 'Overview', icon: LayoutDashboard },
  { to: '/donor/profile', label: 'My Profile', icon: User },
  { to: '/donor/requests', label: 'Emergency Requests', icon: Bell },
  { to: '/donor/history', label: 'Donation History', icon: History },
];

const DonorRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/donors/requests')
      .then(({ data }) => setRequests(data.requests))
      .catch(() => toast.error('Could not load emergency requests.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <DashboardShell navItems={navItems} title="Emergency Requests">
      {loading ? (
        <Loader full />
      ) : requests.length === 0 ? (
        <div className="card p-14 text-center">
          <Bell className="mx-auto text-ink-500/40" size={36} />
          <p className="mt-4 font-display font-semibold text-navy-900">No active requests right now</p>
          <p className="mt-1 text-sm text-ink-500">We'll show new emergency requests here as soon as hospitals post them.</p>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {requests.map((r) => (
            <div key={r._id} className="card p-6">
              <div className="flex items-start justify-between">
                <BloodGroupBadge group={r.bloodGroup} />
                <UrgencyPill level={r.urgencyLevel} />
              </div>
              <p className="mt-4 font-display text-lg font-bold text-navy-900">{r.patientName}</p>
              <div className="mt-2 flex items-center gap-1.5 text-sm text-ink-500">
                <Building2 size={14} /> {r.hospitalName}
              </div>
              <p className="mt-3 text-sm text-ink-700">
                <span className="font-semibold text-crimson-600">{r.unitsRequired}</span> unit(s) required
              </p>
              {r.additionalNotes && (
                <p className="mt-2 rounded-lg bg-linen-100 px-3 py-2 text-xs text-ink-500">{r.additionalNotes}</p>
              )}
              <a
                href={`tel:${r.contactNumber}`}
                className="mt-4 flex items-center justify-center gap-2 rounded-full bg-navy-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-800"
              >
                <Phone size={15} /> {r.contactNumber}
              </a>
            </div>
          ))}
        </div>
      )}
    </DashboardShell>
  );
};

export default DonorRequests;
