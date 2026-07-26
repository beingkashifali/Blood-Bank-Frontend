import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { LayoutDashboard, Building2, Search, PlusCircle, ListChecks, CheckCircle2, XCircle } from 'lucide-react';
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

const FILTERS = ['All', 'Active', 'Fulfilled', 'Closed'];

const ActiveRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [updatingId, setUpdatingId] = useState(null);

  const fetchRequests = () => {
    setLoading(true);
    api.get('/requests/mine')
      .then(({ data }) => setRequests(data.requests))
      .catch(() => toast.error('Could not load requests.'))
      .finally(() => setLoading(false));
  };

  useEffect(fetchRequests, []);

  const updateStatus = async (id, status) => {
    setUpdatingId(id);
    try {
      await api.put(`/requests/${id}/status`, { status });
      toast.success(`Request marked as ${status}.`);
      fetchRequests();
    } catch (error) {
      toast.error('Could not update request status.');
    } finally {
      setUpdatingId(null);
    }
  };

  const filtered = filter === 'All' ? requests : requests.filter((r) => r.status === filter);

  return (
    <DashboardShell navItems={navItems} title="All Requests">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-2 rounded-full bg-black/5 p-1">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                filter === f ? 'bg-white text-crimson-600 shadow-sm' : 'text-ink-500'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <Link to="/hospital/create-request" className="btn-primary !py-2.5 text-sm">
          + New Request
        </Link>
      </div>

      {loading ? (
        <Loader full />
      ) : filtered.length === 0 ? (
        <div className="card p-14 text-center text-sm text-ink-500">No requests found for this filter.</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((r) => (
            <div key={r._id} className="card p-6">
              <div className="flex items-center justify-between">
                <BloodGroupBadge group={r.bloodGroup} />
                <StatusPill status={r.status} />
              </div>
              <p className="mt-3 font-display text-lg font-bold text-navy-900">{r.patientName}</p>
              <div className="mt-1"><UrgencyPill level={r.urgencyLevel} /></div>
              <p className="mt-3 text-sm text-ink-700">{r.unitsRequired} unit(s) · {new Date(r.createdAt).toLocaleDateString()}</p>
              {r.additionalNotes && <p className="mt-2 rounded-lg bg-linen-100 px-3 py-2 text-xs text-ink-500">{r.additionalNotes}</p>}

              {r.status === 'Active' && (
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => updateStatus(r._id, 'Fulfilled')}
                    disabled={updatingId === r._id}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-mint-500 px-3 py-2 text-xs font-semibold text-white disabled:opacity-60"
                  >
                    <CheckCircle2 size={14} /> Fulfilled
                  </button>
                  <button
                    onClick={() => updateStatus(r._id, 'Closed')}
                    disabled={updatingId === r._id}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-black/5 px-3 py-2 text-xs font-semibold text-ink-700 disabled:opacity-60"
                  >
                    <XCircle size={14} /> Close
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </DashboardShell>
  );
};

export default ActiveRequests;
