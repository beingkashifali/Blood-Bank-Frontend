import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { LayoutDashboard, Building2, Search, PlusCircle, ListChecks, Siren } from 'lucide-react';
import DashboardShell from '../../components/DashboardShell';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/axios';

const navItems = [
  { to: '/hospital/dashboard', label: 'Overview', icon: LayoutDashboard },
  { to: '/hospital/profile', label: 'Hospital Profile', icon: Building2 },
  { to: '/hospital/search', label: 'Search Donors', icon: Search },
  { to: '/hospital/create-request', label: 'New Request', icon: PlusCircle },
  { to: '/hospital/requests', label: 'All Requests', icon: ListChecks },
];

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const URGENCY_LEVELS = ['Low', 'Medium', 'High', 'Critical'];

const initialForm = {
  patientName: '', bloodGroup: '', unitsRequired: '', hospitalName: '',
  contactNumber: '', urgencyLevel: 'Medium', additionalNotes: '',
};

const CreateRequest = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ ...initialForm, hospitalName: user?.hospitalName || '', contactNumber: user?.phone || '' });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post('/requests', { ...form, unitsRequired: Number(form.unitsRequired) });
      toast.success('Emergency request created and sent to matching donors.');
      navigate('/hospital/requests');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not create request.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <DashboardShell navItems={navItems} title="New Emergency Request">
      <div className="mb-6 flex items-center gap-3 rounded-2xl border border-crimson-100 bg-crimson-50 px-5 py-4 text-sm text-crimson-700">
        <Siren size={18} className="shrink-0" />
        Submitting this request makes it instantly visible on the dashboards of available matching donors.
      </div>

      <form onSubmit={handleSubmit} className="card max-w-2xl space-y-5 p-7">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="label-field">Patient Name</label>
            <input name="patientName" required value={form.patientName} onChange={handleChange} className="input-field" placeholder="Patient's full name" />
          </div>
          <div>
            <label className="label-field">Blood Group Required</label>
            <select name="bloodGroup" required value={form.bloodGroup} onChange={handleChange} className="input-field">
              <option value="">Select blood group</option>
              {BLOOD_GROUPS.map((bg) => <option key={bg} value={bg}>{bg}</option>)}
            </select>
          </div>
          <div>
            <label className="label-field">Units Required</label>
            <input type="number" name="unitsRequired" required min={1} value={form.unitsRequired} onChange={handleChange} className="input-field" placeholder="e.g. 2" />
          </div>
          <div>
            <label className="label-field">Urgency Level</label>
            <select name="urgencyLevel" required value={form.urgencyLevel} onChange={handleChange} className="input-field">
              {URGENCY_LEVELS.map((u) => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
          <div>
            <label className="label-field">Hospital Name</label>
            <input name="hospitalName" required value={form.hospitalName} onChange={handleChange} className="input-field" />
          </div>
          <div>
            <label className="label-field">Contact Number</label>
            <input name="contactNumber" required value={form.contactNumber} onChange={handleChange} className="input-field" placeholder="042-XXXXXXXX" />
          </div>
        </div>
        <div>
          <label className="label-field">Additional Notes</label>
          <textarea name="additionalNotes" rows={4} value={form.additionalNotes} onChange={handleChange} className="input-field resize-none" placeholder="Ward, doctor's name, special instructions…" />
        </div>

        <button type="submit" disabled={submitting} className="btn-primary w-full sm:w-auto">
          {submitting ? 'Submitting…' : <>Submit Request <Siren size={16} /></>}
        </button>
      </form>
    </DashboardShell>
  );
};

export default CreateRequest;
