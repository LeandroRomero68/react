// src/services/comprasService.js
import axios from "axios";

const BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

const api = axios.create({
  baseURL: BASE,
  headers: {
    "Content-Type": "application/json"
  },
  timeout: 10000
});

export default {
  // GET /api/compras
  async getCompras(params = {}) {
    const res = await api.get("/compras", { params });
    return res.data;
  },

  // GET /api/compras/:id
  async getCompraById(id) {
    const res = await api.get(`/compras/${id}`);
    return res.data;
  },

  // ⭐ GET /api/compras/mis-cursos/:usuarioId
  async getComprasByUsuario(usuarioId) {
    const res = await api.get(`/compras/mis-cursos/${usuarioId}`);

    // Devuelve directamente el array de compras poblado
    return res.data.compras || [];
  },

  // POST /api/compras
  async createCompra(payload) {
    const res = await api.post("/compras", payload);
    return res.data;
  },

  // PUT /api/compras/:id
  async updateCompra(id, payload) {
    const res = await api.put(`/compras/${id}`, payload);
    return res.data;
  },

  // DELETE /api/compras/:id
  async deleteCompra(id) {
    const res = await api.delete(`/compras/${id}`);
    return res.data;
  }
};
