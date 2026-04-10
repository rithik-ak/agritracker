import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard, WalletCards, LineChart, CloudSun,
  ShoppingBasket, MessagesSquare, Bot, UserCircle,
  Menu, X, LogOut, Leaf, Home,
} from "lucide-react";
import { memo, useState, useCallback } from "react";
import api from "../services/api";

const navItems = [
  { to: "/",               icon: Home,            label: "Landing Page", external: true },
  { to: "/dashboard",      icon: LayoutDashboard, label: "Dashboard" },
  { to: "/expenses",       icon: WalletCards,     label: "Expenses" },
  { to: "/profit-loss",    icon: LineChart,        label: "Profit / Loss" },
  { to: "/weather",        icon: CloudSun,         label: "Weather" },
  { to: "/market-prices",  icon: ShoppingBasket,   label: "Market Prices" },
  { to: "/community-chat", icon: MessagesSquare,   label: "Community" },
  { to: "/chatbot",        icon: Bot,              label: "AI Chatbot" },
  { to: "/profile",        icon: UserCircle,       label: "Profile" },
];

const getUser = () => {
  try {
    const r = sessionStorage.getItem("user");
    return r ? JSON.parse(r) : {};
  } catch {
    return {};
  }
};

const initials = (name = "") =>
  name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase() || "F";

const Sidebar = memo(({ open, onClose }) => {
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-20 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 z-30 flex h-full w-64 flex-col
          border-r border-white/10 bg-[#0b2318]/90 backdrop-blur-xl
          transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:z-auto lg:h-screen lg:flex-shrink-0
        `}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/20 ring-1 ring-emerald-400/30">
            <Leaf size={18} className="text-emerald-300" />
          </div>
          <span className="bg-gradient-to-r from-lime-300 to-emerald-200 bg-clip-text text-xl font-bold text-transparent">
            Agri Tracker
          </span>
          <button
            className="ml-auto rounded-lg p-1 hover:bg-white/10 lg:hidden"
            onClick={onClose}
          >
            <X size={18} className="text-white/60" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {navItems.map(({ to, icon: Icon, label, external }) => {
            const active = !external && location.pathname === to;
            return (
              <NavLink
                key={to}
                to={to}
                onClick={onClose}
                className={`
                  flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all
                  ${active
                    ? "bg-emerald-500/20 text-emerald-200 ring-1 ring-emerald-400/20"
                    : external
                    ? "text-white/40 hover:bg-white/8 hover:text-white/70 border-b border-white/5 mb-1 pb-3"
                    : "text-white/60 hover:bg-white/8 hover:text-white/90"}
                `}
              >
                <Icon size={17} className={active ? "text-emerald-300" : external ? "text-white/30" : ""} />
                {label}
                {active && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-emerald-400" />
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom user strip */}
        <UserStrip />
      </aside>
    </>
  );
});

const UserStrip = memo(() => {
  const navigate = useNavigate();
  const user = getUser();

  const handleLogout = useCallback(async () => {
    try { await api.post("/auth/logout"); } catch {}
    sessionStorage.clear();
    navigate("/login");
  }, [navigate]);

  return (
    <div className="border-t border-white/10 px-3 py-3">
      <div className="flex items-center gap-3 rounded-xl bg-white/5 px-3 py-2.5">
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500/30 text-xs font-bold text-emerald-200 ring-1 ring-emerald-400/30">
          {initials(user?.name)}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-white/90">{user?.name || "Farmer"}</p>
          <p className="truncate text-xs text-white/40">{user?.location || "—"}</p>
        </div>
        <button
          onClick={handleLogout}
          title="Logout"
          className="rounded-lg p-1.5 text-white/40 transition hover:bg-red-500/20 hover:text-red-300"
        >
          <LogOut size={15} />
        </button>
      </div>
    </div>
  );
});

const Topbar = memo(({ onMenuClick }) => {
  const location = useLocation();
  const pageLabel = navItems.find((n) => !n.external && n.to === location.pathname)?.label ?? "Dashboard";

  return (
    <header className="sticky top-0 z-10 flex items-center gap-4 border-b border-white/10 bg-[#081a16]/80 px-5 py-3.5 backdrop-blur-md">
      <button
        className="rounded-xl p-2 text-white/60 hover:bg-white/10 hover:text-white lg:hidden"
        onClick={onMenuClick}
      >
        <Menu size={20} />
      </button>
      <div>
        <p className="text-xs text-emerald-100/50 uppercase tracking-widest">Agri Tracker</p>
        <h2 className="text-base font-semibold text-white/90">{pageLabel}</h2>
      </div>
    </header>
  );
});

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const open  = useCallback(() => setSidebarOpen(true),  []);
  const close = useCallback(() => setSidebarOpen(false), []);

  return (
    <div className="flex h-screen overflow-hidden text-white">
      <Sidebar open={sidebarOpen} onClose={close} />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar onMenuClick={open} />
        <main className="flex-1 overflow-y-auto px-4 py-5 md:px-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
