import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchProducts } from "../services/products";
import ProductCard from "../components/ProductCard";

export default function Search() {
  const [params] = useSearchParams();
  const q = (params.get("q") || "").trim();
  const [items, setItems] = useState([]); const [loading, setLoading] = useState(true); const [err, setErr] = useState("");

  useEffect(()=>{
    let cancel=false;
    (async()=>{
      try{
        setLoading(true); setErr("");
        const res = await searchProducts(q, { limitPool: 100 });
        if(!cancel) setItems(res);
      }catch(e){ if(!cancel) setErr(e?.message||"Error"); }
      finally{ if(!cancel) setLoading(false); }
    })();
    return ()=>{ cancel=true; };
  },[q]);

  return (
    <main className="bg-[#F7FAFC] min-h-screen">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <h1 className="mb-6 text-xl font-semibold">Resultados para: <span className="text-[#2E6FF2]">“{q}”</span></h1>
        {err && <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">{err}</div>}
        {loading ? <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">{Array.from({length:10}).map((_,i)=><div key={i} className="h-64 rounded-2xl bg-gray-200 animate-pulse"/>)}</div>
        : items.length===0 ? <p className="text-gray-600">No se encontraron productos.</p>
        : <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">{items.map(p=><ProductCard key={p.id} product={p}/>)}</div>}
      </div>
    </main>
  );
}
