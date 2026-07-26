import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { LayoutDashboard, User, Bell, History, Droplet, Calendar, Building2 } from 'lucide-react';
import DashboardShell from '../../components/DashboardShell';
import Loader from '../../components/Loader';

const navItems = [
  { to: '/donor/dashboard', label: 'Overview', icon: LayoutDashboard },
  { to: '/donor/profile', label: 'My Profile', icon: User },
  { to: '/donor/requests', label: 'Emergency Requests', icon: Bell },
  { to: '/donor/history', label: 'Donation History', icon: History },
];

import api from '../../api/axios';

const DonorHistory = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/donors/history')
      .then(({ data }) => setData(data))
      .catch(() => toast.error('Could not load donation history.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <DashboardShell navItems={navItems} title="Donation History">
        <Loader full />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell navItems={navItems} title="Donation History">
      <div className="mb-6 grid gap-5 sm:grid-cols-2">
        <div className="card p-6">
          <Droplet className="text-crimson-500" size={22} />
          <p className="mt-3 font-mono text-2xl font-bold text-navy-900">{data?.totalDonations || 0}</p>
          <p className="text-sm text-ink-500">Total Donations Recorded</p>
        </div>
        <div className="card p-6">
          <Calendar className="text-crimson-500" size={22} />
          <p className="mt-3 font-mono text-2xl font-bold text-navy-900">
            {data?.lastDonationDate ? new Date(data.lastDonationDate).toLocaleDateString() : '—'}
          </p>
          <p className="text-sm text-ink-500">Last Donation Date</p>
        </div>
      </div>

      {!data?.donationHistory || data.donationHistory.length === 0 ? (
        <div className="card p-14 text-center">
          <History className="mx-auto text-ink-500/40" size={36} />
          <p className="mt-4 font-display font-semibold text-navy-900">No donations recorded yet</p>
          <p className="mt-1 text-sm text-ink-500">Your donation history will appear here once you've helped fulfill a request.</p>
        </div>
      ) : (
        <div className="card divide-y divide-black/5">
          {data.donationHistory.map((h, i) => (
            <div key={i} className="flex flex-col gap-2 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-crimson-50 text-crimson-500">
                  <Building2 size={17} />
                </div>
                <div>
                  <p className="font-semibold text-navy-900">{h.hospitalName || 'RLKMU Hospital'}</p>
                  <p className="text-xs text-ink-500">{h.location || '—'}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-ink-500">
                <span>{h.unitsdonated} unit(s)</span>
                <span>{new Date(h.date).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardShell>
  );
};

export default DonorHistory;
