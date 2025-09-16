import React, { createContext, useContext, useEffect, useState } from "react";
import { login as apiLogin, profile as apiProfile, logout as apiLogout } from "../services/auth";

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // carga perfil si hay token
  useEffect(() => {
    (async () => {
      try {
        if (localStorage.getItem("token")) {
          const me = await apiProfile();
          setUser(me);
        }
      } catch {
        // token inválido es igual a limpiar
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const login = async (cred) => {
    await apiLogin(cred);
    const me = await apiProfile();
    setUser(me);
  };

  const logout = () => { apiLogout(); setUser(null); };

  return <AuthCtx.Provider value={{ user, loading, login, logout }}>{children}</AuthCtx.Provider>;
}
export const useAuth = () => useContext(AuthCtx);
