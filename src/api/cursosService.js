const BASE_URL = "http://localhost:3000/api/cursos";


function getToken() {
  return localStorage.getItem("token");
}


async function handleResponse(res) {
  const text = await res.text();


  if (!res.ok) {
    throw new Error(`Error API: ${text}`);
  }
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

export async function getCursos() {
  const res = await fetch(BASE_URL);
  const json = await handleResponse(res);
  return json?.data;
}

export async function getCursoById(id) {
  const res = await fetch(`${BASE_URL}/${id}`);
  const json = await handleResponse(res);
  return json?.data;
}

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
