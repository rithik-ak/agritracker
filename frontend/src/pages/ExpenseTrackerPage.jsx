import { useEffect, useState } from "react";
import api from "../services/api";
import GlassCard from "../ui/GlassCard";

const ExpenseTrackerPage = () => {
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState({ title: "", amount: "", type: "expense", category: "" });

  const load = async () => {
    try {
      const { data } = await api.get("/transactions");
      setRows(data);
    } catch {
      setRows([]);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/transactions", { ...form, amount: Number(form.amount) });
      setForm({ title: "", amount: "", type: "expense", category: "" });
      load();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <GlassCard>
        <h3 className="mb-4 text-xl font-semibold">Add Income / Expense</h3>
        <form className="space-y-3" onSubmit={submit}>
          <input className="w-full rounded-xl bg-white/10 p-3 ring-1 ring-white/20 outline-none" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          <input className="w-full rounded-xl bg-white/10 p-3 ring-1 ring-white/20 outline-none" placeholder="Amount" type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} required />
          <select className="w-full rounded-xl bg-white/10 p-3 ring-1 ring-white/20 outline-none" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
          <input className="w-full rounded-xl bg-white/10 p-3 ring-1 ring-white/20 outline-none" placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
          <button className="w-full rounded-xl bg-emerald-500 py-3 font-semibold hover:bg-emerald-400">Save Transaction</button>
        </form>
      </GlassCard>
      <GlassCard>
        <h3 className="mb-4 text-xl font-semibold">Recent Transactions</h3>
        <div className="space-y-2">
          {rows.map((item) => (
            <div key={item._id} className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2">
              <div>
                <p>{item.title}</p>
                <p className="text-xs text-emerald-100/70">{item.category || "General"}</p>
              </div>
              <p className={item.type === "income" ? "text-lime-300" : "text-rose-300"}>
                {item.type === "income" ? "+" : "-"}${item.amount}
              </p>
            </div>
          ))}
          {!rows.length && <p className="text-sm text-emerald-100/70">No transactions yet.</p>}
        </div>
      </GlassCard>
    </div>
  );
};

export default ExpenseTrackerPage;
