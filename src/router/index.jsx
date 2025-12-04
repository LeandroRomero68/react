import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/Layout.jsx";
import Home from "../pages/Home.jsx";
import CursosList from "../pages/CursosList.jsx";
import CursoForm from "../pages/CursoForm.jsx";
import CursoDetalle from "../pages/CursoDetalle.jsx";
import CursoEditar from "../pages/CursoEditar.jsx";
import LoginView from "../auth/LoginView.jsx";
import RegisterView from "../auth/RegisterView.jsx";
import AdminCompras from "../pages/AdminCompras.jsx";
import PerfilView from "../pages/PerfilView.jsx";

export const router = createBrowserRouter([
  {
    element: <Layout />, 
    children: [
      { path: "/", element: <Home /> },
      { path: "/cursos", element: <CursosList /> },
      { path: "/cursos/nuevo", element: <CursoForm /> },
      { path: "/cursos/:id", element: <CursoDetalle /> },
      { path: "/cursos/editar/:id", element: <CursoEditar /> },
      { path: "/login", element: <LoginView /> },
      { path: "/register", element: <RegisterView /> },
      { path: "/compras", element: <AdminCompras /> },
      { path: "/perfil", element: <PerfilView /> },
    ],
  },
]);
