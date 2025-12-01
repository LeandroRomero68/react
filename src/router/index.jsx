import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import Home from "../pages/Home.jsx";
import CursosList from "../pages/CursosList.jsx";
import CursoForm from "../pages/CursoForm.jsx";
import CursoDetalle from "../pages/CursoDetalle.jsx";
import CursoEditar from "../pages/CursoEditar.jsx";

import LoginView from "../auth/LoginView.jsx";
import RegisterView from "../auth/RegisterView.jsx";

// ⭐ IMPORT NUEVO
import AdminCompras from "../pages/AdminCompras.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // HOME
      { path: "/", element: <Home /> },

      // CURSOS
      { path: "/cursos", element: <CursosList /> },
      { path: "/cursos/nuevo", element: <CursoForm /> },
      { path: "/cursos/:id", element: <CursoDetalle /> },
      { path: "/cursos/editar/:id", element: <CursoEditar /> },

      // LOGIN & REGISTRO
      { path: "/login", element: <LoginView /> },
      { path: "/register", element: <RegisterView /> },

      // ⭐ RUTA NUEVA — ADMINISTRACIÓN DE COMPRAS
      { path: "/compras", element: <AdminCompras /> },
    ],
  },
]);
