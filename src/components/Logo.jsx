import { Link } from 'react-router-dom';

const Logo = ({ dark = false }) => (
  <Link to="/" className="flex items-center gap-2.5 group">
    <svg width="34" height="34" viewBox="0 0 32 32" className="shrink-0">
      <rect width="32" height="32" rx="9" fill={dark ? '#ffffff' : '#0B3C6B'} />
      <path
        d="M16 6C16 6 8 15 8 20.5C8 25.19 11.58 28 16 28C20.42 28 24 25.19 24 20.5C24 15 16 6 16 6Z"
        fill="#C81E3A"
      />
    </svg>
    <span className={`font-display text-lg font-extrabold tracking-tight ${dark ? 'text-white' : 'text-navy-900'}`}>
      Blood<span className="text-crimson-500">Bridge</span>
    </span>
  </Link>
);

export default Logo;
