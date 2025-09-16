import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { money } from "../lib/format";
import "../styles/cart.css";

const PLACEHOLDER = "https://placehold.co/120x120?text=No+Image";

function firstUrl(maybe) {
  if (!maybe) return null;
  if (Array.isArray(maybe)) return maybe[0] || null;
  if (typeof maybe === "string") {
    // si viene como '["url", "url2"]' para que jale
    const s = maybe.trim();
    if (s.startsWith("[") && s.endsWith("]")) {
      try {
        const arr = JSON.parse(s);
        if (Array.isArray(arr) && arr[0]) return arr[0];
      } catch {}
    }
    return s; // string normal con url, para que jale igual
  }
  return null;
}

function getProductImage(item) {
  return (
    firstUrl(item.image) ||
    firstUrl(item.images) ||
    firstUrl(item.thumbnail) ||
    firstUrl(item.product?.image) ||
    firstUrl(item.product?.images) ||
    PLACEHOLDER
  );
}

export default function Cart() {
  const navigate = useNavigate();
  const { items, subtotal, shipping, total, removeItem, remove } = useCart();

  const onRemove = (id) => {
    if (typeof removeItem === "function") return removeItem(id);
    if (typeof remove === "function") return remove(id);
    console.warn("Implementa removeItem(id) en CartContext");
  };

  if (!items.length) {
    return (
      <main className="cart-page">
        <div className="cart-wrap">
          <h1 className="cart-title">Shopping Cart</h1>
          <div className="cart-empty">
            <p>
              Your cart is empty.
              <Link to="/" className="cart-link">Continue shopping →</Link>
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <div className="cart-wrap">
        <h1 className="cart-title">Shopping Cart</h1>

        <section className="cart-list">
          {items.map((i) => {
            const src = getProductImage(i);
            return (
              <article key={i.id} className="cart-item">
                <div className="cart-left">
                  <img
                    src={src}
                    alt={i.title}
                    className="cart-thumb"
                    loading="lazy"
                    onError={(e) => (e.currentTarget.src = PLACEHOLDER)}
                  />
                  <div className="cart-meta">
                    <p className="cart-name" title={i.title}>{i.title}</p>
                    <p className="cart-qty">{i.qty} pc</p>
                  </div>
                </div>

                <div className="cart-right">
                  <div className="cart-price">{money(i.price * i.qty)}</div>
                  <button
                    type="button"
                    className="cart-remove"
                    onClick={() => onRemove(i.id)}
                    aria-label={`Remove ${i.title}`}
                  >
                    Eliminar
                  </button>
                </div>
              </article>
            );
          })}
        </section>

        <section className="cart-summary">
          <h2 className="cart-h2">Order Summary</h2>
          <div className="cart-rows">
            <Row label="Subtotal" value={money(subtotal)} />
            <Row label="Shipping" value={shipping === 0 ? "Free" : money(shipping)} />
            {shipping === 0 && <Row label="Free Shipping" value="" />}
            <Row label="Total" value={money(total)} strong topBorder />
          </div>

          <button className="cart-btn" onClick={() => navigate("/track")}>
            Finalize Purchase
          </button>

          <div className="cart-continue-wrap">
            <Link to="/" className="cart-continue">
              Continue Shopping
              <svg viewBox="0 0 20 20" className="cart-continue-ico" fill="currentColor">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.293 15.707a1 1 0 010-1.414L12.586 12H4a1 1 0 110-2h8.586l-2.293-2.293a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                />
              </svg>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

function Row({ label, value, strong = false, topBorder = false }) {
  return (
    <div className={"cart-row" + (topBorder ? " cart-row--border" : "")}>
      <span className={"cart-row-label" + (strong ? " cart-row-label--strong" : "")}>
        {label}
      </span>
      <span className={strong ? "cart-row-value cart-row-value--strong" : "cart-row-value"}>
        {value}
      </span>
    </div>
  );
}
