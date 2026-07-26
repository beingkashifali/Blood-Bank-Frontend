import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/public/Home';
import About from './pages/public/About';
import Contact from './pages/public/Contact';
import Login from './pages/public/Login';
import Signup from './pages/public/Signup';
import NotFound from './pages/public/NotFound';

import DonorDashboard from './pages/donor/DonorDashboard';
import DonorProfile from './pages/donor/DonorProfile';
import DonorRequests from './pages/donor/DonorRequests';
import DonorHistory from './pages/donor/DonorHistory';

import HospitalDashboard from './pages/hospital/HospitalDashboard';
import HospitalProfile from './pages/hospital/HospitalProfile';
import SearchDonors from './pages/hospital/SearchDonors';
import CreateRequest from './pages/hospital/CreateRequest';
import ActiveRequests from './pages/hospital/ActiveRequests';

// Layout wrapper for public-facing marketing pages (nav + footer)
const PublicLayout = ({ children }) => (
  <div className="flex min-h-screen flex-col">
    <Navbar />
    <main className="flex-1">{children}</main>
    <Footer />
  </div>
);

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: {
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
            borderRadius: '12px',
            padding: '12px 16px',
          },
          success: { iconTheme: { primary: '#1E8E5A', secondary: '#fff' } },
          error: { iconTheme: { primary: '#C81E3A', secondary: '#fff' } },
        }}
      />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
        <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
        <Route path="/login" element={<PublicLayout><Login /></PublicLayout>} />
        <Route path="/signup" element={<PublicLayout><Signup /></PublicLayout>} />

        {/* Donor dashboard routes */}
        <Route path="/donor/dashboard" element={<ProtectedRoute role="donor"><DonorDashboard /></ProtectedRoute>} />
        <Route path="/donor/profile" element={<ProtectedRoute role="donor"><DonorProfile /></ProtectedRoute>} />
        <Route path="/donor/requests" element={<ProtectedRoute role="donor"><DonorRequests /></ProtectedRoute>} />
        <Route path="/donor/history" element={<ProtectedRoute role="donor"><DonorHistory /></ProtectedRoute>} />

        {/* Hospital dashboard routes */}
        <Route path="/hospital/dashboard" element={<ProtectedRoute role="hospital"><HospitalDashboard /></ProtectedRoute>} />
        <Route path="/hospital/profile" element={<ProtectedRoute role="hospital"><HospitalProfile /></ProtectedRoute>} />
        <Route path="/hospital/search" element={<ProtectedRoute role="hospital"><SearchDonors /></ProtectedRoute>} />
        <Route path="/hospital/create-request" element={<ProtectedRoute role="hospital"><CreateRequest /></ProtectedRoute>} />
        <Route path="/hospital/requests" element={<ProtectedRoute role="hospital"><ActiveRequests /></ProtectedRoute>} />

        <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
      </Routes>
    </>
  );
}

export default App;
