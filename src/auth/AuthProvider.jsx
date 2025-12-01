import { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
  const savedUser = localStorage.getItem("user");
  const savedToken = localStorage.getItem("token");

  try {
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
    }
  } catch (err) {
    console.error("Error parsing localStorage user:", err);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  }
}, []);

  // Esta función solo guarda los datos en estado/localStorage
  function saveUser(userData, newToken) {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", newToken);
    setUser(userData);
    setToken(newToken);
  }

  function logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  }

  async function loginRequest(email, password) {
  try {
    const res = await fetch("http://localhost:3000/api/usuarios/login", { 
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      return { success: false, error: "Usuario o contraseña incorrecta" };
    }

    const data = await res.json();

// Acceder correctamente al user y token dentro de data.data
saveUser(data.data.user, data.data.token);

return { success: true, data };
  } catch (error) {
    console.error("Error en login:", error);
    return { success: false, error: "Error de conexión" };
  }
}
  return (
    <AuthContext.Provider value={{ user, token, login: loginRequest, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}