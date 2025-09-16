import api from "./api";

// función para iniciar sesión, obvio
export async function login({ email, password }) {
  // manda credenciales al backend
  const { data } = await api.post("/auth/login", { email, password });
  // guarda el token en localStorage
  localStorage.setItem("token", data.access_token);
  return data; // devuelve la respuesta (ej. usuario y token)
}

// obtiene el perfil del usuario logueado
export async function profile() {
  const { data } = await api.get("/auth/profile");
  return data;
}

// cierra sesión eliminando el token guardado
export function logout() {
  localStorage.removeItem("token");
}
