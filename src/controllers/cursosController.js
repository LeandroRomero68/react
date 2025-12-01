import { getCursos, getCursoById, createCurso, updateCurso, deleteCurso } from "../api/cursosService.js";

export const CursosController = {
  listar: async () => await getCursos(),
  
  detalle: async (id) => await getCursoById(id),

  crear: async (curso) => await createCurso(curso),

  editar: async (id, curso) => await updateCurso(id, curso),

  eliminar: async (id) => await deleteCurso(id)
}