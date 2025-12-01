// src/components/CompraForm.jsx
import React, { useEffect, useState } from "react";
import comprasController from "../controllers/comprasController";

export default function CompraForm({ initial = null, onSaved, onCancel }) {
  const [form, setForm] = useState({
    usuario: initial?.usuario || "",
    curso: initial?.curso || "",
    metodoPago: initial?.metodoPago || "efectivo",
    estado: initial?.estado || "debe"
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (initial) {
      setForm({
        usuario: initial.usuario || "",
        curso: initial.curso || "",
        metodoPago: initial.metodoPago || "efectivo",
        estado: initial.estado || "debe"
      });
    }
  }, [initial]);

  function setField(k, v) {
    setForm(prev => ({ ...prev, [k]: v }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      if (initial && (initial.id || initial._id)) {
        const id = initial.id || initial._id;
        const updated = await comprasController.actualizarCompra(id, form);
        onSaved && onSaved(updated);
      } else {
        const created = await comprasController.crearCompra(form);
        onSaved && onSaved(created);
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Error al guardar");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="compra-form" onSubmit={handleSubmit}>
      <h3>{initial ? "Editar compra" : "Nueva compra"}</h3>
      {error && <div style={{ color: "red" }}>{error}</div>}

      <label>
        Usuario (id):
        <input
          value={form.usuario}
          onChange={e => setField("usuario", e.target.value)}
          placeholder="ID del usuario"
          required
        />
      </label>

      <label>
        Curso (id):
        <input
          value={form.curso}
          onChange={e => setField("curso", e.target.value)}
          placeholder="ID del curso"
          required
        />
      </label>

      <label>
        Método de pago:
        <select value={form.metodoPago} onChange={e => setField("metodoPago", e.target.value)}>
          <option value="efectivo">Efectivo</option>
          <option value="tarjeta">Tarjeta</option>
          <option value="mercadopago">MercadoPago</option>
          <option value="transferencia">Transferencia</option>
        </select>
      </label>

      <label>
        Estado:
        <select value={form.estado} onChange={e => setField("estado", e.target.value)}>
          <option value="debe">Debe</option>
          <option value="pagado">Pagado</option>
          <option value="cancelado">Cancelado</option>
        </select>
      </label>

      <div style={{ marginTop: 10 }}>
        <button type="submit" disabled={saving}>{saving ? "Guardando..." : "Guardar"}</button>
        <button type="button" onClick={onCancel} style={{ marginLeft: 8 }}>Cancelar</button>
      </div>
    </form>
  );
}
