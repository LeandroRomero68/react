// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider.jsx";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-100">
      {/* Links principales */}
      <div className="flex gap-4">
        <Link to="/">Inicio</Link>
        <Link to="/cursos">Cursos</Link>
        <Link to="/compras">Compras</Link>
      </div>

      {/* Links de usuario / login */}
      <div className="flex items-center gap-4">
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

        {user && (
          <>
            <span className="mr-2">Hola, {user.nombre}</span>
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
