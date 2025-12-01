import { useState, useEffect, createContext, useContext } from "react";

// Creamos el contexto
const AuthContext = createContext();

// Provider que envuelve toda la app
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Al cargar la app, revisa si hay usuario/token en localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
    }
  }, []);

  // Función de login: guarda token en estado
  function login(newToken) {
    setToken(newToken);
  }

  // Función de logout: limpia estado y localStorage
  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ user, setUser, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook para usar en cualquier componente
export function useAuth() {
  return useContext(AuthContext);
}
