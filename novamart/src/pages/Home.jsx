// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { listProducts } from "../services/products";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";

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
        const { items } = await listProducts({ offset: 0, limit: 50 });
        if (!cancel) setItems(items);
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
    <main className="bg-[#F7FAFC] min-h-screen pb-20">
      <div className="mx-auto max-w-7xl px-6 py-10">
        {err && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
            {err}
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {Array.from({ length: perPage }).map((_, i) => (
              <div key={i} className="h-64 rounded-2xl bg-gray-200 animate-pulse" />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {pageItems.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>

            <Pagination page={page} pages={pages} onChange={setPage} />
          </>
        )}
      </div>
    </main>
  );
}
