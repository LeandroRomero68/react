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

  const handleComprar = async (idCurso) => {
  if (!user || !user.id) {
    alert("Debes iniciar sesión para comprar un curso");
    return;
  }

  console.log("🔍 user.id:", user.id);
  console.log("⚡ idCurso recibido:", idCurso);

  try {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/compras`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        usuario: user.id,
        curso: idCurso,
        metodoPago: "efectivo",
        estado: "debe",
      }),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    console.error(data);
    alert(data.msg || "No se pudo registrar la compra");
    return;
  }

  alert(`Has comprado el curso: ${curso.nombre}`);
  window.location.reload();

} catch (error) {
  console.error("Error al comprar:", error);
  alert("Hubo un problema al registrar la compra");
}



  return (
    <div className="relative bg-white border p-5 rounded-xl shadow-lg hover:shadow-xl transition">
      
      <h2 className="text-xl font-bold text-gray-800">{curso.nombre}</h2>
      <p className="text-gray-600 mt-2">{curso.descripcion}</p>
      <p className="text-gray-900 font-bold mt-3">${curso.precio}</p>

      <div className="flex gap-3 mt-4">
        {user?.rol === "admin" && (
          <>
            <Link
              to={`/cursos/editar/${curso._id}`}
              className="flex items-center gap-2 bg-black text-white px-3 py-1 rounded"
            >
              <FaEdit /> Editar
            </Link>

            <button
              onClick={eliminarCurso}
              className="flex items-center gap-2 bg-black text-white px-3 py-1 rounded"
            >
              <FaTrash /> Eliminar
            </button>
          </>
        )}

        {user?.rol === "user" && (
          <button
            onClick={() => handleComprar(curso.id || curso._id)}
            className="bg-black text-white px-3 py-1 rounded"
          >
            Comprar
          </button>
        )}
      </div>
    </div>
  );
}
