import React from "react";

export default function Categories() {
  const categories = ["Electronics", "Clothing", "Home & Kitchen", "Books", "Sports"];
  return (
    <main className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>
      <div className="flex gap-3 overflow-x-auto mb-6">
        {categories.map(c => <div key={c} className="bg-white px-4 py-3 rounded-lg shadow-sm">{c}</div>)}
      </div>
      <p className="text-gray-500">(Aquí se presentará el grid filtrado por categoría.)</p>
    </main>
  );
}
