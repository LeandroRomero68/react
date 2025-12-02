import { CursosController } from "../controllers/cursosController.js";
import { FaTrash, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider.jsx";

export default function CursoCard({ curso }) {
  const { user } = useAuth();

  const eliminarCurso = async () => {
    if (!confirm("¿Seguro que deseas eliminar este curso?")) return;
    await CursosController.eliminar(curso._id);
    window.location.reload();
  };

  const handleComprar = () => {
  alert(`Has comprado el curso: ${curso.nombre}`);
};

  return (
    <div className="relative bg-white border p-5 rounded-xl shadow-lg hover:shadow-xl transition">
      
      <h2 className="text-xl font-bold text-gray-800">{curso.nombre}</h2>
      <p className="text-gray-600 mt-2">{curso.descripcion}</p>
      <p className="text-gray-900 font-bold mt-3">${curso.precio}</p>

      {/* Botones según rol */}
      <div className="flex gap-3 mt-4">
        {/* Botones solo para admin */}
        {user?.rol === "admin" && (
          <>
            <Link
              to={`/cursos/editar/${curso._id}`}
              className="flex items-center gap-2 bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
            >
              <FaEdit /> Editar
            </Link>

            <button
              onClick={eliminarCurso}
              className="flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
            >
              <FaTrash /> Eliminar
            </button>
          </>
        )}

        {/* Botón Comprar solo para usuarios normales */}
        {user?.rol === "user" && (
          <button
            onClick={() => handleComprar(curso._id)}
            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
          >
            Comprar
          </button>
        )}
      </div>
    </div>
  );
}
