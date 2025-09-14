import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { useCartDispatch } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const dispatch = useCartDispatch();

  useEffect(() => {
    api.get(`/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(console.error);
  }, [id]);

  if (!product) return <div className="p-6">Cargando producto...</div>;

  return (
    <main className="max-w-4xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded-lg p-4 flex items-center justify-center">
        <img src={product.image} alt={product.title} className="max-h-96 object-contain" />
      </div>

      <div>
        <h1 className="text-2xl font-bold">{product.title}</h1>
        <p className="text-gray-600 mt-2">{product.description}</p>
        <div className="mt-4">
          <span className="text-2xl font-bold text-[#2E6FF2]">${product.price}</span>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <div className="flex items-center border rounded">
            <button onClick={() => setQty(q => Math.max(1, q - 1))} className="px-3">-</button>
            <span className="px-4">{qty}</span>
            <button onClick={() => setQty(q => q + 1)} className="px-3">+</button>
          </div>

          <button
            onClick={() => dispatch({ type: "ADD", payload: { id: product.id, title: product.title, price: product.price, image: product.image, qty } })}
            className="bg-[#F97316] px-4 py-2 rounded text-white"
          >
            Add to Cart
          </button>
        </div>

        <div className="mt-4 text-sm text-gray-500">
          <p>Category: {product.category}</p>
          <p>Rating: {product.rating?.rate || "—"} ({product.rating?.count || 0})</p>
        </div>
      </div>
    </main>
  );
}
