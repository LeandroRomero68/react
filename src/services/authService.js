const API_URL = "http://localhost:3000/api/usuarios";

export async function registerService(userData) {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await res.json();
    return data.data || data;
  } catch (error) {
    console.error("Error al registrar:", error);
    return null;
  }
}
