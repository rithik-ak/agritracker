import GlassCard from "../ui/GlassCard";

const ProfitLossPage = () => {
  const monthly = [
    { name: "Seeds", amount: -450 },
    { name: "Fertilizer", amount: -380 },
    { name: "Vegetable Sales", amount: 1500 },
    { name: "Milk Sales", amount: 720 },
  ];
  const total = monthly.reduce((sum, i) => sum + i.amount, 0);

  return (
    <GlassCard>
      <h3 className="mb-4 text-xl font-semibold">Profit / Loss Summary</h3>
      <div className="space-y-2">
        {monthly.map((item) => (
          <div key={item.name} className="flex justify-between rounded-xl bg-white/5 px-3 py-2">
            <span>{item.name}</span>
            <span className={item.amount >= 0 ? "text-lime-300" : "text-rose-300"}>
              {item.amount >= 0 ? "+" : "-"}${Math.abs(item.amount)}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-4 text-lg">Net: <span className={total >= 0 ? "text-lime-300 font-semibold" : "text-rose-300 font-semibold"}>${total}</span></p>
    </GlassCard>
  );
};

export default ProfitLossPage;
