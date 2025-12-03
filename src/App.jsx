import { Outlet, Link } from "react-router-dom";
import { useAuth } from "./auth/AuthProvider.jsx";
import PerfilView from "./views/PerfilView.jsx"; // 👈 Asegurate de tener este import

export default function App() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">

      {/* NAVBAR GLOBAL */}
      <nav className="fixed top-0 left-0 w-full bg-gray-200 shadow-md p-4 flex gap-4 items-center z-50">

        {/* Navegación izquierda */}
        <Link to="/">Inicio</Link>
        <Link to="/cursos">Cursos</Link>
        <Link to="/compras">Compras</Link>

        {/* Empuja login a la derecha */}
        <div className="flex-1"></div>

        {/* Si NO está logueado */}
        {!user && (
          <>
            <Link
              to="/register"
              className="text-green-600 hover:text-green-700 font-medium"
            >
              Registrarme
            </Link>
            <Link
              to="/login"
              className="font-medium"
            >
              Iniciar sesión
            </Link>
          </>
        )}

        {/* Si está logueado */}
        {user && (
          <>
            <Link to="/perfil" className="font-medium text-blue-600 hover:text-blue-800">
              Mi Perfil
            </Link>

            <span className="mr-2 font-medium">
              Hola, {user.nombre}
            </span>

            <button
              onClick={logout}
              className="text-red-500 border border-red-500 px-2 py-1 rounded hover:bg-red-500 hover:text-white transition"
            >
              Cerrar sesión
            </button>
          </>
        )}
      </nav>

      {/* Contenido debajo del navbar */}
      <div className="pt-24 p-4 w-full">
        <Outlet />
      </div>

    </div>
  );
}
