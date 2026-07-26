// Blood group displayed in a bold circular tag — the visual "signature" motif reused everywhere
export const BloodGroupBadge = ({ group, size = 'md' }) => {
  const sizes = {
    sm: 'h-9 w-9 text-xs',
    md: 'h-12 w-12 text-sm',
    lg: 'h-16 w-16 text-lg',
  };
  return (
    <div
      className={`flex ${sizes[size]} shrink-0 items-center justify-center rounded-full bg-crimson-50 font-mono font-bold text-crimson-600 ring-2 ring-crimson-100`}
    >
      {group}
    </div>
  );
};

// Availability status pill for donors
export const AvailabilityPill = ({ available }) => (
  <span
    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
      available ? 'bg-mint-100 text-mint-500' : 'bg-black/5 text-ink-500'
    }`}
  >
    <span className={`h-1.5 w-1.5 rounded-full ${available ? 'bg-mint-500' : 'bg-ink-500'}`} />
    {available ? 'Available' : 'Unavailable'}
  </span>
);

// Urgency level pill for emergency requests
export const UrgencyPill = ({ level }) => {
  const styles = {
    Low: 'bg-navy-50 text-navy-700',
    Medium: 'bg-amber-100 text-amber-500',
    High: 'bg-crimson-100 text-crimson-600',
    Critical: 'bg-crimson-500 text-white',
  };
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${styles[level] || styles.Medium}`}>
      {level === 'Critical' && <span className="mr-1.5 h-1.5 w-1.5 animate-pulse-slow rounded-full bg-white" />}
      {level} Urgency
    </span>
  );
};

// Status pill for emergency request lifecycle
export const StatusPill = ({ status }) => {
  const styles = {
    Active: 'bg-mint-100 text-mint-500',
    Fulfilled: 'bg-navy-50 text-navy-700',
    Closed: 'bg-black/5 text-ink-500',
  };
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${styles[status] || styles.Active}`}>
      {status}
    </span>
  );
};
