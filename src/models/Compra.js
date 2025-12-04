export default class Compra {
  constructor({
    _id = null,
    usuario = null,
    curso = null,
    metodoPago = "",
    estado = "debe",
    createdAt = null,
    updatedAt = null,
    ...rest
  } = {}) {
    this.id = _id || null;
    this.usuario = usuario;
    this.curso = curso;
    this.metodoPago = metodoPago;
    this.estado = estado;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    Object.assign(this, rest);
  }
}
