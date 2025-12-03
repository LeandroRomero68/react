import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthProvider.jsx";
import compraService from "../services/comprasService.js";
import { Link } from "react-router-dom";

export default function PerfilView() {
  const { user } = useAuth();
  const [compras, setCompras] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?._id) {
      obtenerComprasUsuario(user._id);
    }
  }, [user]);

  const obtenerComprasUsuario = async (usuarioId) => {
  setLoading(true);
  try {
    const res = await compraService.getComprasByUsuario(usuarioId);
    setCompras(res.data); // 👈 aquí usamos res.data en vez de res.compras
  } catch (err) {
    console.error("Error al cargar compras:", err);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Perfil del alumno: {user?.nombre}
      </h1>

      <h2 className="text-2xl font-semibold mb-3">Mis Cursos Comprados 📚</h2>

      {loading && <p className="text-gray-600">Cargando tus compras...</p>}

      {!loading && compras.length === 0 && (
        <p className="text-gray-600">No has comprado ningún curso aún.</p>
      )}

      <div className="grid gap-5 mt-4 sm:grid-cols-2 lg:grid-cols-3">
        {compras.map((compra) => (
          <div
            key={compra._id}
            className="p-4 border rounded-lg shadow-md bg-white flex flex-col justify-between"
          >
            {compra.curso ? (
              <>
                <div>
                  <h3 className="text-lg font-bold">{compra.curso?.nombre}</h3>
                  <p className="text-gray-600">
                    {compra.curso?.precio ? `$${compra.curso.precio}` : "Gratis"}
                  </p>
                  <p
                    className={`text-sm ${
                      compra.estado === "pagado" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    Estado: {compra.estado}
                  </p>
                  <span className="text-sm text-blue-600">
                    Fecha: {new Date(compra.fechaCompra).toLocaleDateString()}
                  </span>
                </div>

                <Link
                  to={`/cursos/${compra.curso?._id}`}
                  className="mt-4 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition text-center"
                >
                  Ir al curso →
                </Link>
              </>
            ) : (
              <span className="text-gray-500">Curso eliminado</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
