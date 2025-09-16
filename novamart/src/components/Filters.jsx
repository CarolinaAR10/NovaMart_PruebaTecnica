import React from "react";

export default function Filters({ categories, values, onChange }) {
  const set = (k,v)=>onChange({ ...values, [k]: v });

  return (
    <div className="mb-6 flex flex-wrap items-center gap-3">
      <select value={values.categoryId ?? ""} onChange={(e)=>set("categoryId", e.target.value || null)} className="border rounded-md px-3 py-2">
        <option value="">Todas las categorías</option>
        {categories.map(c=> <option key={c.id} value={c.id}>{c.name}</option>)}
      </select>

      <input type="number" placeholder="Precio min" value={values.min ?? ""} onChange={(e)=>set("min", e.target.value)} className="w-32 border rounded-md px-3 py-2"/>
      <input type="number" placeholder="Precio max" value={values.max ?? ""} onChange={(e)=>set("max", e.target.value)} className="w-32 border rounded-md px-3 py-2"/>
      <button onClick={()=>onChange({ categoryId:null, min:"", max:"" })} className="px-3 py-2 rounded-md border hover:bg-gray-50">Limpiar</button>
    </div>
  );
}
