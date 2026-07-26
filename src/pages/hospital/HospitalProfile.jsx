import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { LayoutDashboard, Building2, Search, PlusCircle, ListChecks, Save } from 'lucide-react';
import DashboardShell from '../../components/DashboardShell';
import Loader from '../../components/Loader';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/axios';

const navItems = [
  { to: '/hospital/dashboard', label: 'Overview', icon: LayoutDashboard },
  { to: '/hospital/profile', label: 'Hospital Profile', icon: Building2 },
  { to: '/hospital/search', label: 'Search Donors', icon: Search },
  { to: '/hospital/create-request', label: 'New Request', icon: PlusCircle },
  { to: '/hospital/requests', label: 'All Requests', icon: ListChecks },
];

const HospitalProfile = () => {
  const { updateUser } = useAuth();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get('/hospitals/profile')
      .then(({ data }) => setForm(data.hospital))
      .catch(() => toast.error('Could not load hospital profile.'))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { hospitalName, phone, hospitalAddress, city } = form;
      const { data } = await api.put('/hospitals/profile', { hospitalName, phone, hospitalAddress, city });
      setForm(data.hospital);
      updateUser(data.hospital);
      toast.success('Hospital profile updated successfully.');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not update profile.');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !form) {
    return (
      <DashboardShell navItems={navItems} title="Hospital Profile">
        <Loader full />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell navItems={navItems} title="Hospital Profile">
      <form onSubmit={handleSubmit} className="card max-w-3xl space-y-6 p-7">
        <div>
          <h3 className="font-display text-lg font-bold text-navy-900">Hospital Details</h3>
          <p className="mt-1 text-sm text-ink-500">This information is visible to donors when they view request contact details.</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="label-field">Hospital Name</label>
            <input name="hospitalName" value={form.hospitalName} onChange={handleChange} className="input-field" />
          </div>
          <div>
            <label className="label-field">Email Address</label>
            <input value={form.email} disabled className="input-field cursor-not-allowed bg-black/5 text-ink-500" />
          </div>
          <div>
            <label className="label-field">Phone Number</label>
            <input name="phone" value={form.phone} onChange={handleChange} className="input-field" />
          </div>
          <div>
            <label className="label-field">City</label>
            <input name="city" value={form.city} onChange={handleChange} className="input-field" />
          </div>
        </div>
        <div>
          <label className="label-field">Hospital Address</label>
          <input name="hospitalAddress" value={form.hospitalAddress} onChange={handleChange} className="input-field" />
        </div>

        <button type="submit" disabled={saving} className="btn-primary">
          {saving ? 'Saving…' : <>Save Changes <Save size={16} /></>}
        </button>
      </form>
    </DashboardShell>
  );
};

export default HospitalProfile;
