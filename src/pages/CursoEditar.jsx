import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CursosController } from "../controllers/cursosController.js";

export default function CursoEditar() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Estado del formulario
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    categoria: "",
    modalidad: "",
    precio: "",
    duracion: "",
    fechaInicio: "",
    fechaFin: "",
  });

  const [loading, setLoading] = useState(true);

  // Cargar datos del curso
  useEffect(() => {
    async function cargarCurso() {
      try {
        const data = await CursosController.detalle(id);

        setForm({
          nombre: data.nombre ?? "",
          descripcion: data.descripcion ?? "",
          categoria: data.categoria ?? "",
          modalidad: data.modalidad ?? "",
          precio: data.precio ?? "",
          duracion: data.duracion ?? "",
          fechaInicio: data.fechaInicio ? data.fechaInicio.slice(0, 10) : "",
          fechaFin: data.fechaFin ? data.fechaFin.slice(0, 10) : "",
        });

        setLoading(false);
      } catch (error) {
        console.error("Error al cargar curso:", error);
        alert("No se pudo cargar el curso");
        navigate("/cursos");
      }
    }

    cargarCurso();
  }, [id, navigate]);

  // Validación simple
  const isFormValid = () => {
    return (
      form.nombre &&
      form.descripcion &&
      form.categoria &&
      form.modalidad &&
      form.precio &&
      form.duracion
    );
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (!isFormValid()) {
      alert("Completa todos los campos obligatorios");
      return;
    }

    try {
      await CursosController.editar(id, form);
      alert("Curso actualizado correctamente");
      navigate(`/cursos/${id}`);
    } catch (error) {
      console.error("Error al actualizar curso:", error);
      alert("No se pudo actualizar el curso");
    }
  }

  if (loading) return <p className="p-6">Cargando curso...</p>;

  return (
    <form className="p-6 max-w-lg mx-auto" onSubmit={handleSubmit}>
      <h1 className="text-xl mb-4 font-semibold">Editar Curso</h1>

      <input
        value={form.nombre}
        placeholder="Nombre del curso"
        className="border p-2 w-full mb-3"
        onChange={(e) => setForm({ ...form, nombre: e.target.value })}
      />

      <input
        value={form.descripcion}
        placeholder="Descripción"
        className="border p-2 w-full mb-3"
        onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
      />

      <input
        value={form.categoria}
        placeholder="Categoría"
        className="border p-2 w-full mb-3"
        onChange={(e) => setForm({ ...form, categoria: e.target.value })}
      />

      <input
        value={form.modalidad}
        placeholder="Modalidad (online, híbrido, presencial)"
        className="border p-2 w-full mb-3"
        onChange={(e) => setForm({ ...form, modalidad: e.target.value })}
      />

      <input
        type="number"
        value={form.precio}
        placeholder="Precio"
        className="border p-2 w-full mb-3"
        onChange={(e) => setForm({ ...form, precio: Number(e.target.value) })}
      />

      <input
        type="number"
        value={form.duracion}
        placeholder="Duración (horas/semanas)"
        className="border p-2 w-full mb-3"
        onChange={(e) => setForm({ ...form, duracion: Number(e.target.value) })}
      />

      <input
        type="date"
        value={form.fechaInicio}
        placeholder="Fecha de inicio"
        className="border p-2 w-full mb-3"
        onChange={(e) => setForm({ ...form, fechaInicio: e.target.value })}
      />

      <input
        type="date"
        value={form.fechaFin}
        placeholder="Fecha de fin"
        className="border p-2 w-full mb-3"
        onChange={(e) => setForm({ ...form, fechaFin: e.target.value })}
      />

      <button
        type="submit"
        className="bg-green-600 text-white p-2 w-full mb-3"
      >
        Guardar Cambios
      </button>

      <button
        type="button"
        onClick={() => navigate(`/cursos/${id}`)}
        className="bg-gray-300 p-2 w-full"
      >
        Cancelar
      </button>
    </form>
  );
}
