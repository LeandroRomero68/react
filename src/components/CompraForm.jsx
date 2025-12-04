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
    <div className="max-w-md mx-auto mt-6">
      <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200">
        <h3 className="text-xl font-bold mb-4 text-center">
          {initial ? "Editar compra" : "Nueva compra"}
        </h3>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <div>
            <label className="block font-medium mb-1">Método de pago:</label>
            <select
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={form.metodoPago}
              onChange={e => setField("metodoPago", e.target.value)}
            >
              <option value="efectivo">Efectivo</option>
              <option value="tarjeta">Tarjeta</option>
              <option value="mercadopago">MercadoPago</option>
              <option value="transferencia">Transferencia</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Estado:</label>
            <select
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={form.estado}
              onChange={e => setField("estado", e.target.value)}
            >
              <option value="debe">Debe</option>
              <option value="pagado">Pagado</option>
              <option value="cancelado">Cancelado</option>
            </select>
          </div>

          <div className="flex justify-center gap-4 mt-4">
            <button
              type="submit"
              disabled={saving}
              className="bg-black text-white px-6 py-2 rounded-xl hover:bg-gray-800"
            >
              {saving ? "Guardando..." : "Guardar"}
            </button>

            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-300 text-black px-6 py-2 rounded-xl hover:bg-gray-400"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
