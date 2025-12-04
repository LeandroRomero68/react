import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthProvider.jsx";
import compraService from "../services/comprasService.js";
import { Link } from "react-router-dom";

export default function PerfilView() {
  const { user } = useAuth();
  const [compras, setCompras] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      obtenerComprasUsuario();
    }
  }, [user]);

  const obtenerComprasUsuario = async () => {
    setLoading(true);
    try {
      const comprasUsuario = await compraService.getMisCursos(user.token);
      setCompras(comprasUsuario);
    } catch (err) {
      console.error("Error al cargar compras:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Perfil del alumno: {user?.nombre}
      </h1>

      <h2 className="text-2xl font-semibold mb-3">Mis Cursos Comprados</h2>

      {loading && <p className="text-gray-600">Cargando tus compras...</p>}

      {!loading && compras.length === 0 && (
        <p className="text-gray-600">No has comprado ningún curso aún.</p>
      )}

      <div className="grid gap-6 mt-4 sm:grid-cols-2 lg:grid-cols-3">
        {compras.map((compra) => (
          <div
            key={compra._id}
            className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm 
            hover:shadow-xl transition-all flex flex-col"
          >
            {/* TAGS ARRIBA */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-600 font-medium flex items-center gap-1">
                Programación y Desarrollo
              </span>

              <span className="text-xs bg-black text-white px-3 py-1 rounded-full flex items-center gap-1">
                Curso nuevo
              </span>
            </div>

            {compra.curso ? (
              <>
                {/* TÍTULO */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                  {compra.curso.nombre}
                </h3>

                {/* INFO */}
                <p>
                  <span className="font-semibold">Objetivo:</span> Para estudiantes
                </p>
                <p>
                  <span className="font-semibold">Duración:</span> 6 semanas
                </p>
                <p>
                  <span className="font-semibold">Certificado por:</span> EduTech
                </p>

                {/* MÉTODO Y ESTADO */}
                <div className="mt-3 flex flex-col gap-1">
                  <p>
                    <span className="font-semibold">Método:</span> {compra.metodoPago || ""}
                  </p>
                  <p>
                    <span className="font-semibold">Estado:</span> {compra.estado || "Pendiente"}
                  </p>
                </div>

                {/* PRECIO */}
                <div className="mt-5">
                  <div className="inline-block px-3 py-1 rounded-md bg-green-600 text-white text-sm font-bold">
                    25% OFF
                  </div>

                  <p className="text-sm line-through text-gray-500 mt-1">
                    ${ (compra.curso.precio * 1.25).toFixed(2) }
                  </p>

                  <p>Hasta 6 cuotas sin interés de</p>

                  <p className="text-2xl font-extrabold mt-1">
                    ${compra.curso.precio}
                  </p>

                  <p className="text-sm text-gray-600">
                    Precio final: ${(compra.curso.precio * 6).toLocaleString()}
                  </p>
                </div>

                {/* BOTÓN */}
                <Link
                  to={`/cursos/${compra.curso._id}`}
                  className="mt-6 w-full py-3 bg-black text-white font-bold rounded-xl text-center"
                >
                  Ver curso
                </Link>
              </>
            ) : (
              <span className="text-gray-500 text-center">Curso eliminado</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
