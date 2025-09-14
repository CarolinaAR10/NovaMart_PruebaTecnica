import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-3 flex flex-col">
      <img src={product.image} alt={product.title} className="h-36 object-contain mb-3" />
      <h3 className="text-sm font-medium truncate">{product.title}</h3>
      <div className="mt-auto flex items-center justify-between">
        <span className="text-[#2E6FF2] font-semibold">${product.price}</span>
        <Link to={`/product/${product.id}`} className="bg-[#2E6FF2] text-white px-3 py-1 rounded-md text-sm">Ver más</Link>
      </div>
    </div>
  );
}
