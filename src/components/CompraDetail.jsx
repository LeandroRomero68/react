import React, { useEffect, useState } from "react";
import comprasController from "../controllers/comprasController";

export default function CompraDetail({ id, onClose }) {
  const [compra, setCompra] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    let mounted = true;

    (async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await comprasController.getCompra(id);

        const data =
          (res && res.data && res.data.data) || 
          (res && res.data) || 
          (res && res.data && res.data.compra) || 
          res;

        if (mounted) setCompra(data);
      } catch (err) {
        console.error("❌ ERROR AL CARGAR DETALLE:", err);
        if (mounted) setError("Error al cargar el detalle de la compra");
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [id]);

  if (!id) return <div>Seleccione una compra.</div>;
  if (loading) return <div>Cargando detalle...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!compra) return <div>No se encontró la compra.</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200">
        <h2 className="text-2xl font-bold mb-4 text-center">Detalle de Compra</h2>

        <div className="mb-4">
          <h3 className="font-semibold">Usuario</h3>
          <p><strong>Nombre:</strong> {compra.usuario?.nombre}</p>
          <p><strong>Email:</strong> {compra.usuario?.email}</p>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold">Curso</h3>
          <p><strong>Nombre:</strong> {compra.curso?.nombre}</p>
          <p><strong>Descripción:</strong> {compra.curso?.descripcion}</p>
          <p><strong>Categoría:</strong> {compra.curso?.categoria}</p>
          <p><strong>Modalidad:</strong> {compra.curso?.modalidad}</p>
          <p><strong>Duración:</strong> {compra.curso?.duracion} horas</p>
          <p><strong>Precio:</strong> ${compra.curso?.precio}</p>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold">Pago</h3>
          <p><strong>Método:</strong> {compra.metodoPago}</p>
          <p><strong>Estado:</strong> {compra.estado}</p>
          <p><strong>Fecha de compra:</strong> {new Date(compra.fechaCompra).toLocaleDateString()}</p>
        </div>

        <div className="text-center mt-6">
          <button
            onClick={onClose}
            className="bg-black text-white px-6 py-2 rounded-xl hover:bg-gray-800"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
