import React from "react";

// Componente Filters: sirve para filtrar productos por categoría y precio
export default function Filters({ categories, values, onChange }) {

  // función rápida para cambiar un valor del filtro
  const set = (k, v) => onChange({ ...values, [k]: v });

  return (
    <div className="mb-6 flex flex-wrap items-center gap-3">
      
      {/* combo para escoger la categoría */}
      <select
        value={values.categoryId ?? ""}  
        onChange={(e) => set("categoryId", e.target.value || null)}
        className="border rounded-md px-3 py-2"
      >
        <option value="">Todas las categorías</option>
        {/* recorre las categorías y crea las opciones */}
        {categories.map(c => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>

      {/* caja para precio mínimo */}
      <input
        type="number"
        placeholder="Precio min"
        value={values.min ?? ""}
        onChange={(e) => set("min", e.target.value)}
        className="w-32 border rounded-md px-3 py-2"
      />

      {/* caja para precio máximo */}
      <input
        type="number"
        placeholder="Precio max"
        value={values.max ?? ""}
        onChange={(e) => set("max", e.target.value)}
        className="w-32 border rounded-md px-3 py-2"
      />

      {/* botón para resetear todo */}
      <button
        onClick={() => onChange({ categoryId: null, min: "", max: "" })}
        className="px-3 py-2 rounded-md border hover:bg-gray-50"
      >
        Limpiar
      </button>
    </div>
  );
}
