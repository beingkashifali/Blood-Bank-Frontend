import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Share2, MessageCircle, AtSign } from 'lucide-react';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="border-t border-black/5 bg-navy-900 text-navy-100">
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <Logo dark />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-navy-200">
              A donor management platform built for Rashid Latif Khan Medical University Hospital —
              connecting willing donors with patients who need them, fast.
            </p>
            <div className="mt-5 flex gap-3">
              {[Share2, MessageCircle, AtSign].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-crimson-500"
                  aria-label="social link"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wide text-white">Navigate</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-navy-200">
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              <li><Link to="/about" className="hover:text-white">About Blood Bridge</Link></li>
              <li><Link to="/contact" className="hover:text-white">Contact Us</Link></li>
              <li><Link to="/signup" className="hover:text-white">Become a Donor</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wide text-white">For</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-navy-200">
              <li><Link to="/signup" className="hover:text-white">Donors</Link></li>
              <li><Link to="/signup" className="hover:text-white">Hospitals</Link></li>
              <li><Link to="/login" className="hover:text-white">Login</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wide text-white">RLKMU Hospital</h4>
            <ul className="mt-4 space-y-3 text-sm text-navy-200">
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="mt-0.5 shrink-0 text-crimson-400" />
                <span>37-K, Block B1, Phase 1, Sector M-3, Lahore, Pakistan</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={16} className="shrink-0 text-crimson-400" />
                <span>+92 42 3560 3800</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={16} className="shrink-0 text-crimson-400" />
                <span>bloodbridge@rlkmu.edu.pk</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-navy-300 sm:flex-row">
          <p>© {new Date().getFullYear()} Blood Bridge — Rashid Latif Khan Medical University. All rights reserved.</p>
          <p>Built as a university software engineering project.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
