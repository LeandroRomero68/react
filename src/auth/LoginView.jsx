import { useState } from "react";
import { useAuth } from "../auth/AuthProvider.jsx";
import { useNavigate } from "react-router-dom";

export default function LoginView() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const result = await login(email, password);
    if (!result.success) {
      alert(result.error || "Error al iniciar sesión");
      return;
    }

    navigate("/");
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Iniciar sesión</h1>

      <input
        type="email"
        placeholder="Email"
        className="border p-2 w-full mb-3"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Contraseña"
        className="border p-2 w-full mb-3"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="bg-blue-600 text-white p-2 w-full hover:bg-blue-700">
        Entrar
      </button>
    </form>
  );
}
