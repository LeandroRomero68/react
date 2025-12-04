import axios from "axios";

const BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

const api = axios.create({
  baseURL: BASE,
  headers: { "Content-Type": "application/json" },
  timeout: 10000
});

export default {
  getCompras() {
    return api.get("/compras").then(r => r.data);
  },

  async getMisCursos(token) {
    const res = await api.get("/compras/mis-cursos", {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data.compras;
  },

  createCompra(payload) {
    return api.post("/compras", payload).then(r => r.data);
  },

  deleteCompra(id) {
    return api.delete(`/compras/${id}`).then(r => r.data);
  },

  getCompraById(id) {
    return api.get(`/compras/${id}`).then(r => r.data);
  },
  
   updateCompra(id, payload) {
    return api.put(`/compras/${id}`, payload).then(r => r.data);
  }
};
