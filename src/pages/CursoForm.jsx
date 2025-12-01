import { useEffect, useState } from "react";
import { CursosController } from "../controllers/cursosController";
import { useNavigate, useParams } from "react-router-dom";

export default function CursoForm({ editar }) {
  const [curso, setCurso] = useState({
    nombre: "",
    descripcion: "",
    categoria: "",
    modalidad: "",
    precio: "",
    duracion: "",
    fechaInicio: "",
    fechaFin: ""
  });

  const { id } = useParams();
  const navigate = useNavigate();

  // Si es edición -> traer datos existentes
  useEffect(() => {
    if (!editar) return;

    const cargarCurso = async () => {
      const res = await CursosController.obtener(id);
      setCurso({
        ...res.data,
        fechaInicio: res.data.fechaInicio ? res.data.fechaInicio.slice(0, 10) : "",
        fechaFin: res.data.fechaFin ? res.data.fechaFin.slice(0, 10) : "",
      });
    };

    cargarCurso();
  }, [editar, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación simple
    if (!curso.nombre || !curso.descripcion || !curso.categoria || !curso.modalidad || !curso.precio || !curso.duracion) {
      alert("Completa todos los campos obligatorios");
      return;
    }

    try {
      const cursoPayload = {
        ...curso,
        precio: Number(curso.precio),
        duracion: Number(curso.duracion)
      };

      if (editar) {
        await CursosController.actualizar(id, cursoPayload);
      } else {
        await CursosController.crear(cursoPayload);
      }

      alert(editar ? "Curso actualizado" : "Curso creado");
      navigate("/cursos");
    } catch (error) {
      console.error("Error al guardar curso:", error);
      alert("No se pudo guardar el curso");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">
        {editar ? "Editar Curso" : "Nuevo Curso"}
      </h2>

      <input
        className="w-full border p-2 rounded mb-3"
        placeholder="Nombre"
        value={curso.nombre}
        onChange={(e) => setCurso({ ...curso, nombre: e.target.value })}
        required
      />

      <textarea
        className="w-full border p-2 rounded mb-3"
        placeholder="Descripción"
        value={curso.descripcion}
        onChange={(e) => setCurso({ ...curso, descripcion: e.target.value })}
        required
      />

      <input
        className="w-full border p-2 rounded mb-3"
        placeholder="Categoría"
        value={curso.categoria}
        onChange={(e) => setCurso({ ...curso, categoria: e.target.value })}
        required
      />

      <input
        className="w-full border p-2 rounded mb-3"
        placeholder="Modalidad"
        value={curso.modalidad}
        onChange={(e) => setCurso({ ...curso, modalidad: e.target.value })}
        required
      />

      <input
        className="w-full border p-2 rounded mb-3"
        placeholder="Precio"
        type="number"
        value={curso.precio}
        onChange={(e) => setCurso({ ...curso, precio: e.target.value })}
        required
      />

      <input
        className="w-full border p-2 rounded mb-3"
        placeholder="Duración"
        type="number"
        value={curso.duracion}
        onChange={(e) => setCurso({ ...curso, duracion: e.target.value })}
        required
      />

      <input
        type="date"
        className="w-full border p-2 rounded mb-3"
        value={curso.fechaInicio}
        onChange={(e) => setCurso({ ...curso, fechaInicio: e.target.value })}
      />

      <input
        type="date"
        className="w-full border p-2 rounded mb-3"
        value={curso.fechaFin}
        onChange={(e) => setCurso({ ...curso, fechaFin: e.target.value })}
      />

      <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
        {editar ? "Guardar Cambios" : "Crear Curso"}
      </button>
    </form>
  );
}
