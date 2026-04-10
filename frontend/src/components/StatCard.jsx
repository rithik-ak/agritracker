import GlassCard from "../ui/GlassCard";

const StatCard = ({ label, value, tone = "from-emerald-500 to-teal-500" }) => (
  <GlassCard>
    <p className="text-sm text-emerald-100/80">{label}</p>
    <p className={`mt-2 bg-gradient-to-r ${tone} bg-clip-text text-3xl font-bold text-transparent`}>{value}</p>
  </GlassCard>
);

export default StatCard;
