import { useState } from "react";

export default function RegisterView() {
  const [form, setForm] = useState({ nombre: "", email: "", password: "" });

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch(
  `${import.meta.env.VITE_API_URL}/usuarios`,
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  }
);


    const data = await res.json();
    alert(data.msg || "Usuario creado");
  }

  return (
    <form className="p-6 max-w-md mx-auto" onSubmit={handleSubmit}>
      <h1 className="text-2xl mb-4 font-bold">Registro</h1>

      <input
        className="border p-2 w-full mb-3"
        type="text"
        placeholder="Nombre"
        onChange={(e) => setForm({ ...form, nombre: e.target.value })}
      />

      <input
        className="border p-2 w-full mb-3"
        type="email"
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        className="border p-2 w-full mb-3"
        type="password"
        placeholder="Contraseña"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <button className="bg-green-600 text-white p-2 w-full">
        Registrarme
      </button>
    </form>
  );
}
