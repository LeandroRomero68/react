// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider.jsx";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-100 shadow-md">
      
      {/* Links principales */}
      <div className="flex gap-4">
        <Link to="/">Inicio</Link>
        <Link to="/cursos">Cursos</Link>

        {/* 📌 Solo Admin puede ver Compras */}
        {user?.rol === "admin" && (
          <Link to="/compras">Compras</Link>
        )}
      </div>

      {/* Zona de usuario */}
      <div className="flex items-center gap-4">
        
        {/* Si NO está logueado */}
        {!user && (
          <>
            <Link
              to="/register"
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
            >
              Registrarme
            </Link>

            <Link
              to="/login"
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              Iniciar sesión
            </Link>
          </>
        )}

        {/* Si está logueado */}
        {user && (
          <>
            {/* NUEVO: Link al Perfil del alumno */}
            {user.rol === "user" && (
              <Link
                to="/perfil"
                className="font-medium text-gray-800 hover:underline"
              >
                Mi Perfil
              </Link>
            )}

            <span className="mr-2 font-semibold text-gray-700">
              Hola, {user.nombre}
            </span>

            <button
              onClick={logout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Cerrar sesión
            </button>
          </>
        )}

      </div>
    </nav>
  );
}

export default Navbar;
