import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import StatCard from "../components/StatCard";
import GlassCard from "../ui/GlassCard";

const trend = [
  { day: "Mon", income: 240, expense: 100 },
  { day: "Tue", income: 260, expense: 120 },
  { day: "Wed", income: 280, expense: 140 },
  { day: "Thu", income: 350, expense: 160 },
  { day: "Fri", income: 390, expense: 150 },
  { day: "Sat", income: 410, expense: 170 },
];

const DashboardPage = () => {
  const income = 12250;
  const expense = 7450;
  const profit = income - expense;

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Total Income" value={`$${income}`} />
        <StatCard label="Total Expense" value={`$${expense}`} tone="from-rose-300 to-red-300" />
        <StatCard label="Net Profit" value={`$${profit}`} tone="from-cyan-300 to-blue-300" />
      </div>
      <GlassCard>
        <h3 className="mb-4 text-xl font-semibold">Weekly Financial Trend</h3>
        <div className="h-72 min-h-[18rem] w-full min-w-0">
          <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={260}>
            <AreaChart data={trend}>
              <XAxis dataKey="day" stroke="#d1fae5" />
              <YAxis stroke="#d1fae5" />
              <Tooltip />
              <Area type="monotone" dataKey="income" stroke="#6ee7b7" fill="#6ee7b74d" />
              <Area type="monotone" dataKey="expense" stroke="#fda4af" fill="#fda4af45" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>
    </div>
  );
};

export default DashboardPage;
