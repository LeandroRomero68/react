import { useState, useEffect, createContext, useContext } from "react";
import { loginService } from "./loginService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
    }
  }, []);


  async function login(email, password) {
    const res = await loginService({ email, password });

    if (!res.ok) {
      const err = res.data?.msg || res.data || `Status ${res.status}`;
      return { success: false, error: err };
    }

    const data = res.data;
    if (!data || !data.token || !data.user) {
      return { success: false, error: "Respuesta inválida del servidor" };
    }

    setUser(data.user);
    setToken(data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", data.token);

    return { success: true };
  }

  function logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
