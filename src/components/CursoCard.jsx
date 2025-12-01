import { CursosController } from "../controllers/cursosController.js";
import { FaTrash, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function CursoCard({ curso }) {

  const eliminarCurso = async () => {
    if (!confirm("¿Seguro que deseas eliminar este curso?")) return;
    await CursosController.eliminar(curso._id);
    window.location.reload();
  };

  return (
    <div className="relative bg-white border p-5 rounded-xl shadow-lg hover:shadow-xl transition">
      
      <h2 className="text-xl font-bold text-gray-800">{curso.nombre}</h2>
      <p className="text-gray-600 mt-2">{curso.descripcion}</p>
      <p className="text-gray-900 font-bold mt-3">${curso.precio}</p>

      {/* Botones */}
      <div className="flex gap-3 mt-4">
        {/* Editar */}
        <Link
          to={`/cursos/editar/${curso._id}`}
          className="flex items-center gap-2 bg-white-500 hover:bg-gray-300 text-white px-3 py-1 rounded"
        >
          <FaEdit /> Editar
        </Link>

        {/* Eliminar */}
        <button
          onClick={eliminarCurso}
          className="flex items-center gap- text-dark px-3 py-1 rounded"
        >
          <FaTrash /> Eliminar
        </button>
      </div>
    </div>
  );
}
