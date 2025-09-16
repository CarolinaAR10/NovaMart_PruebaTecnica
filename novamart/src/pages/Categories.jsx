// src/pages/Categories.jsx
import React, { useEffect, useMemo, useState } from "react";
import { listProducts, listCategories } from "../services/products";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import "../styles/categories.css";

export default function CategoriesPage() {
  const [raw, setRaw] = useState([]);
  const [cats, setCats] = useState([]); // ya no se usa para pintar el sidebar, pero lo dejo por si lo necesitas en otra parte
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // ===== Mapa -> IDs reales de tu API =====
  const FIGMA_MAP = [
    { label: "Electronics",       ids: [2] },      // Electronics
    { label: "Clothing",          ids: [4, 43] },  // chappal, category_B
    { label: "Home & Kitchen",    ids: [3, 5] },   // REST-Update... (muebles) + Miscellaneous (hogar)
    { label: "Books",             ids: [3] },      // “Book” llega con category id=3
    { label: "Sports & Outdoors", ids: [84, 4] },  // Running Shoes (84) + chappal (4)
  ];

  // filtros
  // AHORA: checked por label (no por id): { "Electronics": true, ... }
  const [checked, setChecked] = useState({});
  const [price, setPrice] = useState({ min: 0, max: 999 });
  const [page, setPage] = useState(1);
  const perPage = 15;

  useEffect(() => {
    let cancel = false;
    (async () => {
      try {
        setLoading(true);
        setErr("");
        const [{ items }, categories] = await Promise.all([
          listProducts({ offset: 0, limit: 100 }),
          listCategories(),
        ]);
        if (!cancel) {
          setRaw(items || []);
          setCats(categories || []);
        }
      } catch (e) {
        if (!cancel) setErr(e?.message || "Error");
      } finally {
        if (!cancel) setLoading(false);
      }
    })();
    return () => {
      cancel = true;
    };
  }, []);

  // Filtrado: convierte labels seleccionados -> IDs y filtra productos
  const filtered = useMemo(() => {
    const selectedLabels = Object.keys(checked).filter((k) => checked[k]);
    const selectedIds = new Set(
      selectedLabels
        .map((lbl) => FIGMA_MAP.find((f) => f.label === lbl)?.ids || [])
        .flat()
    );

    return raw.filter((p) => {
      const catId = Number(p.category?.id);
      const catOk = selectedIds.size ? selectedIds.has(catId) : true;
      const priceOk =
        Number(p.price) >= Number(price.min) &&
        Number(p.price) <= Number(price.max);
      return catOk && priceOk;
    });
  }, [raw, checked, price]);

  const start = (page - 1) * perPage;
  const pageItems = filtered.slice(start, start + perPage);
  const pages = Math.max(1, Math.ceil(filtered.length / perPage));

  // Toggle por label
  const toggleLabel = (label) =>
    setChecked((s) => ({ ...s, [label]: !s[label] }));

  const applyFilters = (e) => {
    e?.preventDefault?.();
    setPage(1);
  };

  return (
    <main className="cat-page">
      <div className="cat-container">
        {err && <div className="cat-alert">{err}</div>}

        <div className="cat-wrap">
          {/* Sidebar */}
          <aside className="cat-aside">
            <div className="cat-card">
              <h3 className="cat-title">Categories</h3>

              {/* SIEMPRE mostramos las 5 del Figma */}
              <div className="cat-checks">
                {FIGMA_MAP.map(({ label }) => (
                  <label key={label} className="cat-check">
                    <input
                      type="checkbox"
                      checked={!!checked[label]}
                      onChange={() => toggleLabel(label)}
                    />
                    <span>{label}</span>
                  </label>
                ))}
              </div>

              <div className="cat-price">
                <h4 className="cat-subtitle">Price Range</h4>
                <div className="cat-range">
                  <input
                    type="range"
                    min="0"
                    max="999"
                    step="1"
                    value={price.min}
                    onChange={(e) =>
                      setPrice((p) => ({
                        ...p,
                        min: Math.min(Number(e.target.value), p.max),
                      }))
                    }
                  />
                  <input
                    type="range"
                    min="0"
                    max="999"
                    step="1"
                    value={price.max}
                    onChange={(e) =>
                      setPrice((p) => ({
                        ...p,
                        max: Math.max(Number(e.target.value), p.min),
                      }))
                    }
                  />
                  <div className="cat-range-labels">
                    <span>${price.min}</span>
                    <span>${price.max}</span>
                  </div>
                </div>

                <button onClick={applyFilters} className="cat-btn">
                  Apply Filters
                </button>
              </div>
            </div>
          </aside>

          {/* Listado */}
          <section className="cat-content">
            <h2 className="cat-h2">Products by category</h2>

            {loading ? (
              <div className="cat-grid">
                {Array.from({ length: perPage }).map((_, i) => (
                  <div key={i} className="cat-skel" />
                ))}
              </div>
            ) : (
              <>
                <div className="cat-grid">
                  {pageItems.map((p) => (
                    <div key={p.id} className="cat-item">
                      <ProductCard product={p} />
                    </div>
                  ))}
                </div>
                <Pagination page={page} pages={pages} onChange={setPage} />
              </>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
