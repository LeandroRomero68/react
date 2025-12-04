import React, { useState } from "react";
import ComprasList from "../components/ComprasList";
import CompraForm from "../components/CompraForm";
import CompraDetail from "../components/CompraDetail";
import "../styles/compras.css";

export default function AdminCompras() {
  const [editing, setEditing] = useState(null); // null | compraObject
  const [viewingId, setViewingId] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  function handleEdit(compra) {
    setEditing(compra ? compra : null);
    setViewingId(null);
  }

  function handleView(id) {
    setViewingId(id);
    setEditing(null);
  }

  function afterSaved() {

    setEditing(null);
    setRefreshKey(k => k + 1);
  }

  return (
    <div className="admin-compras">
      <h1 className="text-3xl font-bold text-center p-6">
        Admin de Compras
      </h1>
      <div className="layout">
        <div className="left">
          {/* key força que ComprasList recargue cuando cambie */}
          <ComprasList key={refreshKey} onEdit={handleEdit} onView={handleView} />
        </div>
        <div className="right">
          {editing !== null ? (
            <CompraForm initial={editing} onSaved={afterSaved} onCancel={() => setEditing(null)} />
          ) : viewingId ? (
            <CompraDetail id={viewingId} onClose={() => setViewingId(null)} />
          ) : (
            <div>
              <p>Selecciona una compra para ver/editar o haz clic en "Nueva compra".</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
