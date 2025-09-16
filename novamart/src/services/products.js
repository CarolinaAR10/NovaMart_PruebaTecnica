import api from "./api";

const isHttp = (u) => typeof u === "string" && /^https?:\/\//i.test(u);
const isPlaceholderUrl = (u = "") => /placehold\.co|picsum\.photos|loremflickr|via\.placeholder/i.test(u);

export const pickImage = (p) => {
  if (Array.isArray(p?.images)) {
    const good = p.images.find((u) => isHttp(u) && !isPlaceholderUrl(u));
    if (good) return good;
    const any = p.images.find(isHttp);
    if (any) return any;
  }
  if (isHttp(p?.image) && !isPlaceholderUrl(p.image)) return p.image;
  return null;
};

export const normalize = (p) => ({ ...p, image: pickImage(p) });

export async function listProducts({ offset = 0, limit = 20 } = {}) {
  const { data } = await api.get("/products", { params: { offset, limit } });
  const items = data.map(normalize).filter((p) => !!p.image);
  return { items, total: 50 }; // según doc: lista de 50
}

export async function getProductById(id) {
  const { data } = await api.get(`/products/${id}`);
  return normalize(data);
}

export async function searchProducts(term, { limitPool = 100 } = {}) {
  const q = (term || "").toLowerCase();
  const { data } = await api.get("/products", { params: { offset: 0, limit: limitPool } });
  return data
    .filter(p => p.title?.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q))
    .map(normalize)
    .filter(p => !!p.image);
}

export async function relatedById(id) {
  const { data } = await api.get(`/products/${id}/related`);
  return data.map(normalize).filter(p => !!p.image);
}

export async function listCategories() {
  const { data } = await api.get("/categories");
  return data; // [{id, name, image, slug}, ...]
}
