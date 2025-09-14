import React from "react";
import { Link } from "react-router-dom";
import { useCart, useCartDispatch } from "../context/CartContext";

export default function Cart() {
  const { items } = useCart() || { items: [] };
  const dispatch = useCartDispatch();
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0).toFixed(2);

  return (
    <main className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>

      <div className="space-y-4">
        {items.length === 0 && <p>Tu carrito está vacío. <Link to="/" className="text-[#2E6FF2]">Ir a tienda</Link></p>}
        {items.map(item => (
          <div key={item.id} className="bg-white p-3 rounded-lg flex items-center gap-4">
            <img src={item.image} alt={item.title} className="w-20 h-20 object-contain" />
            <div className="flex-1">
              <h3 className="font-medium">{item.title}</h3>
              <p className="text-sm text-gray-500">${item.price}</p>
              <div className="mt-2 flex items-center gap-2">
                <button onClick={() => dispatch({ type: "UPDATE_QTY", payload: { id: item.id, qty: Math.max(1, item.qty - 1) } })} className="px-2">-</button>
                <span>{item.qty}</span>
                <button onClick={() => dispatch({ type: "UPDATE_QTY", payload: { id: item.id, qty: item.qty + 1 } })} className="px-2">+</button>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold">${(item.price * item.qty).toFixed(2)}</p>
              <button onClick={() => dispatch({ type: "REMOVE", payload: item.id })} className="text-[#F97316] text-sm mt-2">Remove</button>
            </div>
          </div>
        ))}
      </div>

      <aside className="mt-6 bg-white p-4 rounded-lg shadow-sm">
        <div className="flex justify-between mb-2"><span>Subtotal</span><strong>${subtotal}</strong></div>
        <div className="flex justify-between mb-4"><span>Shipping</span><span className="text-green-600">Free</span></div>
        <div className="flex justify-between mt-4 text-lg font-bold"><span>Total</span><span>${subtotal}</span></div>
        <div className="mt-4">
          <button className="w-full bg-[#2E6FF2] text-white py-2 rounded">Finalize Purchase</button>
        </div>
      </aside>
    </main>
  );
}
