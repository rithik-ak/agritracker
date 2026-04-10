import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../hooks/useAuth";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/auth/login", form);
      login(data); // token is in httpOnly cookie; data contains { user }
      navigate("/dashboard");
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 text-white">
      <form onSubmit={submit} className="w-full max-w-md rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-lg">
        <h2 className="text-3xl font-bold">Login</h2>
        <p className="mb-4 mt-2 text-sm text-emerald-50/70">Welcome back to Agri Tracker</p>
        {error && <p className="mb-3 rounded-lg bg-red-400/20 p-2 text-sm text-red-100">{error}</p>}
        <input className="mb-3 w-full rounded-xl bg-white/10 p-3 outline-none ring-1 ring-white/20 focus:ring-emerald-300" placeholder="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <input className="mb-5 w-full rounded-xl bg-white/10 p-3 outline-none ring-1 ring-white/20 focus:ring-emerald-300" placeholder="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        <button className="w-full rounded-xl bg-emerald-500 py-3 font-semibold transition hover:bg-emerald-400">Login</button>
        <p className="mt-4 text-sm text-emerald-50/80">No account? <Link to="/register" className="text-lime-300">Register</Link></p>
      </form>
    </div>
  );
};

export default LoginPage;
