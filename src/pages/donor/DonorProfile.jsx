import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { LayoutDashboard, User, Bell, History, Save } from 'lucide-react';
import DashboardShell from '../../components/DashboardShell';
import Loader from '../../components/Loader';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/axios';

const navItems = [
  { to: '/donor/dashboard', label: 'Overview', icon: LayoutDashboard },
  { to: '/donor/profile', label: 'My Profile', icon: User },
  { to: '/donor/requests', label: 'Emergency Requests', icon: Bell },
  { to: '/donor/history', label: 'Donation History', icon: History },
];

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const DonorProfile = () => {
  const { updateUser } = useAuth();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get('/donors/profile')
      .then(({ data }) => setForm(data.donor))
      .catch(() => toast.error('Could not load your profile.'))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { fullName, phone, bloodGroup, gender, age, city, area, address } = form;
      const { data } = await api.put('/donors/profile', { fullName, phone, bloodGroup, gender, age, city, area, address });
      setForm(data.donor);
      updateUser(data.donor);
      toast.success('Profile updated successfully.');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not update profile.');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !form) {
    return (
      <DashboardShell navItems={navItems} title="My Profile">
        <Loader full />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell navItems={navItems} title="My Profile">
      <form onSubmit={handleSubmit} className="card max-w-3xl space-y-6 p-7">
        <div>
          <h3 className="font-display text-lg font-bold text-navy-900">Personal Details</h3>
          <p className="mt-1 text-sm text-ink-500">Keep your details accurate so hospitals can reach you when it matters.</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="label-field">Full Name</label>
            <input name="fullName" value={form.fullName} onChange={handleChange} className="input-field" />
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
            <label className="label-field">CNIC</label>
            <input value={form.cnic} disabled className="input-field cursor-not-allowed bg-black/5 text-ink-500" />
          </div>
          <div>
            <label className="label-field">Blood Group</label>
            <select name="bloodGroup" value={form.bloodGroup} onChange={handleChange} className="input-field">
              {BLOOD_GROUPS.map((bg) => <option key={bg} value={bg}>{bg}</option>)}
            </select>
          </div>
          <div>
            <label className="label-field">Gender</label>
            <select name="gender" value={form.gender} onChange={handleChange} className="input-field">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="label-field">Age</label>
            <input type="number" name="age" min={17} max={65} value={form.age} onChange={handleChange} className="input-field" />
          </div>
          <div>
            <label className="label-field">City</label>
            <input name="city" value={form.city} onChange={handleChange} className="input-field" />
          </div>
          <div>
            <label className="label-field">Area</label>
            <input name="area" value={form.area} onChange={handleChange} className="input-field" />
          </div>
        </div>
        <div>
          <label className="label-field">Address</label>
          <input name="address" value={form.address} onChange={handleChange} className="input-field" />
        </div>

        <button type="submit" disabled={saving} className="btn-primary">
          {saving ? 'Saving…' : <>Save Changes <Save size={16} /></>}
        </button>
      </form>
    </DashboardShell>
  );
};

export default DonorProfile;
