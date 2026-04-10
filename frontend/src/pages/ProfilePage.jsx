import GlassCard from "../ui/GlassCard";

const ProfilePage = () => {
  const user = (() => { try { const r = sessionStorage.getItem("user"); return r ? JSON.parse(r) : {}; } catch { return {}; } })();

  return (
    <GlassCard className="max-w-2xl">
      <h3 className="mb-4 text-xl font-semibold">Profile</h3>
      <div className="space-y-3">
        <div className="rounded-xl bg-white/5 p-3">
          <p className="text-sm text-emerald-100/70">Name</p>
          <p className="font-medium">{user?.name || "N/A"}</p>
        </div>
        <div className="rounded-xl bg-white/5 p-3">
          <p className="text-sm text-emerald-100/70">Email</p>
          <p className="font-medium">{user?.email || "N/A"}</p>
        </div>
        <div className="rounded-xl bg-white/5 p-3">
          <p className="text-sm text-emerald-100/70">Location</p>
          <p className="font-medium">{user?.location || "N/A"}</p>
        </div>
      </div>
    </GlassCard>
  );
};

export default ProfilePage;
