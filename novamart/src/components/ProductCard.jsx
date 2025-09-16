// src/components/ProductCard.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="rounded-2xl bg-white shadow-sm hover:shadow-md transition overflow-hidden">
      <Link to={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.title}
          className="h-48 w-full object-cover"
          loading="lazy"
          onError={(e) => { e.currentTarget.src = "https://placehold.co/640x480?text=No+image"; }}
        />
      </Link>
      <div className="p-4">
        <h3 className="text-[15px] text-gray-800 line-clamp-2">{product.title}</h3>
        <p className="mt-1 text-[#2E6FF2] font-semibold">${Number(product.price).toFixed(2)}</p>
      </div>
    </div>
  );
}
