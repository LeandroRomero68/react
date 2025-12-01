// src/components/ComprasList.jsx
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
      <h2>Compras</h2>
      <button onClick={() => onEdit(null)}>Nueva compra</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Usuario</th>
            <th>Curso</th>
            <th>Método</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {compras.length === 0 && (
            <tr>
              <td colSpan="6">No hay compras</td>
            </tr>
          )}
          {compras.map(c => (
            <tr key={c.id || c._id}>
              <td>{c.id || c._id}</td>
              <td>{typeof c.usuario === "object" ? c.usuario.nombre || c.usuario._id : c.usuario}</td>
              <td>{typeof c.curso === "object" ? c.curso.nombre || c.curso._id : c.curso}</td>
              <td>{c.metodoPago}</td>
              <td>{c.estado}</td>
              <td>
                <button onClick={() => onView(c.id || c._id)}>Ver</button>
                <button onClick={() => onEdit(c)}>Editar</button>
                <button onClick={() => handleDelete(c.id || c._id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
