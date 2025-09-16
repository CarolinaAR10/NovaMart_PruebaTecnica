import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchProducts } from "../services/products";
import ProductCard from "../components/ProductCard";
import "../styles/search.css"; // no se les olvide jalar estilos como se me olvido a mi

export default function Search() {
  const [params] = useSearchParams();
  const q = (params.get("q") || "").trim(); // saca el valor de ?q= de la URL

  // estado para resultados
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // efecto para buscar productos cuando cambia q
  useEffect(() => {
    let cancel = false;
    (async () => {
      try {
        setLoading(true);
        setErr("");
        const res = await searchProducts(q, { limitPool: 100 }); // busca en el "pool"
        if (!cancel) setItems(res);
      } catch (e) {
        if (!cancel) setErr(e?.message || "Error");
      } finally {
        if (!cancel) setLoading(false);
      }
    })();
    return () => { cancel = true; }; // cleanup si desmonta
  }, [q]);

  return (
    <main className="min-h-screen" style={{ background: "#F7FAFC" }}>
      <div className="srch-container">
        <h1 className="mb-6 text-xl font-semibold">
          Resultados para: <span style={{ color: "#2E6FF2" }}>“{q}”</span>
        </h1>

        {/* si hay error lo mostramos en una cajita roja */}
        {err && (
          <div
            className="mb-6"
            style={{
              borderRadius: 8,
              border: "1px solid #fecaca",
              background: "#fef2f2",
              padding: "12px 16px",
              color: "#b91c1c",
            }}
          >
            {err}
          </div>
        )}

        {/* resultados */}
        {loading ? (
          // esqueletos mientras carga
          <div className="srch-grid">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="srch-skeleton" />
            ))}
          </div>
        ) : items.length === 0 ? (
          // mensaje si no se encuentra nada
          <p className="text-gray-600">No se encontraron productos.</p>
        ) : (
          // grilla con tarjetas de productos
          <div className="srch-grid">
            {items.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
