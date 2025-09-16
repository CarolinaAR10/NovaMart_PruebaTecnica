import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchProducts } from "../services/products";
import ProductCard from "../components/ProductCard";
import "../styles/search.css"; // 👈 importa los estilos

export default function Search() {
  const [params] = useSearchParams();
  const q = (params.get("q") || "").trim();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let cancel = false;
    (async () => {
      try {
        setLoading(true);
        setErr("");
        const res = await searchProducts(q, { limitPool: 100 });
        if (!cancel) setItems(res);
      } catch (e) {
        if (!cancel) setErr(e?.message || "Error");
      } finally {
        if (!cancel) setLoading(false);
      }
    })();
    return () => { cancel = true; };
  }, [q]);

  return (
    <main className="min-h-screen" style={{ background: "#F7FAFC" }}>
      <div className="srch-container">
        <h1 className="mb-6 text-xl font-semibold">
          Resultados para: <span style={{ color: "#2E6FF2" }}>“{q}”</span>
        </h1>

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

        {loading ? (
          <div className="srch-grid">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="srch-skeleton" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <p className="text-gray-600">No se encontraron productos.</p>
        ) : (
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
