import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Droplet, Building2, UserPlus } from 'lucide-react';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const initialDonorForm = {
  fullName: '', email: '', password: '', phone: '', cnic: '',
  bloodGroup: '', gender: '', age: '', city: '', area: '', address: '',
};
const initialHospitalForm = {
  hospitalName: '', email: '', password: '', phone: '', hospitalAddress: '', city: '',
};

const Signup = () => {
  const [role, setRole] = useState('donor');
  const [donorForm, setDonorForm] = useState(initialDonorForm);
  const [hospitalForm, setHospitalForm] = useState(initialHospitalForm);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleDonorChange = (e) => setDonorForm({ ...donorForm, [e.target.name]: e.target.value });
  const handleHospitalChange = (e) => setHospitalForm({ ...hospitalForm, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (role === 'donor') {
        const { data } = await api.post('/auth/signup/donor', { ...donorForm, age: Number(donorForm.age) });
        login(data.token, data.user);
        toast.success('Welcome to Blood Bridge! Your donor profile is ready.');
        navigate('/donor/dashboard');
      } else {
        const { data } = await api.post('/auth/signup/hospital', hospitalForm);
        login(data.token, data.user);
        toast.success('Hospital account created successfully.');
        navigate('/hospital/dashboard');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Signup failed. Please check your details and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-72px)] items-center justify-center bg-linen-50 px-5 py-14">
      <div className="w-full max-w-2xl">
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-crimson-500 text-white">
            <UserPlus size={22} />
          </div>
          <h1 className="mt-4 font-display text-3xl font-bold text-navy-900">Create your account</h1>
          <p className="mt-2 text-sm text-ink-500">Join Blood Bridge as a donor or a partner hospital.</p>
        </div>

        {/* Role tabs */}
        <div className="mx-auto mb-6 flex max-w-sm rounded-full bg-black/5 p-1">
          <button
            type="button"
            onClick={() => setRole('donor')}
            className={`flex flex-1 items-center justify-center gap-2 rounded-full py-2.5 text-sm font-semibold transition-colors ${
              role === 'donor' ? 'bg-white text-crimson-600 shadow-sm' : 'text-ink-500'
            }`}
          >
            <Droplet size={16} /> Donor
          </button>
          <button
            type="button"
            onClick={() => setRole('hospital')}
            className={`flex flex-1 items-center justify-center gap-2 rounded-full py-2.5 text-sm font-semibold transition-colors ${
              role === 'hospital' ? 'bg-white text-navy-800 shadow-sm' : 'text-ink-500'
            }`}
          >
            <Building2 size={16} /> Hospital
          </button>
        </div>

        <form onSubmit={handleSubmit} className="card space-y-5 p-7">
          {role === 'donor' ? (
            <>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="label-field">Full Name</label>
                  <input name="fullName" required value={donorForm.fullName} onChange={handleDonorChange} className="input-field" placeholder="Ali Hassan" />
                </div>
                <div>
                  <label className="label-field">Email Address</label>
                  <input type="email" name="email" required value={donorForm.email} onChange={handleDonorChange} className="input-field" placeholder="you@example.com" />
                </div>
                <div>
                  <label className="label-field">Password</label>
                  <input type="password" name="password" required minLength={6} value={donorForm.password} onChange={handleDonorChange} className="input-field" placeholder="At least 6 characters" />
                </div>
                <div>
                  <label className="label-field">Phone Number</label>
                  <input name="phone" required value={donorForm.phone} onChange={handleDonorChange} className="input-field" placeholder="03XX-XXXXXXX" />
                </div>
                <div>
                  <label className="label-field">CNIC</label>
                  <input name="cnic" required value={donorForm.cnic} onChange={handleDonorChange} className="input-field" placeholder="XXXXX-XXXXXXX-X" />
                </div>
                <div>
                  <label className="label-field">Blood Group</label>
                  <select name="bloodGroup" required value={donorForm.bloodGroup} onChange={handleDonorChange} className="input-field">
                    <option value="">Select blood group</option>
                    {BLOOD_GROUPS.map((bg) => <option key={bg} value={bg}>{bg}</option>)}
                  </select>
                </div>
                <div>
                  <label className="label-field">Gender</label>
                  <select name="gender" required value={donorForm.gender} onChange={handleDonorChange} className="input-field">
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="label-field">Age</label>
                  <input type="number" name="age" required min={17} max={65} value={donorForm.age} onChange={handleDonorChange} className="input-field" placeholder="25" />
                </div>
                <div>
                  <label className="label-field">City</label>
                  <input name="city" required value={donorForm.city} onChange={handleDonorChange} className="input-field" placeholder="Lahore" />
                </div>
                <div>
                  <label className="label-field">Area</label>
                  <input name="area" required value={donorForm.area} onChange={handleDonorChange} className="input-field" placeholder="Gulberg" />
                </div>
              </div>
              <div>
                <label className="label-field">Address</label>
                <input name="address" required value={donorForm.address} onChange={handleDonorChange} className="input-field" placeholder="House #, Street, Block" />
              </div>
            </>
          ) : (
            <>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="label-field">Hospital Name</label>
                  <input name="hospitalName" required value={hospitalForm.hospitalName} onChange={handleHospitalChange} className="input-field" placeholder="RLKMU Hospital" />
                </div>
                <div>
                  <label className="label-field">Email Address</label>
                  <input type="email" name="email" required value={hospitalForm.email} onChange={handleHospitalChange} className="input-field" placeholder="admin@hospital.pk" />
                </div>
                <div>
                  <label className="label-field">Password</label>
                  <input type="password" name="password" required minLength={6} value={hospitalForm.password} onChange={handleHospitalChange} className="input-field" placeholder="At least 6 characters" />
                </div>
                <div>
                  <label className="label-field">Phone Number</label>
                  <input name="phone" required value={hospitalForm.phone} onChange={handleHospitalChange} className="input-field" placeholder="042-XXXXXXXX" />
                </div>
                <div>
                  <label className="label-field">City</label>
                  <input name="city" value={hospitalForm.city} onChange={handleHospitalChange} className="input-field" placeholder="Lahore" />
                </div>
              </div>
              <div>
                <label className="label-field">Hospital Address</label>
                <input name="hospitalAddress" required value={hospitalForm.hospitalAddress} onChange={handleHospitalChange} className="input-field" placeholder="37-K, Block B1, Phase 1, Sector M-3" />
              </div>
            </>
          )}

          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? 'Creating account…' : 'Create Account'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-ink-500">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-crimson-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
