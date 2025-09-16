import React, { useEffect, useState } from "react";
import { listProducts } from "../services/products";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import hero from "../assets/login.jpg";
import "../styles/home.css";

export default function Home() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [page, setPage] = useState(1);

  const perPage = 15;

  useEffect(() => {
    let cancel = false;
    (async () => {
      try {
        setLoading(true);
        setErr("");
        const { items } = await listProducts({ offset: 0, limit: 60 });
        if (!cancel) setItems(items || []);
      } catch (e) {
        if (!cancel) setErr(e?.message || "Error");
      } finally {
        if (!cancel) setLoading(false);
      }
    })();
    return () => { cancel = true; };
  }, []);

  const start = (page - 1) * perPage;
  const pageItems = items.slice(start, start + perPage);
  const pages = Math.max(1, Math.ceil(items.length / perPage));

  return (
    <main className="home-page">
      <div className="home-wrap">

        {err && <div className="home-alert">{err}</div>}

        {/* HERO debajo del buscador del navbar */}
        <section className="home-hero">
          <img src={hero} alt="Find what you need at NovaMart" />
          <div className="home-hero-copy">
            <h2>Find what you need at<br/>NovaMart</h2>
          </div>
        </section>

        {/* Si tienes sección de categorías, se colocaria aquí */}

        <header className="home-head">
          <h1 className="home-title">Featured Products</h1>
        </header>

        {/* GRID de productos, por que todo lleva orden */}
        {loading ? (
          <div className="home-grid">
            {Array.from({ length: perPage }).map((_, i) => (
              <div key={i} className="home-skel">
                <div className="home-skel-img" />
                <div className="home-skel-line" />
                <div className="home-skel-line short" />
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="home-grid">
              {pageItems.map((p) => (
                <div key={p.id} className="home-card">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>

            <Pagination page={page} pages={pages} onChange={setPage} />
          </>
        )}
      </div>
    </main>
  );
}
