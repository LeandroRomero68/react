const BASE_URL = "http://localhost:3000/api/cursos";

// Manejo centralizado de errores y respuesta
async function handleResponse(res) {
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(`Error API: ${msg}`);
  }
  return res.json();
}

export async function getCursos() {
  const res = await fetch(BASE_URL);
  const json = await handleResponse(res);
  return json.data; // ⬅ devolvemos SOLO el array real
}

export async function getCursoById(id) {
  const res = await fetch(`${BASE_URL}/${id}`);
  const json = await handleResponse(res);
  return json.data; // ⬅ devolvemos solo el objeto real
}

export async function createCurso(data) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  const json = await handleResponse(res);
  return json.data; // ⬅ curso creado
}

export async function updateCurso(id, data) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  const json = await handleResponse(res);
  return json.data;
}

export async function deleteCurso(id) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE"
  });
  const json = await handleResponse(res);
  return json.data;
}
