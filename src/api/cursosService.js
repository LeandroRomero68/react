const BASE_URL = "http://localhost:3000/api/cursos";

// ============================
// Obtener token JWT
// ============================
function getToken() {
  return localStorage.getItem("token");
}

// ============================
// Manejo global de respuestas
// ============================
async function handleResponse(res) {
  const text = await res.text();

  // Si la API devolvió error
  if (!res.ok) {
    throw new Error(`Error API: ${text}`);
  }

  // Intentar parsear a JSON (algunos endpoints devuelven vacío)
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

// ============================
//  GET: Todos los cursos
// ============================
export async function getCursos() {
  const res = await fetch(BASE_URL);
  const json = await handleResponse(res);
  return json?.data;
}

// ============================
//  GET: Curso por ID
// ============================
export async function getCursoById(id) {
  const res = await fetch(`${BASE_URL}/${id}`);
  const json = await handleResponse(res);
  return json?.data;
}

// ============================
//  POST: Crear curso (solo ADMIN)
// ============================
export async function createCurso(data) {
  const token = getToken();

  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(data),
  });

  const json = await handleResponse(res);
  return json?.data;
}

// ============================
//  PUT: Editar curso (solo ADMIN)
// ============================
export async function updateCurso(id, data) {
  const token = getToken();

  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(data),
  });

  const json = await handleResponse(res);
  return json?.data;
}

// ============================
//  DELETE: Eliminar curso (solo ADMIN)
// ============================
export async function deleteCurso(id) {
  const token = getToken();

  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  const json = await handleResponse(res);
  return json?.data;
}
