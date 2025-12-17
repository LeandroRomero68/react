import React, { useEffect, useState } from "react";
import comprasController from "../controllers/comprasController";

export default function ComprasList({ onEdit, onView }) {
  const [compras, setCompras] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function load() {
    try {
      setLoading(true);
      setError(null);
      const data = await comprasController.listCompras();
      setCompras(data);
    } catch (err) {
      console.error(err);
      setError(err.message || "Error al cargar compras");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleDelete(id) {
    if (!confirm("¿Eliminar compra?")) return;
    try {
      await comprasController.eliminarCompra(id);
      setCompras(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      alert("Error al eliminar: " + (err.message || err));
    }
  }

  if (loading) return <div>Cargando compras...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div className="compras-list">
      
      
      <table className="min-w-full border border-gray-300 bg-white text-black">
  <thead className="bg-gray-800 text-white">
    <tr>
      <th className="border px-4 py-2 text-left">ID</th>
      <th className="border px-4 py-2 text-left">Usuario</th>
      <th className="border px-4 py-2 text-left">Curso</th>
      <th className="border px-4 py-2 text-left">Método</th>
      <th className="border px-4 py-2 text-left">Estado</th>
      <th className="border px-4 py-2 text-left">Acciones</th>
    </tr>
  </thead>

  <tbody className="bg-white text-black">
    {compras.length === 0 && (
      <tr>
        <td colSpan="6" className="border px-4 py-2 text-center">
          No hay compras
        </td>
      </tr>
    )}
    {compras.map(c => (
      <tr key={c.id || c._id} className="border-b">
        <td className="border px-4 py-2">{c.id || c._id}</td>
        <td className="border px-4 py-2">
          {c.usuario?.nombre || c.usuario?._id || "Usuario eliminado"}
        </td>
        <td className="border px-4 py-2">
          {c.curso?.nombre || c.curso?._id || "Curso eliminado"}
        </td>
        <td className="border px-4 py-2">{c.metodoPago}</td>
        <td className="border px-4 py-2">{c.estado}</td>
        <td className="border px-4 py-2 flex gap-2">
          <button className="bg-black text-white px-2 py-1 rounded" onClick={() => onView(c.id || c._id)}>Ver</button>
          <button className="bg-black text-white px-2 py-1 rounded" onClick={() => onEdit(c)}>Editar</button>
          <button className="bg-black text-white px-2 py-1 rounded" onClick={() => handleDelete(c.id || c._id)}>Eliminar</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
    </div>
  );
}
