import React, { useEffect, useMemo, useState } from "react";
import { listProducts, listCategories } from "../services/products";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import "../styles/categories.css";

export default function CategoriesPage() {
  // estado para guardar los productos sin filtrar
  const [raw, setRaw] = useState([]);
  // estado con las categorías que vienen de la API
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  // estado para mostrar/ocultar filtros en móvil
  const [showFilters, setShowFilters] = useState(false);

  // mapa que relaciona etiquetas con ids de categorías (simulación tipo figma)
  const FIGMA_MAP = [
    { label: "Electronics",       ids: [2] },
    { label: "Clothing",          ids: [4, 43] },
    { label: "Home & Kitchen",    ids: [3, 5] },
    { label: "Books",             ids: [3] },
    { label: "Sports & Outdoors", ids: [84, 4] },
  ];

  // estado de checkboxes (categorías seleccionadas)
  const [checked, setChecked] = useState({});
  // estado del rango de precios
  const [price, setPrice] = useState({ min: 0, max: 999 });
  // estado de la paginación
  const [page, setPage] = useState(1);
  const perPage = 15; // productos por página

  // cargamos productos y categorías al montar el componente
  useEffect(() => {
    let cancel = false;
    (async () => {
      try {
        setLoading(true);
        setErr("");
        const [{ items }, categories] = await Promise.all([
          listProducts({ offset: 0, limit: 100 }), // pedimos hasta 100 productos
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
      cancel = true; // cleanup para evitar actualizar estado desmontado
    };
  }, []);

  // aplicamos filtros en memoria (categorías y precios)
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

  // productos a mostrar en la página actual
  const start = (page - 1) * perPage;
  const pageItems = filtered.slice(start, start + perPage);
  const pages = Math.max(1, Math.ceil(filtered.length / perPage));

  // alterna un checkbox de categoría
  const toggleLabel = (label) =>
    setChecked((s) => ({ ...s, [label]: !s[label] }));

  // aplica filtros y reinicia a página 1
  const applyFilters = (e) => {
    e?.preventDefault?.();
    setPage(1);
    if (window.innerWidth <= 780) {
      setShowFilters(false);
    }
  };

  return (
    <main className="cat-page">
      <div className="cat-container">
        {err && <div className="cat-alert">{err}</div>}

        {/* Botón para mostrar filtros en móviles */}
        <button 
          className="mobile-filter-btn"
          onClick={() => setShowFilters(!showFilters)}
        >
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>

        <div className="cat-wrap">
          {/* Sidebar - Oculto en móviles por defecto */}
          <aside className={`cat-aside ${showFilters ? 'show-filters' : ''}`}>
            <div className="cat-card">
              <h3 className="cat-title">Categories</h3>

              {/* checkboxes de categorías */}
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

              {/* rango de precios */}
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

          {/* Listado de productos */}
          <section className="cat-content">
            <h2 className="cat-h2">Products by category</h2>

            {loading ? (
              // esqueletos mientras carga
              <div className="cat-grid">
                {Array.from({ length: perPage }).map((_, i) => (
                  <div key={i} className="cat-skel" />
                ))}
              </div>
            ) : (
              <>
                {/* grid de productos */}
                <div className="cat-grid">
                  {pageItems.map((p) => (
                    <div key={p.id} className="cat-item">
                      <ProductCard product={p} compact={true} />
                    </div>
                  ))}
                </div>
                {/* paginación */}
                <Pagination page={page} pages={pages} onChange={setPage} />
              </>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
