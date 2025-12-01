import { useState } from "react";
import { useAuth } from "./AuthProvider.jsx";
import { useNavigate } from "react-router-dom";

export default function LoginView() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch("http://localhost:3000/api/usuarios/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      return alert(data.msg || "Error al iniciar sesión");
    }

    login(data.user, data.token);
    navigate("/");
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Iniciar sesión</h1>

      <input
        type="email"
        placeholder="Email"
        className="border p-2 w-full mb-3"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Contraseña"
        className="border p-2 w-full mb-3"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="bg-blue-600 text-white p-2 w-full hover:bg-blue-700">
        Entrar
      </button>
    </form>
  );
}
