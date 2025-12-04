import comprasService from "../services/comprasService";
import Compra from "../models/Compra";

export default {
  async listCompras(filters = {}) {
    const data = await comprasService.getCompras(filters);

    if (Array.isArray(data)) {
      return data.map(item => new Compra(item));
    }

    if (data && Array.isArray(data.data)) {
      return data.data.map(item => new Compra(item));
    }
    return [];
  },

  async getCompra(id) {
    const data = await comprasService.getCompraById(id);
    return new Compra(data);
  },

  async crearCompra(payload) {
    const data = await comprasService.createCompra(payload);
    return new Compra(data);
  },

  async actualizarCompra(id, payload) {
    const data = await comprasService.updateCompra(id, payload);
    return new Compra(data);
  },

  async eliminarCompra(id) {
    const data = await comprasService.deleteCompra(id);
    return data;
  }
};
