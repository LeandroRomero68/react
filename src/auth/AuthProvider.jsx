import { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("user");
      const savedToken = localStorage.getItem("token");

      if (savedUser && savedToken) {
        setUser(JSON.parse(savedUser));
        setToken(savedToken);
      }
    } catch (err) {
      console.error("Error leyendo localStorage:", err);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  }, []);

  function saveUser(userData, jwtToken) {

    const userWithToken = { ...userData, token: jwtToken };

    localStorage.setItem("user", JSON.stringify(userWithToken));
    localStorage.setItem("token", jwtToken);

    setUser(userWithToken);
    setToken(jwtToken);
  }


  function logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  }

  async function loginRequest(email, password) {
    try {
      const res = await fetch(
  `${import.meta.env.VITE_API_URL}/usuarios/login`,
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }
);

      const data = await res.json();

      if (!res.ok) {
        return {
          success: false,
          error: data.msg || "Usuario o contraseña incorrecta",
        };
      }


      const userData = data.data?.user;
      const jwtToken = data.data?.token;

      if (!userData || !jwtToken) {
        console.error("Backend no envió user o token");
        return { success: false, error: "Respuesta inválida desde el servidor" };
      }


      saveUser(userData, jwtToken);

      return { success: true };

    } catch (error) {
      console.error("Error login:", error);
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
