import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Contenido dinámico */}
      <main className="flex-grow w-full">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
