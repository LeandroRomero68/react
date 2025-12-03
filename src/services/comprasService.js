// src/services/comprasService.js
import axios from "axios";

const BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

const api = axios.create({
  baseURL: BASE,
  headers: { "Content-Type": "application/json" },
  timeout: 10000
});

export default {
  // Obtener compras del usuario logueado
  async getMisCursos(token) {
    const res = await api.get("/compras/mis-cursos", {
      headers: {
        Authorization: `Bearer ${token}`, // 🔥 necesario para authMiddleware
      },
    });

    return res.data.compras; // 👈 este es el campo correcto
  },

  createCompra(payload) {
    return api.post("/compras", payload).then(r => r.data);
  },

  getCompras() {
    return api.get("/compras").then(r => r.data);
  },

  deleteCompra(id) {
    return api.delete(`/compras/${id}`).then(r => r.data);
  }
};
