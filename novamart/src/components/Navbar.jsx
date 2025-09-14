import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { items } = useCart() || { items: [] };
  const count = items.reduce((s, i) => s + (i.qty || 1), 0);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-20">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-bold text-xl text-[#2E6FF2]">NovaMart</Link>

        <div className="flex-1 mx-4">
          <input placeholder="Buscar productos..." className="w-full border border-gray-200 rounded-md px-3 py-2" />
        </div>

        <nav className="flex items-center gap-3">
          <Link to="/login" className="text-sm">Login</Link>
          <Link to="/register" className="text-sm">Sign Up</Link>
          <Link to="/cart" className="relative">
            <span className="inline-block p-2 rounded-md bg-gray-100">🛒</span>
            {count > 0 && (
              <span className="absolute -top-1 -right-2 bg-[#F97316] text-white text-xs rounded-full px-1">{count}</span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
