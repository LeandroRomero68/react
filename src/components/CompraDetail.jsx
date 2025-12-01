// src/components/CompraDetail.jsx
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

        console.log("📦 RESPUESTA RAW DEL SERVIDOR:", res);

        // 🔥 COMPATIBLE CON TU BACKEND
        let data =
          (res && res.data && res.data.data) || // axios → { data: { data:{...} } }
          (res && res.data) ||                  // axios → { data:{...} }
          (res && res.data && res.data.compra) || // posible formato alterno
          res;                                   // fallback → respuesta cruda

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
    <div className="compra-detail">
      <h3>Detalle de compra</h3>

      <pre style={{ whiteSpace: "pre-wrap", background: "#f5f5f5", padding: "10px" }}>
        {JSON.stringify(compra, null, 2)}
      </pre>

      <button onClick={onClose}>Cerrar</button>
    </div>
  );
}
