// A small pulsing "heartbeat" loader used across the app during async operations
const Loader = ({ full = false, label = 'Loading' }) => {
  const content = (
    <div className="flex flex-col items-center justify-center gap-3">
      <svg width="56" height="32" viewBox="0 0 112 64" className="text-crimson-500">
        <polyline
          points="0,32 24,32 32,12 42,52 52,20 60,32 112,32"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-pulse-slow"
        />
      </svg>
      <span className="font-mono text-xs uppercase tracking-[0.18em] text-ink-500">{label}</span>
    </div>
  );

  if (full) {
    return <div className="flex min-h-[60vh] w-full items-center justify-center">{content}</div>;
  }
  return content;
};

export default Loader;
