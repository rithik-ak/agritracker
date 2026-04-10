const GlassCard = ({ children, className = "" }) => (
  <div
    className={`rounded-2xl border border-white/10 bg-white/5 p-5 shadow-xl backdrop-blur-md ring-1 ring-inset ring-white/5 ${className}`}
  >
    {children}
  </div>
);

export default GlassCard;
