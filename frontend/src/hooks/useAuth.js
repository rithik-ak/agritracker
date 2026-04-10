import { useMemo, useState } from "react";

export const useAuth = () => {
  const [user, setUser] = useState(() => {
    try {
      const raw = sessionStorage.getItem("user");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const login = (payload) => {
    // Token is stored in httpOnly cookie by the server — never touch it here
    sessionStorage.setItem("user", JSON.stringify(payload.user));
    setUser(payload.user);
  };

  const logout = () => {
    sessionStorage.removeItem("user");
    setUser(null);
  };

  return useMemo(() => ({ user, isAuthenticated: !!user, login, logout }), [user]);
};
