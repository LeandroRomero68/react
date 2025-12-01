import { useEffect, useState } from "react";
import { CursosController } from "../controllers/cursosController.js";
import CursoCard from "../components/CursoCard.jsx";
import { Link } from "react-router-dom";

export default function CursosList() {
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    const cargarCursos = async () => {
      try {
        const response = await CursosController.listar();
        console.log("Respuesta Cursos:", response);

        setCursos(Array.isArray(response) ? response : response.data || []);
      } catch (error) {
        console.error("Error al cargar cursos:", error);
        setCursos([]);
      }
    };

    cargarCursos();
  }, []);

  const eliminarCursoUI = (id) => {
    setCursos((prev) => prev.filter((c) => c._id !== id));
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Cursos Disponibles</h1>

        <Link 
  to="/cursos/nuevo"
  className="bg-white text-black px-4 py-2 rounded-lg shadow border border-gray-300 
             hover:bg-black hover:text-white transition duration-200"
>
  + Nuevo Curso
</Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {Array.isArray(cursos) && cursos.map((curso) => (
          <CursoCard key={curso._id} curso={curso} onDelete={eliminarCursoUI} />
        ))}
      </div>

      {Array.isArray(cursos) && cursos.length === 0 && (
        <p className="mt-10 text-gray-500 text-lg text-center">
          No hay cursos cargados todavía.
        </p>
      )}
    </div>
  );
}
