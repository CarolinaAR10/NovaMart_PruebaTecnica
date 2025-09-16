import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById, relatedById, pickImage } from "../services/products";
import { useCart } from "../context/CartContext";
import { money } from "../lib/format";
import ProductCard from "../components/ProductCard";
import "../styles/detail.css";

export default function ProductDetail() {
  const { id } = useParams();                  // id que viene de la URL
  const [product, setProduct] = useState(null); // producto actual
  const [related, setRelated] = useState([]);   // productos relacionados
  const [qty, setQty] = useState(1);            // cantidad seleccionada
  const [err, setErr] = useState("");           // mensaje de error (si algo falla)
  const { add } = useCart();                    // función para agregar al carrito

  // Calificaciones estáticas
  const rating = { avg: 4.5, total: 120, dist: { 5: 40, 4: 30, 3: 15, 2: 10, 1: 5 } };

  // carga los datos del producto y los relacionados cuando cambia el id
  useEffect(() => {
    let cancel = false;
    (async () => {
      try {
        setErr("");
        const p = await getProductById(id);          // pide el producto por id
        const rel = (await relatedById?.(id)) ?? []; // pide relacionados (si existe la función)
        if (!cancel) {
          setProduct(p);
          setRelated(rel || []);
        }
      } catch (e) {
        if (!cancel) setErr(e?.message || "Error loading product");
      }
    })();
    return () => {
      cancel = true; // evita actualizar estado si el componente ya no está montado
    };
  }, [id]);

  // saca la mejor imagen disponible del producto
  const img = useMemo(() => (product ? pickImage(product) : ""), [product]);
  // nombre de la categoría (fallback si no viene)
  const categoryName = product?.category?.name || "Uncategorized";

  // vista de error
  if (err) {
    return (
      <main className="detail">
        <div className="detail-container">
          <div className="alert alert--error">{err}</div>
        </div>
      </main>
    );
  }

  // esqueleto/cargando mientras no hay producto
  if (!product) {
    return (
      <main className="detail">
        <div className="detail-container">
          <div className="skeleton" />
        </div>
      </main>
    );
  }

  return (
    <main className="detail">
      <div className="detail-container">
        {/* Top layout */}
        <section className="detail-top">
          {/* Media */}
          <div className="detail-media">
            <div className="detail-mediaCard">
              <img
                src={img}
                alt={product.title}
                className="detail-mediaImg"
                onError={(e) => {
                  // si falla la imagen, muestra un placeholder grande
                  e.currentTarget.src = "https://placehold.co/1200x1200?text=No+image";
                }}
              />
            </div>
          </div>

          {/* Info panel */}
          <div className="detail-info">
            {/* título del producto */}
            <h1 className="detail-title">{product.title}</h1>

            {/* descripción (si no hay, mete un texto de relleno corto) */}
            <p className="detail-description">
              {product.description ||
                "A sleek and efficient item for your daily needs. Combines modern design with practical functionality, making it a perfect addition to any setup."}
            </p>

            {/* Price */}
            <div className="detail-price">{money(product.price)}</div>

            {/* Qty + Add to cart */}
            <div className="detail-buyRow">
              {/* selector de cantidad (1 a 10) */}
              <div className="select">
                <select
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value))}
                  className="select-input"
                >
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
                <span className="select-caret" aria-hidden>
                  ▾
                </span>
              </div>

              {/* botón para agregar al carrito con la cantidad seleccionada */}
              <button
                onClick={() =>
                  add({ id: product.id, title: product.title, price: product.price, qty })
                }
                className="btn btn--primary"
              >
                Add to Cart
              </button>
            </div>

            {/* Category */}
            <p className="detail-meta">
              <span className="detail-metaKey">Category:</span> {categoryName}
            </p>

            {/* Ratings */}
            <div className="detail-ratings">
              {/* bloque con promedio + estrellas + total de reviews */}
              <div className="detail-scoreBlock">
                <div className="detail-score">{rating.avg}</div>
                <div className="detail-stars">
                  {[1, 2, 3, 4].map((i) => (
                    <span key={i} className="star star--full">★</span>
                  ))}
                  <span className="star star--muted">★</span>
                </div>
                <p className="detail-reviews">{rating.total} reviews</p>
              </div>

              {/* barras por cada estrella (5 a 1) */}
              <div className="detail-bars">
                {[5, 4, 3, 2, 1].map((n) => (
                  <div key={n} className="bars-row">
                    <span className="bars-label">{n}</span>
                    <div className="bars-track">
                      <div
                        className="bars-fill"
                        style={{ width: `${rating.dist[n]}%` }} // ancho según porcentaje
                      />
                    </div>
                    <span className="bars-perc">{rating.dist[n]}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section className="detail-related">
            <h2 className="detail-relatedTitle">Related products</h2>
            <div className="related-grid">
              {related.map((r) => (
                <ProductCard key={r.id} product={r} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
