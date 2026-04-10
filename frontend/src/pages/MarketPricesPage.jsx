import GlassCard from "../ui/GlassCard";

const prices = [
  { crop: "Wheat", unit: "quintal", price: "$29" },
  { crop: "Rice", unit: "quintal", price: "$33" },
  { crop: "Corn", unit: "quintal", price: "$25" },
  { crop: "Tomato", unit: "crate", price: "$18" },
];

const MarketPricesPage = () => (
  <GlassCard>
    <h3 className="mb-4 text-xl font-semibold">Daily Market Prices (Placeholder)</h3>
    <div className="overflow-hidden rounded-xl ring-1 ring-white/20">
      <table className="w-full">
        <thead className="bg-white/10 text-left">
          <tr>
            <th className="px-4 py-3">Crop</th>
            <th className="px-4 py-3">Unit</th>
            <th className="px-4 py-3">Price</th>
          </tr>
        </thead>
        <tbody>
          {prices.map((item) => (
            <tr key={item.crop} className="border-t border-white/10">
              <td className="px-4 py-3">{item.crop}</td>
              <td className="px-4 py-3 text-emerald-100/70">{item.unit}</td>
              <td className="px-4 py-3 text-lime-300">{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </GlassCard>
);

export default MarketPricesPage;
