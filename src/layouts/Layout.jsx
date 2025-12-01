// src/layouts/Layout.jsx
import Navbar from "../components/Navbar.jsx";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <Navbar />
      <main className="pt-24 p-4 w-full">
        <Outlet />
      </main>
    </div>
  );
}
