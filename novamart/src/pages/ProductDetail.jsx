import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById, relatedById, pickImage } from "../services/products";
import { useCart } from "../context/CartContext";
import { money } from "../lib/format";
import ProductCard from "../components/ProductCard";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [qty, setQty] = useState(1);
  const [err, setErr] = useState("");
  const { add } = useCart();

  {/* Calificaciones estaticas */}
  const rating = { avg: 4.5, total: 120, dist: { 5: 40, 4: 30, 3: 15, 2: 10, 1: 5 } };

  useEffect(() => {
    let cancel = false;
    (async () => {
      try {
        setErr("");
        const p = await getProductById(id);
        const rel = await relatedById?.(id) ?? [];
        if (!cancel) {
          setProduct(p);
          setRelated(rel || []);
        }
      } catch (e) {
        if (!cancel) setErr(e?.message || "Error loading product");
      }
    })();
    return () => { cancel = true; };
  }, [id]);

  const img = useMemo(() => (product ? pickImage(product) : ""), [product]);
  const categoryName = product?.category?.name || "Uncategorized";

  if (err) return <main className="p-6"><div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">{err}</div></main>;
  if (!product) return <main className="p-6"><div className="h-80 rounded-2xl bg-gray-200 animate-pulse" /></main>;

  return (
    <main className="bg-[#F7FAFC] min-h-screen">
      <div className="mx-auto max-w-7xl py-10">
        {/* Top layout */}
        <section className="grid grid-cols-1 lg:grid-cols-[minmax(0,620px)_1fr] gap-10">
          {/* Left: main image + caption */}
          <div>
            <div className="rounded-2xl overflow-hidden bg-white shadow-sm">
              <img
                src={img}
                alt={product.title}
                className="w-full aspect-square object-cover"
              />
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-semibold">{product.title}</h3>
              <p className=" text-gray-600">
                {product.description || "A sleek and efficient product for your daily needs."}
              </p>
            </div>
          </div>

          {/* Right: info panel */}
          <div className="pt-1">
            <h1 className="text-[32px] leading-tight font-extrabold tracking-tight">{product.title}</h1>

            <p className="mt-4 text-gray-700 max-w-prose">
              {product.description ||
                "A sleek and efficient item for your daily needs. Combines modern design with practical functionality, making it a perfect addition to any setup."}
            </p>

            {/* Price */}
            <div className="mt-6 text-[28px] font-bold">{money(product.price)}</div>

            {/* Qty select + Add to cart */}
            <div className="mt-4 flex items-center gap-3">
              <div className="relative w-64">
                <select
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value))}
                  className="w-full appearance-none border border-gray-600 bg-white px-3 py-2 pr-10 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2E6FF2]/20"
                >
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
                {/* caret */}
                <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-gray-500">
                  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M10 12l-4-4h8l-4 4z" /></svg>
                </span>
              </div>

              <button
                onClick={() =>
                  add({ id: product.id, title: product.title, price: product.price, qty })
                }
                className="rounded-md bg-[#2E6FF2] px-4 py-2 text-white font-medium hover:brightness-95"
              >
                Add to Cart
              </button>
            </div>

            {/* Category */}
            <p className="mt-4 text-sm text-gray-600">
              <span className="font-medium">Category:</span> {categoryName}
            </p>

            {/* Ratings block */}
            <div className="mt-8">
              <div className="flex items-end gap-4">
                <div>
                  <div className="text-3xl font-extrabold">{rating.avg}</div>
                  <div className="mt-1 flex items-center gap-1 text-[#2E6FF2]">
                    {/* 4 filled + 1 outline */}
                    {[1, 2, 3, 4].map((i) => (
                      <svg key={i} className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.803 2.037a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.803-2.037a1 1 0 00-1.176 0l-2.803 2.037c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.88 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <svg className="h-5 w-5 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.803 2.037a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.803-2.037a1 1 0 00-1.176 0l-2.803 2.037c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.88 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">{rating.total} reviews</p>
                </div>

                {/* Bars */}
                <div className="flex-1 space-y-3">
                  {[5, 4, 3, 2, 1].map((n) => (
                    <div key={n} className="flex items-center gap-3 text-sm">
                      <span className="w-4 text-right">{n}</span>
                      <div className="relative h-2 flex-1 rounded-full bg-gray-200 overflow-hidden">
                        <div
                          className="absolute left-0 top-0 h-2 bg-[#2E6FF2]"
                          style={{ width: `${rating.dist[n]}%` }}
                        />
                      </div>
                      <span className="w-10 text-right text-gray-500">{rating.dist[n]}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-4 text-xl font-semibold">Related products</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
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
