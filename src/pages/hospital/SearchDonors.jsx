import { useState } from 'react';
import toast from 'react-hot-toast';
import { LayoutDashboard, Building2, Search, PlusCircle, ListChecks, Phone, MapPin, X } from 'lucide-react';
import DashboardShell from '../../components/DashboardShell';
import Loader from '../../components/Loader';
import { BloodGroupBadge, AvailabilityPill } from '../../components/Badges';
import api from '../../api/axios';

const navItems = [
  { to: '/hospital/dashboard', label: 'Overview', icon: LayoutDashboard },
  { to: '/hospital/profile', label: 'Hospital Profile', icon: Building2 },
  { to: '/hospital/search', label: 'Search Donors', icon: Search },
  { to: '/hospital/create-request', label: 'New Request', icon: PlusCircle },
  { to: '/hospital/requests', label: 'All Requests', icon: ListChecks },
];

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const SearchDonors = () => {
  const [filters, setFilters] = useState({ bloodGroup: '', city: '', area: '', availableOnly: false });
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters({ ...filters, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSearch = async (e) => {
    e?.preventDefault();
    setLoading(true);
    setSearched(true);
    try {
      const params = {};
      if (filters.bloodGroup) params.bloodGroup = filters.bloodGroup;
      if (filters.city) params.city = filters.city;
      if (filters.area) params.area = filters.area;
      if (filters.availableOnly) params.availableOnly = 'true';

      const { data } = await api.get('/donors/search', { params });
      setDonors(data.donors);
    } catch (error) {
      toast.error('Could not search donors. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardShell navItems={navItems} title="Search Donors">
      <form onSubmit={handleSearch} className="card mb-6 grid gap-4 p-6 sm:grid-cols-4">
        <div>
          <label className="label-field">Blood Group</label>
          <select name="bloodGroup" value={filters.bloodGroup} onChange={handleChange} className="input-field">
            <option value="">Any</option>
            {BLOOD_GROUPS.map((bg) => <option key={bg} value={bg}>{bg}</option>)}
          </select>
        </div>
        <div>
          <label className="label-field">City</label>
          <input name="city" value={filters.city} onChange={handleChange} className="input-field" placeholder="Lahore" />
        </div>
        <div>
          <label className="label-field">Area</label>
          <input name="area" value={filters.area} onChange={handleChange} className="input-field" placeholder="Gulberg" />
        </div>
        <div className="flex items-end gap-3">
          <button type="submit" className="btn-primary w-full !py-2.5">
            <Search size={16} /> Search
          </button>
        </div>
        <label className="flex items-center gap-2 text-sm text-ink-700 sm:col-span-4">
          <input type="checkbox" name="availableOnly" checked={filters.availableOnly} onChange={handleChange} className="h-4 w-4 rounded border-black/20 text-crimson-500 focus:ring-crimson-500/30" />
          Only show currently available donors
        </label>
      </form>

      {loading ? (
        <Loader full />
      ) : !searched ? (
        <div className="card p-14 text-center text-sm text-ink-500">
          Use the filters above to search registered donors by blood group, city, and area.
        </div>
      ) : donors.length === 0 ? (
        <div className="card p-14 text-center text-sm text-ink-500">
          No donors matched your filters. Try broadening the search.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {donors.map((d) => (
            <button key={d._id} onClick={() => setSelected(d)} className="card p-5 text-left transition-shadow hover:shadow-md">
              <div className="flex items-center justify-between">
                <BloodGroupBadge group={d.bloodGroup} />
                <AvailabilityPill available={d.isAvailable} />
              </div>
              <p className="mt-3 font-display font-semibold text-navy-900">{d.fullName}</p>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-500">
                <MapPin size={14} /> {d.area}, {d.city}
              </p>
            </button>
          ))}
        </div>
      )}

      {/* Donor detail modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-5" onClick={() => setSelected(null)}>
          <div className="card w-full max-w-sm p-7" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between">
              <BloodGroupBadge group={selected.bloodGroup} size="lg" />
              <button onClick={() => setSelected(null)} className="text-ink-500"><X size={20} /></button>
            </div>
            <h3 className="mt-4 font-display text-xl font-bold text-navy-900">{selected.fullName}</h3>
            <div className="mt-1"><AvailabilityPill available={selected.isAvailable} /></div>
            <div className="mt-5 space-y-3 text-sm text-ink-700">
              <p className="flex items-center gap-2"><MapPin size={15} className="text-ink-500" /> {selected.area}, {selected.city}</p>
              <p>Gender: {selected.gender} · Age: {selected.age}</p>
            </div>
            <a href={`tel:${selected.phone}`} className="btn-primary mt-6 w-full">
              <Phone size={16} /> Call {selected.phone}
            </a>
          </div>
        </div>
      )}
    </DashboardShell>
  );
};

export default SearchDonors;
