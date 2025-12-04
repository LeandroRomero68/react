import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { CursosController } from "../controllers/cursosController.js";

export default function CursoDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [curso, setCurso] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    CursosController.detalle(id)
      .then((data) => {
        setCurso(data);
        setLoading(false);
      })
      .catch(() => {
        alert("Error al cargar el curso");
        navigate("/cursos");
      });
  }, [id]);

  async function handleDelete() {
    if (!confirm("¿Seguro que deseas eliminar este curso?")) return;
    await CursosController.eliminar(id);
    navigate("/cursos");
  }

  if (loading) return <p className="p-6">Cargando curso...</p>;
  if (!curso) return <p className="p-6">Curso no encontrado</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Card */}
      <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200">
        <h1 className="text-3xl font-bold mb-4">{curso.nombre}</h1>

        <p className="text-lg mb-2"><strong>Descripción:</strong> {curso.descripcion}</p>
        <p className="mb-2"><strong>Categoría:</strong> {curso.categoria}</p>
        <p className="mb-2"><strong>Modalidad:</strong> {curso.modalidad}</p>
        <p className="mb-2"><strong>Duración:</strong> {curso.duracion} horas</p>
        <p className="mb-4"><strong>Precio:</strong> ${curso.precio}</p>

        <div className="flex gap-3 mt-6">
          <button
            onClick={() => navigate(`/cursos/editar/${id}`)}
            className="bg-black text-white px-4 py-2 rounded"
          >
            Editar
          </button>

          <button
            onClick={handleDelete}
            className="bg-black text-white px-4 py-2 rounded"
          >
            Eliminar
          </button>

          <Link
            to="/cursos"
            className="bg-black text-white px-4 py-2 rounded"
          >
            Volver
          </Link>
        </div>
      </div>
    </div>
  );
}
