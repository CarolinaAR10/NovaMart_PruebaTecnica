import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    // tarjeta del producto con estilos de borde y sombra
    <div className="rounded-2xl bg-white shadow-sm hover:shadow-md transition overflow-hidden">
      {/* enlace a la página de detalle del producto */}
      <Link to={`/product/${product.id}`}>
        <img
          src={product.image}                      // imagen del producto, ojito, algunos no tienen imagen :,v
          alt={product.title}                      // texto de titulo
          className="h-48 w-full object-cover"     // alto fijo, cubre el ancho
          loading="lazy"                           // carga diferida para optimizar
          onError={(e) => {                        // si falla la carga, muestra un placeholder
            e.currentTarget.src = "https://placehold.co/640x480?text=No+image";
          }}
        />
      </Link>

      {/* info del producto */}
      <div className="p-4">
        {/* título con máximo de 2 líneas */}
        <h3 className="text-[15px] text-gray-800 line-clamp-2">
          {product.title}
        </h3>
        {/* precio en azul con 2 decimales */}
        <p className="mt-1 text-[#2E6FF2] font-semibold">
          ${Number(product.price).toFixed(2)}
        </p>
      </div>
    </div>
  );
}
