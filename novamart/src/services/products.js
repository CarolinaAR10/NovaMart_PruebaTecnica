import api from "./api";

// helpers para validar urls
const isHttp = (u) => typeof u === "string" && /^https?:\/\//i.test(u);
const isPlaceholderUrl = (u = "") =>
  /placehold\.co|picsum\.photos|loremflickr|via\.placeholder/i.test(u);

// elige la mejor imagen disponible de un producto
export const pickImage = (p) => {
  if (Array.isArray(p?.images)) {
    // busca primero una imagen válida que no sea placeholder
    const good = p.images.find((u) => isHttp(u) && !isPlaceholderUrl(u));
    if (good) return good;
    // si no encuentra, devuelve cualquier url válida
    const any = p.images.find(isHttp);
    if (any) return any;
  }
  // si solo hay un campo "image" lo valida igual
  if (isHttp(p?.image) && !isPlaceholderUrl(p.image)) return p.image;
  return null;
};

// normaliza producto → le asigna una sola imagen confiable
export const normalize = (p) => ({ ...p, image: pickImage(p) });

// lista de productos con paginación (offset, limit)
export async function listProducts({ offset = 0, limit = 20 } = {}) {
  const { data } = await api.get("/products", { params: { offset, limit } });
  // normaliza y filtra solo los que tienen imagen
  const items = data.map(normalize).filter((p) => !!p.image);
  return { items, total: 50 }; // según doc: lista de 50
}

// obtiene un producto por su id
export async function getProductById(id) {
  const { data } = await api.get(`/products/${id}`);
  return normalize(data);
}

// busca productos que coincidan con el término (title o description)
export async function searchProducts(term, { limitPool = 100 } = {}) {
  const q = (term || "").toLowerCase();
  const { data } = await api.get("/products", {
    params: { offset: 0, limit: limitPool },
  });
  return data
    .filter(
      (p) =>
        p.title?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q)
    )
    .map(normalize)
    .filter((p) => !!p.image);
}

// productos relacionados por id
export async function relatedById(id) {
  const { data } = await api.get(`/products/${id}/related`);
  return data.map(normalize).filter((p) => !!p.image);
}

// lista de categorías
export async function listCategories() {
  const { data } = await api.get("/categories");
  return data; // [{id, name, image, slug}, ...]
}
