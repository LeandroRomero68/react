const API_URL = `${import.meta.env.VITE_API_URL}/usuarios/login`;

export async function loginService({ email, password }) {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const text = await res.text();
    try {
      const json = JSON.parse(text);
      return { ok: res.ok, status: res.status, data: json };
    } catch {
      return { ok: res.ok, status: res.status, data: text };
    }
  } catch (error) {
    console.error("loginService error:", error);
    return { ok: false, error: error.message || error };
  }
}
